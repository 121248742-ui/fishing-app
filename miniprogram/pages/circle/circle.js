Page({
  data: { posts: [] },
  onShow: function() {
    var posts = wx.getStorageSync('circle_posts') || []
    this.setData({ posts: posts.reverse() })
  },
  openPost: function() {
    wx.showToast({ title: '请用完整版分享', icon: 'none' })
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
