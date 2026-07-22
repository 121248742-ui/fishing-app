var F = require('../../utils/fish-data')
var ALL_FISH = F.FISH_SPECIES

var WEATHER_CODES = {
  0: { icon: '☀️', desc: '晴' }, 1: { icon: '🌤', desc: '大部晴' },
  2: { icon: '⛅', desc: '多云' }, 3: { icon: '☁️', desc: '阴' },
  45: { icon: '🌫', desc: '雾' }, 48: { icon: '🌫', desc: '雾凇' },
  51: { icon: '🌦', desc: '毛毛雨' }, 53: { icon: '🌦', desc: '毛毛雨' }, 55: { icon: '🌧', desc: '大毛毛雨' },
  61: { icon: '🌧', desc: '小雨' }, 63: { icon: '🌧', desc: '中雨' }, 65: { icon: '🌧', desc: '大雨' },
  71: { icon: '🌨', desc: '小雪' }, 73: { icon: '🌨', desc: '中雪' }, 75: { icon: '❄️', desc: '大雪' },
  80: { icon: '🌦', desc: '阵雨' }, 81: { icon: '🌧', desc: '中阵雨' }, 82: { icon: '⛈', desc: '大阵雨' },
  95: { icon: '⛈', desc: '雷暴' }, 96: { icon: '⛈', desc: '雷暴+冰雹' }, 99: { icon: '⛈', desc: '强雷暴' }
}

Page({
  data: {
    spots: [], activeSpot: null, activeFish: null,
    weather: null, forecast: [], score: 0, advice: [], loading: false,
    fishList: [], fishIdx: -1, fishScore: 0
  },
  onShow: function() {
    var spots = wx.getStorageSync('weather_spots') || []
    var activeIdx = wx.getStorageSync('weather_active_spot')
    var activeSpot = (activeIdx !== undefined && spots[activeIdx]) ? spots[activeIdx] : (spots[0] || null)
    var fishIdx = wx.getStorageSync('weather_fish_idx') || 0
    var fishList = ALL_FISH.map(function(f) { return f.name })
    this.setData({ spots: spots, activeSpot: activeSpot, fishList: fishList, fishIdx: fishIdx })
    if (activeSpot) {
      this.fetchWeather(activeSpot)
    }
  },
  selectSpot: function(e) {
    var idx = e.currentTarget.dataset.idx
    var spot = this.data.spots[idx]
    wx.setStorageSync('weather_active_spot', idx)
    this.setData({ activeSpot: spot })
    this.fetchWeather(spot)
  },
  removeSpot: function(e) {
    var that = this
    wx.showModal({
      title: '删除钓点',
      content: '确定删除「' + that.data.spots[e.currentTarget.dataset.idx].name + '」？',
      success: function(res) {
        if (!res.confirm) return
        var spots = that.data.spots
        spots.splice(e.currentTarget.dataset.idx, 1)
        wx.setStorageSync('weather_spots', spots)
        that.onShow()
      }
    })
  },
  addSpot: function() {
    var that = this
    wx.chooseLocation({
      success: function(res) {
        if (!res.name) return
        var spots = wx.getStorageSync('weather_spots') || []
        for (var i = 0; i < spots.length; i++) {
          if (spots[i].name === res.name) { wx.showToast({ title: '钓点已存在', icon: 'none' }); return }
        }
        spots.push({ name: res.name, address: res.address || '', lat: res.latitude, lon: res.longitude })
        wx.setStorageSync('weather_spots', spots)
        wx.setStorageSync('weather_active_spot', spots.length - 1)
        that.onShow()
      }
    })
  },
  onFishChange: function(e) {
    var idx = parseInt(e.detail.value)
    wx.setStorageSync('weather_fish_idx', idx)
    this.calcFishScore(idx)
  },
  calcFishScore: function(idx) {
    if (!this._weatherData) return
    var f = ALL_FISH[idx]
    if (!f) return
    var w = this._weatherData
    var month = new Date().getMonth() + 1
    var base = 50
    // Active month bonus
    if (f.peakMonths && f.peakMonths.indexOf(month) !== -1) base += 30
    else if (f.months && f.months.indexOf(month) !== -1) base += 15
    else base -= 20
    // Temperature match
    if (w.temp >= 20 && w.temp <= 30) base += 5
    else if (w.temp > 35 || w.temp < 5) base -= 15
    // Pressure match
    if (w.pressure >= 1010) { if (f.type.indexOf('底层') !== -1 || f.type.indexOf('下层') !== -1) base += 10 }
    else if (w.pressure < 1000) { if (f.type.indexOf('上层') !== -1) base += 8 }
    // Humidity
    if (w.humidity < 85) base += 5
    var fishScore = Math.min(98, Math.max(10, base))
    this.setData({ activeFish: f, fishIdx: idx, fishScore: fishScore })
  },
  fetchWeather: function(spot) {
    var that = this
    that.setData({ loading: true })
    wx.request({
      url: 'https://api.open-meteo.com/v1/forecast',
      data: {
        latitude: spot.lat.toFixed(2), longitude: spot.lon.toFixed(2),
        current: 'temperature_2m,relative_humidity_2m,pressure_msl,wind_speed_10m,wind_direction_10m,weather_code',
        daily: 'temperature_2m_max,temperature_2m_min,weather_code',
        timezone: 'Asia/Shanghai', forecast_days: 3
      },
      success: function(res) {
        var d = res.data; var cur = d.current || {}; var daily = d.daily || {}
        var wc = cur.weather_code || 0
        var wi = WEATHER_CODES[wc] || { icon: '🌤', desc: '晴' }
        var dirs = ['北','东北','东','东南','南','西南','西','西北']
        var dirIdx = Math.round((cur.wind_direction_10m || 0) / 45) % 8
        var windStr = dirs[dirIdx] + '风 ' + (cur.wind_speed_10m || 0).toFixed(0) + '级'
        var weather = {
          temp: Math.round(cur.temperature_2m || 20),
          humidity: cur.relative_humidity_2m || 60,
          pressure: Math.round(cur.pressure_msl || 1013),
          wind: windStr, icon: wi.icon, desc: wi.desc
        }
        var forecast = []
        for (var i = 0; i < 3; i++) {
          var fc = daily.weather_code ? daily.weather_code[i] : 0
          var fwi = WEATHER_CODES[fc] || { icon: '🌤', desc: '晴' }
          forecast.push({
            day: ['今天','明天','后天'][i],
            hi: Math.round(daily.temperature_2m_max ? daily.temperature_2m_max[i] : 25),
            lo: Math.round(daily.temperature_2m_min ? daily.temperature_2m_min[i] : 15),
            icon: fwi.icon
          })
        }
        var isGood = weather.pressure >= 1005 && weather.humidity < 85
        var score = isGood ? 85 : (weather.pressure >= 995 ? 60 : 30)
        score = Math.min(98, Math.max(10, Math.round(score + (weather.temp >= 15 && weather.temp <= 30 ? 5 : -5))))
        var advice = []
        if (score >= 80) {
          advice.push('✅ 气压适宜，鱼口活跃，强烈推荐出钓')
          advice.push('⏰ 黄金窗口：早晨5-9点、傍晚5-8点')
        } else if (score >= 55) {
          advice.push('🤔 天气条件一般，可选择出钓')
          advice.push('💡 建议钓深水或入水口等溶氧高的位置')
        } else {
          advice.push('❌ 天气不太理想，鱼口可能不佳')
          advice.push('💡 建议钓浮或选择活水区域')
        }

        that._weatherData = weather
        that.setData({ weather: weather, forecast: forecast, score: score, advice: advice, loading: false })
        that.calcFishScore(that.data.fishIdx)
      },
      fail: function() {
        that.setData({ loading: false })
        var base = Math.abs(Math.round(spot.lat * 10)) % 5
        var t = [[30,22],[28,20],[32,24],[26,19],[29,23]][base]
        var icons = ['☀️','⛅','🌤','🌧','🌦']
        var winds = ['东南风 2级','北风 3级','西南风 2级','东风 1级','西北风 3级']
        var weather = { temp: t[0], humidity: 60+base*8, pressure: 998+base*4, wind: winds[base], icon: icons[base], desc: ['晴','多云','晴间多云','小雨','阵雨'][base] }
        var forecast = [
          { day:'今天', hi:t[0]+3, lo:t[1], icon:icons[base] },
          { day:'明天', hi:t[0]+1, lo:t[1]-1, icon:icons[(base+1)%5] },
          { day:'后天', hi:t[0]+2, lo:t[1]+1, icon:icons[(base+2)%5] }
        ]
        var isGood = weather.pressure >= 1005
        var score = isGood ? 85 : (weather.pressure >= 995 ? 60 : 30)
        var advice = []
        if (isGood) { advice.push('✅ 天气条件优良', '⏰ 黄金窗口：早晨5-9点、傍晚5-8点') }
        else if (score >= 60) { advice.push('🤔 天气条件一般，可选择出钓') }
        else { advice.push('❌ 天气不太理想') }
        that._weatherData = weather
        that.setData({ weather: weather, forecast: forecast, score: Math.min(98,Math.round(score)), advice: advice, loading: false })
        that.calcFishScore(that.data.fishIdx)
        wx.showToast({ title: '使用模拟数据', icon: 'none', duration: 2000 })
      }
    })
  }
})
