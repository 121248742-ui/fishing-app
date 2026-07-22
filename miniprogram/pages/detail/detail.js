var F = require('../../utils/fish-data')
var CDB = require('../../utils/cloud-db')

Page({
  data: { fish: {}, unlocked: false, photo: '', weight: '', spot: '', date: '' },
  onLoad: function(opts) {
    this.fishId = parseInt(opts.id)
    var f = F.FISH_SPECIES.find(function(x) { return x.id === this.fishId }.bind(this))
    if (!f) return
    var dietClass = f.diet.indexOf('肉食') !== -1 ? 'tag-red' :
                    f.diet.indexOf('草食') !== -1 ? 'tag-green' :
                    f.diet.indexOf('滤食') !== -1 ? 'tag-blue' : 'tag-orange'
    var atlas = wx.getStorageSync('fish_atlas') || {}
    var rec = atlas[this.fishId]
    var unlocked = rec && rec.unlocked
    this.setData({
      fish: Object.assign({}, f, {
        rarityStars: F.starStr(f.rarity),
        diffDots: F.diffStr(f.difficulty),
        dietClass: dietClass
      }),
      unlocked: unlocked,
      photo: (rec && rec.photo) || '',
      weight: (rec && rec.weight) || '',
      spot: (rec && rec.spot) || '',
      date: (rec && rec.date) || new Date().toISOString().split('T')[0]
    })
    wx.setNavigationBarTitle({ title: f.name })
  },
  chooseSpot: function() {
    var that = this
    wx.chooseLocation({
      success: function(res) { if (res.name) that.setData({ spot: res.name }) }
    })
  },
  choosePhoto: function() {
    var that = this
    wx.chooseMedia({
      count: 1, mediaType: ['image'], sourceType: ['album', 'camera'],
      success: function(res) {
        that.setData({ photo: res.tempFiles[0].tempFilePath })
      }
    })
  },
  unlock: function() {
    var atlas = wx.getStorageSync('fish_atlas') || {}
    atlas[this.fishId] = {
      unlocked: true, photo: this.data.photo, weight: this.data.weight,
      spot: this.data.spot, date: this.data.date || new Date().toISOString().split('T')[0]
    }
    wx.setStorageSync('fish_atlas', atlas)
    this.setData({ unlocked: true })
    wx.showToast({ title: '解锁成功！', icon: 'success' })
    // Sync to cloud
    var u = wx.getStorageSync('userInfo') || {}
    if (u.code) { CDB.saveAtlas(u.code, atlas) }
  },
  lock: function() {
    var that = this
    wx.showModal({ title: '重新锁定？', content: '照片将被清除',
      success: function(res) {
        if (!res.confirm) return
        var atlas = wx.getStorageSync('fish_atlas') || {}
        delete atlas[that.fishId]
        wx.setStorageSync('fish_atlas', atlas)
        that.setData({ unlocked: false, photo: '', weight: '', spot: '' })
        var u = wx.getStorageSync('userInfo') || {}
        if (u.code) { CDB.saveAtlas(u.code, atlas) }
      }
    })
  },
  onInput: function(e) {
    var d = {}; d[e.currentTarget.dataset.field] = e.detail.value
    this.setData(d)
  }
})
