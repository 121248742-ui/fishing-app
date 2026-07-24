var FAMOUS_SPOTS = [
  // ========== 北京 ==========
  { name:"十三陵水库", latitude:40.25, longitude:116.27, address:"北京昌平区", desc:"京郊经典钓场" },
  { name:"黄花城水库", latitude:40.41, longitude:116.34, address:"北京怀柔区", desc:"长城脚下野钓" },
  { name:"官厅水库", latitude:40.38, longitude:115.60, address:"北京延庆/河北怀来", desc:"京冀交界大库" },
  { name:"密云水库", latitude:40.52, longitude:116.85, address:"北京密云区", desc:"北京最大水库" },
  { name:"上庄水库", latitude:40.10, longitude:116.20, address:"北京海淀区", desc:"市区近郊热门钓点" },
  { name:"沙厂水库", latitude:40.33, longitude:117.05, address:"北京密云区", desc:"密云野钓胜地" },
  { name:"白河堡水库", latitude:40.65, longitude:116.15, address:"北京延庆区", desc:"燕山天池" },
  { name:"青龙湖", latitude:39.78, longitude:116.05, address:"北京房山区", desc:"京西南钓场" },
  { name:"潮白河", latitude:40.05, longitude:116.72, address:"北京通州/顺义", desc:"沿河多段可钓" },
  { name:"永定河", latitude:39.87, longitude:116.22, address:"北京门头沟/房山", desc:"北京母亲河" },

  // ========== 天津 ==========
  { name:"于桥水库", latitude:40.02, longitude:117.42, address:"天津蓟州", desc:"津门最大水库" },
  { name:"团泊湖", latitude:38.92, longitude:117.15, address:"天津静海区", desc:"天津近郊水库" },
  { name:"潮白河天津段", latitude:39.35, longitude:117.35, address:"天津宝坻区", desc:"野钓热门河段" },
  { name:"海河", latitude:39.08, longitude:117.20, address:"天津市区", desc:"市区河道" },

  // ========== 上海 ==========
  { name:"淀山湖", latitude:31.12, longitude:120.97, address:"上海青浦区", desc:"上海最大湖泊" },
  { name:"滴水湖", latitude:30.90, longitude:121.93, address:"上海浦东临港", desc:"人工湖钓场" },
  { name:"黄浦江", latitude:31.05, longitude:121.47, address:"上海闵行段", desc:"市区可钓河段" },

  // ========== 河北 ==========
  { name:"潘家口水库", latitude:40.42, longitude:118.32, address:"河北承德宽城", desc:"水下长城钓场" },
  { name:"大黑汀水库", latitude:40.30, longitude:118.35, address:"河北唐山迁西", desc:"水质好鱼多" },
  { name:"衡水湖", latitude:37.62, longitude:115.65, address:"河北衡水", desc:"华北平原最大淡水湖" },
  { name:"西大洋水库", latitude:38.78, longitude:114.68, address:"河北保定唐县", desc:"太行山麓水库" },
  { name:"岗南水库", latitude:38.32, longitude:114.02, address:"河北石家庄平山", desc:"西柏坡旁大库" },
  { name:"陡河水库", latitude:39.75, longitude:118.25, address:"河北唐山", desc:"唐山钓友聚集地" },

  // ========== 山东 ==========
  { name:"微山湖", latitude:34.75, longitude:117.18, address:"山东济宁微山", desc:"北方最大淡水湖" },
  { name:"东平湖", latitude:35.95, longitude:116.20, address:"山东泰安东平", desc:"水浒八百里水泊遗存" },
  { name:"峡山水库", latitude:36.42, longitude:119.40, address:"山东潍坊", desc:"山东最大水库" },
  { name:"莱西湖", latitude:36.95, longitude:120.50, address:"山东青岛莱西", desc:"可同时容纳3000人垂钓" },
  { name:"狼猫山水库", latitude:36.58, longitude:117.22, address:"山东济南历城", desc:"济南热门钓场" },
  { name:"雪野水库", latitude:36.43, longitude:117.57, address:"山东济南莱芜", desc:"鲁中明珠" },
  { name:"日照水库", latitude:35.42, longitude:119.22, address:"山东日照", desc:"鲁东南大库" },
  { name:"门楼水库", latitude:37.42, longitude:121.22, address:"山东烟台福山", desc:"烟台主要水源地" },

  // ========== 河南 ==========
  { name:"小浪底水库", latitude:34.92, longitude:112.38, address:"河南洛阳孟津", desc:"黄河巨物天堂" },
  { name:"陆浑水库", latitude:34.12, longitude:112.18, address:"河南洛阳嵩县", desc:"豫西最大水库" },
  { name:"南湾水库", latitude:32.15, longitude:114.05, address:"河南信阳", desc:"中原最大水库" },
  { name:"丹江口水库", latitude:32.70, longitude:111.55, address:"河南南阳淅川", desc:"亚洲最大人工水库" },
  { name:"宿鸭湖", latitude:33.02, longitude:114.28, address:"河南驻马店汝南", desc:"亚洲最大平原水库" },
  { name:"鸭河口水库", latitude:33.30, longitude:112.62, address:"河南南阳南召", desc:"白河上游" },

  // ========== 湖北 ==========
  { name:"东湖", latitude:30.55, longitude:114.38, address:"湖北武汉", desc:"全国第二大城中湖" },
  { name:"洪湖", latitude:29.80, longitude:113.45, address:"湖北荆州洪湖市", desc:"著名野钓基地" },
  { name:"梁子湖", latitude:30.28, longitude:114.52, address:"湖北鄂州/武汉", desc:"武昌鱼故乡" },
  { name:"三峡水库", latitude:30.82, longitude:111.00, address:"湖北宜昌", desc:"世界最大水库" },
  { name:"漳河水库", latitude:31.02, longitude:112.05, address:"湖北荆门", desc:"水质清澈" },
  { name:"仙岛湖", latitude:29.82, longitude:114.92, address:"湖北黄石阳新", desc:"千岛之湖" },

  // ========== 湖南 ==========
  { name:"洞庭湖", latitude:29.30, longitude:112.95, address:"湖南岳阳", desc:"八百里洞庭" },
  { name:"东江湖", latitude:25.85, longitude:113.35, address:"湖南郴州资兴", desc:"冷水鱼天堂" },
  { name:"柘溪水库", latitude:28.35, longitude:111.18, address:"湖南益阳安化", desc:"筏钓天堂" },
  { name:"千龙湖", latitude:28.35, longitude:112.72, address:"湖南长沙望城", desc:"专业竞技+休闲钓" },
  { name:"西洞庭湖", latitude:28.95, longitude:112.05, address:"湖南常德汉寿", desc:"湿地野钓" },
  { name:"五强溪水库", latitude:28.78, longitude:110.92, address:"湖南怀化沅陵", desc:"沅水大库" },

  // ========== 江西 ==========
  { name:"鄱阳湖", latitude:29.05, longitude:116.20, address:"江西九江/上饶", desc:"中国第一大淡水湖" },
  { name:"柘林湖", latitude:29.25, longitude:115.40, address:"江西九江武宁", desc:"赣北最大水库" },
  { name:"赣江", latitude:28.68, longitude:115.88, address:"江西南昌", desc:"南昌市区河段" },
  { name:"仙女湖", latitude:27.72, longitude:114.82, address:"江西新余", desc:"4A景区水库" },
  { name:"军山湖", latitude:28.62, longitude:116.38, address:"江西南昌进贤", desc:"鄱阳湖子湖" },

  // ========== 江苏 ==========
  { name:"太湖", latitude:31.20, longitude:120.20, address:"江苏苏州/无锡", desc:"江南水乡钓场" },
  { name:"洪泽湖", latitude:33.30, longitude:118.65, address:"江苏淮安/宿迁", desc:"淮河最大湖泊" },
  { name:"高邮湖", latitude:32.85, longitude:119.25, address:"江苏扬州高邮", desc:"里下河湿地钓场" },
  { name:"骆马湖", latitude:34.10, longitude:118.20, address:"江苏宿迁/徐州", desc:"苏北野钓基地" },
  { name:"玄武湖", latitude:32.07, longitude:118.80, address:"江苏南京", desc:"4A景区" },
  { name:"天目湖", latitude:31.32, longitude:119.42, address:"江苏常州溧阳", desc:"水源地水库" },

  // ========== 安徽 ==========
  { name:"巢湖", latitude:31.60, longitude:117.40, address:"安徽合肥", desc:"五大淡水湖之一" },
  { name:"太平湖", latitude:30.35, longitude:118.02, address:"安徽黄山", desc:"黄山脚下大湖" },
  { name:"龙河口水库", latitude:31.22, longitude:116.78, address:"安徽六安舒城", desc:"万佛湖" },
  { name:"沱湖", latitude:33.15, longitude:117.78, address:"安徽蚌埠五河", desc:"螃蟹+钓鱼" },

  // ========== 浙江 ==========
  { name:"千岛湖", latitude:29.60, longitude:119.03, address:"浙江杭州淳安", desc:"国家级钓鱼胜地" },
  { name:"千峡湖", latitude:28.02, longitude:120.02, address:"浙江丽水青田", desc:"浙江最大峡湾型水库" },
  { name:"渔山列岛", latitude:28.88, longitude:122.25, address:"浙江宁波象山", desc:"亚洲第一钓场" },
  { name:"新安江水库", latitude:29.65, longitude:119.05, address:"浙江杭州建德", desc:"17度恒温水" },
  { name:"钱塘江", latitude:30.22, longitude:120.22, address:"浙江杭州", desc:"杭州段野钓" },

  // ========== 福建 ==========
  { name:"大金湖", latitude:26.88, longitude:117.08, address:"福建三明泰宁", desc:"4A景区水库" },
  { name:"闽江", latitude:26.05, longitude:119.30, address:"福建福州", desc:"福州段野钓" },
  { name:"龙北溪水库", latitude:26.82, longitude:118.52, address:"福建南平建瓯", desc:"众多水库钓点" },
  { name:"棉花滩水库", latitude:24.92, longitude:116.78, address:"福建龙岩永定", desc:"闽西大库" },

  // ========== 广东 ==========
  { name:"流溪河", latitude:23.55, longitude:113.58, address:"广东广州从化", desc:"广州经典野钓河流" },
  { name:"西福河", latitude:23.28, longitude:113.78, address:"广东广州增城", desc:"增城野钓热门" },
  { name:"万绿湖", latitude:23.78, longitude:114.62, address:"广东河源", desc:"华南最大人工湖" },
  { name:"东江", latitude:23.08, longitude:114.42, address:"广东惠州", desc:"深圳出发1小时" },
  { name:"西枝江", latitude:23.02, longitude:114.72, address:"广东惠州惠东", desc:"惠东野钓好去处" },
  { name:"白盆珠水库", latitude:23.08, longitude:115.15, address:"广东惠州惠东", desc:"深山绿潭" },
  { name:"白藤湖", latitude:22.15, longitude:113.28, address:"广东珠海斗门", desc:"珠海热门钓场" },
  { name:"铁岗水库", latitude:22.62, longitude:113.88, address:"广东深圳宝安", desc:"深圳宝安水库" },
  { name:"洪湖公园", latitude:22.56, longitude:114.12, address:"广东深圳罗湖", desc:"市区免费钓点" },
  { name:"东湖公园", latitude:22.56, longitude:114.15, address:"广东深圳罗湖", desc:"深圳水库旁" },
  { name:"雁田水库", latitude:22.68, longitude:114.15, address:"广东深圳/东莞", desc:"深莞交界野钓" },
  { name:"飞来峡水库", latitude:23.72, longitude:113.18, address:"广东清远", desc:"北江大库" },
  { name:"高州水库", latitude:21.98, longitude:111.12, address:"广东茂名高州", desc:"粤西最大水库" },
  { name:"鹤地水库", latitude:21.72, longitude:110.38, address:"广东湛江廉江", desc:"雷州半岛大湖" },
  { name:"乾务水库", latitude:22.15, longitude:113.18, address:"广东珠海斗门", desc:"免费水库" },
  { name:"珠海大桥底", latitude:22.18, longitude:113.48, address:"广东珠海", desc:"珠江口热门" },
  { name:"万山群岛", latitude:21.95, longitude:113.78, address:"广东珠海", desc:"深海船钓胜地" },
  { name:"海鸥岛", latitude:22.95, longitude:113.52, address:"广东广州番禺", desc:"狮子洋畔钓点" },
  { name:"南沙湿地", latitude:22.62, longitude:113.65, address:"广东广州南沙", desc:"珠江口湿地钓场" },
  { name:"观澜河", latitude:22.72, longitude:114.05, address:"广东深圳龙华", desc:"龙华野钓河流" },

  // ========== 广西 ==========
  { name:"澄碧湖", latitude:23.92, longitude:106.62, address:"广西百色", desc:"4A景区湖泊" },
  { name:"漓江", latitude:25.08, longitude:110.32, address:"广西桂林阳朔", desc:"桂林山水钓鱼" },
  { name:"红水河", latitude:23.82, longitude:108.62, address:"广西来宾/河池", desc:"广西钓友热门" },
  { name:"星岛湖", latitude:21.62, longitude:109.15, address:"广西北海合浦", desc:"千岛之湖" },
  { name:"大王滩水库", latitude:22.62, longitude:108.22, address:"广西南宁", desc:"南宁最大水库" },

  // ========== 海南 ==========
  { name:"西沙群岛", latitude:16.83, longitude:112.33, address:"海南三沙", desc:"400余种珊瑚鱼" },
  { name:"蜈支洲岛", latitude:18.30, longitude:109.77, address:"海南三亚", desc:"中国马尔代夫" },
  { name:"松涛水库", latitude:19.48, longitude:109.48, address:"海南儋州", desc:"海南最大水库" },
  { name:"南渡江", latitude:19.98, longitude:110.38, address:"海南海口", desc:"海口母亲河" },
  { name:"万泉河", latitude:19.18, longitude:110.42, address:"海南琼海", desc:"万泉河水清又清" },

  // ========== 四川 ==========
  { name:"升钟湖", latitude:31.55, longitude:105.75, address:"四川南充南部", desc:"西南钓鱼圣地" },
  { name:"三岔湖", latitude:30.32, longitude:104.32, address:"四川成都简阳", desc:"天府明珠" },
  { name:"黑龙滩水库", latitude:30.05, longitude:104.02, address:"四川眉山仁寿", desc:"西蜀第一湖" },
  { name:"白龙湖", latitude:32.30, longitude:105.60, address:"四川广元青川", desc:"川北明珠" },
  { name:"鲁班水库", latitude:30.92, longitude:105.12, address:"四川绵阳三台", desc:"四川第三大水库" },
  { name:"龙泉湖", latitude:30.52, longitude:104.42, address:"四川成都龙泉", desc:"成都近郊钓场" },
  { name:"安宁河", latitude:26.65, longitude:102.02, address:"四川凉山", desc:"高原河流钓场" },

  // ========== 重庆 ==========
  { name:"长寿湖", latitude:29.92, longitude:107.22, address:"重庆长寿", desc:"重庆最大湖泊" },
  { name:"大洪湖", latitude:30.02, longitude:106.82, address:"重庆/四川邻水", desc:"川渝交界大湖" },
  { name:"长江重庆段", latitude:29.55, longitude:106.55, address:"重庆主城", desc:"江钓天堂" },
  { name:"嘉陵江", latitude:29.57, longitude:106.52, address:"重庆主城", desc:"两江交汇" },
  { name:"青龙湖", latitude:29.62, longitude:106.12, address:"重庆璧山", desc:"璧山水库" },

  // ========== 贵州 ==========
  { name:"万峰湖", latitude:25.00, longitude:104.90, address:"贵州黔西南兴义", desc:"野钓者的乐园" },
  { name:"红枫湖", latitude:26.48, longitude:106.42, address:"贵州贵阳清镇", desc:"高原人工湖" },
  { name:"乌江渡水库", latitude:27.30, longitude:106.78, address:"贵州遵义", desc:"乌江天险大库" },
  { name:"黔灵湖", latitude:26.60, longitude:106.70, address:"贵州贵阳", desc:"贵阳市区钓场" },
  { name:"三板溪水库", latitude:26.55, longitude:109.02, address:"贵州黔东南锦屏", desc:"清水江大库" },

  // ========== 云南 ==========
  { name:"抚仙湖", latitude:24.48, longitude:102.88, address:"云南玉溪澄江", desc:"中国最深淡水湖之一" },
  { name:"滇池", latitude:24.96, longitude:102.67, address:"云南昆明", desc:"高原明珠" },
  { name:"洱海", latitude:25.77, longitude:100.19, address:"云南大理", desc:"风光绝美钓场" },
  { name:"泸沽湖", latitude:27.70, longitude:100.78, address:"云南丽江/四川", desc:"摩梭圣湖" },
  { name:"阳宗海", latitude:24.88, longitude:102.98, address:"云南昆明宜良", desc:"昆明近郊大湖" },

  // ========== 陕西 ==========
  { name:"浐灞湿地公园", latitude:34.38, longitude:109.03, address:"陕西西安", desc:"国际钓鱼赛事举办地" },
  { name:"红碱淖", latitude:39.08, longitude:109.90, address:"陕西榆林神木", desc:"中国最大沙漠淡水湖" },
  { name:"瀛湖", latitude:32.62, longitude:108.92, address:"陕西安康", desc:"汉江上游大库" },
  { name:"冯家山水库", latitude:34.48, longitude:107.25, address:"陕西宝鸡", desc:"关中大库" },

  // ========== 甘肃/宁夏/青海 ==========
  { name:"刘家峡水库", latitude:35.92, longitude:103.35, address:"甘肃临夏永靖", desc:"高原明珠" },
  { name:"青海湖", latitude:36.90, longitude:100.20, address:"青海海北/海南", desc:"中国最大湖(注意禁钓期)" },
  { name:"沙湖", latitude:38.82, longitude:106.35, address:"宁夏石嘴山平罗", desc:"塞上江南钓场" },
  { name:"黄河兰州段", latitude:36.07, longitude:103.82, address:"甘肃兰州", desc:"市区河段" },

  // ========== 黑龙江 ==========
  { name:"镜泊湖", latitude:43.88, longitude:128.92, address:"黑龙江牡丹江", desc:"中国最大高山堰塞湖" },
  { name:"松花江", latitude:45.77, longitude:126.65, address:"黑龙江哈尔滨", desc:"77种鱼类" },
  { name:"红旗泡水库", latitude:46.60, longitude:125.10, address:"黑龙江大庆", desc:"东北野钓圣地" },
  { name:"查干湖", latitude:45.25, longitude:124.30, address:"吉林松原", desc:"冬捕胜地夏钓也佳" },
  { name:"五大连池", latitude:48.67, longitude:126.20, address:"黑龙江黑河", desc:"火山堰塞湖群" },
  { name:"兴凯湖", latitude:45.30, longitude:132.40, address:"黑龙江鸡西密山", desc:"中俄界湖" },

  // ========== 吉林 ==========
  { name:"松花湖", latitude:43.70, longitude:126.70, address:"吉林吉林市", desc:"东北最大人工湖" },
  { name:"查干湖", latitude:45.25, longitude:124.30, address:"吉林松原", desc:"全国知名钓场" },
  { name:"二龙湖", latitude:43.18, longitude:124.82, address:"吉林四平", desc:"东辽河水库" },
  { name:"月亮泡", latitude:45.72, longitude:123.88, address:"吉林白城大安", desc:"嫩江畔天然钓场" },

  // ========== 辽宁 ==========
  { name:"大伙房水库", latitude:41.88, longitude:124.18, address:"辽宁抚顺", desc:"辽宁最大水库" },
  { name:"碧流河水库", latitude:40.15, longitude:122.55, address:"辽宁大连庄河", desc:"大连水源地" },
  { name:"浑河", latitude:41.78, longitude:123.42, address:"辽宁沈阳", desc:"沈阳市区河段" },
  { name:"铁甲水库", latitude:40.12, longitude:124.15, address:"辽宁丹东东港", desc:"辽东大库" },
  { name:"观音阁水库", latitude:41.35, longitude:124.12, address:"辽宁本溪", desc:"太子河上游" },

  // ========== 内蒙古 ==========
  { name:"哈素海", latitude:40.62, longitude:111.02, address:"内蒙古呼和浩特土左旗", desc:"塞外西湖" },
  { name:"乌梁素海", latitude:40.95, longitude:108.88, address:"内蒙古巴彦淖尔", desc:"黄河流域最大湖泊" },
  { name:"达里诺尔湖", latitude:43.38, longitude:116.65, address:"内蒙古赤峰克什克腾", desc:"草原上的明珠" },
  { name:"红山水库", latitude:42.78, longitude:119.72, address:"内蒙古赤峰敖汉", desc:"西辽河大库" },

  // ========== 新疆 ==========
  { name:"喀纳斯湖", latitude:48.82, longitude:87.05, address:"新疆阿勒泰布尔津", desc:"神秘高山湖泊" },
  { name:"赛里木湖", latitude:44.60, longitude:81.17, address:"新疆博尔塔拉", desc:"大西洋最后一滴眼泪" },
  { name:"博斯腾湖", latitude:41.98, longitude:86.72, address:"新疆巴州博湖", desc:"中国最大内陆淡水湖" },
  { name:"乌伦古湖", latitude:47.10, longitude:87.28, address:"新疆阿勒泰福海", desc:"准噶尔盆地大湖" },

  // ========== 西藏 ==========
  { name:"纳木错", latitude:30.72, longitude:90.65, address:"西藏拉萨/那曲", desc:"天湖(注意禁钓)" },
  { name:"羊卓雍措", latitude:28.98, longitude:90.55, address:"西藏山南浪卡子", desc:"碧玉湖" },

  // ========== 山西 ==========
  { name:"汾河水库", latitude:38.05, longitude:111.92, address:"山西太原娄烦", desc:"山西最大水库" },
  { name:"漳泽水库", latitude:36.32, longitude:113.02, address:"山西长治", desc:"晋东南大库" },
  { name:"黄河壶口段", latitude:36.15, longitude:110.45, address:"山西临汾吉县", desc:"黄河鲤鱼" },

  // ========== 台湾 ==========
  { name:"日月潭", latitude:23.85, longitude:120.93, address:"台湾南投", desc:"台湾最大湖泊" },
  { name:"曾文水库", latitude:23.25, longitude:120.53, address:"台湾台南/嘉义", desc:"台湾最大水库" }
]

module.exports = { FAMOUS_SPOTS }
