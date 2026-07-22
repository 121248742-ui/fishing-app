Page({
  data: {
    posts: [], showForm: false, photo: '', fishType: '', weight: '', spot: '', note: '',
    detailPost: null, detailIdx: -1, commentText: ''
  },
  onShow: function() {
    var posts = wx.getStorageSync('circle_posts') || []
    var userInfo = wx.getStorageSync('userInfo') || {}
    var that = this
    posts = posts.slice().reverse()
    posts = posts.map(function(p) {
      p.timeAgo = that._fmt(p.time)
      p.userName = userInfo.nickName || '钓鱼人'
      p.userAvatar = userInfo.avatarUrl || ''
      p.liked = p.liked || false
      p.likes = p.likes || 0
      p.comments = p.comments || []
      // Format comment times
      if (p.comments.length) {
        p.comments.forEach(function(c) { c.timeAgo = that._fmt(c.time) })
      }
      return p
    })
    this.setData({ posts: posts })
  },
  _fmt: function(ts) {
    if (!ts) return ''
    var then = new Date(ts).getTime()
    if (isNaN(then)) return ts
    var diff = Date.now() - then
    if (diff < 60000) return '刚刚'
    if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前'
    if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前'
    if (diff < 604800000) return Math.floor(diff / 86400000) + '天前'
    return ts.substring(0, 10)
  },

  // ---- Create Post ----
  openForm: function() {
    var u = wx.getStorageSync('userInfo')
    if (!u || !u.code) { wx.showToast({ title: '请先登录', icon: 'none' }); return }
    this.setData({ showForm: true, photo: '', fishType: '', weight: '', spot: '', note: '' })
  },
  closeForm: function() { this.setData({ showForm: false }) },
  onInput: function(e) { var d = {}; d[e.currentTarget.dataset.field] = e.detail.value; this.setData(d) },
  chooseSpot: function() {
    var that = this
    wx.chooseLocation({
      success: function(res) {
        if (res.name) {
          that.setData({ spot: res.name, spotLat: res.latitude, spotLon: res.longitude })
        }
      }
    })
  },
  choosePhoto: function() {
    var that = this
    wx.chooseMedia({
      count: 1, mediaType: ['image'], sourceType: ['album', 'camera'],
      sizeType: ['compressed'],
      success: function(res) { that.setData({ photo: res.tempFiles[0].tempFilePath }) },
      fail: function(err) {
        // Fallback to chooseImage
        wx.chooseImage({
          count: 1, sizeType: ['compressed'], sourceType: ['album', 'camera'],
          success: function(res) { that.setData({ photo: res.tempFilePaths[0] }) }
        })
      }
    })
  },
  publish: function() {
    var u = wx.getStorageSync('userInfo')
    if (!u || !u.code) { wx.showToast({ title: '请先登录', icon: 'none' }); return }
    var that = this
    var d = this.data
    if (!d.photo && !d.fishType) { wx.showToast({ title: '至少上传照片或填写鱼种', icon: 'none' }); return }
    if (!d.note.trim()) { wx.showToast({ title: '请说点什么', icon: 'none' }); return }
    var doSave = function(savedPhoto) {
      var posts = wx.getStorageSync('circle_posts') || []
      posts.push({
        photo: savedPhoto, fishType: d.fishType, weight: d.weight,
        spot: d.spot, spotLat: d.spotLat, spotLon: d.spotLon, note: d.note,
        time: new Date().toISOString(),
        liked: false, likes: 0, comments: []
      })
      wx.setStorageSync('circle_posts', posts)
      // Clear notifications for self-post
      that.closeForm()
      that.onShow()
    }
    if (d.photo) {
      var savedPath = wx.env.USER_DATA_PATH + '/post_' + Date.now() + '.jpg'
      try { wx.getFileSystemManager().copyFileSync(d.photo, savedPath); doSave(savedPath) }
      catch(e) { doSave(d.photo) }
    } else { doSave('') }
  },

  previewPhoto: function(e) {
    var src = e.currentTarget.dataset.src
    if (src) wx.previewImage({ urls: [src], current: src })
  },
  openLocation: function(e) {
    var p = this.data.detailPost
    if (!p || !p.spot) return
    if (p.spotLat) {
      wx.openLocation({ latitude: p.spotLat, longitude: p.spotLon, name: p.spot, scale: 16 })
    } else {
      wx.showToast({ title: '该帖子未保存位置坐标', icon: 'none' })
    }
  },
  // ---- Post Detail ----
  openDetail: function(e) {
    var idx = e.currentTarget.dataset.idx
    var post = Object.assign({}, this.data.posts[idx])
    this.setData({ detailPost: post, detailIdx: idx, commentText: '' })
  },
  closeDetail: function() {
    this.setData({ detailPost: null, detailIdx: -1 })
    this.onShow() // refresh
  },
  toggleLike: function(e) {
    var idx = e.currentTarget.dataset.idx
    this._doLike(idx)
  },
  toggleDetailLike: function() {
    var that = this
    this._doLike(this.data.detailIdx)
    var posts = this.data.posts
    this.setData({ 'detailPost.liked': posts[this.data.detailIdx].liked, 'detailPost.likes': posts[this.data.detailIdx].likes })
  },
  _doLike: function(idx) {
    var posts = wx.getStorageSync('circle_posts') || []
    var realIdx = posts.length - 1 - idx
    if (realIdx < 0 || realIdx >= posts.length) return
    posts[realIdx].liked = !posts[realIdx].liked
    posts[realIdx].likes = (posts[realIdx].likes || 0) + (posts[realIdx].liked ? 1 : -1)
    wx.setStorageSync('circle_posts', posts)
    var dp = this.data.posts
    dp[idx].liked = posts[realIdx].liked
    dp[idx].likes = posts[realIdx].likes
    this.setData({ posts: dp })
  },

  // ---- Comments ----
  onCommentInput: function(e) { this.setData({ commentText: e.detail.value }) },
  sendComment: function() {
    var that = this
    var text = this.data.commentText.trim()
    if (!text) return
    var userInfo = wx.getStorageSync('userInfo') || {}
    var posts = wx.getStorageSync('circle_posts') || []
    var realIdx = posts.length - 1 - this.data.detailIdx
    if (realIdx < 0 || realIdx >= posts.length) return
    var comment = {
      text: text,
      userName: userInfo.nickName || '钓鱼人',
      time: new Date().toISOString()
    }
    posts[realIdx].comments = posts[realIdx].comments || []
    posts[realIdx].comments.push(comment)
    wx.setStorageSync('circle_posts', posts)

    // Update detail
    var dp = this.data.detailPost
    dp.comments = dp.comments || []
    dp.comments.push(Object.assign({}, comment, { timeAgo: '刚刚' }))
    this.setData({ detailPost: dp, commentText: '' })
  },

  // ---- Edit ----
  editDetailPost: function() {
    var that = this
    var p = this.data.detailPost
    wx.showModal({
      title: '编辑帖子',
      editable: true,
      placeholderText: '输入鱼种、重量、钓点、描述',
      content: [p.fishType, p.weight ? p.weight+'斤' : '', p.spot, p.note].filter(Boolean).join(' | '),
      success: function(res) {
        if (!res.confirm || !res.content) return
        var parts = res.content.split('|').map(function(s){return s.trim()})
        var posts = wx.getStorageSync('circle_posts') || []
        var realIdx = posts.length - 1 - that.data.detailIdx
        if (realIdx >= 0 && realIdx < posts.length) {
          posts[realIdx].fishType = parts[0] || ''
          posts[realIdx].weight = parts[1] ? parts[1].replace('斤','') : ''
          posts[realIdx].spot = parts[2] || ''
          posts[realIdx].note = parts[3] || ''
          wx.setStorageSync('circle_posts', posts)
          that.closeDetail()
        }
      }
    })
  },

  // ---- Delete ----
  delDetailPost: function(e) {
    var that = this
    wx.showModal({
      title: '删除这条帖子？',
      success: function(res) {
        if (!res.confirm) return
        var idx = that.data.detailIdx
        var posts = wx.getStorageSync('circle_posts') || []
        var realIdx = posts.length - 1 - idx
        var p = posts[realIdx]
        if (p && p.photo && p.photo.indexOf(wx.env.USER_DATA_PATH) === 0) {
          try { wx.getFileSystemManager().unlinkSync(p.photo) } catch(e) {}
        }
        posts.splice(realIdx, 1)
        wx.setStorageSync('circle_posts', posts)
        that.closeDetail()
      }
    })
  }
})
