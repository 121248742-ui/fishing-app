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
    var that = this
    var tempPath = e.detail.avatarUrl
    // Copy temp file to persistent storage
    var fs = wx.getFileSystemManager()
    var savedPath = wx.env.USER_DATA_PATH + '/avatar_' + Date.now() + '.png'
    fs.copyFile({
      srcPath: tempPath,
      destPath: savedPath,
      success: function() {
        // Remove old avatar if exists
        var oldInfo = wx.getStorageSync('userInfo') || {}
        if (oldInfo.avatarUrl && oldInfo.avatarUrl.indexOf(wx.env.USER_DATA_PATH) === 0) {
          try { fs.unlinkSync(oldInfo.avatarUrl) } catch(e) {}
        }
        var userInfo = oldInfo
        userInfo.avatarUrl = savedPath
        wx.setStorageSync('userInfo', userInfo)
        that.setData({ userInfo: userInfo, 'userInfo.avatarUrl': savedPath })
      },
      fail: function() {
        // Fallback: store temp path directly
        var userInfo = that.data.userInfo || {}
        userInfo.avatarUrl = tempPath
        that.setData({ userInfo: userInfo, 'userInfo.avatarUrl': tempPath })
      }
    })
  },
  onNicknameInput: function(e) {
    var userInfo = this.data.userInfo || {}
    userInfo.nickName = e.detail.value
    this.setData({ 'userInfo.nickName': e.detail.value })
  },
  doLogin: function() {
    var that = this
    // One-click: get avatar + nickname via getUserProfile
    wx.getUserProfile({
      desc: '用于展示用户头像和昵称',
      success: function(profileRes) {
        var userInfo = profileRes.userInfo
        // Save avatar to persistent storage
        if (userInfo.avatarUrl) {
          wx.downloadFile({
            url: userInfo.avatarUrl,
            success: function(dfRes) {
              var fs = wx.getFileSystemManager()
              var savedPath = wx.env.USER_DATA_PATH + '/avatar_' + Date.now() + '.png'
              try { fs.copyFileSync(dfRes.tempFilePath, savedPath) } catch(e) {}
              userInfo.avatarUrl = savedPath
              that.finishLogin(userInfo)
            },
            fail: function() { that.finishLogin(userInfo) }
          })
        } else {
          that.finishLogin(userInfo)
        }
      },
      fail: function(err) {
        // Fallback: manual login with nickname
        var userInfo = that.data.userInfo || wx.getStorageSync('userInfo') || {}
        if (!userInfo.nickName) userInfo.nickName = '钓鱼达人'
        that.finishLogin(userInfo)
      }
    })
  },
  finishLogin: function(userInfo) {
    var that = this
    wx.login({
      success: function(res) {
        if (res.code) {
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
