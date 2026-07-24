const BASE = 'cloud://cloudbase-d1gq1v8xl0c056a2a.636c-cloudbase-d1gq1v8xl0c056a2a-1456798557/images/'

const FISH_SPECIES = [
  {     id:1, name:"鲫鱼"
    , image:BASE+"crucian_carp.png"
    , type:"底层"
    , diet:"杂食"
    , rarity:1
    , difficulty:2
    , months:[1,2,3,4,5,6,9,10,11,12]
    , peakMonths:[3,4,5,10,11]
    , habitat:"静水或缓流的中下层，水草区、芦苇丛附近，喜在水底淤泥中觅食。中国分布最广的淡水鱼，从南到北无处不在。"
    , bait:[{name:"红虫",tier:"best"},{name:"蚯蚓",tier:"best"},{name:"蓝鲫",tier:"good"},{name:"九一八",tier:"good"},{name:"酒米",tier:"good"},{name:"麦粒",tier:"ok"}]
    , technique:"底钓为主，子线0.4-0.6号，袖钩3-5号。打窝用酒米少量勤补，一次乒乓球大小即可。经典漂相为上顶（送漂），看到顶1-2目提竿最佳。冬天鱼口轻，需0.2-0.3号极细子线，看漂要灵敏到半目变化。"
    , tips:"春钓滩、秋钓潭、冬钓阳对鲫鱼最适用。钓鲫贵在精细——线细、钩小、饵轻、漂灵。野生大板鲫（1斤以上）是可遇不可求的好货。"
    , record:"野生常见0.2-0.5斤，1斤以上称大板鲫，养殖鲫可达2-3斤。"
  },
  {     id:2, name:"鲤鱼"
    , image:BASE+"鲤鱼.png"
    , type:"底层"
    , diet:"杂食"
    , rarity:1
    , difficulty:3
    , months:[4,5,6,7,8,9,10]
    , peakMonths:[5,6,9]
    , habitat:"水底淤泥处、深潭、水草丛中，喜在有障碍物处栖息。善于拱泥觅食，常在水面冒出一串串气泡（鱼星）。"
    , bait:[{name:"玉米粒",tier:"best"},{name:"螺鲤",tier:"best"},{name:"红薯块",tier:"good"},{name:"颗粒饵",tier:"good"},{name:"蚯蚓",tier:"ok"},{name:"麦粒",tier:"ok"}]
    , technique:"底钓，钓钝不钓灵。子线1.0-2.0号，伊势尼5-8号。打窝以发酵老玉米+麦粒为佳。鲤鱼有试口习惯——先轻轻碰饵再吞，漂相为缓慢黑漂，要耐心等待。中鱼后猛烈冲刺，遛鱼稳住方向即可。"
    , tips:"习性谨慎，大鱼尤其狡猾。甜、香、软是鲤鱼饵料三要素。同一钓点连钓几天后鲤鱼会产生警觉，建议换位。"
    , record:"野生常见1-5斤，10斤以上称大鲤，水库记录可达30斤以上。"
  },
  {     id:3, name:"草鱼"
    , image:BASE+"grass_carp.png"
    , type:"中下层"
    , diet:"草食"
    , rarity:2
    , difficulty:2
    , months:[5,6,7,8,9]
    , peakMonths:[6,7,8]
    , habitat:"水草丰富的中下层水域，夏季活跃在中上层。喜在水草区和岸边草丛觅食，也会摄食落入水中的昆虫和果实。"
    , bait:[{name:"玉米粒",tier:"best"},{name:"草叶",tier:"best"},{name:"芦苇芯",tier:"good"},{name:"薯块",tier:"good"},{name:"颗粒饵",tier:"ok"},{name:"蚂蚱",tier:"ok"}]
    , technique:"夏季可浮钓（挂水草或芦苇叶），春秋底钓。子线1.5-3.0号，伊势尼7-10号。草鱼吃饵干脆，漂相直接黑漂。大草鱼冲劲十足，第一波冲刺最猛，顶住前10秒就稳了。"
    , tips:"草鱼不怕热——35°C高温其他鱼停口时草鱼照样进食。青草打窝效果显著：割一捆青草系石头扔钓点，半小时后草鱼就来了。"
    , record:"常见3-10斤，大草鱼可达20-30斤，最大记录超50斤。"
  },
  {     id:4, name:"鳊鱼"
    , image:BASE+"鳊鱼.png"
    , type:"中下层"
    , diet:"杂食"
    , rarity:2
    , difficulty:2
    , months:[4,5,6,7,8,9,10]
    , peakMonths:[5,6,9]
    , habitat:"江河湖泊中下层，喜欢水流平缓的洄水湾和深潭处集群活动。体型侧扁如菱形，游速较快。"
    , bait:[{name:"红虫",tier:"best"},{name:"蚯蚓",tier:"best"},{name:"蓝鲫",tier:"good"},{name:"腥香饵",tier:"good"},{name:"麦麸",tier:"ok"},{name:"饭粒",tier:"ok"}]
    , technique:"钓底或离底10-20cm。口小，用袖钩3-5号，子线0.6-1.0号。集群性强，上一条后往往连杆。漂相为缓慢上顶后横走。千岛湖、丹江口是钓鳊鱼的好去处。"
    , tips:"肉质细嫩，是口感最好的淡水鱼之一。打窝用菜籽饼+麸皮效果极佳，雾化后鳊鱼群聚不散。"
    , record:"常见0.5-2斤，大鳊鱼可达3-5斤。"
  },
  {     id:5, name:"鲢鱼(白鲢)"
    , image:BASE+"silver_carp.png"
    , type:"中上层"
    , diet:"滤食"
    , rarity:2
    , difficulty:3
    , months:[5,6,7,8,9]
    , peakMonths:[6,7,8]
    , habitat:"水域中上层开阔水面，滤食浮游植物。常成群在水面游动，受惊时跃出水面。是中国四大家鱼之一。"
    , bait:[{name:"酸味饵",tier:"best"},{name:"发酵豆渣",tier:"best"},{name:"商品鲢鳙饵",tier:"good"},{name:"麦麸发酵",tier:"good"},{name:"豆腐渣",tier:"ok"}]
    , technique:"浮钓为主，钓深0.5-1.5米。饵料雾化要快（3-5分钟化完），形成雾化区吸引白鲢。线组要重——主线3.0-5.0号，伊势尼10-14号。中鱼时白鲢会猛烈冲出，常有跳跃洗鳃动作。"
    , tips:"白鲢和花鲢（鳙鱼）常被统称为鲢鳙，但白鲢鳞片银白、头较小。部分水库禁钓白鲢，需提前了解规定。"
    , record:"常见3-8斤，大个体可达15-25斤。"
  },
  {     id:6, name:"鳙鱼(花鲢)"
    , image:BASE+"bighead_carp.png"
    , type:"中上层"
    , diet:"滤食"
    , rarity:2
    , difficulty:3
    , months:[5,6,7,8,9]
    , peakMonths:[6,7,8]
    , habitat:"与白鲢相似，但更偏向深水一点。滤食浮游动物为主，头大身小，是做剁椒鱼头的原料。"
    , bait:[{name:"臭饵",tier:"best"},{name:"发酵臭豆腐渣",tier:"best"},{name:"商品鲢鳙饵",tier:"good"},{name:"蒜味饵",tier:"good"},{name:"麦麸发酵",tier:"ok"},{name:"鸡粪发酵",tier:"ok"}]
    , technique:"浮钓钓深1-3米（比白鲢深）。花鲢偏好臭味饵料，饵要发酵充分。中鱼后花鲢力量比白鲢更大更持久。"
    , tips:"花鲢头大，是做剁椒鱼头的顶级食材。和钓白鲢不同，花鲢更喜欢偏深、偏下层的水域。钓花鲢饵要臭、钓要深。"
    , record:"常见3-10斤，大花鲢可达20-40斤。"
  },
  {     id:7, name:"翘嘴"
    , image:BASE+"翘嘴.png"
    , type:"中上层"
    , diet:"肉食"
    , rarity:3
    , difficulty:3
    , months:[3,4,5,6,9,10,11]
    , peakMonths:[4,5,10]
    , habitat:"湖泊水库中上层，清晨傍晚靠近岸边捕食小鱼。典型掠食者，靠视觉追击猎物，水面炸水声是其标志。"
    , bait:[{name:"活泥鳅",tier:"best"},{name:"小白条",tier:"best"},{name:"亮片(路亚)",tier:"good"},{name:"米诺(路亚)",tier:"good"},{name:"小虾",tier:"ok"},{name:"蚯蚓",tier:"ok"}]
    , technique:"路亚是首选——清晨傍晚窗口期在水面搜索。手竿挂活饵浮钓1-2米。翘嘴攻击凶猛，咬口后猛烈洗鳃，手感一流。丹江口是中国的翘嘴圣地。"
    , tips:"早口和晚口是关键词——日出前后和日落前后一小时。水面有翘嘴追小鱼翻出的浪花时，就是抛竿的黄金时刻。"
    , record:"常见1-3斤，大翘嘴可达10-15斤，丹江口曾出过20斤+巨翘。"
  },
  {     id:8, name:"鳜鱼"
    , image:BASE+"鳜鱼.png"
    , type:"底层"
    , diet:"肉食"
    , rarity:4
    , difficulty:4
    , months:[4,5,6,9,10]
    , peakMonths:[5,10]
    , habitat:"水质清澈的江河水库底部，隐藏在石头缝、树根、桥墩等障碍物处伏击猎物。对水质要求极高。"
    , bait:[{name:"活泥鳅",tier:"best"},{name:"活虾",tier:"best"},{name:"软虫(路亚)",tier:"good"},{name:"卷尾蛆",tier:"good"},{name:"铅头钩",tier:"ok"},{name:"小活鱼",tier:"ok"}]
    , technique:"路亚——铅头钩+软虫慢拖底部障碍区。活饵钓法用泥鳅或小虾底钓。有领地意识，一处中鱼后附近往往还有。背鳍尖刺有毒，取鱼务必用毛巾包裹！"
    , tips:"西塞山前白鹭飞，桃花流水鳜鱼肥。中国最名贵淡水食用鱼之一，野生的价格不菲。水质好的水库和江河才能钓到。"
    , record:"常见0.5-2斤，大鳜鱼可达5-8斤，极少数10斤以上。"
  },
  {     id:9, name:"罗非鱼"
    , image:BASE+"罗非鱼.png"
    , type:"底层"
    , diet:"杂食"
    , rarity:2
    , difficulty:2
    , months:[4,5,6,7,8,9,10,11]
    , peakMonths:[5,6,7,8]
    , habitat:"温水性鱼类，15°C以上活跃。喜水底泥沙处集群，适应力极强。南方广泛归化，北方水库不能越冬。"
    , bait:[{name:"冷冻饵",tier:"best"},{name:"蚯蚓",tier:"best"},{name:"肝味饵",tier:"good"},{name:"腥香商品饵",tier:"good"},{name:"虾肉",tier:"ok"},{name:"麦粒",tier:"ok"}]
    , technique:"底钓，子线0.8-1.5号（罗非牙利易切线，建议加防咬线）。吃食凶猛干脆、直接黑漂。集群性强，找对窝能连杆。背鳍和鳃盖有尖刺，务必用毛巾包裹取鱼。"
    , tips:"全年耐高温但怕冷，广东/海南/广西是最佳钓区。肉质细嫩，南方餐桌常见。罗非鱼也吃水草和藻类，能净化水质。"
    , record:"常见0.3-1斤，大罗非可达2-3斤，极少5斤以上。"
  },
  {     id:10, name:"青鱼"
    , image:BASE+"青鱼.png"
    , type:"底层"
    , diet:"肉食(螺类)"
    , rarity:3
    , difficulty:5
    , months:[5,6,7,8,9]
    , peakMonths:[6,7,8]
    , habitat:"大江大河和大型水库深水区底部，喜螺蛳丰富的区域。四大家鱼中体型最大的一种。"
    , bait:[{name:"螺蛳肉",tier:"best"},{name:"田螺",tier:"best"},{name:"玉米粒",tier:"good"},{name:"颗粒饵",tier:"good"},{name:"蚌肉",tier:"ok"},{name:"蚯蚓",tier:"ok"}]
    , technique:"重装备底钓——主线5.0-8.0号，子线3.0-5.0号，伊势尼12-16号，大物竿必备。打窝用螺蛳（敲碎壳散发味道）。中鱼后是持久战，青鱼耐力一流，遛30分钟-1小时很正常。"
    , tips:"淡水钓的终极Boss。大型水库巨青可达50-100斤。一整天可能只有一口，但这口值了。钓青鱼需要顶级装备和极大耐心。"
    , record:"常见5-20斤，大青鱼可达50-80斤，最大记录超200斤。"
  },
  {     id:11, name:"鲇鱼(鲶鱼)"
    , image:BASE+"鲇鱼.png"
    , type:"底层"
    , diet:"肉食"
    , rarity:2
    , difficulty:2
    , months:[5,6,7,8,9]
    , peakMonths:[6,7,8]
    , habitat:"水底泥洞、石缝、桥墩下、倒树旁。夜行性鱼类，白天隐蔽，夜晚出来觅食。"
    , bait:[{name:"鸡肝",tier:"best"},{name:"泥鳅",tier:"best"},{name:"猪肝",tier:"good"},{name:"大蚯蚓",tier:"good"},{name:"小鱼段",tier:"ok"},{name:"虾",tier:"ok"}]
    , technique:"夜钓底钓。主线3.0-5.0号，伊势尼10-14号。饵料用腥味重的动物内脏。选桥墩、倒树等障碍物旁。鲶鱼口大，吞饵后直接拖走，手感沉重。"
    , tips:"夏季暴雨后河水变浑时鲶鱼异常活跃。黄河鲶鱼和南方大口鲶是两大品种。鲶鱼炖茄子是东北名菜。"
    , record:"常见1-5斤，大鲶鱼可达10-20斤，南方大口鲶可达30斤以上。"
  },
  {     id:12, name:"黑鱼"
    , image:BASE+"黑鱼.png"
    , type:"中下层"
    , diet:"肉食"
    , rarity:3
    , difficulty:4
    , months:[5,6,7,8,9]
    , peakMonths:[6,7,8]
    , habitat:"水草丛生的浅水区、芦苇荡、荷塘。伏击型掠食者，有护仔习性。能用鳃上器官直接呼吸空气，离水可活数小时。"
    , bait:[{name:"雷蛙(路亚)",tier:"best"},{name:"青蛙(拟饵)",tier:"best"},{name:"活泥鳅",tier:"good"},{name:"软虫",tier:"good"},{name:"波趴",tier:"ok"},{name:"小鱼",tier:"ok"}]
    , technique:"雷强钓法——用雷蛙在水草区慢拖，黑鱼从草洞中突然冲出攻击。中鱼后猛力扬竿刺穿硬嘴、快速拉出草区。传统钓用长竿短线挂活饵在草洞中逗钓也很有效。"
    , tips:"淡水顶级掠食者，攻击性极强，咬口视觉冲击力十足。有领地意识，被打扰后会回来。黑鱼做酸菜鱼口感极好。可离水活数小时——因为能呼吸空气！"
    , record:"常见1-3斤，大黑鱼可达5-10斤，极少数15斤以上。"
  },
  {     id:13, name:"白条"
    , image:BASE+"白条.png"
    , type:"中上层"
    , diet:"杂食"
    , rarity:1
    , difficulty:1
    , months:[3,4,5,6,7,8,9,10,11]
    , peakMonths:[4,5,6,9,10]
    , habitat:"水域中上层，常在岸边水面成群觅食。中国最常见的小型鱼类，几乎所有水域都存在。"
    , bait:[{name:"腥香面饵",tier:"best"},{name:"苍蝇",tier:"best"},{name:"小白条亮片",tier:"good"},{name:"面包屑",tier:"good"},{name:"米粒",tier:"ok"},{name:"蚯蚓尖",tier:"ok"}]
    , technique:"浮钓水面30cm内。极轻钓组——袖钩1-2号，0.2-0.3号子线。钓白条讲究快——饵一入水就来抢，快速连续抛竿。飞蝇钓法或微型路亚钓白条也很有趣。油炸白条是经典下酒菜。"
    , tips:"很多人嫌弃白条闹窝，但专钓白条也别有趣味，是练习抛竿看漂的好方法。油炸酥脆，不少老钓友专门刷白条下酒。"
    , record:"常见10-20cm，大个体可达25-30cm，重约3-5两。"
  },
  {     id:14, name:"黄颡鱼(黄骨鱼)"
    , image:BASE+"黄骨鱼.png"
    , type:"底层"
    , diet:"肉食"
    , rarity:2
    , difficulty:2
    , months:[5,6,7,8,9]
    , peakMonths:[6,7,8]
    , habitat:"水底石缝、泥洞中，夜间觅食。江河湖泊缓流区底部常见，群居性。"
    , bait:[{name:"黑蚯蚓",tier:"best"},{name:"鸡肝",tier:"best"},{name:"红虫",tier:"good"},{name:"虾肉",tier:"good"},{name:"猪肝",tier:"ok"},{name:"小鱼段",tier:"ok"}]
    , technique:"夜钓底钓为主，串钩或多钩钓组。务必用长柄钩（黄颡嘴小但吞钩深），用钳子取钩不用手——胸鳍背鳍有毒刺，扎到剧痛！子线0.8-1.5号。"
    , tips:"别名黄辣丁、嘎牙子，炖汤鲜美无比。同一个钓点可连上多条——它们是群居鱼类。夜钓时最活跃。"
    , record:"常见2-5两，大个体可达1-2斤。"
  },
  {     id:15, name:"大口鲈"
    , image:BASE+"鲈鱼.png"
    , type:"中下层"
    , diet:"肉食"
    , rarity:3
    , difficulty:3
    , months:[3,4,5,6,9,10,11]
    , peakMonths:[4,5,10]
    , habitat:"水质清澈水域的结构区（石头堆、树桩、水草边缘）。伏击型掠食者，对结构区依赖极强。加州鲈已在中国广泛归化。"
    , bait:[{name:"软虫",tier:"best"},{name:"卷尾蛆",tier:"best"},{name:"铅头钩",tier:"good"},{name:"米诺",tier:"good"},{name:"亮片",tier:"ok"},{name:"VIB",tier:"ok"}]
    , technique:"路亚——铅头钩+软虫在底部跳底搜索结构区。水面系（清晨）、中层米诺（阴天）、底层软虫（晴天）轮换尝试。中鱼后鲈鱼会猛烈洗鳃跳跃，压低竿尖防止脱钩。读水能力是钓鲈鱼的核心。"
    , tips:"路亚爱好者最爱的对象鱼之一。找倒树和石头堆就找到了鲈鱼。著名路亚赛事B.A.S.S.的核心目标鱼。"
    , record:"常见0.5-2斤，大个体可达3-5斤。"
  },
  {     id:16, name:"鳡鱼"
    , image:BASE+"鳡鱼.png"
    , type:"中上层"
    , diet:"肉食"
    , rarity:5
    , difficulty:5
    , months:[4,5,6,9,10]
    , peakMonths:[5,10]
    , habitat:"大型江河和水库广阔水面，中国淡水顶级掠食者。游泳速度极快，可达60km/h以上。"
    , bait:[{name:"大亮片",tier:"best"},{name:"大型米诺",tier:"best"},{name:"铁板",tier:"good"},{name:"波趴",tier:"good"},{name:"VIB",tier:"ok"},{name:"活鱼",tier:"ok"}]
    , technique:"路亚远投——8-15g亮片远投后快速收线。MH或H调竿，3000-4000型轮，PE线2.0-3.0号。中鱼后冲刺速度淡水鱼中无出其右，100米线几秒就能清杯，务必调好泄力！"
    , tips:"淡水鲨鱼，路亚的终极挑战。100米线几秒清杯的感觉只有钓过鳡鱼的人才知道。有鳡鱼的地方水质和水生态一定不错。"
    , record:"常见3-10斤，大鳡鱼可达20-40斤，最大记录超100斤。"
  },
  {     id:17, name:"鲮鱼"
    , image:BASE+"鲮鱼.png"
    , type:"底层"
    , diet:"杂食"
    , rarity:2
    , difficulty:3
    , months:[4,5,6,7,8,9,10]
    , peakMonths:[5,6,9]
    , habitat:"中国华南（广东、广西、海南）的江河水库，喜沙石底质流水区。北方没有。"
    , bait:[{name:"冷冻饵",tier:"best"},{name:"虾粉饵",tier:"best"},{name:"蚯蚓",tier:"good"},{name:"肝味饵",tier:"good"},{name:"麦麸",tier:"ok"},{name:"米饭",tier:"ok"}]
    , technique:"底钓，钓组要灵敏。鲮鱼口小但拉力是同体型鲫鱼的3倍以上！子线1.0-1.5号（不能太细），袖钩4-6号。中鱼后稳住竿子让它自己消耗体力。1斤鲮鱼的拉力≈3斤鲤鱼。"
    , tips:"华南地区特产，一斤鲮三斤鲤。土鲮、泰鲮、麦鲮是三个主要品种。鲮鱼是做鱼丸和鱼腐的上等原料，岭南名菜。"
    , record:"常见0.3-1斤，大鲮鱼可达2-4斤，极少数5斤以上。"
  },
  {     id:19, name:"马口鱼(马口鱲)"
    , image:BASE+"马口鱲.png"
    , type:"中上层"
    , diet:"肉食"
    , rarity:3
    , difficulty:3
    , months:[3,4,5,6,7,8,9,10]
    , peakMonths:[4,5,6,9]
    , habitat:"山区清澈溪流和河流中上层，水质要求极高。嘴大如马口，是山地溪流中的凶猛掠食者。"
    , bait:[{name:"小亮片",tier:"best"},{name:"小软虫",tier:"best"},{name:"蚯蚓",tier:"good"},{name:"小鱼",tier:"good"},{name:"苍蝇",tier:"ok"},{name:"飞蝇",tier:"ok"}]
    , technique:"微型路亚（UL竿+2-5g亮片）在马口水域搜索。溪流钓用轻竿细线（0.2-0.4号子线）挂蚯蚓钓急流处。马口吃食凶猛，攻击瞬间手感极佳。UL钓法在中国近年非常流行。"
    , tips:"马口鱼对水质要求极高，是衡量溪流生态健康的指示物种。有马口的地方，水一定干净。UL钓马口是路亚入门的最佳选择。"
    , record:"常见15-25cm，大马口可达30-40cm，重约0.5-1斤。"
  },
  {     id:20, name:"花骨鱼"
    , image:BASE+"花骨鱼.png"
    , type:"底层"
    , diet:"杂食"
    , rarity:3
    , difficulty:3
    , months:[4,5,6,7,8,9,10]
    , peakMonths:[5,6,9]
    , habitat:"江河湖泊底部沙石区域，喜在流水中觅食。身上有斑点花纹，体型圆筒状。"
    , bait:[{name:"红虫",tier:"best"},{name:"蚯蚓",tier:"best"},{name:"腥香饵",tier:"good"},{name:"虾粉饵",tier:"good"},{name:"麦粒",tier:"ok"},{name:"米饭",tier:"ok"}]
    , technique:"底钓，钓组灵敏。嘴小，用袖钩3-5号。花骨鱼吃饵动作轻微，漂相细腻，需要专注看漂。常见于江河急流下方的缓水区。"
    , tips:"花骨鱼在长江流域和东北地区分布较广。体型较小但味道鲜美。对底质有偏好——沙石底的河道最合适。"
    , record:"常见3-8两，大个体可达1-2斤。"
  },
  {     id:21, name:"赤眼鳟"
    , image:BASE+"赤眼鳟.png"
    , type:"中下层"
    , diet:"杂食"
    , rarity:3
    , difficulty:3
    , months:[4,5,6,7,8,9,10]
    , peakMonths:[5,6,9]
    , habitat:"江河水库中下层，喜水质清澈的水域。眼上缘有红色斑是其标志特征。游动迅速，是敏捷的游猎型鱼类。"
    , bait:[{name:"蚯蚓",tier:"best"},{name:"小虾",tier:"best"},{name:"玉米粒",tier:"good"},{name:"亮片",tier:"good"},{name:"腥香饵",tier:"ok"},{name:"麦粒",tier:"ok"}]
    , technique:"底钓或路亚均可。底钓用0.8-1.2号子线、袖钩4-6号。路亚用小亮片或小软虫慢收。赤眼鳟吃饵干脆，漂相直接黑漂。中鱼后冲刺有力，手感良好。"
    , tips:"眼睛上部有红斑，非常好认。常见于南方河流水库，近年来路亚爱好者逐渐将其作为目标鱼。"
    , record:"常见0.5-2斤，大个体可达3-5斤。"
  },
  {     id:22, name:"太阳鱼"
    , image:BASE+"太阳鱼.png"
    , type:"中下层"
    , diet:"杂食"
    , rarity:2
    , difficulty:1
    , months:[4,5,6,7,8,9,10]
    , peakMonths:[5,6,7,8]
    , habitat:"引进种，原产北美。现已在中国南方自然水域归化。喜静水浅水区，常在岸边活动。"
    , bait:[{name:"蚯蚓",tier:"best"},{name:"小虫",tier:"best"},{name:"腥香饵",tier:"good"},{name:"小亮片",tier:"good"},{name:"麦粒",tier:"ok"},{name:"虾肉",tier:"ok"}]
    , technique:"轻型钓组——UL或L调竿，0.4-0.8号子线，袖钩3-5号。太阳鱼攻击性好，会追咬小亮片和软虫。体型虽小但色彩艳丽、拉力不错。是入门路亚和儿童钓鱼的理想对象鱼。"
    , tips:"色彩艳丽（蓝色条纹+橙色腹部），观赏性很强。在南方的池塘水库中很常见。好钓、好看、好吃——三好鱼种。"
    , record:"常见2-5两，大个体可达0.5-1斤。"
  },
  {     id:23, name:"虹鳟"
    , image:BASE+"虹鳟.png"
    , type:"中下层"
    , diet:"肉食"
    , rarity:3
    , difficulty:4
    , months:[3,4,5,6,9,10,11]
    , peakMonths:[4,5,10]
    , habitat:"引进种，原产北美。国内在三文鱼养殖基地（青海、甘肃、四川等冷水区）广泛放养。喜清澈、高溶氧、低温的流水环境。"
    , bait:[{name:"飞蝇",tier:"best"},{name:"小亮片",tier:"best"},{name:"小软虫",tier:"good"},{name:"小勺",tier:"good"},{name:"小虫",tier:"ok"},{name:"蚯蚓",tier:"ok"}]
    , technique:"飞蝇钓法是钓虹鳟的经典方式，在溪流中使用干蝇或若虫模仿自然食物。路亚用小亮片（2-5g）在激流中搜索。虹鳟攻击时视觉冲击力强、跳跃洗鳃频繁。"
    , tips:"虹鳟是飞蝇钓的核心目标鱼，有专门的飞蝇竞技比赛。三文鱼的淡水近亲，肉质橘红色，是高端食材。冷水区的顶级对象鱼。"
    , record:"常见1-3斤，大个体可达5-10斤。"
  },
  {     id:24, name:"黄尾鲴"
    , image:BASE+"鲴鱼.png"
    , type:"底层"
    , diet:"杂食"
    , rarity:2
    , difficulty:3
    , months:[4,5,6,7,8,9,10]
    , peakMonths:[5,6,9]
    , habitat:"长江及以南水域的江河水库，喜沙石底，在水底刮食藻类和有机碎屑。尾鳍下叶黄色，是其标志特征。"
    , bait:[{name:"红虫",tier:"best"},{name:"腥香饵",tier:"best"},{name:"蚯蚓",tier:"good"},{name:"藻粉饵",tier:"good"},{name:"麦麸",tier:"ok"},{name:"饭粒",tier:"ok"}]
    , technique:"底钓，钓组灵敏。黄尾鲴嘴小且位于吻部下端（刮食型），用袖钩3-4号。吃饵动作轻微，漂相细腻，需全神贯注。集群性强，找到鱼群能连杆。"
    , tips:"黄尾鲴在长江流域水库中很常见。体型虽小但味道鲜美。钓黄尾鲴考验的是看漂功夫——漂相极其细微。"
    , record:"常见3-8两，大个体可达1-2斤。"
  },
  {     id:25, name:"红鳍鲌"
    , image:BASE+"红鳍鲌.png"
    , type:"中上层"
    , diet:"肉食"
    , rarity:2
    , difficulty:2
    , months:[4,5,6,7,8,9,10]
    , peakMonths:[5,6,9]
    , habitat:"江河湖泊中上层，喜在开阔水面集群追食小鱼。体型与翘嘴相似但更小更扁，腹鳍呈红色。"
    , bait:[{name:"小亮片",tier:"best"},{name:"小软虫",tier:"best"},{name:"活虾",tier:"good"},{name:"蚯蚓",tier:"good"},{name:"飞蝇",tier:"ok"},{name:"小活鱼",tier:"ok"}]
    , technique:"UL路亚——小亮片（2-5g）在水面快速搜索。手竿用活虾浮钓1-2米。红鳍鲌集群性强、攻击积极，窗口期（早晚）口很好。体型虽小但拉力十足、肉质鲜美。"
    , tips:"红鳍鲌和翘嘴很像但体型更小。集群捕食时水面翻腾壮观。是路亚入门和UL钓法的理想对象鱼。"
    , record:"常见0.5-2斤，大个体可达3-5斤。"
  },
  {     id:26, name:"沙塘鳢"
    , image:BASE+"沙塘鳢.png"
    , type:"底层"
    , diet:"肉食"
    , rarity:3
    , difficulty:2
    , months:[4,5,6,7,8,9]
    , peakMonths:[5,6,7]
    , habitat:"水底石缝、泥洞和瓦砾中，喜在底层隐蔽处伏击猎物。广泛分布于中国各淡水水域的底部。"
    , bait:[{name:"蚯蚓",tier:"best"},{name:"红虫",tier:"best"},{name:"小虾",tier:"good"},{name:"小鱼段",tier:"good"},{name:"肝饵",tier:"ok"},{name:"蛆虫",tier:"ok"}]
    , technique:"底钓，用小钩（袖钩2-3号）和细线（0.3-0.5号子线）。钓点选石头缝旁的沙泥底。沙塘鳢吃口干脆但体型小，需要灵敏的钓组才能感觉到。在南方常和黄颡鱼一起被钓到。"
    , tips:"别名土布鱼、呆子鱼。个头小但味道极鲜。在江浙一带是传统名菜「土步鱼」的原料。野生个体越来越少，价格不菲。"
    , record:"常见5-15cm，大个体可达20-25cm，重约3-5两。"
  },
  {     id:29, name:"麦穗鱼"
    , image:BASE+"麦穗.png"
    , type:"全水层"
    , diet:"杂食"
    , rarity:1
    , difficulty:1
    , months:[3,4,5,6,7,8,9,10]
    , peakMonths:[4,5,6]
    , habitat:"岸边浅水区、水草丛中。中国淡水水域中最常见的小型鱼，几乎无处不在。繁殖力极强，种群庞大。"
    , bait:[{name:"腥香面饵",tier:"best"},{name:"红虫粉",tier:"best"},{name:"蚯蚓尖",tier:"good"},{name:"面包屑",tier:"good"},{name:"饭粒",tier:"ok"},{name:"米糠",tier:"ok"}]
    , technique:"极细钓组——0.1-0.2号子线、袖钩0.5-1号。虽是闹窝专业户，但高密度钓麦穗也别有乐趣。常作为儿童钓鱼的启蒙鱼。油炸后酥脆可口。"
    , tips:"麦穗鱼是很多农村老钓友的童年记忆。虽小但种群庞大，是衡量水域生物量的基础鱼种。油炸麦穗酥脆，配啤酒正好。"
    , record:"常见5-8cm，最大约12-15cm，重约1两。"
  },
  {     id:33, name:"高体鳑鲏"
    , image:BASE+"鳑鲏.png"
    , type:"中上层"
    , diet:"杂食"
    , rarity:1
    , difficulty:3
    , months:[3,4,5,6,7,8,9,10]
    , peakMonths:[4,5,6]
    , habitat:"静水或缓流的浅水区，水草丛中。中国各地广泛分布，体色绚丽，是著名的原生观赏鱼。"
    , bait:[{name:"腥香面饵",tier:"best"},{name:"红虫",tier:"best"},{name:"蚯蚓尖",tier:"good"},{name:"米糠",tier:"good"},{name:"面包屑",tier:"ok"},{name:"饭粒",tier:"ok"}]
    , technique:"微型钓组——0.1号子线、袖钩0.3-0.5号。浮钓浅水草丛旁。鳑鲏体型极小但色彩艳丽（繁殖期雄鱼体侧有彩虹色），多是意外钓获。专门钓鳑鲏考验的是极致精细的钓技。"
    , tips:"鳑鲏是著名的原生观赏鱼，繁殖期雄鱼色彩极其绚丽。它们与河蚌有独特的共生关系——雌鱼将卵产在河蚌体内。鳑鲏对水质敏感，是水环境健康的指示生物。"
    , record:"常见3-6cm，最大约8-10cm。"
  },
  {     id:34, name:"棒花鱼"
    , image:BASE+"棒花鱼.png"
    , type:"底层"
    , diet:"杂食"
    , rarity:1
    , difficulty:1
    , months:[3,4,5,6,7,8,9,10,11]
    , peakMonths:[5,6,7]
    , habitat:"江河湖泊的沙石底部，常在水底缓慢游动觅食。遍布中国大部分淡水水域。"
    , bait:[{name:"红虫",tier:"best"},{name:"蚯蚓碎段",tier:"best"},{name:"腥香饵",tier:"good"},{name:"蛆虫",tier:"good"},{name:"饭粒",tier:"ok"},{name:"米糠",tier:"ok"}]
    , technique:"底钓，极细钓组——0.1-0.2号子线，袖钩0.5-1号。棒花鱼嘴小且朝下，吃饵动作轻微。多是底钓鲫鱼时意外钓获。雄鱼繁殖期头部出现珠星，是小型原生鱼的爱好者收藏对象。"
    , tips:"棒花鱼是最常见的底层小鱼之一。体型虽小但在生态系统中扮演重要角色——是翘嘴、鳜鱼等掠食者的食物来源。原生鱼爱好者常将其作为鱼缸宠物。"
    , record:"常见6-12cm，最大约15-18cm。"
  },
  {     id:37, name:"军鱼(光倒刺鲃)"
    , image:BASE+"军鱼.png"
    , type:"中上层"
    , diet:"杂食"
    , rarity:4
    , difficulty:4
    , months:[5,6,7,8,9]
    , peakMonths:[6,7,8]
    , habitat:"长江以南清澈的江河溪流中上层，喜在急流和深潭交界处活动。俗称军鱼，是南方溪流中的明星鱼种。"
    , bait:[{name:"小亮片",tier:"best"},{name:"活虾",tier:"best"},{name:"软虫",tier:"good"},{name:"玉米粒",tier:"good"},{name:"蚯蚓",tier:"ok"},{name:"飞蝇",tier:"ok"}]
    , technique:"路亚——UL或L调竿，小亮片（3-7g）在急流处搜索。光倒刺鲃攻击迅猛、洗鳃频繁，上鱼后视觉效果一流。也可用手竿挂活虾在激流中浮钓。军鱼对水质要求很高，只在清澈的溪流中生存。"
    , tips:"军鱼是南方溪流路亚的头号目标鱼。体侧有蓝色纵纹，阳光下闪闪发光。拉力一流——同体型力量远超鲤鱼。保护等级较高，野钓建议放流。"
    , record:"常见1-3斤，大个体可达5-8斤。"
  },
  {     id:39, name:"银鲴"
    , image:BASE+"鲴鱼.png"
    , type:"底层"
    , diet:"杂食"
    , rarity:2
    , difficulty:3
    , months:[4,5,6,7,8,9,10]
    , peakMonths:[5,6,9]
    , habitat:"长江及以南水域的江河水库，喜沙石底质，在水底刮食藻类和碎屑。体型与黄尾鲴相似但体色银白。"
    , bait:[{name:"藻粉饵",tier:"best"},{name:"红虫",tier:"best"},{name:"腥香饵",tier:"good"},{name:"蚯蚓",tier:"good"},{name:"麦麸",tier:"ok"},{name:"饭粒",tier:"ok"}]
    , technique:"底钓，钓组灵敏。银鲴嘴小且位于吻部下端，用袖钩3-4号。吃饵动作比黄尾鲴更轻微，漂相极其细腻，是考验看漂功夫的终极鱼种。集群性强，找到鱼群能连杆。"
    , tips:"银鲴在有机碎屑丰富的水域中多见。虽然体型不太大，但钓银鲴的技术含量很高。野生银鲴肉质鲜美，适合做小鱼干和炸鱼。"
    , record:"常见3-8两，大个体可达1-1.5斤。"
  },
  {     id:48, name:"柳根鱼"
    , image:BASE+"柳根鱼.png"
    , type:"中上层"
    , diet:"杂食"
    , rarity:2
    , difficulty:1
    , months:[3,4,5,6,7,8,9,10,11]
    , peakMonths:[5,6,7,8]
    , habitat:"东北、华北、西北的冷水溪流和山涧中，喜清澈、高溶氧、低温的流水环境。常集群在水面附近觅食，是北方冷水溪流的标志性小型鱼类。"
    , bait:[{name:"腥香面饵",tier:"best"},{name:"红虫",tier:"best"},{name:"蚯蚓尖",tier:"good"},{name:"飞蝇",tier:"good"},{name:"小亮片",tier:"ok"},{name:"蛆虫",tier:"ok"}]
    , technique:"微型钓组浮钓水面——袖钩0.5-1号，0.1-0.2号子线。柳根鱼集群性强，找到鱼群后连杆不断，是北方溪流钓的入门经典。也可用UL路亚（1-3g小亮片）或飞蝇钓法。攻击积极、吃口干脆，体型虽小但趣味十足。"
    , tips:"柳根鱼是北方山溪中最常见的小型鱼类，也是冷水生态系统的基石物种。油炸柳根鱼酥脆可口，是东北林区的传统下酒菜。它对水质要求很高——有柳根鱼的山溪，水一定可以直接喝。东北钓友常说：会钓柳根，才算懂溪流钓。"
    , record:"常见8-15cm，大个体可达18-22cm。"
  },
  {     id:49, name:"狗鱼"
    , image:BASE+"狗鱼.png"
    , type:"中上层"
    , diet:"肉食"
    , rarity:4
    , difficulty:5
    , months:[3,4,5,6,9,10,11]
    , peakMonths:[4,5,10]
    , habitat:"东北、新疆等北方冷水湖泊河流的浅水草丛区。伏击型顶级掠食者，游泳爆发力极强，可在静止中猛然冲出捕获猎物。"
    , bait:[{name:"大亮片",tier:"best"},{name:"大型米诺",tier:"best"},{name:"活泥鳅",tier:"good"},{name:"小鱼",tier:"good"},{name:"雷蛙",tier:"ok"},{name:"铁板",tier:"ok"}]
    , technique:"路亚为主——H或XH调重竿、PE线3.0-5.0号、强力泄力轮。在水草边缘慢拖搜索，狗鱼会从草丛中爆发冲出攻击。中鱼后狗鱼会剧烈洗鳃跳跃，需要压低竿尖、稳扎稳打。冬季冰钓也是经典玩法。"
    , tips:"淡水中的活化石——狗鱼科已存在超过1.5亿年。凶猛程度超过黑鱼和鳡鱼，是真正的水中独狼。黑龙江狗鱼最大可超40斤。肉质鲜美但刺少，是东北名菜"
    , record:"常见2-5斤，大狗鱼可达20-40斤，黑龙江曾有60斤+巨狗记录。"
  },
  {     id:50, name:"宽鳍鱲"
    , image:BASE+"宽鳍鱲.png"
    , type:"中上层"
    , diet:"肉食"
    , rarity:2
    , difficulty:2
    , months:[4,5,6,7,8,9,10]
    , peakMonths:[5,6,9]
    , habitat:"南方山区清澈溪流和河流的中上层。雄鱼繁殖期体侧出现红蓝相间的婚姻色，色彩极其绚丽，被称为\\"
    , bait:[{name:"小亮片",tier:"best"},{name:"小软虫",tier:"best"},{name:"蚯蚓",tier:"good"},{name:"小虾",tier:"good"},{name:"飞蝇",tier:"ok"},{name:"苍蝇",tier:"ok"}]
    , technique:"UL路亚——1-3g小亮片或小勺在水面快速收线搜索。宽鳍鱲集群性强且攻击积极，常成群追饵。也可手竿挂蚯蚓在急流处的缓水区浮钓。中鱼后手感清晰、跳跃频繁。"
    , tips:"宽鳍鱲和马口鱼同属鱲属，外形相似但体色更艳丽（雄鱼婚姻色为红+蓝绿）。南方溪流钓的明星鱼种之一，是UL路亚入门的绝佳对象。油炸宽鳍鱲酥脆，是闽粤地区的传统下酒菜。"
    , record:"常见10-15cm，大个体可达20cm左右。"
  },
  {     id:51, name:"趴地虎"
    , image:BASE+"趴地虎.png"
    , type:"底层"
    , diet:"肉食"
    , rarity:1
    , difficulty:2
    , months:[4,5,6,7,8,9,10]
    , peakMonths:[5,6,7]
    , habitat:"南方静水或缓流的池塘、稻田、沟渠底部。喜栖息在石缝、瓦砾、淤泥处，常平趴于水底，故名\\"
    , bait:[{name:"红虫",tier:"best"},{name:"蚯蚓碎段",tier:"best"},{name:"小虾",tier:"good"},{name:"蛆虫",tier:"good"},{name:"腥香面饵",tier:"ok"},{name:"肝饵",tier:"ok"}]
    , technique:"极轻底钓——袖钩0.5-1号，0.1-0.2号子线。钓点选石头缝、瓦砾旁的泥沙底。趴地虎吃口极轻，漂相微弱，要用灵敏度极高的细尾漂。也可在傍晚用小虾逗钓石头缝。"
    , tips:"趴地虎是南方最常见的底栖小型鱼之一，体型虽小但肉质极其鲜美。江南地区常将趴地虎裹面粉油炸，酥脆到连骨头都能吃，是儿时记忆中的美味。和沙塘鳢同属塘鳢科但更小更常见。"
    , record:"常见5-10cm，大个体可达15cm左右。"
  },
  {     id:52, name:"青梢鲌"
    , image:BASE+"青稍.png"
    , type:"中上层"
    , diet:"肉食"
    , rarity:2
    , difficulty:2
    , months:[4,5,6,7,8,9,10]
    , peakMonths:[5,6,9]
    , habitat:"江河湖泊的中上层水域，常在水面集群追食小鱼小虾。体型侧扁，背部青灰色，与翘嘴同属鲌科但更小更常见。"
    , bait:[{name:"小亮片",tier:"best"},{name:"小软虫",tier:"best"},{name:"活虾",tier:"good"},{name:"蚯蚓",tier:"good"},{name:"飞蝇",tier:"ok"},{name:"小活鱼",tier:"ok"}]
    , technique:"UL路亚——2-5g小亮片在水面快速搜索。手竿可用1.5米左右浮漂挂活虾浮钓。青梢鲌集群性强、攻击积极，窗口期（清晨傍晚）效果最佳。中鱼后冲刺明显、跳跃频繁，手感优于同体型的白条。"
    , tips:"青梢鲌是比翘嘴更\\"
    , record:"常见0.3-1斤，大个体可达2-3斤。"
  },
  {     id:53, name:"溪石斑(光唇鱼)"
    , image:BASE+"溪石斑.png"
    , type:"中下层"
    , diet:"杂食"
    , rarity:3
    , difficulty:3
    , months:[4,5,6,7,8,9,10]
    , peakMonths:[5,6,9]
    , habitat:"南方（江浙、福建、广东、广西、贵州）的山涧溪流中下层，喜清澈流水和石底环境。体侧有6-7条黑色横斑，故名\\"
    , bait:[{name:"蚯蚓",tier:"best"},{name:"腥香面饵",tier:"best"},{name:"小虾",tier:"good"},{name:"红虫",tier:"good"},{name:"青苔",tier:"ok"},{name:"饭粒",tier:"ok"}]
    , technique:"溪流钓——袖钩3-5号，0.4-0.6号子线。钓点选急流旁的缓水区、石缝下方。溪石斑吃饵干脆，漂相清晰。中鱼后会向急流方向冲刺，需要稳住竿子。也可用路亚小亮片在激流中搜索。"
    , tips:"溪石斑（光唇鱼）是南方山溪中的明星鱼种——肉质极其鲜美，是闽浙山区酒席上的\\"
    , record:"常见0.2-0.5斤，大个体可达1-2斤。"
  },
  {     id:54, name:"长鳍鱲"
    , image:BASE+"长鳍鱲.png"
    , type:"中上层"
    , diet:"肉食"
    , rarity:2
    , difficulty:2
    , months:[4,5,6,7,8,9,10]
    , peakMonths:[5,6,9]
    , habitat:"南方山区清澈溪流的中上层。和宽鳍鱲同属但分布更靠南方（华南、华东南部），雄鱼婚姻色为粉红+蓝绿色，色彩柔和细腻。"
    , bait:[{name:"小亮片",tier:"best"},{name:"小软虫",tier:"best"},{name:"蚯蚓",tier:"good"},{name:"小虾",tier:"good"},{name:"飞蝇",tier:"ok"},{name:"红虫",tier:"ok"}]
    , technique:"UL路亚——1-3g小亮片在水面快速收线。长鳍鱲集群性强，攻击积极。也可用手竿挂蚯蚓在溪流中浮钓。中鱼后跳跃和洗鳃明显，色彩极美——是很多原生鱼爱好者的\\"
    , tips:"长鳍鱲和宽鳍鱲常被混称为\\"
    , record:"常见10-15cm，大个体可达18cm左右。"
  },
  {     id:55, name:"重唇鱼"
    , image:BASE+"重唇.png"
    , type:"底层"
    , diet:"杂食"
    , rarity:2
    , difficulty:3
    , months:[4,5,6,7,8,9,10]
    , peakMonths:[5,6,9]
    , habitat:"长江中上游及支流的急流深潭中，喜沙石底质。下唇特别发达厚实是其显著特征，故名\\"
    , bait:[{name:"红虫",tier:"best"},{name:"蚯蚓",tier:"best"},{name:"腥香饵",tier:"good"},{name:"蛆虫",tier:"good"},{name:"青苔",tier:"ok"},{name:"藻粉饵",tier:"ok"}]
    , technique:"底钓或急流钓——袖钩3-5号，0.4-0.6号子线。钓点选急流旁的回水区、石缝下方。重唇鱼用下唇刮食水底藻类和有机碎屑，吃饵动作较轻，需要灵敏的钓组。漂相为轻微上顶或下顿。"
    , tips:"重唇鱼（学名：Hemibarbus labeo）因下唇明显肥厚而得名，是长江上游常见的底栖鱼。和花骨鱼同属，但分布更偏西南。重唇鱼是衡量山溪生态健康的指示物种，对水质要求较高。肉质鲜美，是西南地区传统食用鱼。"
    , record:"常见0.3-1斤，大个体可达2-3斤。"
  },
  {     id:56, name:"北京花鳅"
    , image:BASE+"北京花鳅.png"
    , type:"底层"
    , diet:"杂食"
    , rarity:2
    , difficulty:2
    , months:[4,5,6,7,8,9,10]
    , peakMonths:[5,6,7]
    , habitat:"华北地区（北京、河北、山西、河南）的清澈溪流和山涧的沙石底部。身体细长，背部有明显的斑纹。"
    , bait:[{name:"红虫",tier:"best"},{name:"蚯蚓碎段",tier:"best"},{name:"腥香饵",tier:"good"},{name:"蛆虫",tier:"good"},{name:"小虾",tier:"ok"},{name:"藻粉饵",tier:"ok"}]
    , technique:"极细底钓——袖钩0.5-1号，0.1-0.2号子线。钓点选山涧溪流的沙石缝隙中。北京花鳅体型小、吃口轻，漂相需要极度灵敏才能识别。可用细尾立漂看微微的顿口。"
    , tips:"北京花鳅是华北地区特有的原生小型鳅科鱼类。体型虽小（5-10cm）但色彩斑斓——背部有规则的黑斑，观赏价值高。和泥鳅同属鳅科但更喜欢清澈流水而非静水泥底。原生鱼玩家常将其作为北京山溪生态的代表性物种来介绍。"
    , record:"常见5-10cm，大个体可达12-15cm。"
  },
  {     id:57, name:"雅罗鱼"
    , image:BASE+"雅罗.png"
    , type:"中上层"
    , diet:"杂食"
    , rarity:2
    , difficulty:2
    , months:[3,4,5,6,7,8,9,10,11]
    , peakMonths:[5,6,7,8,9]
    , habitat:"北方冷水湖泊、水库和山溪河流，尤其常见于东北、内蒙古、新疆等高纬度或高海拔水域。喜集群在开阔水域中上层活动，对低温和高溶氧环境适应性强。"
    , bait:[{name:"蚯蚓",tier:"best"},{name:"红虫",tier:"best"},{name:"腥香面饵",tier:"good"},{name:"玉米粒",tier:"good"},{name:"小虾",tier:"ok"},{name:"麦粒",tier:"ok"}]
    , technique:"浮钓或半水钓——袖钩3-5号，0.4-0.8号子线。雅罗鱼集群性强，找到鱼群后常可连竿。钓点选湖泊开阔水域、入水口或缓流区。漂相以顿口和黑漂为主，吃口干脆。也可用UL路亚或小亮片搜索中上层。"
    , tips:"雅罗鱼（学名：Leuciscus waleckii）是北方特有的冷水性鱼类，又称华子鱼、达里湖雅罗鱼。肉质细嫩鲜美，无土腥味，是内蒙古达里诺尔湖的标志性特产。雅罗鱼耐低氧、耐低温能力极强，是研究鱼类抗寒抗碱的重要模式物种。"
    , record:"常见20-35cm，大个体可达50cm。"
  }
]

const HOT_FISH = ['鲫鱼', '鲤鱼', '草鱼', '鳊鱼', '翘嘴']

function starStr(n) { var s=''; for(var i=0;i<(n||1);i++) s+='★'; for(var i=(n||1);i<5;i++) s+='☆'; return s }
function diffStr(n) { var s=''; for(var i=0;i<(n||1);i++) s+='◆'; for(var i=(n||1);i<5;i++) s+='◇'; return s }

module.exports = { FISH_SPECIES, HOT_FISH, starStr, diffStr, BASE }