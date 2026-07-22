var F = require('../../utils/fish-data')
var CDB = require('../../utils/cloud-db')
var all = F.FISH_SPECIES

Page({
  data: {
    unlocked: [], locked: [], unlockedCount: 0, totalCount: 0,
    userInfo: null, hasLogin: false, tempAvatar: '', tempNickname: '',
    myPosts: [], postCount: 0, totalLikes: 0, allComments: 0,
    subPage: '', noLikedPosts: false, newLikes: 0, newComments: 0,
    viewPost: null, viewPostIdx: -1, editing: false,
    editFishType: '', editWeight: '', editSpot: '', editNote: '', editPhoto: '',
    commentText: '', replyTo: ''
  },
  onShow: function() {
    var that = this
    var atlas = wx.getStorageSync('fish_atlas') || {}
    var userInfo = wx.getStorageSync('userInfo')
    var userId = (userInfo && userInfo.code) || 'local'

    // Try cloud atlas sync
    if (userId !== 'local') {
      CDB.getAtlas(userId, function(cloudAtlas) {
        if (Object.keys(cloudAtlas).length) {
          wx.setStorageSync('fish_atlas', cloudAtlas)
          that._renderAtlas(cloudAtlas, userInfo)
        } else {
          that._renderAtlas(atlas, userInfo)
        }
      }, function() { that._renderAtlas(atlas, userInfo) })
    } else {
      this._renderAtlas(atlas, userInfo)
    }
  },
  _renderAtlas: function(atlas, userInfo) {
    var unlocked = [], locked = []
    all.forEach(function(f) {
      var rec = atlas[f.id]; rec && rec.unlocked ? unlocked.push(f) : locked.push(f)
    })
    var userInfo = wx.getStorageSync('userInfo')
    var hasLogin = !!(userInfo && userInfo.code)

    var that = this
    var localPosts = wx.getStorageSync('circle_posts') || []

    // Helper to render posts
    function renderPosts(allPosts) {
      var myPosts = allPosts.slice().reverse()
      myPosts = myPosts.map(function(p) {
        p.timeAgo = that._fmt(p.createTime || p.time)
        if (p.comments) p.comments.forEach(function(c) { c.timeAgo = that._fmt(c.createTime || c.time) })
        return p
      })
      var totalLikes = allPosts.reduce(function(s, p) { return s + (p.likes || 0) }, 0)
      var allComments = allPosts.reduce(function(s, p) { return s + (p.comments ? p.comments.length : 0) }, 0)
      var lastSeen = wx.getStorageSync('notify_seen') || { likes: 0, comments: 0 }
      var newLikes = Math.max(0, totalLikes - lastSeen.likes)
      var newComments = Math.max(0, allComments - lastSeen.comments)
      that.setData({
        unlocked: unlocked, locked: locked,
        unlockedCount: unlocked.length, totalCount: all.length,
        userInfo: userInfo, hasLogin: hasLogin,
        myPosts: myPosts, postCount: allPosts.length, totalLikes: totalLikes,
        allComments: allComments, newLikes: newLikes, newComments: newComments,
        noLikedPosts: myPosts.every(function(p) { return !p.likes })
      })
    }

    // Try cloud first
    CDB.getPosts(
      function(cloudPosts) {
        if (cloudPosts.length > 0) {
          renderPosts(cloudPosts)
        } else {
          renderPosts(localPosts)
        }
      },
      function() { renderPosts(localPosts) }
    )
  },
  _fmt: function(ts) {
    if (!ts) return ''; var then = new Date(ts).getTime(); if (isNaN(then)) return ts
    var diff = Date.now() - then
    if (diff < 60000) return '刚刚'
    if (diff < 3600000) return Math.floor(diff/60000) + '分钟前'
    if (diff < 86400000) return Math.floor(diff/3600000) + '小时前'
    if (diff < 604800000) return Math.floor(diff/86400000) + '天前'
    return ts.substring(0,10)
  },

  openSubPage: function(e) {
    var page = e.currentTarget.dataset.page
    if (page === 'share') {
      wx.showShareMenu({ withShareTicket: true, menus: ['shareAppMessage', 'shareTimeline'] })
    }
    if (page === 'likes') {
      var ap = wx.getStorageSync('circle_posts') || []
      var likes = ap.reduce(function(s,p){return s+(p.likes||0)},0)
      var comments = ap.reduce(function(s,p){return s+(p.comments?p.comments.length:0)},0)
      wx.setStorageSync('notify_seen', {likes:likes, comments:comments})
      this.setData({newLikes:0, newComments:0})
    }
    this.setData({subPage: page})
  },
  closeSubPage: function() { this.setData({subPage: ''}) },
  goDetail: function(e) { wx.navigateTo({url:'/pages/detail/detail?id='+e.currentTarget.dataset.id}) },

  // My Post Detail
  openMyPost: function(e) {
    var idx = e.currentTarget.dataset.idx
    var post = Object.assign({}, this.data.myPosts[idx], {comments: (this.data.myPosts[idx].comments||[]).slice()})
    this.setData({viewPost: post, viewPostIdx: idx, editing: false, commentText: '', replyTo: ''})
  },
  closeViewPost: function() { this.setData({viewPost: null, viewPostIdx: -1, editing: false}); this.onShow() },
  startEditMyPost: function(e) {
    var idx = e.currentTarget.dataset.idx
    var post = Object.assign({}, this.data.myPosts[idx], {comments: (this.data.myPosts[idx].comments||[]).slice()})
    this.setData({
      viewPost: post, viewPostIdx: idx, editing: true,
      editFishType: post.fishType||'', editWeight: post.weight||'',
      editSpot: post.spot||'', editNote: post.note||'', editPhoto: ''
    })
  },
  startEdit: function() {
    var p = this.data.viewPost
    this.setData({
      editing: true, editFishType: p.fishType||'', editWeight: p.weight||'',
      editSpot: p.spot||'', editNote: p.note||'', editPhoto: ''
    })
  },
  onEditInput: function(e) { var d={}; d[e.currentTarget.dataset.field]=e.detail.value; this.setData(d) },
  editChoosePhoto: function() {
    var that = this
    wx.chooseMedia({count:1, mediaType:['image'], sourceType:['album','camera'], sizeType:['compressed'],
      success: function(res) { that.setData({editPhoto: res.tempFiles[0].tempFilePath}) },
      fail: function() {
        wx.chooseImage({count:1, sizeType:['compressed'], sourceType:['album','camera'],
          success: function(r) { that.setData({editPhoto: r.tempFilePaths[0]}) }
        })
      }
    })
  },
  saveEdit: function() {
    var d = this.data; var idx = d.viewPostIdx
    var posts = wx.getStorageSync('circle_posts') || []
    var realIdx = posts.length - 1 - idx
    if (realIdx < 0 || realIdx >= posts.length) return
    posts[realIdx].fishType = d.editFishType
    posts[realIdx].weight = d.editWeight
    posts[realIdx].spot = d.editSpot
    posts[realIdx].note = d.editNote
    if (d.editPhoto) posts[realIdx].photo = d.editPhoto
    wx.setStorageSync('circle_posts', posts)
    this.closeViewPost()
    wx.showToast({title:'已保存', icon:'success'})
  },

  // Comment + Reply
  replyToComment: function(e) {
    this.setData({replyTo: e.currentTarget.dataset.name})
  },
  onCommentInput: function(e) { this.setData({commentText: e.detail.value}) },
  sendMyComment: function() {
    var that = this; var text = this.data.commentText.trim(); if (!text) return
    var userInfo = wx.getStorageSync('userInfo') || {}
    var posts = wx.getStorageSync('circle_posts') || []
    var realIdx = posts.length - 1 - this.data.viewPostIdx
    if (realIdx < 0 || realIdx >= posts.length) return
    var comment = {
      text: text, userName: userInfo.nickName || '钓鱼人',
      replyTo: this.data.replyTo || '',
      time: new Date().toISOString()
    }
    posts[realIdx].comments = posts[realIdx].comments || []
    posts[realIdx].comments.push(comment)
    wx.setStorageSync('circle_posts', posts)
    var vp = this.data.viewPost
    vp.comments = vp.comments || []
    vp.comments.push(Object.assign({}, comment, {timeAgo: '刚刚'}))
    this.setData({viewPost: vp, commentText: '', replyTo: ''})
  },

  // Delete
  delMyPost: function(e) {
    var that = this; var idx = e.currentTarget.dataset.idx
    wx.showModal({title:'删除这条帖子？', success:function(res) {
      if (!res.confirm) return
      var posts = wx.getStorageSync('circle_posts') || []
      var realIdx = posts.length - 1 - idx
      var p = posts[realIdx]
      if (p && p.photo && p.photo.indexOf(wx.env.USER_DATA_PATH)===0) {
        try { wx.getFileSystemManager().unlinkSync(p.photo) } catch(e) {}
      }
      posts.splice(realIdx, 1)
      wx.setStorageSync('circle_posts', posts)
      that.closeViewPost()
    }})
  },

  // Login
  onChooseAvatar: function(e) {
    var that = this
    var sp = wx.env.USER_DATA_PATH + '/avatar.png'
    try { wx.getFileSystemManager().copyFileSync(e.detail.avatarUrl, sp) } catch(e) {}
    that.setData({ tempAvatar: sp })
  },
  pickAvatar: function() {
    var that = this
    wx.chooseMedia({
      count: 1, mediaType: ['image'], sourceType: ['album', 'camera'], sizeType: ['compressed'],
      success: function(res) {
        var sp = wx.env.USER_DATA_PATH + '/avatar.png'
        try { wx.getFileSystemManager().copyFileSync(res.tempFiles[0].tempFilePath, sp) } catch(e) {}
        that.setData({ tempAvatar: sp })
      },
      fail: function() {
        wx.chooseImage({
          count: 1, sizeType: ['compressed'], sourceType: ['album', 'camera'],
          success: function(r) {
            var sp = wx.env.USER_DATA_PATH + '/avatar.png'
            try { wx.getFileSystemManager().copyFileSync(r.tempFilePaths[0], sp) } catch(e) {}
            that.setData({ tempAvatar: sp })
          }
        })
      }
    })
  },
  onNicknameInput: function(e) { this.setData({tempNickname: e.detail.value}) },
  doLogin: function() {
    var that=this; var a=this.data.tempAvatar; var n=this.data.tempNickname
    if(!n){ wx.showToast({title:'请先获取微信昵称',icon:'none'}); return }
    if(!a){ wx.showToast({title:'请先获取头像',icon:'none'}); return }
    wx.login({success:function(r){
      if(r.code){
        wx.setStorageSync('userInfo',{avatarUrl:a,nickName:n,code:r.code,loginTime:new Date().toLocaleString('zh-CN')})
        that.setData({userInfo:{avatarUrl:a,nickName:n,code:r.code},hasLogin:true,tempAvatar:'',tempNickname:''})
        wx.showToast({title:'登录成功',icon:'success'})
      }
    }})
  },
  shareAtlas: function() {
    var pct = this.data.totalCount ? Math.round(this.data.unlockedCount/this.data.totalCount*100) : 0
    this.setData({ subPage: 'share', sharePct: pct })
  },
  onShareAppMessage: function() {
    return {
      title: '🎣 我的钓鱼图鉴 - 已解锁' + this.data.unlockedCount + '/' + this.data.totalCount + '种鱼',
      path: '/pages/atlas/atlas',
      imageUrl: this.data.unlocked.length > 0 ? this.data.unlocked[0].image : ''
    }
  },
  onShareTimeline: function() {
    return {
      title: '🎣 已解锁' + this.data.unlockedCount + '/' + this.data.totalCount + '种鱼，完成度' + Math.round(this.data.unlockedCount/this.data.totalCount*100) + '%',
      query: 'share=1'
    }
  },
  doLogout: function() {
    var that=this
    wx.showModal({title:'退出登录？',success:function(r){if(r.confirm){wx.removeStorageSync('userInfo');that.setData({userInfo:null,hasLogin:false,subPage:''})}}})
  }
})
