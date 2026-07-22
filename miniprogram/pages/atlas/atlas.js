var F = require('../../utils/fish-data')
var CDB = require('../../utils/cloud-db')
var all = F.FISH_SPECIES

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
    unlocked: [], locked: [], unlockedCount: 0, totalCount: 0,
    userInfo: null, hasLogin: false, tempAvatar: '', tempNickname: '',
    myPosts: [], postCount: 0, totalLikes: 0, allComments: 0,
    subPage: '', newLikes: 0, newComments: 0,
    viewPost: null, viewPostIdx: -1, editing: false,
    editFishType: '', editWeight: '', editSpot: '', editNote: '', editPhoto: '',
    commentText: '', replyTo: ''
  },
  onShow: function() {
    var that = this, u = wx.getStorageSync('userInfo')
    var hasLogin = !!(u && u.code), uid = u ? u.code : 'local'
    var atlas = wx.getStorageSync('fish_atlas') || {}
    var unlocked = [], locked = []
    all.forEach(function(f) { var rec = atlas[f.id]; rec && rec.unlocked ? unlocked.push(f) : locked.push(f) })

    // Load posts from cloud for stats
    CDB.getPosts(function(list) {
      var myPosts = list.map(function(p) {
        p.timeAgo = fmtTime(p.createTime)
        if (p.comments) p.comments.forEach(function(c) { c.timeAgo = fmtTime(c.createTime) })
        return p
      })
      var totalLikes = list.reduce(function(s,p){return s+(p.likes||0)},0)
      var allComments = list.reduce(function(s,p){return s+(p.comments?p.comments.length:0)},0)
      var lastSeen = wx.getStorageSync('notify_seen')||{likes:0,comments:0}
      that.setData({
        unlocked: unlocked, locked: locked,
        unlockedCount: unlocked.length, totalCount: all.length,
        userInfo: u, hasLogin: hasLogin,
        myPosts: myPosts, postCount: list.length,
        totalLikes: totalLikes, allComments: allComments,
        newLikes: Math.max(0,totalLikes-lastSeen.likes),
        newComments: Math.max(0,allComments-lastSeen.comments),
        noLikedPosts: myPosts.every(function(p){return !p.likes})
      })
    }, function() {
      var lp = wx.getStorageSync('circle_posts')||[]
      var mp = lp.slice().reverse().map(function(p){p.timeAgo=fmtTime(p.createTime||p.time);return p})
      var tl = lp.reduce(function(s,p){return s+(p.likes||0)},0)
      var ac = lp.reduce(function(s,p){return s+(p.comments?p.comments.length:0)},0)
      var ls = wx.getStorageSync('notify_seen')||{likes:0,comments:0}
      that.setData({
        unlocked: unlocked, locked: locked, unlockedCount: unlocked.length, totalCount: all.length,
        userInfo: u, hasLogin: hasLogin,
        myPosts: mp, postCount: lp.length, totalLikes: tl, allComments: ac,
        newLikes: Math.max(0,tl-ls.likes), newComments: Math.max(0,ac-ls.comments),
        noLikedPosts: mp.every(function(p){return !p.likes})
      })
    })
    // Sync atlas from cloud
    if (uid !== 'local') CDB.getAtlas(uid, function(ca) { if (Object.keys(ca).length) wx.setStorageSync('fish_atlas',ca) })
  },

  openSubPage: function(e) {
    var page = e.currentTarget.dataset.page
    if (page === 'share') wx.showShareMenu({ withShareTicket: true, menus: ['shareAppMessage','shareTimeline'] })
    this.setData({ subPage: page })
  },
  closeSubPage: function() { this.setData({ subPage: '' }) },
  goDetail: function(e) { wx.navigateTo({ url: '/pages/detail/detail?id='+e.currentTarget.dataset.id }) },

  // My Posts
  openMyPost: function(e) {
    var p = Object.assign({}, this.data.myPosts[e.currentTarget.dataset.idx])
    p.comments = (p.comments||[]).slice()
    this.setData({ viewPost: p, viewPostIdx: e.currentTarget.dataset.idx, editing: false, commentText: '', replyTo: '' })
  },
  closeViewPost: function() { this.setData({ viewPost: null }); this.onShow() },
  startEditMyPost: function(e) {
    var p = Object.assign({}, this.data.myPosts[e.currentTarget.dataset.idx])
    this.setData({ viewPost: p, viewPostIdx: e.currentTarget.dataset.idx, editing: true,
      editFishType: p.fishType||'', editWeight: p.weight||'', editSpot: p.spot||'', editNote: p.note||'', editPhoto: '' })
  },
  startEdit: function() {
    var p = this.data.viewPost
    this.setData({ editing: true, editFishType: p.fishType||'', editWeight: p.weight||'', editSpot: p.spot||'', editNote: p.note||'', editPhoto: '' })
  },
  onEditInput: function(e) { var d={}; d[e.currentTarget.dataset.field]=e.detail.value; this.setData(d) },
  editChoosePhoto: function() {
    var that = this
    wx.chooseMedia({count:1,mediaType:['image'],sourceType:['album','camera'],sizeType:['compressed'],
      success:function(r){that.setData({editPhoto:r.tempFiles[0].tempFilePath})},
      fail:function(){wx.chooseImage({count:1,sizeType:['compressed'],sourceType:['album','camera'],success:function(r){that.setData({editPhoto:r.tempFilePaths[0]})}})}
    })
  },
  saveEdit: function() {
    var d=this.data, idx=d.viewPostIdx, p=d.myPosts[idx]
    var data = { fishType: d.editFishType, weight: d.editWeight, spot: d.editSpot, note: d.editNote }
    if (d.editPhoto) data.photo = d.editPhoto
    if (p._id && p._id.indexOf('local_')!==0) CDB.updatePost(p._id, data, function(){ this.closeViewPost(); wx.showToast({title:'已保存',icon:'success'}) }.bind(this))
    else { var lp=wx.getStorageSync('circle_posts')||[]; var ri=lp.length-1-idx; if(ri>=0)Object.assign(lp[ri],data); wx.setStorageSync('circle_posts',lp); this.closeViewPost(); wx.showToast({title:'已保存',icon:'success'}) }
  },

  // Comments
  replyToComment: function(e) { this.setData({ replyTo: e.currentTarget.dataset.name }) },
  onCommentInput: function(e) { this.setData({ commentText: e.detail.value }) },
  sendMyComment: function() {
    var that=this, text=this.data.commentText.trim(); if(!text)return
    var u=wx.getStorageSync('userInfo')||{}, vp=this.data.viewPost
    var c={text:text,userName:u.nickName||'钓鱼人',replyTo:this.data.replyTo||'',createTime:new Date().toISOString()}
    vp.comments=vp.comments||[]; vp.comments.push(Object.assign({},c,{timeAgo:'刚刚'}))
    this.setData({viewPost:vp,commentText:'',replyTo:''})
    if(vp._id&&vp._id.indexOf('local_')!==0) CDB.addComment(vp._id,c)
  },

  // Delete
  delMyPost: function(e) {
    var that=this, idx=e.currentTarget.dataset.idx, p=this.data.myPosts[idx]
    wx.showModal({title:'删除？',success:function(r){
      if(!r.confirm)return
      if(p._id&&p._id.indexOf('local_')!==0) CDB.removePost(p._id,function(){that.closeViewPost()})
      else{var lp=wx.getStorageSync('circle_posts')||[];var ri=lp.length-1-idx;if(ri>=0)lp.splice(ri,1);wx.setStorageSync('circle_posts',lp);that.closeViewPost()}
    }})
  },

  // Notifications
  markNotifRead: function() {
    var n=this.data.totalLikes,c=this.data.allComments
    wx.setStorageSync('notify_seen',{likes:n,comments:c})
    this.setData({newLikes:0,newComments:0})
    wx.showToast({title:'已标记已读',icon:'none'})
  },
  clearAllNotif: function() {
    var that=this
    wx.showModal({title:'清空所有消息？',success:function(r){
      if(!r.confirm)return
      var lp=wx.getStorageSync('circle_posts')||[]
      lp.forEach(function(p){p.likes=0;p.likedBy=[]})
      wx.setStorageSync('circle_posts',lp)
      wx.setStorageSync('notify_seen',{likes:0,comments:0})
      that.onShow()
    }})
  },
  delNotifItem: function(e) {
    var that=this,idx=e.currentTarget.dataset.idx,p=this.data.myPosts[idx]
    wx.showModal({title:'删除这条消息？',success:function(r){
      if(!r.confirm)return
      if(p._id&&p._id.indexOf('local_')!==0) CDB.updatePost(p._id,{likes:0,likedBy:[]},function(){that.onShow()})
      else{var lp=wx.getStorageSync('circle_posts')||[];var ri=lp.length-1-idx;if(ri>=0){lp[ri].likes=0;lp[ri].likedBy=[]};wx.setStorageSync('circle_posts',lp);that.onShow()}
    }})
  },

  // Login
  pickAvatar: function() {
    var that=this
    wx.chooseMedia({count:1,mediaType:['image'],sourceType:['album','camera'],sizeType:['compressed'],
      success:function(r){var sp=wx.env.USER_DATA_PATH+'/avatar.png';try{wx.getFileSystemManager().copyFileSync(r.tempFiles[0].tempFilePath,sp)}catch(e){};that.setData({tempAvatar:sp})},
      fail:function(){wx.chooseImage({count:1,sizeType:['compressed'],sourceType:['album','camera'],success:function(r){var sp=wx.env.USER_DATA_PATH+'/avatar.png';try{wx.getFileSystemManager().copyFileSync(r.tempFilePaths[0],sp)}catch(e){};that.setData({tempAvatar:sp})}})}
    })
  },
  onChooseAvatar: function(e) { var sp=wx.env.USER_DATA_PATH+'/avatar.png'; try{wx.getFileSystemManager().copyFileSync(e.detail.avatarUrl,sp)}catch(e){}; this.setData({tempAvatar:sp}) },
  onNicknameInput: function(e) { this.setData({tempNickname:e.detail.value}) },
  doLogin: function() {
    var that=this, a=this.data.tempAvatar, n=this.data.tempNickname
    if(!a){wx.showToast({title:'请先获取头像',icon:'none'});return}
    if(!n){wx.showToast({title:'请先输入昵称',icon:'none'});return}
    wx.login({success:function(r){
      if(r.code){ wx.setStorageSync('userInfo',{avatarUrl:a,nickName:n,code:r.code}); that.setData({userInfo:{avatarUrl:a,nickName:n,code:r.code},hasLogin:true,tempAvatar:'',tempNickname:''}); wx.showToast({title:'登录成功',icon:'success'}) }
    }})
  },
  shareAtlas: function() {
    var p=this.data.totalCount?Math.round(this.data.unlockedCount/this.data.totalCount*100):0
    this.setData({subPage:'share',sharePct:p})
  },
  onShareAppMessage: function() {
    return { title: '🎣 我的钓鱼图鉴 - 已解锁'+this.data.unlockedCount+'/'+this.data.totalCount+'种鱼', path: '/pages/atlas/atlas', imageUrl: this.data.unlocked.length>0?this.data.unlocked[0].image:'' }
  },
  onShareTimeline: function() {
    return { title: '🎣 已解锁'+this.data.unlockedCount+'/'+this.data.totalCount+'种鱼', query: 'share=1' }
  },
  doLogout: function() {
    var that=this
    wx.showModal({title:'退出登录？',success:function(r){if(r.confirm){wx.removeStorageSync('userInfo');that.setData({userInfo:null,hasLogin:false,subPage:''})}}})
  }
})
