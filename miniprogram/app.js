App({
  onLaunch: function() {
    if (wx.cloud) {
      wx.cloud.init({ env: 'cloudbase-d1gq1v8xl0c056a2a', traceUser: true })
      // Call cloud function to init DB
      var created = wx.getStorageSync('_cloud_cols_created')
      if (!created) {
        wx.cloud.callFunction({
          name: 'initDB',
          success: function(res) {
            console.log('initDB result:', res)
            wx.setStorageSync('_cloud_cols_created', true)
          },
          fail: function(err) { console.log('initDB error:', err) }
        })
      }
    }
  }
})
