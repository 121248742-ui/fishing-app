App({
  onLaunch: function() {
    // Init cloud
    if (wx.cloud) {
      wx.cloud.init({ env: 'cloud1-5g7p2gkseb26e491', traceUser: true })
    }
  }
})
