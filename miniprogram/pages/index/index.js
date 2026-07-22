var F = require('../../utils/fish-data')
var all = F.FISH_SPECIES

Page({
  data: { list: [], keyword: '' },
  onLoad: function() { this.buildList('') },
  onShow: function() { this.buildList(this.data.keyword) },
  onSearch: function(e) { this.buildList(e.detail.value) },
  buildList: function(kw) {
    var filtered = kw ? all.filter(function(f) {
      return f.name.indexOf(kw) !== -1 || f.type.indexOf(kw) !== -1
    }) : all
    var list = filtered.map(function(f, i) {
      return {
        id: f.id, name: f.name, image: f.image, type: f.type, diet: f.diet,
        rarityStars: F.starStr(f.rarity), diffDots: F.diffStr(f.difficulty),
        habitatShort: (f.habitat || '').substring(0, 28),
        hot: !kw && F.HOT_FISH.indexOf(f.name) !== -1,
        bgIdx: (f.id % 6) + 1
      }
    })
    this.setData({ list: list, keyword: kw })
  },
  goDetail: function(e) {
    wx.navigateTo({ url: '/pages/detail/detail?id=' + e.currentTarget.dataset.id })
  }
})
