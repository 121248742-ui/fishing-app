var F = require('../../utils/fish-data')
var all = F.FISH_SPECIES

Page({
  data: {
    unlocked: [], locked: [], unlockedCount: 0, totalCount: 0, pct: 0,
    userInfo: null, hasLogin: false,
    tempAvatar: '', tempNickname: '',
    myPosts: [], postCount: 0, totalLikes: 0
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

    // My posts
    var allPosts = wx.getStorageSync('circle_posts') || []
    var myPosts = allPosts.slice().reverse()
    myPosts = myPosts.map(function(p) {
      p.timeAgo = this._formatTime(p.time)
      return p
    }.bind(this))
    var totalLikes = allPosts.reduce(function(sum, p) { return sum + (p.likes || 0) }, 0)

    this.setData({
      unlocked: unlocked, locked: locked,
      unlockedCount: unlocked.length, totalCount: all.length, pct: pct,
      userInfo: userInfo, hasLogin: hasLogin,
      myPosts: myPosts, postCount: allPosts.length, totalLikes: totalLikes
    })
  },
  _formatTime: function(timeStr) {
    if (!timeStr) return ''
    var then = new Date(timeStr).getTime()
    if (isNaN(then)) return timeStr
    var diff = Date.now() - then
    if (diff < 60000) return '刚刚'
    if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前'
    if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前'
    if (diff < 604800000) return Math.floor(diff / 86400000) + '天前'
    return timeStr.substring(0, 10)
  },
  goDetail: function(e) {
    wx.navigateTo({ url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id })
  },
  onChooseAvatar: function(e) {
    var that = this
    var tempPath = e.detail.avatarUrl
    var fs = wx.getFileSystemManager()
    var savedPath = wx.env.USER_DATA_PATH + '/avatar.png'
    try { fs.copyFileSync(tempPath, savedPath); that.setData({ tempAvatar: savedPath }) }
    catch(err) { that.setData({ tempAvatar: tempPath }) }
  },
  onNicknameInput: function(e) { this.setData({ tempNickname: e.detail.value }) },
  doLogin: function() {
    var that = this
    var avatar = that.data.tempAvatar
    var nickname = that.data.tempNickname
    if (!avatar && !nickname) {
      var stored = wx.getStorageSync('userInfo') || {}
      avatar = stored.avatarUrl || ''
      nickname = stored.nickName || ''
    }
    if (!nickname) nickname = '钓鱼达人'
    wx.login({
      success: function(res) {
        if (res.code) {
          var userInfo = { avatarUrl: avatar, nickName: nickname, code: res.code, loginTime: new Date().toLocaleString('zh-CN') }
          wx.setStorageSync('userInfo', userInfo)
          that.setData({ userInfo: userInfo, hasLogin: true, tempAvatar: '', tempNickname: '' })
          wx.showToast({ title: '登录成功', icon: 'success' })
        }
      },
      fail: function() { wx.showToast({ title: '登录失败', icon: 'none' }) }
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
        }
      }
    })
  },
  viewMyPost: function(e) {
    var idx = e.currentTarget.dataset.idx
    var post = this.data.myPosts[idx]
    if (post) this.setData({ viewPost: post })
  },
  closeViewPost: function() { this.setData({ viewPost: null }) },
  delMyPost: function(e) {
    var that = this
    var idx = e.currentTarget.dataset.idx
    wx.showModal({
      title: '删除这条帖子？',
      success: function(res) {
        if (!res.confirm) return
        var posts = wx.getStorageSync('circle_posts') || []
        var realIdx = posts.length - 1 - idx
        var p = posts[realIdx]
        if (p && p.photo && p.photo.indexOf(wx.env.USER_DATA_PATH) === 0) {
          try { wx.getFileSystemManager().unlinkSync(p.photo) } catch(e) {}
        }
        posts.splice(realIdx, 1)
        wx.setStorageSync('circle_posts', posts)
        that.onShow()
      }
    })
  }
})
