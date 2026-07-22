Page({
  data: { tempAvatar: '', tempNickname: '', hasLogin: false },
  onShow: function() {
    var u = wx.getStorageSync('userInfo')
    if (u) this.setData({ hasLogin: true, userInfo: u })
  },
  pickAvatar: function() {
    var that = this
    wx.chooseMedia({
      count: 1, mediaType: ['image'], sourceType: ['album', 'camera'], sizeType: ['compressed'],
      success: function(res) {
        var tp = res.tempFiles[0].tempFilePath
        var sp = wx.env.USER_DATA_PATH + '/avatar.png'
        try { wx.getFileSystemManager().copyFileSync(tp, sp) } catch(e) {}
        that.setData({ tempAvatar: sp })
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
          wx.setStorageSync('userInfo', { avatarUrl: a, nickName: n, code: r.code })
          wx.showToast({ title: '登录成功', icon: 'success' })
          setTimeout(function() { wx.reLaunch({ url: '/pages/atlas/atlas' }) }, 500)
        }
      }
    })
  }
})
