var F = require('../../utils/fish-data')
var CDB = require('../../utils/cloud-db')
var all = F.FISH_SPECIES

Page({
  data: {
    unlocked: [], locked: [], unlockedCount: 0, totalCount: 0,
    userInfo: null, hasLogin: false, tempAvatar: '', tempNickname: '',
    subPage: '', sharePct: 0
  },
  onShow: function() {
    var that = this, u = wx.getStorageSync('userInfo')
    var hasLogin = !!(u && u.code), uid = u ? u.code : 'local'
    var atlas = wx.getStorageSync('fish_atlas') || {}
    var unlocked = [], locked = []
    all.forEach(function(f) { var rec = atlas[f.id]; rec && rec.unlocked ? unlocked.push(f) : locked.push(f) })
    that.setData({
      unlocked: unlocked, locked: locked,
      unlockedCount: unlocked.length, totalCount: all.length,
      userInfo: u, hasLogin: hasLogin
    })
    if (uid !== 'local') CDB.getAtlas(uid, function(ca) { if (Object.keys(ca).length) wx.setStorageSync('fish_atlas',ca) })
  },

  openSubPage: function(e) {
    var page = e.currentTarget.dataset.page
    if (page === 'share') {
      wx.showShareMenu({ withShareTicket: true, menus: ['shareAppMessage','shareTimeline'] })
      this.setData({ sharePct: this.data.totalCount ? Math.round(this.data.unlockedCount/this.data.totalCount*100) : 0 })
    }
    this.setData({ subPage: page })
  },
  closeSubPage: function() { this.setData({ subPage: '' }) },
  goDetail: function(e) { wx.navigateTo({ url: '/pages/detail/detail?id='+e.currentTarget.dataset.id }) },

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

  // Share
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
