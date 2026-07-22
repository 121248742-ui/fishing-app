var F = require('../../utils/fish-data')
var all = F.FISH_SPECIES

Page({
  data: { unlocked: [], locked: [], unlockedCount: 0, totalCount: 0, pct: 0 },
  onShow: function() {
    var atlas = wx.getStorageSync('fish_atlas') || {}
    var unlocked = [], locked = []
    all.forEach(function(f) {
      var rec = atlas[f.id]
      if (rec && rec.unlocked) unlocked.push(f)
      else locked.push(f)
    })
    var pct = Math.round(unlocked.length / all.length * 100)
    this.setData({
      unlocked: unlocked, locked: locked,
      unlockedCount: unlocked.length, totalCount: all.length, pct: pct
    })
  },
  goDetail: function(e) {
    wx.navigateTo({ url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id })
  }
})
