var WEATHER_CODES = {
  0: { icon: '☀️', desc: '晴' },
  1: { icon: '🌤', desc: '大部晴' },
  2: { icon: '⛅', desc: '多云' },
  3: { icon: '☁️', desc: '阴' },
  45: { icon: '🌫', desc: '雾' },
  48: { icon: '🌫', desc: '雾凇' },
  51: { icon: '🌦', desc: '小毛毛雨' },
  53: { icon: '🌦', desc: '毛毛雨' },
  55: { icon: '🌧', desc: '大毛毛雨' },
  61: { icon: '🌧', desc: '小雨' },
  63: { icon: '🌧', desc: '中雨' },
  65: { icon: '🌧', desc: '大雨' },
  71: { icon: '🌨', desc: '小雪' },
  73: { icon: '🌨', desc: '中雪' },
  75: { icon: '❄️', desc: '大雪' },
  80: { icon: '🌦', desc: '阵雨' },
  81: { icon: '🌧', desc: '中阵雨' },
  82: { icon: '⛈', desc: '大阵雨' },
  95: { icon: '⛈', desc: '雷暴' },
  96: { icon: '⛈', desc: '雷暴+冰雹' },
  99: { icon: '⛈', desc: '强雷暴' }
}

Page({
  data: {
    spots: [], activeSpot: null,
    weather: null, forecast: [], score: 0, advice: [], loading: false
  },
  onShow: function() {
    var spots = wx.getStorageSync('weather_spots') || []
    var activeIdx = wx.getStorageSync('weather_active_spot')
    var activeSpot = (activeIdx !== undefined && spots[activeIdx]) ? spots[activeIdx] : (spots[0] || null)
    this.setData({ spots: spots, activeSpot: activeSpot })
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
    var idx = e.currentTarget.dataset.idx
    wx.showModal({
      title: '删除钓点',
      content: '确定删除「' + that.data.spots[idx].name + '」？',
      success: function(res) {
        if (!res.confirm) return
        var spots = that.data.spots
        spots.splice(idx, 1)
        wx.setStorageSync('weather_spots', spots)
        var activeIdx = wx.getStorageSync('weather_active_spot')
        if (activeIdx === idx) {
          wx.setStorageSync('weather_active_spot', 0)
        }
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
        // Check duplicate
        for (var i = 0; i < spots.length; i++) {
          if (spots[i].name === res.name) {
            wx.showToast({ title: '钓点已存在', icon: 'none' })
            return
          }
        }
        spots.push({
          name: res.name,
          address: res.address || '',
          lat: res.latitude,
          lon: res.longitude
        })
        wx.setStorageSync('weather_spots', spots)
        wx.setStorageSync('weather_active_spot', spots.length - 1)
        that.onShow()
        wx.showToast({ title: '钓点已添加', icon: 'success' })
      }
    })
  },
  fetchWeather: function(spot) {
    var that = this
    that.setData({ loading: true })
    wx.request({
      url: 'https://api.open-meteo.com/v1/forecast',
      data: {
        latitude: spot.lat.toFixed(2),
        longitude: spot.lon.toFixed(2),
        current: 'temperature_2m,relative_humidity_2m,pressure_msl,wind_speed_10m,wind_direction_10m,weather_code',
        daily: 'temperature_2m_max,temperature_2m_min,weather_code',
        timezone: 'Asia/Shanghai',
        forecast_days: 3
      },
      success: function(res) {
        var d = res.data
        var cur = d.current || {}
        var daily = d.daily || {}

        var wc = cur.weather_code || 0
        var wi = WEATHER_CODES[wc] || { icon: '🌤', desc: '晴' }

        // Wind direction
        var dirs = ['北', '东北', '东', '东南', '南', '西南', '西', '西北']
        var dirIdx = Math.round((cur.wind_direction_10m || 0) / 45) % 8
        var windStr = dirs[dirIdx] + '风 ' + (cur.wind_speed_10m || 0).toFixed(0) + '级'

        var weather = {
          temp: Math.round(cur.temperature_2m || 20),
          humidity: cur.relative_humidity_2m || 60,
          pressure: Math.round(cur.pressure_msl || 1013),
          wind: windStr,
          icon: wi.icon,
          desc: wi.desc
        }

        var forecast = []
        for (var i = 0; i < 3; i++) {
          var fc = daily.weather_code ? daily.weather_code[i] : 0
          var fwi = WEATHER_CODES[fc] || { icon: '🌤', desc: '晴' }
          var days = ['今天', '明天', '后天']
          forecast.push({
            day: days[i],
            hi: Math.round(daily.temperature_2m_max ? daily.temperature_2m_max[i] : 25),
            lo: Math.round(daily.temperature_2m_min ? daily.temperature_2m_min[i] : 15),
            icon: fwi.icon
          })
        }

        // Fishing score
        var isGood = weather.pressure >= 1005 && weather.humidity < 85
        var score = isGood ? 85 : (weather.pressure >= 995 ? 60 : 30)
        score = Math.min(98, Math.max(10, Math.round(score + (weather.temp >= 15 && weather.temp <= 30 ? 5 : -5))))

        // Recommend fish species based on weather
        var month = new Date().getMonth() + 1
        var temp = weather.temp
        var pressure = weather.pressure

        // Build recommendation pool
        var fishPool = [
          { name: '鲫鱼', score: 5, bait: '红虫/蚯蚓/酒米打窝', reason: '全年可钓，气压稳定时底钓最佳' },
          { name: '鲤鱼', score: 5, bait: '玉米粒/螺鲤/红薯块', reason: '温度适宜，活性较高' },
          { name: '草鱼', score: 5, bait: '玉米粒/草叶/芦苇芯', reason: '高温季节活跃，可浮钓' },
          { name: '鳊鱼', score: 5, bait: '红虫/蚯蚓/蓝鲫', reason: '集群性强，打窝后连杆' },
          { name: '翘嘴', score: 5, bait: '活泥鳅/亮片/米诺', reason: '早晚窗口期路亚首选' },
          { name: '鳜鱼', score: 5, bait: '活泥鳅/活虾/软虫', reason: '水质好时可路亚底钓' },
          { name: '鲢鳙', score: 5, bait: '酸臭发酵饵/商品鲢鳙饵', reason: '高温浮钓，雾化诱鱼' },
          { name: '罗非鱼', score: 5, bait: '冷冻饵/蚯蚓/肝味饵', reason: '耐高温，全天有口' },
          { name: '黑鱼', score: 5, bait: '雷蛙/活泥鳅/软虫', reason: '草区雷强，攻击性强' },
          { name: '青鱼', score: 5, bait: '螺蛳肉/田螺/玉米粒', reason: '深水底钓大物' },
        ]

        // Temperature adjustment
        if (temp >= 30) {
          fishPool.forEach(function(f) {
            if (f.name === '草鱼' || f.name === '鲢鳙' || f.name === '罗非鱼') f.score += 3
            if (f.name === '鲫鱼' || f.name === '鲤鱼') f.score -= 2
          })
        } else if (temp >= 20) {
          fishPool.forEach(function(f) {
            if (f.name === '鲫鱼' || f.name === '鲤鱼' || f.name === '鳊鱼' || f.name === '翘嘴') f.score += 2
          })
        } else {
          fishPool.forEach(function(f) {
            if (f.name === '鲫鱼') f.score += 3
            if (f.name === '鲢鳙' || f.name === '罗非鱼') f.score -= 3
          })
        }

        // Pressure adjustment
        if (pressure >= 1010) {
          fishPool.forEach(function(f) {
            if (f.name === '鲫鱼' || f.name === '鲤鱼' || f.name === '青鱼') f.score += 2
            if (f.name === '鲢鳙') f.score -= 1
          })
        } else if (pressure < 1000) {
          fishPool.forEach(function(f) {
            if (f.name === '翘嘴' || f.name === '鲢鳙') f.score += 2
            if (f.name === '青鱼') f.score -= 2
          })
        }

        // Month adjustment
        if (month >= 6 && month <= 8) {
          fishPool.forEach(function(f) {
            if (f.name === '草鱼' || f.name === '鲢鳙' || f.name === '黑鱼' || f.name === '罗非鱼') f.score += 2
          })
        } else if (month >= 3 && month <= 5) {
          fishPool.forEach(function(f) {
            if (f.name === '鲫鱼' || f.name === '翘嘴' || f.name === '鳜鱼') f.score += 3
          })
        } else if (month >= 9 && month <= 11) {
          fishPool.forEach(function(f) {
            if (f.name === '鲫鱼' || f.name === '鲤鱼' || f.name === '翘嘴' || f.name === '鳊鱼') f.score += 3
          })
        }

        // Sort and pick top 3
        fishPool.sort(function(a, b) { return b.score - a.score })
        var topFish = fishPool.slice(0, 3)

        var advice = []
        if (score >= 80) {
          advice.push('✅ 气压适宜，鱼口活跃，强烈推荐出钓')
          advice.push('⏰ 黄金窗口：早晨5-9点、傍晚5-8点')
        } else if (score >= 55) {
          advice.push('🤔 天气条件一般，可选择出钓')
          advice.push('💡 建议钓深水或入水口等溶氧高的位置')
        } else {
          advice.push('❌ 天气不太理想，鱼口可能不佳')
          advice.push('💡 如果出行，建议钓浮或选择活水区域')
        }
        advice.push('')
        advice.push('🎯 建议作钓鱼种：')
        topFish.forEach(function(f, i) {
          advice.push((i+1) + '. ' + f.name + ' — ' + f.bait)
        })

        that.setData({ weather: weather, forecast: forecast, score: score, advice: advice, loading: false })
      },
      fail: function(err) {
        that.setData({ loading: false })
        // Fallback to simulated data based on location
        var base = Math.abs(Math.round(spot.lat * 10)) % 5
        var temps = [[30,22],[28,20],[32,24],[26,19],[29,23]]
        var t = temps[base]
        var icons = ['☀️','⛅','🌤','🌧','🌦']
        var descs = ['晴','多云','晴间多云','小雨','阵雨']
        var winds = ['东南风 2级','北风 3级','西南风 2级','东风 1级','西北风 3级']
        var weather = {
          temp: t[0], humidity: 60 + base * 8, pressure: 998 + base * 4,
          wind: winds[base], icon: icons[base], desc: descs[base]
        }
        var forecast = [
          { day:'今天', hi:t[0]+3, lo:t[1], icon:icons[base] },
          { day:'明天', hi:t[0]+1, lo:t[1]-1, icon:icons[(base+1)%5] },
          { day:'后天', hi:t[0]+2, lo:t[1]+1, icon:icons[(base+2)%5] }
        ]
        var isGood = weather.pressure >= 1005 && weather.humidity < 85
        var score = isGood ? 85 : (weather.pressure >= 995 ? 60 : 30)
        score = Math.min(98, Math.round(score))
        var advice = []
        if (isGood) { advice.push('✅ 天气条件优良，适合出钓', '⏰ 推荐时段：早晨5-9点、傍晚5-8点') }
        else if (score >= 60) { advice.push('🤔 天气条件一般，可选择出钓') }
        else { advice.push('❌ 天气不太理想，建议改天') }
        that.setData({ weather: weather, forecast: forecast, score: score, advice: advice, loading: false })
        wx.showToast({ title: '使用模拟数据，请配置API域名', icon: 'none', duration: 2500 })
      }
    })
  }
})
