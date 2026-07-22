App({
  onLaunch: function() {
    // Init cloud
    if (wx.cloud) {
      wx.cloud.init({ env: 'cloudbase-d1gq1v8xl0c056a2a', traceUser: true })
    }
  }
})
