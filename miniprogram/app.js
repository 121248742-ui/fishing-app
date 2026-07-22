App({
  onLaunch: function() {
    // Register privacy agreement if needed
    if (wx.getPrivacySetting) {
      wx.getPrivacySetting({
        success: function(res) {
          if (res.needAuthorization) {
            // Will show privacy popup when privacy API is called
          }
        }
      })
    }
  }
})
