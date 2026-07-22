Page({
  data: { posts: [], photo: '', fishType: '', weight: '', spot: '', note: '' },
  onShow: function() {
    var posts = wx.getStorageSync('circle_posts') || []
    this.setData({ posts: posts.reverse(), photo: '', fishType: '', weight: '', spot: '', note: '' })
  },
  onInput: function(e) {
    var d = {}; d[e.currentTarget.dataset.field] = e.detail.value
    this.setData(d)
  },
  choosePhoto: function() {
    var that = this
    wx.chooseMedia({
      count: 1, mediaType: ['image'], sourceType: ['album', 'camera'],
      success: function(res) {
        that.setData({ photo: res.tempFiles[0].tempFilePath })
      }
    })
  },
  publish: function() {
    var d = this.data
    if (!d.photo && !d.fishType) {
      wx.showToast({ title: '至少上传照片或填写鱼种', icon: 'none' })
      return
    }
    var posts = wx.getStorageSync('circle_posts') || []
    posts.push({
      photo: d.photo, fishType: d.fishType, weight: d.weight,
      spot: d.spot, note: d.note,
      time: new Date().toLocaleString('zh-CN')
    })
    wx.setStorageSync('circle_posts', posts)
    this.onShow()
  },
  delPost: function(e) {
    var that = this
    wx.showModal({
      title: '删除这条分享？',
      success: function(res) {
        if (!res.confirm) return
        var posts = wx.getStorageSync('circle_posts') || []
        posts.splice(posts.length - 1 - e.currentTarget.dataset.idx, 1)
        wx.setStorageSync('circle_posts', posts)
        that.onShow()
      }
    })
  }
})
