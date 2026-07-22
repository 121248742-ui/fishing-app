Page({
  data: { posts: [], photo: '', fishType: '', weight: '', spot: '', note: '' },
  onShow: function() {
    var posts = wx.getStorageSync('circle_posts') || []
    var userInfo = wx.getStorageSync('userInfo') || {}
    var that = this
    posts.reverse()
    posts = posts.map(function(p) {
      p.timeAgo = that.formatTime(p.time)
      p.userName = userInfo.nickName || '钓鱼人'
      p.userAvatar = userInfo.avatarUrl || ''
      p.liked = p.liked || false
      p.likes = p.likes || 0
      return p
    })
    this.setData({ posts: posts, photo: '', fishType: '', weight: '', spot: '', note: '' })
  },
  formatTime: function(timeStr) {
    if (!timeStr) return ''
    var then = new Date(timeStr).getTime()
    if (isNaN(then)) return timeStr
    var now = Date.now()
    var diff = now - then
    if (diff < 60000) return '刚刚'
    if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前'
    if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前'
    if (diff < 604800000) return Math.floor(diff / 86400000) + '天前'
    return timeStr.substring(0, 10)
  },
  onInput: function(e) {
    var d = {}; d[e.currentTarget.dataset.field] = e.detail.value; this.setData(d)
  },
  choosePhoto: function() {
    var that = this
    wx.chooseMedia({
      count: 1, mediaType: ['image'], sourceType: ['album', 'camera'],
      success: function(res) { that.setData({ photo: res.tempFiles[0].tempFilePath }) }
    })
  },
  publish: function() {
    var d = this.data
    if (!d.photo && !d.fishType) { wx.showToast({ title: '至少上传照片或填写鱼种', icon: 'none' }); return }
    var posts = wx.getStorageSync('circle_posts') || []
    posts.push({
      photo: d.photo, fishType: d.fishType, weight: d.weight,
      spot: d.spot, note: d.note,
      time: new Date().toISOString(),
      liked: false, likes: 0
    })
    wx.setStorageSync('circle_posts', posts)
    this.onShow()
  },
  toggleLike: function(e) {
    var idx = e.currentTarget.dataset.idx
    var posts = wx.getStorageSync('circle_posts') || []
    var realIdx = posts.length - 1 - idx
    if (realIdx < 0 || realIdx >= posts.length) return
    var p = posts[realIdx]
    p.liked = !p.liked
    p.likes = (p.likes || 0) + (p.liked ? 1 : -1)
    wx.setStorageSync('circle_posts', posts)
    // Update just this post in the display
    var displayPosts = this.data.posts
    displayPosts[idx].liked = p.liked
    displayPosts[idx].likes = p.likes
    this.setData({ posts: displayPosts })
  },
  delPost: function(e) {
    var that = this
    wx.showModal({
      title: '删除这条分享？',
      success: function(res) {
        if (!res.confirm) return
        var posts = wx.getStorageSync('circle_posts') || []
        var realIdx = posts.length - 1 - e.currentTarget.dataset.idx
        posts.splice(realIdx, 1)
        wx.setStorageSync('circle_posts', posts)
        that.onShow()
      }
    })
  }
})
