var F = require('../../utils/fish-data')

Page({
  data: { fish: {} },
  onLoad: function(opts) {
    var f = F.FISH_SPECIES.find(function(x) { return x.id === parseInt(opts.id) })
    if (!f) return
    var dietClass = f.diet.indexOf('肉食') !== -1 ? 'tag-red' :
                    f.diet.indexOf('草食') !== -1 ? 'tag-green' :
                    f.diet.indexOf('滤食') !== -1 ? 'tag-blue' : 'tag-orange'
    this.setData({
      fish: Object.assign({}, f, {
        rarityStars: F.starStr(f.rarity),
        diffDots: F.diffStr(f.difficulty),
        dietClass: dietClass
      })
    })
    wx.setNavigationBarTitle({ title: f.name })
  }
})
