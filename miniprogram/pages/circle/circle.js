var CDB = require('../../utils/cloud-db')

Page({
  data: {
    posts: [], showForm: false, photo: '', fishType: '', weight: '', spot: '', note: '',
    detailPost: null, detailIdx: -1, commentText: '',
    cloudOk: false
  },
  onShow: function() {
    var that = this
    var userInfo = wx.getStorageSync('userInfo') || {}
    var userId = userInfo.code || 'local'

    // Load local posts first (always available)
    var localPosts = wx.getStorageSync('circle_posts') || []
    localPosts = localPosts.slice().reverse().map(function(p) {
      p._id = 'local_' + p.time
      return that._formatPost(p, userInfo, userId)
    })

    // Try cloud, merge with local
    CDB.getPosts(
      function(cloudPosts) {
        if (cloudPosts.length === 0 && localPosts.length > 0) {
          // Cloud empty but local has posts - show local
          that.setData({ posts: localPosts })
        } else {
          var posts = cloudPosts.map(function(p) {
            return that._formatPost(p, userInfo, userId)
          })
          that.setData({ posts: posts, cloudOk: true })
        }
      },
      function() {
        // Cloud failed, show local
        that.setData({ posts: localPosts })
      }
    )
  },
  _formatPost: function(p, userInfo, userId) {
    p.timeAgo = this._fmt(p.createTime || p.time)
    p.userName = p.userName || userInfo.nickName || '钓鱼人'
    p.userAvatar = p.userAvatar || userInfo.avatarUrl || ''
    var likedBy = p.likedBy || []
    p.liked = likedBy.indexOf(userId) !== -1
    p.likes = (p.likes || 0)
    p.comments = p.comments || []
    if (p.comments.length) {
      p.comments.forEach(function(c) { c.timeAgo = this._fmt(c.createTime || c.time) }.bind(this))
    }
    return p
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
  choosePhoto: function() {
    var that = this
    wx.chooseMedia({
      count: 1, mediaType: ['image'], sourceType: ['album', 'camera'], sizeType: ['compressed'],
      success: function(res) { that.setData({ photo: res.tempFiles[0].tempFilePath }) },
      fail: function() {
        wx.chooseImage({ count: 1, sizeType: ['compressed'], sourceType: ['album', 'camera'],
          success: function(res) { that.setData({ photo: res.tempFilePaths[0] }) }
        })
      }
    })
  },
  chooseSpot: function() {
    var that = this
    wx.chooseLocation({
      success: function(res) {
        if (res.name) that.setData({ spot: res.name, spotLat: res.latitude, spotLon: res.longitude })
      }
    })
  },
  publish: function() {
    var u = wx.getStorageSync('userInfo')
    if (!u || !u.code) { wx.showToast({ title: '请先登录', icon: 'none' }); return }
    var that = this, d = this.data
    if (!d.photo && !d.fishType) { wx.showToast({ title: '至少上传照片或填写鱼种', icon: 'none' }); return }
    if (!d.note.trim()) { wx.showToast({ title: '请说点什么', icon: 'none' }); return }

    var post = {
      photo: d.photo, fishType: d.fishType, weight: d.weight,
      spot: d.spot, spotLat: d.spotLat, spotLon: d.spotLon, note: d.note,
      userName: u.nickName || '钓鱼人', userAvatar: u.avatarUrl || '',
      likes: 0, likedBy: [], userId: u.code
    }
    // Save photo to persistent
    if (post.photo && post.photo.indexOf('tmp_') !== -1) {
      var sp = wx.env.USER_DATA_PATH + '/post_' + Date.now() + '.jpg'
      try { wx.getFileSystemManager().copyFileSync(post.photo, sp); post.photo = sp } catch(e) {}
    }

    CDB.addPost(post,
      function() { that.closeForm(); that.onShow(); wx.showToast({ title: '发布成功', icon: 'success' }) },
      function(err) {
        // Cloud failed, save locally
        var posts = wx.getStorageSync('circle_posts') || []
        post.time = new Date().toISOString()
        posts.push(post)
        wx.setStorageSync('circle_posts', posts)
        that.closeForm(); that.onShow()
      }
    )
  },

  // ---- Post Detail ----
  openDetail: function(e) {
    var idx = e.currentTarget.dataset.idx
    var post = Object.assign({}, this.data.posts[idx])
    this.setData({ detailPost: post, detailIdx: idx, commentText: '' })
    // Load comments from cloud
    var that = this
    if (post._id && post._id.indexOf('local_') !== 0) {
      CDB.getComments(post._id, function(cloudComments) {
        var dp = that.data.detailPost
        dp.comments = cloudComments.map(function(c) {
          c.timeAgo = that._fmt(c.createTime)
          return c
        })
        that.setData({ detailPost: dp })
      })
    }
  },
  closeDetail: function() {
    this.setData({ detailPost: null, detailIdx: -1 })
    this.onShow()
  },
  toggleLike: function(e) {
    var that = this, idx = e.currentTarget.dataset.idx
    var u = wx.getStorageSync('userInfo') || {}
    var userId = u.code || 'local'
    var post = this.data.posts[idx]
    var newLiked = !post.liked

    // Optimistic update
    post.liked = newLiked
    post.likes = (post.likes || 0) + (newLiked ? 1 : -1)
    if (!post.likedBy) post.likedBy = []
    if (newLiked) post.likedBy.push(userId)
    else { var li = post.likedBy.indexOf(userId); if (li !== -1) post.likedBy.splice(li, 1) }
    this.setData({ posts: this.data.posts })

    if (post._id && post._id.indexOf('local_') !== 0) {
      CDB.updatePost(post._id, { likes: post.likes, likedBy: post.likedBy }, null, null)
    } else {
      var posts = wx.getStorageSync('circle_posts') || []
      var rIdx = posts.length - 1 - idx
      if (rIdx >= 0) { posts[rIdx].likedBy = post.likedBy; posts[rIdx].likes = post.likes; wx.setStorageSync('circle_posts', posts) }
    }
  },
  toggleDetailLike: function() {
    var that = this
    var u = wx.getStorageSync('userInfo') || {}
    var userId = u.code || 'local'
    var post = this.data.detailPost
    var newLiked = !post.liked
    post.liked = newLiked
    post.likes = (post.likes || 0) + (newLiked ? 1 : -1)
    if (!post.likedBy) post.likedBy = []
    if (newLiked) post.likedBy.push(userId)
    else { var li = post.likedBy.indexOf(userId); if (li !== -1) post.likedBy.splice(li, 1) }
    this.setData({ detailPost: post })
    if (post._id && post._id.indexOf('local_') !== 0) {
      CDB.updatePost(post._id, { likes: post.likes, likedBy: post.likedBy }, null, null)
    }
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

  // ---- Comments ----
  onCommentInput: function(e) { this.setData({ commentText: e.detail.value }) },
  sendComment: function() {
    var that = this, text = this.data.commentText.trim()
    if (!text) return
    var u = wx.getStorageSync('userInfo') || {}
    var comment = { text: text, userName: u.nickName || '钓鱼人', replyTo: this.data.replyTo || '' }
    var dp = this.data.detailPost
    comment.timeAgo = '刚刚'
    dp.comments = dp.comments || []
    dp.comments.push(comment)
    this.setData({ detailPost: dp, commentText: '', replyTo: '' })

    if (dp._id && dp._id.indexOf('local_') !== 0) {
      CDB.addComment(dp._id, comment, null, function() {
        // Cloud failed, save locally
        var posts = wx.getStorageSync('circle_posts') || []
        var rIdx = posts.length - 1 - that.data.detailIdx
        if (rIdx >= 0) { posts[rIdx].comments = dp.comments; wx.setStorageSync('circle_posts', posts) }
      })
    } else {
      var posts = wx.getStorageSync('circle_posts') || []
      var rIdx = posts.length - 1 - that.data.detailIdx
      if (rIdx >= 0) { posts[rIdx].comments = dp.comments; wx.setStorageSync('circle_posts', posts) }
    }
  },

  // ---- Delete ----
  delDetailPost: function(e) {
    var that = this
    wx.showModal({
      title: '删除这条帖子？',
      success: function(res) {
        if (!res.confirm) return
        var idx = that.data.detailIdx, post = that.data.posts[idx]
        if (post._id && post._id.indexOf('local_') !== 0) {
          CDB.removePost(post._id, function() { that.closeDetail() })
        } else {
          var posts = wx.getStorageSync('circle_posts') || []
          var rIdx = posts.length - 1 - idx
          if (rIdx >= 0) posts.splice(rIdx, 1)
          wx.setStorageSync('circle_posts', posts)
          that.closeDetail()
        }
      }
    })
  },
  editDetailPost: function() {
    var that = this, p = this.data.detailPost
    wx.showModal({
      title: '编辑帖子', editable: true,
      placeholderText: '鱼种、重量、钓点、描述',
      content: [p.fishType, p.weight ? p.weight+'斤' : '', p.spot, p.note].filter(Boolean).join(' | '),
      success: function(res) {
        if (!res.confirm || !res.content) return
        var parts = res.content.split('|').map(function(s){return s.trim()})
        var data = { fishType: parts[0]||'', weight: parts[1] ? parts[1].replace('斤','') : '', spot: parts[2]||'', note: parts[3]||'' }
        if (p._id && p._id.indexOf('local_') !== 0) {
          CDB.updatePost(p._id, data, function() { that.closeDetail() })
        } else {
          var posts = wx.getStorageSync('circle_posts') || []
          var rIdx = posts.length - 1 - that.data.detailIdx
          if (rIdx >= 0) Object.assign(posts[rIdx], data)
          wx.setStorageSync('circle_posts', posts)
          that.closeDetail()
        }
      }
    })
  }
})
