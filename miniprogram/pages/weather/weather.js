Page({
  data: { weather: {}, forecast: [], score: 0, advice: [] },
  onShow: function() {
    var base = Math.abs(Math.round(Date.now() / 86400000)) % 5
    var temps = [[30,22],[28,20],[32,24],[26,19],[29,23]]
    var t = temps[base]
    var icons = ['☀️','⛅','🌤','🌧','🌦']
    var descs = ['晴','多云','晴间多云','小雨','阵雨']
    var winds = ['东南风 2级','北风 3级','西南风 2级','东风 1级','西北风 3级']
    var w = {
      temp: t[0], humidity: 60 + base * 8, pressure: 998 + base * 4,
      wind: winds[base], icon: icons[base], desc: descs[base]
    }
    var forecast = [
      { day:'今天', hi:t[0]+3, lo:t[1], icon:icons[base] },
      { day:'明天', hi:t[0]+1, lo:t[1]-1, icon:icons[(base+1)%5] },
      { day:'后天', hi:t[0]+2, lo:t[1]+1, icon:icons[(base+2)%5] }
    ]
    var isGood = w.pressure >= 1005 && w.humidity < 80
    var score = isGood ? 85 : (w.pressure >= 995 ? 60 : 30)
    score = Math.min(98, Math.round(score))
    var advice = ['📌 参考数据，请以实际天气为准']
    if (isGood) { advice.push('✅ 天气条件优良，适合出钓', '⏰ 推荐时段：早晨5-9点、傍晚5-8点') }
    else if (score >= 60) { advice.push('🤔 天气条件一般，可选择出钓') }
    else { advice.push('❌ 天气不太理想，建议改天') }
    this.setData({ weather: w, forecast: forecast, score: score, advice: advice })
  }
})
