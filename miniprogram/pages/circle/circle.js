var CDB = require('../../utils/cloud-db')

function fmtTime(ts) {
  if (!ts) return ''; var t = new Date(ts).getTime(); if (isNaN(t)) return ts
  var d = Date.now() - t
  if (d < 60000) return '刚刚'
  if (d < 3600000) return Math.floor(d/60000) + '分钟前'
  if (d < 86400000) return Math.floor(d/3600000) + '小时前'
  if (d < 604800000) return Math.floor(d/86400000) + '天前'
  return ts.substring(0,10)
}

Page({
  data: {
    posts: [], showForm: false,
    photo: '', fishType: '', weight: '', spot: '', note: '',
    detailPost: null, detailIdx: -1, commentText: '', replyTo: ''
  },
  onShow: function() {
    var that = this, u = wx.getStorageSync('userInfo') || {}, uid = u.code || 'local'
    CDB.getPosts(function(list) {
      var posts = list.map(function(p) {
        p.timeAgo = fmtTime(p.createTime)
        p.userName = p.userName || u.nickName || '钓鱼人'
        p.userAvatar = p.userAvatar || u.avatarUrl || ''
        p.liked = (p.likedBy || []).indexOf(uid) !== -1
        if (p.comments) p.comments.forEach(function(c) { c.timeAgo = fmtTime(c.createTime) })
        return p
      })
      that.setData({ posts: posts })
    }, function() {
      var posts = wx.getStorageSync('circle_posts') || []
      posts = posts.slice().reverse().map(function(p) {
        p._id = 'local_' + p.time; p.timeAgo = fmtTime(p.createTime || p.time)
        p.userName = u.nickName || '钓鱼人'; p.userAvatar = u.avatarUrl || ''
        p.liked = (p.likedBy || []).indexOf(uid) !== -1
        p.comments = p.comments || []
        return p
      })
      that.setData({ posts: posts })
    })
  },

  // ---- Publish ----
  openForm: function() {
    var u = wx.getStorageSync('userInfo')
    if (!u || !u.code) { wx.showToast({ title: '请先登录', icon: 'none' }); return }
    this.setData({ showForm: true, photo: '', fishType: '', weight: '', spot: '', note: '' })
  },
  closeForm: function() { this.setData({ showForm: false }) },
  onInput: function(e) { var d = {}; d[e.currentTarget.dataset.field] = e.detail.value; this.setData(d) },
  choosePhoto: function() {
    var that = this
    wx.chooseMedia({ count: 1, mediaType: ['image'], sourceType: ['album', 'camera'], sizeType: ['compressed'],
      success: function(r) { that.setData({ photo: r.tempFiles[0].tempFilePath }) },
      fail: function() { wx.chooseImage({ count: 1, sizeType: ['compressed'], sourceType: ['album', 'camera'], success: function(r) { that.setData({ photo: r.tempFilePaths[0] }) } }) }
    })
  },
  chooseSpot: function() {
    var that = this
    wx.chooseLocation({ success: function(r) { if (r.name) that.setData({ spot: r.name, spotLat: r.latitude, spotLon: r.longitude }) } })
  },
  publish: function() {
    var that = this, u = wx.getStorageSync('userInfo')
    if (!u || !u.code) { wx.showToast({ title: '请先登录', icon: 'none' }); return }
    var d = this.data
    if (!d.photo && !d.fishType) { wx.showToast({ title: '至少上传照片或填写鱼种', icon: 'none' }); return }
    if (!d.note.trim()) { wx.showToast({ title: '请说点什么', icon: 'none' }); return }
    var post = { photo: d.photo, fishType: d.fishType, weight: d.weight, spot: d.spot, spotLat: d.spotLat, spotLon: d.spotLon, note: d.note, userName: u.nickName || '钓鱼人', userAvatar: u.avatarUrl || '', userId: u.code }
    if (post.photo) {
      var sp = wx.env.USER_DATA_PATH + '/post_' + Date.now() + '.jpg'
      try { wx.getFileSystemManager().copyFileSync(post.photo, sp); post.photo = sp } catch(e) {}
    }
    CDB.addPost(post, function() { that.closeForm(); that.onShow(); wx.showToast({ title: '发布成功', icon: 'success' }) },
      function() {
        var posts = wx.getStorageSync('circle_posts') || []
        post.time = new Date().toISOString(); posts.push(post)
        wx.setStorageSync('circle_posts', posts); that.closeForm(); that.onShow()
      })
  },

  // ---- Detail ----
  openDetail: function(e) {
    var post = Object.assign({}, this.data.posts[e.currentTarget.dataset.idx])
    this.setData({ detailPost: post, detailIdx: e.currentTarget.dataset.idx, commentText: '', replyTo: '' })
  },
  closeDetail: function() { this.setData({ detailPost: null }); this.onShow() },

  // ---- Like ----
  toggleLike: function(e) {
    var p = this.data.posts[e.currentTarget.dataset.idx], u = wx.getStorageSync('userInfo') || {}, uid = u.code || 'local'
    p.liked = !p.liked; p.likes = (p.likes||0) + (p.liked ? 1 : -1)
    if (!p.likedBy) p.likedBy = []; p.liked ? p.likedBy.push(uid) : (function(){ var i = p.likedBy.indexOf(uid); if(i!==-1) p.likedBy.splice(i,1) })()
    this.setData({ posts: this.data.posts })
    if (p._id && p._id.indexOf('local_') !== 0) CDB.updatePost(p._id, { likes: p.likes, likedBy: p.likedBy })
    else { var lp = wx.getStorageSync('circle_posts')||[]; var ri = lp.length-1-e.currentTarget.dataset.idx; if(ri>=0){lp[ri].likes=p.likes;lp[ri].likedBy=p.likedBy;wx.setStorageSync('circle_posts',lp)} }
  },
  toggleDetailLike: function() {
    var p = this.data.detailPost, u = wx.getStorageSync('userInfo') || {}, uid = u.code || 'local'
    p.liked = !p.liked; p.likes = (p.likes||0) + (p.liked ? 1 : -1)
    if (!p.likedBy) p.likedBy = []; p.liked ? p.likedBy.push(uid) : (function(){ var i = p.likedBy.indexOf(uid); if(i!==-1) p.likedBy.splice(i,1) })()
    this.setData({ detailPost: p })
    if (p._id && p._id.indexOf('local_') !== 0) CDB.updatePost(p._id, { likes: p.likes, likedBy: p.likedBy })
  },

  // ---- Comment ----
  onCommentInput: function(e) { this.setData({ commentText: e.detail.value }) },
  replyToComment: function(e) { this.setData({ replyTo: e.currentTarget.dataset.name }) },
  sendComment: function() {
    var that = this, text = this.data.commentText.trim(); if (!text) return
    var u = wx.getStorageSync('userInfo') || {}, dp = this.data.detailPost
    var c = { text: text, userName: u.nickName||'钓鱼人', replyTo: this.data.replyTo||'', createTime: new Date().toISOString() }
    dp.comments = dp.comments || []; dp.comments.push(Object.assign({}, c, {timeAgo: '刚刚'}))
    this.setData({ detailPost: dp, commentText: '', replyTo: '' })
    if (dp._id && dp._id.indexOf('local_') !== 0) CDB.addComment(dp._id, c)
  },

  // ---- Photo / Location ----
  previewPhoto: function(e) { var s = e.currentTarget.dataset.src; if (s) wx.previewImage({urls:[s],current:s}) },
  openLocation: function(e) {
    var p = this.data.detailPost
    if (p && p.spotLat) wx.openLocation({ latitude: p.spotLat, longitude: p.spotLon, name: p.spot, scale: 16 })
    else if (p && p.spot) wx.showToast({ title: '未保存位置坐标', icon: 'none' })
  },

  // ---- Delete ----
  delDetailPost: function(e) {
    var that = this, p = this.data.posts[this.data.detailIdx]
    wx.showModal({ title: '删除？', success: function(r) {
      if (!r.confirm) return
      if (p._id && p._id.indexOf('local_') !== 0) CDB.removePost(p._id, function() { that.closeDetail() })
      else { var lp = wx.getStorageSync('circle_posts')||[]; var ri = lp.length-1-that.data.detailIdx; if(ri>=0) lp.splice(ri,1); wx.setStorageSync('circle_posts',lp); that.closeDetail() }
    }})
  },
  editDetailPost: function() {
    var that = this, p = this.data.detailPost
    wx.showModal({ title: '编辑', editable: true, placeholderText: '鱼种、重量、钓点、描述', content: [p.fishType, p.weight?p.weight+'斤':'', p.spot, p.note].filter(Boolean).join(' | '),
      success: function(r) {
        if (!r.confirm || !r.content) return
        var parts = r.content.split('|').map(function(s){return s.trim()})
        var data = { fishType: parts[0]||'', weight: parts[1]?parts[1].replace('斤',''):'', spot: parts[2]||'', note: parts[3]||'' }
        if (p._id && p._id.indexOf('local_') !== 0) CDB.updatePost(p._id, data, function() { that.closeDetail() })
        else { var lp = wx.getStorageSync('circle_posts')||[]; var ri = lp.length-1-that.data.detailIdx; if(ri>=0) Object.assign(lp[ri], data); wx.setStorageSync('circle_posts',lp); that.closeDetail() }
      }
    })
  }
})
