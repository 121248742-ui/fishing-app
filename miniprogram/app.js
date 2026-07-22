App({
  onLaunch: function() {
    if (wx.cloud) {
      wx.cloud.init({ env: 'cloudbase-d1gq1v8xl0c056a2a', traceUser: true })
      // Clear all local posts (one-time cleanup)
      wx.removeStorageSync('circle_posts')
      wx.removeStorageSync('fish_atlas')
      wx.removeStorageSync('weather_spots')
      wx.removeStorageSync('weather_active_spot')
      wx.removeStorageSync('weather_fish_idx')
      wx.removeStorageSync('userInfo')
      wx.removeStorageSync('_cloud_cols_created')
    }
  }
})
