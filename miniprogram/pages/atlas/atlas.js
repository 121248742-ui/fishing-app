var F = require('../../utils/fish-data')
var all = F.FISH_SPECIES

Page({
  data: {
    unlocked: [], locked: [], unlockedCount: 0, totalCount: 0, pct: 0,
    userInfo: null, hasLogin: false,
    tempAvatar: '', tempNickname: ''
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
    var hasLogin = !!(userInfo && userInfo.code)
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
    var that = this
    var tempPath = e.detail.avatarUrl
    var fs = wx.getFileSystemManager()
    var savedPath = wx.env.USER_DATA_PATH + '/avatar.png'
    try {
      fs.copyFileSync(tempPath, savedPath)
      that.setData({ tempAvatar: savedPath })
    } catch(err) {
      that.setData({ tempAvatar: tempPath })
    }
  },
  onNicknameInput: function(e) {
    this.setData({ tempNickname: e.detail.value })
  },
  doLogin: function() {
    var that = this
    var avatar = that.data.tempAvatar
    var nickname = that.data.tempNickname

    // If avatar/nickname not set yet, try to still login with stored values
    if (!avatar && !nickname) {
      var stored = wx.getStorageSync('userInfo') || {}
      avatar = stored.avatarUrl || ''
      nickname = stored.nickName || ''
      if (!nickname) nickname = '钓鱼达人'
    }
    if (!nickname) nickname = '钓鱼达人'

    wx.login({
      success: function(res) {
        if (res.code) {
          var userInfo = {
            avatarUrl: avatar,
            nickName: nickname,
            code: res.code,
            loginTime: new Date().toLocaleString('zh-CN')
          }
          wx.setStorageSync('userInfo', userInfo)
          that.setData({ userInfo: userInfo, hasLogin: true, tempAvatar: '', tempNickname: '' })
          wx.showToast({ title: '登录成功', icon: 'success' })
        } else {
          wx.showToast({ title: '登录失败，请重试', icon: 'none' })
        }
      },
      fail: function() {
        wx.showToast({ title: '登录失败，请重试', icon: 'none' })
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
