var F = require('../../utils/fish-data')
var all = F.FISH_SPECIES

Page({
  data: {
    unlocked: [], locked: [], unlockedCount: 0, totalCount: 0, pct: 0,
    userInfo: null, hasLogin: false
  },
  onShow: function() {
    var atlas = wx.getStorageSync('fish_atlas') || {}
    var unlocked = [], locked = []
    all.forEach(function(f) {
      var rec = atlas[f.id]
      if (rec && rec.unlocked) unlocked.push(f)
      else locked.push(f)
    })
    var pct = Math.round(unlocked.length / all.length * 100)

    var userInfo = wx.getStorageSync('userInfo')
    var hasLogin = !!userInfo

    this.setData({
      unlocked: unlocked, locked: locked,
      unlockedCount: unlocked.length, totalCount: all.length, pct: pct,
      userInfo: userInfo, hasLogin: hasLogin
    })
  },
  goDetail: function(e) {
    wx.navigateTo({ url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id })
  },
  onChooseAvatar: function(e) {
    var avatarUrl = e.detail.avatarUrl
    var userInfo = this.data.userInfo || {}
    userInfo.avatarUrl = avatarUrl
    this.setData({ 'userInfo.avatarUrl': avatarUrl })
  },
  onNicknameInput: function(e) {
    var userInfo = this.data.userInfo || {}
    userInfo.nickName = e.detail.value
    this.setData({ 'userInfo.nickName': e.detail.value })
  },
  doLogin: function() {
    var that = this
    wx.login({
      success: function(res) {
        if (res.code) {
          var userInfo = that.data.userInfo || {}
          userInfo.code = res.code
          userInfo.loginTime = new Date().toLocaleString('zh-CN')
          wx.setStorageSync('userInfo', userInfo)
          that.setData({ userInfo: userInfo, hasLogin: true })
          wx.showToast({ title: '登录成功', icon: 'success' })
        }
      }
    })
  },
  doLogout: function() {
    var that = this
    wx.showModal({
      title: '退出登录？',
      success: function(res) {
        if (res.confirm) {
          wx.removeStorageSync('userInfo')
          that.setData({ userInfo: null, hasLogin: false })
          wx.showToast({ title: '已退出', icon: 'none' })
        }
      }
    })
  }
})
