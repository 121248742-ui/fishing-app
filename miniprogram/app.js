App({
  onLaunch: function() {
    if (wx.cloud) {
      wx.cloud.init({ env: 'cloudbase-d1gq1v8xl0c056a2a', traceUser: true })
      // Create collections on first launch
      this._initCloudDB()
    }
  },
  _initCloudDB: function() {
    var db = wx.cloud.database()
    var cols = ['posts', 'comments', 'likes', 'atlas']
    var created = wx.getStorageSync('_cloud_cols_created')
    if (created) return
    cols.forEach(function(name) {
      db.createCollection(name).then(function() {
        console.log('Collection created: ' + name)
      }).catch(function(e) {
        console.log('Collection ' + name + ': ' + (e.errCode === -1 ? 'exists' : e.message))
      })
    })
    wx.setStorageSync('_cloud_cols_created', true)
  }
})
