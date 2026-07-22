Page({
  data: { tempAvatar: '', tempNickname: '', hasLogin: false },
  onShow: function() {
    var u = wx.getStorageSync('userInfo')
    if (u) this.setData({ hasLogin: true, userInfo: u })
  },
  pickAvatar: function() {
    wx.showToast({ title: '触发', icon: 'none', duration: 500 })
    var that = this
    wx.chooseMedia({
      count: 1, mediaType: ['image'], sourceType: ['album', 'camera'],
      sizeType: ['compressed'],
      success: function(res) { that.setData({ tempAvatar: res.tempFiles[0].tempFilePath }) },
      fail: function(err) {
        wx.chooseImage({
          count: 1, sizeType: ['compressed'], sourceType: ['album', 'camera'],
          success: function(res) { that.setData({ tempAvatar: res.tempFilePaths[0] }) }
        })
      }
    })
  },
  onNicknameInput: function(e) { this.setData({ tempNickname: e.detail.value }) },
  doLogin: function() {
    var a = this.data.tempAvatar, n = this.data.tempNickname
    if (!a) { wx.showToast({ title: '请上传头像', icon: 'none' }); return }
    if (!n) { wx.showToast({ title: '请输入昵称', icon: 'none' }); return }
    wx.login({
      success: function(r) {
        if (r.code) {
          var fs = wx.getFileSystemManager()
          var sp = wx.env.USER_DATA_PATH + '/avatar.png'
          if (a.indexOf('tmp_') !== -1 || a.indexOf('wxfile') !== -1) {
            try { fs.copyFileSync(a, sp); a = sp } catch(e) {}
          }
          wx.setStorageSync('userInfo', { avatarUrl: a, nickName: n, code: r.code })
          wx.showToast({ title: '登录成功', icon: 'success' })
        }
      }
    })
  }
})
