var CDB = require('../../utils/cloud-db')
var FAMOUS = require('../../utils/fishing-spots').FAMOUS_SPOTS

// Build complete spots list
function buildAllSpots(cb) {
  var all = FAMOUS.map(function(s, i) {
    return { _id:'f_'+i, name:s.name, address:s.address||'', desc:s.desc||'', latitude:s.latitude, longitude:s.longitude, type:'public', userName:'钓鱼助手' }
  })
  var spotNames = {}
  all.forEach(function(s) { spotNames[s.name] = true })
  var localSpots = wx.getStorageSync('weather_spots') || []
  localSpots.forEach(function(s, i) {
    if (!spotNames[s.name]) {
      spotNames[s.name] = true
      all.push({ _id:'l_'+i, name:s.name, address:s.address||'', latitude:s.lat, longitude:s.lon, type:'personal', userName:'我的钓点' })
    }
  })
  cb(all, spotNames)
  // Merge cloud spots async
  CDB.getAllUserSpots(function(docs) {
    var added = false
    ;(docs || []).forEach(function(doc) {
      ;(doc.spots || []).forEach(function(s) {
        if (!spotNames[s.name]) {
          spotNames[s.name] = true
          all.push({ _id:'u_'+Date.now()+'_'+s.name, name:s.name, address:s.address||'', latitude:s.lat, longitude:s.lon, type:'personal', userName:'钓友' })
          added = true
        }
      })
    })
    if (added) cb(all, spotNames)
  })
}

// Filter spots by visible region + max count
function filterByRegion(spots, region, maxCount) {
  var latMin = region.southwest.latitude || region.southwest.lat || -90
  var latMax = region.northeast.latitude || region.northeast.lat || 90
  var lngMin = region.southwest.longitude || region.southwest.lng || -180
  var lngMax = region.northeast.longitude || region.northeast.lng || 180

  var visible = spots.filter(function(s) {
    return s.latitude >= latMin && s.latitude <= latMax && s.longitude >= lngMin && s.longitude <= lngMax
  })
  if (visible.length <= maxCount) return visible
  // Prioritize: personal spots first, then famous
  var personal = [], famous = []
  visible.forEach(function(s) {
    if (s.type === 'personal') personal.push(s); else famous.push(s)
  })
  var result = personal.slice(0, Math.ceil(maxCount/3))
  var remain = maxCount - result.length
  result = result.concat(famous.slice(0, remain))
  return result
}

Page({
  data: {
    latitude: 35, longitude: 108, scale: 5,
    markers: [], spots: [], allSpots: [],
    showPanel: false, selectedSpot: null
  },
  onReady: function() {
    this.mapCtx = wx.createMapContext('fishingMap')
    var that = this
    buildAllSpots(function(all) {
      that.setData({ allSpots: all })
      that._allLoaded = true
      // Show initial batch
      var visible = all.slice(0, 30)
      that.renderMarkers(visible)
    })
  },
  onShow: function() {
    if (this._allLoaded) {
      var that = this
      buildAllSpots(function(all) {
        that.setData({ allSpots: all })
        that.refreshVisible()
      })
    }
  },

  renderMarkers: function(spots) {
    var markers = spots.map(function(s, i) {
      return {
        id: i,
        latitude: s.latitude, longitude: s.longitude,
        title: s.name,
        iconPath: '/images/marker_me.png',
        width: 20, height: 20
      }
    })
    this.setData({ markers: markers })
  },

  refreshVisible: function() {
    if (!this._region || !this.data.allSpots.length) return
    var scale = this._region.scale || 5
    var maxCount = scale >= 14 ? 60 : (scale >= 10 ? 40 : (scale >= 7 ? 25 : 15))
    var visible = filterByRegion(this.data.allSpots, this._region, maxCount)
    this.renderMarkers(visible)
    this.setData({ spots: visible })
  },

  onRegionChange: function(e) {
    if (e.type === 'end') {
      this._region = e.detail
      this.refreshVisible()
    }
  },

  onMarkerTap: function(e) {
    var s = this.data.spots[e.detail.markerId]
    if (s) this.setData({ selectedSpot: s, showPanel: true })
  },

  closePanel: function() { this.setData({ showPanel: false, selectedSpot: null }) },
  goSpot: function() {
    var s = this.data.selectedSpot
    if (s) wx.openLocation({ latitude: s.latitude, longitude: s.longitude, name: s.name, scale: 16 })
  },

  locateMe: function() {
    var that = this
    wx.getLocation({ type: 'gcj02', success: function(r) {
      that.setData({ latitude: r.latitude, longitude: r.longitude, scale: 14 })
    }})
  },

  onShareAppMessage: function() {
    return { title: '🎣 全国钓点地图', path: '/pages/map/map' }
  }
})
