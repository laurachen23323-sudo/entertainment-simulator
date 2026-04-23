const STORAGE_KEY = "entertainment-royal-simulator-showcase-v1";

const profileDb = {
  surnames: ["闻", "沈", "顾", "裴", "姜", "温", "迟", "程", "岑", "许", "祁", "宋", "陆", "乔", "苏", "林", "谢", "简"],
  given: ["夏", "枝", "遥", "棠", "妤", "岚", "予", "澈", "漾", "霁", "栀", "宁", "屿", "澄", "星", "言", "初", "梨", "宛", "昭"],
  cities: ["临川市", "海栖市", "霁城", "望京市", "南岚市", "栖湾市"],
  companies: ["曜升传媒", "澜映娱乐", "星峤文化", "映禾影业", "灿汐传媒", "晟光娱乐"],
  shows: ["《星阶之上》", "《追光训练营》", "《明日舞台》", "《灼灼新声》"],
  occupations: ["练习生", "十八线演员", "网红", "爱豆", "待爆小花", "新人歌手"],
  routes: ["玩票型", "事业型", "野心型", "花瓶型"],
  reasons: ["公司高层明确押注你", "家里资本链条深，公司不敢怠慢", "老板私下点名，今年要先推你", "平台和品牌都愿意提前给你开路"],
  looks: ["眉眼明艳，镜头浓颜", "轮廓精致，气质偏冷", "五官立体，氛围感很强", "笑起来很甜，皮相上镜"],
  faceNotes: ["肩颈线漂亮，上镜优势明显", "骨相利落，近景耐看", "肤色冷白，适合浓妆", "体态舒展，站姿很稳"],
  personalities: [
    ["外柔内韧", "心思细密", "见招拆招", "爱憎分明"],
    ["表里分明", "不动声色", "进退有度", "自尊心强"],
    ["沉得住气", "玲珑剔透", "不肯服输", "慢热谨慎"],
    ["嘴硬心软", "审时度势", "藏锋守拙", "心气很高"]
  ],
  tags: ["清冷门面", "黑红预备役", "镜头宠儿", "资源咖", "热搜体质", "氛围感选手", "舞台脸", "争议新人"],
  colors: ["月白银", "雾玫瑰", "碎金杏", "海盐蓝", "浅樱粉"],
  goals: [
    "起初只是来玩一玩，现在不想轻易认输",
    "想借这次机会拿到真正属于自己的位置",
    "想证明自己不是一个只会被捧着走的人",
    "看似随意，其实很想红得体面"
  ]
};

const storyFlow = [
  { id: "meeting", title: "企划夜" },
  { id: "dorm", title: "宿舍初见" },
  { id: "theme", title: "主题曲站位" },
  { id: "practice", title: "训练发酵" },
  { id: "camera", title: "镜头试拍" },
  { id: "mentor", title: "导师会面" },
  { id: "ranking", title: "名次风声" },
  { id: "stage", title: "第一次公演" },
  { id: "broadcast", title: "播出当夜" },
  { id: "finale", title: "展示版收束" }
];

const storyNodes = {
  meeting: {
    phase: "序章",
    title: "企划夜",
    timeLabel: "晚上 21:40",
    scene: state => `曜升传媒十八楼会议室的灯亮到很晚。

你推门进去的时候，桌上已经摊开了整套${state.world.show}的前期企划。纸张边缘压着妆造图、采访提纲、舞台示意图，最上面那一页甚至把镜头分配都标得清清楚楚。

而最显眼的那个名字，是你。

经纪人${state.npcs.manager.name}坐在长桌尽头，连眼神都很稳。她没说废话，只把两份方案推到你面前：“从今天开始，你不是普通新人。公司能给你的，都会给。问题是，你打算怎么接。”`,
    choices: [
      {
        title: "先看稳妥方案",
        desc: "先保住完成度，不急着把争议一次拉满。",
        result: state => `你把纸页一张张翻过去，连舞台灯位和备采顺序都看得很仔细。那是一套相对稳妥的方案，不够炸，却给了你能站稳的空间。至少第一步，不至于让所有人都在等你摔跤。`,
        effect: { skill: 4, controversy: -4, manager: 4, mood: 1 },
        next: "dorm"
      },
      {
        title: "直接看最偏向你的版本",
        desc: "先看看公司到底愿意把偏爱给到什么程度。",
        result: state => `你翻到另一版时，几乎笑不出来。主视觉向你倾斜，妆造重点落在你身上，镜头切换的节拍也像在替你让路。那不是照顾，是明牌。你忽然很清楚，别人以后看你的眼神，绝不会干净。`,
        effect: { heat: 10, controversy: 7, company: 4, mood: -1 },
        next: "dorm"
      },
      {
        title: "先问公司到底想把我捧到什么位置",
        desc: "先把话问透，再决定怎么走。",
        result: state => `${state.npcs.manager.name}没有回避，只是看了你一眼：“时尚脸，综艺面孔，节目里要记住你，节目外也要认得你。”她说得太平静了，平静到像在谈一份已经签好的结果。那一刻，你第一次真正意识到自己不是被试试，而是被押注。`,
        effect: { company: 6, manager: 3, public: 1, mood: 1 },
        next: "dorm"
      }
    ],
    customNext: "dorm",
    jumpNext: "dorm"
  },
  dorm: {
    phase: "录制前夜",
    title: "宿舍初见",
    timeLabel: "次日 下午 16:10",
    scene: state => `宿舍名单还没正式公布，风声却已经先一步吹进了练习室。

有人在补妆镜前压低声音，说你会被安排进最有戏的那间；也有人一边系鞋带一边冷笑，说皇族果然连床位都有人提前铺好。你拖着行李停在走廊拐角，门牌上贴着你要住进去的房间号。

门里有人说话，门外的空气很静。

这种时候，你的一举一动都会被记住。`,
    choices: [
      {
        title: "先敲门，主动打招呼",
        desc: "把最尴尬的第一面先抢在自己手里。",
        result: state => `你先敲了门，再把行李推进去。房间里一瞬安静下来，几双眼睛都落在你身上。你没有装作没听见那些风言风语，只是笑了笑，说以后要一起住，先认识一下。气氛没有立刻融化，但最难堪的那几秒，至少没有失控。`,
        effect: { public: 3, mood: 2, rival: 3 },
        next: "theme"
      },
      {
        title: "装作没听见，先观察所有人",
        desc: "不急着解释，也不急着示弱。",
        result: state => `你把行李放好，像是什么都没听见。有人因此更看不透你，也有人把这份沉默解读成傲气。表面上风平浪静，实际上从这一刻起，房间里每个人都在重新衡量你。`,
        effect: { mood: 1, controversy: 1, rival: -2, skill: 1 },
        next: "theme"
      },
      {
        title: "转身去找经纪人确认是谁先放的风",
        desc: "先确认消息源头，不让自己被动挨打。",
        result: state => `你没有立刻进门，而是先去找了${state.npcs.manager.name}。她没直接回答，只淡淡地说了一句：“会传出来的事，本来就没打算完全藏。”你站在走廊灯下，忽然明白这阵风未必是意外。`,
        effect: { company: 3, controversy: 2, manager: 2, heat: 2 },
        next: "theme"
      }
    ],
    customNext: "theme",
    jumpNext: "theme"
  },
  theme: {
    phase: "第一次练习",
    title: "主题曲站位",
    timeLabel: "两天后 上午 10:20",
    scene: state => `主题曲站位表发下来的那一刻，整个练习室像是被人轻轻按了静音。

你的位置比大多数人预想得更靠前。

不是中心，却足够显眼；不是一眼就会挨骂的程度，却刚好让所有人都看得出这不是普通新人能拿到的位置。执行导演${state.npcs.director.name}站在监视器旁边，神情很淡，像什么都没发生。

可你知道，这一步已经把你推到所有人的视野正中。`,
    choices: [
      {
        title: "先把站位吃透，再去补动作细节",
        desc: "先用稳住自己来回应质疑。",
        result: state => `你没有为站位多说一个字，只把每个点位走得极准。音乐一遍遍响起，脚步一寸寸卡回节拍里。旁边的人再不服，也不得不承认，至少在这一刻，你没有浪费这个位置。`,
        effect: { skill: 5, public: 2, controversy: -1 },
        next: "practice"
      },
      {
        title: "直接问导演为什么这样排",
        desc: "把这份偏爱摊开来问。",
        result: state => `你走到监视器旁边，声音不高，却足够让近处的人都听清：“这个位置，节目组是按什么标准给的？”${state.npcs.director.name}看着你，笑意很浅，只回了一句：“镜头先看画面。”这句话没有回答你的问题，却让更多人开始猜。`,
        effect: { director: 3, heat: 4, controversy: 3, mood: -1 },
        next: "practice"
      },
      {
        title: "先照做，但把每个盯着我的人记下来",
        desc: "不出头，先把局势看全。",
        result: state => `你什么都没说，只是把视线从镜子里一道道掠过去。谁不服，谁收得住表情，谁明明在笑却一直在看你，你都记下来了。很多时候，知道谁在盯你，比当场解释更有用。`,
        effect: { mood: 1, skill: 2, rival: -3, manager: 1 },
        next: "practice"
      }
    ],
    customNext: "practice",
    jumpNext: "practice"
  },
  practice: {
    phase: "训练发酵",
    title: "训练发酵",
    timeLabel: "当周 晚上 22:35",
    scene: state => `合练开始以后，很多情绪都藏不住了。

你明明只是站在自己的位置上，周围的空气却总像隔着一层什么。有人在你失误时明显松了一口气，也有人在你跳对时把嘴抿得更紧。同期练习生${state.npcs.rival.name}是训练室里最稳的那一批，偏偏和你分在同组。

练习室灯光很白，镜子把每个人的表情都照得清清楚楚。`,
    choices: [
      {
        title: "主动加练，先把自己练到没法挑",
        desc: "业务先顶上去，别让别人骂得太顺手。",
        result: state => `你把音乐一遍遍往回倒，直到小腿发酸，鞋底都蹭出细碎的摩擦声。辛苦是真的辛苦，但训练室里最难骗过的就是镜子。等你终于把动作卡稳，有些视线虽然还是不服，却已经没法再那么轻易地否定你。`,
        effect: { skill: 7, mood: -2, public: 3 },
        next: "camera"
      },
      {
        title: "借合练和对手试着磨一次配合",
        desc: "先把最危险的竞争关系放到明面上。",
        result: state => `你主动走过去，对${state.npcs.rival.name}说要不要把走位再对一遍。对方先是一怔，随后还是点了头。你们的关系没有因此变好，却至少从暗地较劲，变成了彼此都得承认对方存在。`,
        effect: { rival: 5, public: 1, controversy: -1, skill: 2 },
        next: "camera"
      },
      {
        title: "故意让自己看起来很松弛",
        desc: "不想把焦虑全暴露给别人看。",
        result: state => `你一边练一边笑，像这件事根本压不住你。有人因此觉得你游刃有余，也有人在背后说，你果然连紧张都不用演。轻松是真的轻松了一点，可议论也跟着更多了。`,
        effect: { heat: 3, controversy: 3, mood: 2, public: -1 },
        next: "camera"
      }
    ],
    customNext: "camera",
    jumpNext: "camera"
  },
  camera: {
    phase: "镜头试拍",
    title: "镜头试拍",
    timeLabel: "录制前三天 下午 15:10",
    scene: state => `第一次机位试拍比所有人想象中都安静。

没有正式观众，没有响亮音乐，只有轨道车缓缓推过地板的声音，还有导演组偶尔交代灯位的低声。轮到你站到机位正中时，打光师抬头多看了你一眼，旁边有人把监视器角度往你这边偏了一点。

这样的偏移很小，小到谁都可以说只是工作习惯；又大到足够让所有人心里都有数。`,
    choices: [
      {
        title: "顺着镜头做，把表情和停顿都吃满",
        desc: "既然给了镜头，就把它用到极致。",
        result: state => `你没有躲镜头，反而把每一个停顿都接得更稳。监视器里的人比平时更醒，连妆还没完全定住的脸都已经有了故事感。偏爱是偏爱，可你至少没有浪费它。`,
        effect: { heat: 6, public: 3, director: 4, controversy: 1 },
        next: "mentor"
      },
      {
        title: "主动要求再来一条更朴素的版本",
        desc: "不想让“被捧”表现得太明显。",
        result: state => `你看完回放，主动说想再录一条更收一点的版本。现场的人明显愣了一下，连${state.npcs.director.name}都沉默了两秒，最后还是点头。你知道，这种细微的克制也会被人记住。`,
        effect: { controversy: -3, public: 3, director: 2, company: -1 },
        next: "mentor"
      },
      {
        title: "先装作配合，回头记下今天所有反应",
        desc: "先摸透谁在推、谁在看、谁在忍。",
        result: state => `你照着流程做完，没有额外表态，只在心里把现场每一张脸都过了一遍。谁在你出镜时更专注，谁故意移开眼，谁低头发消息，你都记下来了。镜头不会说话，人会。`,
        effect: { skill: 2, mood: 1, manager: 1, rival: -2 },
        next: "mentor"
      }
    ],
    customNext: "mentor",
    jumpNext: "mentor"
  },
  mentor: {
    phase: "录制开始",
    title: "导师会面",
    timeLabel: "录制当天 中午 12:15",
    scene: state => `正式录制前的导师碰面短得像一场试探。

化妆间外的走廊灯光很亮，大家都在赶节奏。导师进来时，房间里那种浮躁忽然压下去一层。轮到你时，对方没有先夸脸，也没有先问背景，只是把你的练习片段调出来，看了几秒以后，平静地问：“你想被记住的，到底是脸，还是人？”`,
    choices: [
      {
        title: "说我想靠作品留下来",
        desc: "先把姿态放在业务上。",
        result: state => `你没有绕，回答得很直。导师看了你几秒，没说好也没说不好，只让你把后半段动作再做一次。那不是认可，却是一种更严肃的对待。`,
        effect: { skill: 3, public: 2, mood: 1 },
        next: "ranking"
      },
      {
        title: "说我不介意先被争议记住",
        desc: "黑红也是红，先要被看见。",
        result: state => `房间里静了一下。导师似乎没想到你会说得这么直接，随即轻轻笑了一声：“那你就要准备好，别人记住你的方式不会太温柔。”你听见这句话时，心里反而更安定了一点。`,
        effect: { heat: 5, controversy: 4, mood: 1, director: 1 },
        next: "ranking"
      },
      {
        title: "说我只想先活过这一轮",
        desc: "不装，也不硬撑。",
        result: state => `你垂眼笑了一下，说自己先想把这一轮撑过去。导师的神情反而缓了缓，像是终于看见了你身上不那么被包装的那部分。那一瞬间，房间里的空气都轻了一点。`,
        effect: { public: 4, mood: 3, controversy: -1 },
        next: "ranking"
      }
    ],
    customNext: "ranking",
    jumpNext: "ranking"
  },
  ranking: {
    phase: "风声最响",
    title: "名次风声",
    timeLabel: "公演前夜 晚上 23:00",
    scene: state => `第一次阶段性名次还没正式公布，风声已经先一步传开了。

有人说你一定在前排，有人说节目组不会让皇族太难看，也有人笃定你会被拿去祭天。洗手间、走廊、候场区，到处都像漂着一层看不见的细灰，落在哪儿都让人不舒服。

这种时候，连沉默都会被解读。`,
    choices: [
      {
        title: "继续练，不回应风声",
        desc: "把所有注意力压回舞台本身。",
        result: state => `你把耳机塞回去，像是什么都没听见。外面的议论并没有停，但至少你没有让它们顺着你的反应继续长大。练习室镜子里，你的神情第一次显得比那些传闻更硬。`,
        effect: { skill: 4, controversy: -2, mood: -1, public: 2 },
        next: "stage"
      },
      {
        title: "去问导演组是不是在故意放风",
        desc: "不想一直做最后一个知道的人。",
        result: state => `你把问题直接抛到台面上，现场一瞬间很静。没有人承认，也没有人否认，可那种微妙的停顿已经足够说明很多事。你走出来的时候，心里反而更沉了。`,
        effect: { director: 2, company: 1, controversy: 3, heat: 2 },
        next: "stage"
      },
      {
        title: "去找同期对手，当面把话说开",
        desc: "不让所有较劲都只停在背后。",
        result: state => `你没有兜圈子，直接去找了${state.npcs.rival.name}。对方看着你，沉默了很久，最后只说了一句：“你要是站得住，谁也拿不走。”这不算和解，却比继续猜来猜去轻松多了。`,
        effect: { rival: 6, mood: 2, public: 1 },
        next: "stage"
      }
    ],
    customNext: "stage",
    jumpNext: "stage"
  },
  stage: {
    phase: "第一次公演",
    title: "第一次公演",
    timeLabel: "公演当天 晚上 20:45",
    scene: state => `候场区的灯比平时暗，只有台口那一道光亮得刺眼。

你站在那道光后面，能听见观众席压不住的尖叫，也能听见自己耳返里轻微的电流声。工作人员来来回回，妆造、收音、机位、倒计时，每个人都像在赶一场注定不会温柔的审判。

台上很快就会轮到你。

这一回，所有偏爱、所有争议、所有不服，都会跟着灯一起亮起来。`,
    choices: [
      {
        title: "把情绪压住，按最稳的状态上台",
        desc: "先把舞台完成，再谈其他。",
        result: state => `你走上台时没有多余动作，只把呼吸稳下来，跟着节拍一步一步踩进光里。等最后一个定点落下，你听见观众席里真正响起了一阵不带迟疑的尖叫。那一刻，你知道自己至少用舞台替自己撑回了一部分东西。`,
        effect: { skill: 6, public: 5, controversy: -2, heat: 4 },
        next: "broadcast"
      },
      {
        title: "把最亮眼的镜头做满",
        desc: "既然所有人都盯着，就让他们彻底记住。",
        result: state => `你知道哪一秒会切近景，也知道哪一处最容易留下记忆点。于是你没有收。镜头扫过来的时候，整个人像被那束光稳稳托住。台下掌声很响，弹幕会更响，骂声也一样。`,
        effect: { heat: 9, controversy: 5, director: 3, public: 1 },
        next: "broadcast"
      },
      {
        title: "临上台前去和同期对手碰一下拳",
        desc: "把对抗变成并肩一秒。",
        result: state => `你上台前伸出手，对方愣了一下，还是跟你轻轻碰了一下拳。那个动作短得几乎没人看见，却让你在踩上第一个点位时，心里比想象中更稳。很多关系也许不会一下变好，但会开始松动。`,
        effect: { rival: 5, mood: 3, public: 2, skill: 2 },
        next: "broadcast"
      }
    ],
    customNext: "broadcast",
    jumpNext: "broadcast"
  },
  broadcast: {
    phase: "热搜上升",
    title: "播出当夜",
    timeLabel: "播出当晚 23:48",
    scene: state => {
      const bias = state.status.controversy > state.status.public ? "骂声和夸声几乎缠在一起" : "夸奖明显压过了原本等着看笑话的那批人";
      return `节目播出的那一刻，后台安静得只剩下手机震动声。

热搜词条一个接一个往上蹿，物料截图开始在各个平台疯传。有人盯着你的近景反复看，有人把站位和镜头分配剪成对比图，也有人直接写下“皇族也得承认这张脸真会吃镜头”。

评论区里，${bias}。

你坐在休息室最里面，屏幕光落在脸上，像另一种更冷的打光。你知道，从今晚开始，别人不可能再装作看不见你。`;
    },
    choices: [
      {
        title: "让公司先按住最刺眼的黑词条",
        desc: "先稳住舆论，不让局面炸穿。",
        result: state => `${state.npcs.manager.name}接起电话时一句废话都没说，公关组很快开始动。最刺眼的几个黑词条没有继续往上冲，代价却是你也更明确地感受到，公司是真的把牌压在你身上。`,
        effect: { company: 4, controversy: -4, heat: 2, manager: 2 },
        next: "finale"
      },
      {
        title: "不压，让讨论继续发酵",
        desc: "黑红也是红，先把名字打出去。",
        result: state => `你看着那些词条往上爬，没有说停。夸你的人开始更大声，骂你的人也同样不肯收手，可有一件事已经很清楚：今晚以后，再没人能把你归进“没人记得住”的那一列。`,
        effect: { heat: 8, controversy: 5, mood: 1, public: -1 },
        next: "finale"
      },
      {
        title: "关掉手机，先回练习室",
        desc: "在最热的时候先把自己从讨论里抽出去。",
        result: state => `你把手机扣在桌上，转身回了空荡荡的练习室。音乐重新响起来的时候，外面的热搜还在涨，你却第一次没被它拽着走。你知道这不是退缩，而是在替自己抢回一点节奏。`,
        effect: { skill: 3, public: 3, mood: 4, controversy: -1 },
        next: "finale"
      }
    ],
    customNext: "finale",
    jumpNext: "finale"
  },
  finale: {
    phase: "展示版收束",
    title: "第一幕收束",
    timeLabel: "次日 凌晨 01:20",
    scene: state => {
      const routeText = getEndingTone(state);
      return `凌晨之后，楼下的车声都稀了。

你终于一个人坐下来，把今天发生过的一切从头到尾想了一遍。被偏爱的痕迹没有消失，争议也没有凭空蒸发，可你已经不再只是那个被推进灯下的人。

你开始学会在镜头里站稳，在关系里拿捏分寸，也开始慢慢分得清什么是别人替你安排的路，什么是你自己想走的方向。

${routeText}

这不是结局。

只是展示版的第一幕，到这里，终于像一场真正开始过的故事。`;
    },
    choices: [],
    isEnding: true
  }
};

const state = {
  turn: 1,
  world: null,
  profile: null,
  status: null,
  npcs: null,
  feeds: [],
  logs: [],
  currentNodeId: "meeting",
  chapter: "序章",
  complete: false
};

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function pickMany(list, count) {
  const pool = [...list];
  const out = [];
  while (pool.length && out.length < count) {
    out.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
  }
  return out;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function randomName() {
  return pick(profileDb.surnames) + pick(profileDb.given) + pick(profileDb.given);
}

function randomGrade() {
  return pick(["A", "A-", "B+", "B", "B-", "C+", "C"]);
}

function formatWorldTime(label) {
  return `架空纪年2026年4月｜${label}`;
}

function toast(text) {
  const node = document.getElementById("toast");
  node.textContent = text;
  node.classList.add("show");
  clearTimeout(node._timer);
  node._timer = setTimeout(() => node.classList.remove("show"), 2200);
}

function buildWorld() {
  return {
    city: pick(profileDb.cities),
    company: pick(profileDb.companies),
    show: pick(profileDb.shows),
    displayTime: formatWorldTime(storyNodes.meeting.timeLabel)
  };
}

function buildProfile(keepName) {
  const nameInput = document.getElementById("nameInput").value.trim();
  const ageInput = Number(document.getElementById("ageInput").value);
  const genderInput = document.getElementById("genderInput").value;
  const toneInput = document.getElementById("toneInput").value;
  const extraInput = document.getElementById("extraInput").value.trim();
  const personality = pick(profileDb.personalities);
  return {
    name: keepName && state.profile ? state.profile.name : (nameInput || randomName()),
    age: ageInput || Math.floor(Math.random() * 9) + 18,
    gender: genderInput || pick(["女", "男"]),
    occupation: pick(profileDb.occupations),
    route: toneInput === "随机" ? pick(profileDb.routes) : toneInput,
    reason: pick(profileDb.reasons),
    looks: pick(profileDb.looks),
    faceNote: pick(profileDb.faceNotes),
    personality: personality.join("、"),
    goal: extraInput ? `${extraInput}。这件事会一点点影响你后面做的每次决定。` : pick(profileDb.goals),
    tags: pickMany(profileDb.tags, 3),
    fanColor: pick(profileDb.colors),
    ability: {
      "演技": randomGrade(),
      "唱功": randomGrade(),
      "跳舞": randomGrade(),
      "综艺": randomGrade(),
      "镜头感": pick(["A", "A-", "B+"]),
      "时尚": pick(["A", "A-", "B+"])
    }
  };
}

function buildStatus() {
  return {
    heat: 45,
    controversy: 42,
    public: 46,
    company: 76,
    mood: 58,
    skill: 50
  };
}

function buildNpcs() {
  return {
    manager: {
      id: "manager",
      name: randomName(),
      gender: "女",
      age: Math.floor(Math.random() * 7) + 28,
      role: "经纪人",
      looks: "短发利落，五官锋锐，有压迫感",
      personality: ["精明强干", "滴水不漏", "冷静克制", "说一不二"],
      tags: ["铁腕经纪", "护短", "利益优先"],
      favor: 64,
      ability: { "资源运作": "A", "公关能力": "A", "判断力": "A-" },
      network: ""
    },
    director: {
      id: "director",
      name: randomName(),
      gender: "男",
      age: Math.floor(Math.random() * 5) + 29,
      role: "执行导演",
      looks: "斯文清隽，笑意很浅",
      personality: ["八面玲珑", "审时度势", "避重就轻", "城府不浅"],
      tags: ["懂流量", "会做戏", "笑面狐狸"],
      favor: 44,
      ability: { "综艺策划": "A", "镜头感知": "A", "现场协调": "B+" },
      network: ""
    },
    rival: {
      id: "rival",
      name: randomName(),
      gender: state.profile && state.profile.gender === "女" ? "女" : pick(["女", "男"]),
      age: Math.floor(Math.random() * 5) + 19,
      role: "同期练习生",
      looks: "眉眼清秀，气质干净，镜头缘不错",
      personality: ["表面客气", "心气很高", "要强好胜", "敏感细致"],
      tags: ["竞争对手", "训练室强手", "不好惹"],
      favor: 28,
      ability: { "唱功": "B+", "跳舞": "A-", "镜头感": "B+" },
      network: ""
    }
  };
}

function hydrateNetworks() {
  state.npcs.manager.network = `${state.profile.name}
├─ 直属艺人：${state.profile.name}
├─ 所属公司：${state.world.company}
├─ 对接项目：${state.world.show}
└─ 圈内评价：能捧人，也能压事`;
  state.npcs.director.network = `${state.npcs.director.name}
├─ 所属项目：${state.world.show}
├─ 对接对象：${state.world.company}
├─ 工作往来：${state.npcs.manager.name}
└─ 当前印象：${state.profile.name}值得押镜头，也容易惹争议`;
  state.npcs.rival.network = `${state.profile.name}
├─ 同期身份：同节目选手
├─ 当前关系：表面客气，暗暗较劲
└─ 外界印象：业务底子比你更容易服众`;
}

function syncFormWithProfile() {
  if (!state.profile) return;
  document.getElementById("nameInput").value = state.profile.name || "";
  document.getElementById("ageInput").value = state.profile.age || "";
  document.getElementById("genderInput").value = state.profile.gender || "";
  document.getElementById("toneInput").value = profileDb.routes.includes(state.profile.route) ? state.profile.route : "随机";
}

function createInitialFeeds() {
  state.feeds = [
    "“还没正式进组，待遇就已经不像普通新人了。”",
    "“她这张脸确实很吃镜头，但资源也是真的明牌。”",
    "“要是业务能撑起来，这种黑红路线未必不能走。”",
    "“节目还没播，围着她的风声已经够多了。”"
  ];
}

function getCurrentNode() {
  return storyNodes[state.currentNodeId];
}

function calcProgress() {
  const index = storyFlow.findIndex(item => item.id === state.currentNodeId);
  const base = index < 0 ? storyFlow.length : index;
  const ratio = state.complete ? 100 : Math.round((base / (storyFlow.length - 1)) * 100);
  return clamp(ratio, 0, 100);
}

function calcFanSummary() {
  const totalBase = 20 + state.status.heat * 0.9 + state.status.public * 0.45 + state.status.company * 0.22;
  const only = totalBase * (0.22 + state.status.public / 350);
  const passerby = totalBase * (0.28 + state.status.heat / 520);
  const black = totalBase * (0.07 + state.status.controversy / 430);
  return {
    total: `${totalBase.toFixed(1)}万`,
    only: `${only.toFixed(1)}万`,
    passerby: `${passerby.toFixed(1)}万`,
    black: `${black.toFixed(1)}万`
  };
}

function buildOpeningStory() {
  return `四月末的风从${state.world.city}的高楼缝隙里穿过去，吹过摄影棚、练习室和挂满海报的综艺大楼，把整个娱乐圈吹得明亮又浮躁。

你现在的身份是${state.profile.occupation}。在大多数人眼里，你的资历还不够，作品也不算多，可偏偏从定妆、路透、镜头顺序到节目对接，处处都比同层级的人更显眼。关于你是“皇族”的风声，早就在圈子里悄悄传开。

有人说，是因为${state.profile.reason}；也有人说，公司只是想赌你这张脸能不能换来一场爆红。你自己也清楚，这份偏爱从来不是白拿的。镜头多一秒，争议就会跟着多一层。`;
}

function getEndingTone(currentState) {
  if (currentState.status.public >= 60 && currentState.status.controversy <= 48) {
    return "至少在这一夜过去以后，很多原本准备好要骂你的人，已经没法再把你简单归成一个空心的资源咖。";
  }
  if (currentState.status.controversy >= 60 && currentState.status.heat >= 70) {
    return "你确实以一种足够刺眼的方式被记住了。喜欢和讨厌都来得很凶，可娱乐圈里，能让人记住本身就已经是一种位置。";
  }
  if (currentState.status.company >= 82) {
    return "你能明显感觉到，公司已经把更多牌往你面前推过来。接下来会更顺，也会更难，因为所有人都知道你不会被轻易放下。";
  }
  return "你还没有真正赢，也没有真的输。可至少现在，别人再提起你，已经不会只剩一句轻飘飘的“她就是被捧”。";
}

function renderHeader() {
  document.getElementById("turnChip").textContent = `第 ${state.turn} 回合`;
  document.getElementById("timeChip").textContent = state.world ? state.world.displayTime : "时间未开始";
  document.getElementById("progressChip").textContent = `主线 ${calcProgress()}%`;
  document.getElementById("phaseChip").textContent = state.chapter;
}

function renderSummaryPanel() {
  const progress = calcProgress();
  const currentId = state.currentNodeId;
  const currentIndex = storyFlow.findIndex(item => item.id === currentId);
  const progressHtml = storyFlow.map((item, itemIndex) => {
    const cls = itemIndex < currentIndex || state.complete && item.id === currentId
      ? "progress-step done"
      : item.id === currentId
        ? "progress-step current"
        : "progress-step";
    const label = item.id === currentId ? "当前" : itemIndex < currentIndex ? "已完成" : "待推进";
    return `<div class="${cls}"><strong>${item.title}</strong><span class="badge">${label}</span></div>`;
  }).join("");
  document.getElementById("summaryPanel").innerHTML = `
    <div class="summary-box">
      <div class="small">当前章节：${state.chapter}</div>
      <div class="small" style="margin-top: 6px;">这版是固定主线展示稿：完整一幕、清晰分支、无随机空转。选项会改变氛围和状态，但不会再把剧情绕回原地。</div>
      <div class="meter"><div class="meter-bar" style="width:${progress}%"></div></div>
    </div>
    <div class="progress-track">${progressHtml}</div>
  `;
}

function renderCoreStatus() {
  const list = [
    { title: "话题热度", key: "heat" },
    { title: "争议指数", key: "controversy" },
    { title: "路人好感", key: "public" },
    { title: "公司支持", key: "company" },
    { title: "个人状态", key: "mood" },
    { title: "业务底气", key: "skill" }
  ];
  document.getElementById("coreStatusGrid").innerHTML = list.map(item => `
    <div class="status-card">
      <div class="stat-title">${item.title}</div>
      <div class="stat-value">${state.status[item.key]}</div>
      <div class="meter"><div class="meter-bar" style="width:${state.status[item.key]}%"></div></div>
    </div>
  `).join("");
}

function renderQuickStats() {
  const fans = calcFanSummary();
  const stats = [
    ["身份", state.profile.occupation],
    ["所属公司", state.world.company],
    ["节目起点", state.world.show],
    ["皇族原因", state.profile.reason],
    ["当前路线", state.profile.route],
    ["总关注量", fans.total]
  ];
  document.getElementById("quickStats").innerHTML = stats.map(([title, value]) => `
    <div class="stat">
      <div class="stat-title">${title}</div>
      <div class="stat-value">${value}</div>
    </div>
  `).join("");
}

function renderProfile() {
  const fans = calcFanSummary();
  document.getElementById("profilePanel").innerHTML = `
    <div class="small">姓名：${state.profile.name}｜年龄：${state.profile.age}｜性别：${state.profile.gender}</div>
    <div class="small" style="margin-top: 6px;">容貌：${state.profile.looks}｜体态：${state.profile.faceNote}</div>
    <div class="small" style="margin-top: 6px;">性格：${state.profile.personality}</div>
    <div class="small" style="margin-top: 6px;">职业：${state.profile.occupation}｜路线：${state.profile.route}</div>
    <div class="small" style="margin-top: 6px;">目标：${state.profile.goal}</div>
    <div class="badge-list" style="margin-top: 12px;">${state.profile.tags.map(tag => `<span class="badge">${tag}</span>`).join("")}</div>
    <div class="ability-grid">
      ${Object.entries(state.profile.ability).map(([key, value]) => `<div class="ability"><span>${key}</span><strong>${value}</strong></div>`).join("")}
    </div>
    <div class="tree">粉丝数量
├─ 总关注量：${fans.total}
├─ 唯粉：${fans.only}
├─ 看脸路人粉：${fans.passerby}
├─ 潜在黑粉：${fans.black}
└─ 应援色：${state.profile.fanColor}</div>
  `;
}

function renderStory() {
  const node = getCurrentNode();
  const sceneText = typeof node.scene === "function" ? node.scene(state) : node.scene;
  const opening = state.turn === 1 ? buildOpeningStory() + "\n\n" : "";
  const lastLog = state.logs[0]
    ? `上一回合结束后，${state.logs[0].result}\n\n现在，新的事已经到了眼前。`
    : "";
  document.getElementById("storyBlock").textContent = opening + lastLog;
  document.getElementById("storyTimeBadge").textContent = state.world.displayTime;
  document.getElementById("chapterBadge").textContent = node.phase;
  document.getElementById("eventTitle").textContent = `【事件】${node.title}`;
  document.getElementById("eventDesc").textContent = sceneText;
  if (node.isEnding) {
    document.getElementById("optionList").innerHTML = `
      <button class="option-btn" data-ending="restart">
        <strong>重新开始这段展示版</strong>
        <span>重新生成人物与路线，再体验一次完整主线。</span>
      </button>
    `;
    return;
  }
  document.getElementById("optionList").innerHTML = node.choices.map((choice, index) => `
    <button class="option-btn" data-index="${index}">
      <strong>${index + 1}. ${choice.title}</strong>
      <span>${choice.desc}</span>
    </button>
  `).join("");
}

function renderNPCs() {
  const list = [state.npcs.manager, state.npcs.director, state.npcs.rival];
  document.getElementById("npcList").innerHTML = list.map(npc => `
    <article class="npc-card">
      <div class="npc-head">
        <div>
          <div class="npc-name">${npc.name}</div>
          <div class="small">${npc.gender}｜${npc.age}岁｜${npc.role}</div>
        </div>
        <div class="badge-list">${npc.tags.map(tag => `<span class="badge">${tag}</span>`).join("")}</div>
      </div>
      <div class="small" style="margin-top: 10px;">容貌：${npc.looks}</div>
      <div class="small">性格：${npc.personality.join("、")}</div>
      <div class="ability-grid">
        ${Object.entries(npc.ability).map(([key, value]) => `<div class="ability"><span>${key}</span><strong>${value}</strong></div>`).join("")}
      </div>
      <div class="small" style="margin-top: 10px;">对主角好感度：${npc.favor}</div>
      <div class="tree">${npc.network}</div>
    </article>
  `).join("");
}

function renderFeeds() {
  document.getElementById("feedList").innerHTML = state.feeds.map((feed, index) => `
    <article class="feed-item">
      <div class="feed-head">
        <strong>热议 ${index + 1}</strong>
        <span class="badge">围观中</span>
      </div>
      <div class="small" style="margin-top: 10px;">${feed}</div>
    </article>
  `).join("");
}

function renderLogs() {
  if (!state.logs.length) {
    document.getElementById("logList").innerHTML = `<div class="center-empty">还没有推进记录。选择当前事件中的一个行动，主线就会继续往下走。</div>`;
    return;
  }
  document.getElementById("logList").innerHTML = state.logs.map(log => `
    <article class="log-item">
      <div class="log-head">
        <strong>第 ${log.turn} 回合｜${log.title}</strong>
        <span class="badge">${log.time}</span>
      </div>
      <div class="small" style="margin-top: 10px;">${log.result}</div>
      <div class="status-line">${log.impact.map(item => `<span class="status-pill">${item}</span>`).join("")}</div>
    </article>
  `).join("");
}

function renderAll() {
  renderHeader();
  renderSummaryPanel();
  renderCoreStatus();
  renderQuickStats();
  renderProfile();
  renderStory();
  renderNPCs();
  renderFeeds();
  renderLogs();
}

function impactLabel(key, delta) {
  const names = {
    heat: "话题热度",
    controversy: "争议指数",
    public: "路人好感",
    company: "公司支持",
    mood: "个人状态",
    skill: "业务底气",
    manager: "经纪人好感",
    director: "导演印象",
    rival: "同期关系"
  };
  const sign = delta > 0 ? "+" : "";
  return `${names[key] || key}${sign}${delta}`;
}

function applyEffect(effect) {
  const impacts = [];
  Object.entries(effect).forEach(([key, value]) => {
    if (["manager", "director", "rival"].includes(key)) {
      state.npcs[key].favor = clamp(state.npcs[key].favor + value, 0, 100);
      impacts.push(impactLabel(key, value));
      return;
    }
    state.status[key] = clamp(state.status[key] + value, 0, 100);
    impacts.push(impactLabel(key, value));
  });
  return impacts;
}

function updateFeedsByNode(nodeId, choiceTitle) {
  const sets = {
    meeting: [
      `“${state.profile.name}还没正式进组，物料待遇已经不像普通新人。”`,
      "“要捧得这么明白，后面肯定要吵。”",
      "“脸是真的能打，难怪公司舍得推。”",
      `“她这次选了${choiceTitle}，看起来不像会完全听安排。”`
    ],
    dorm: [
      "“宿舍都能被讨论成这样，她是真躲不开被盯着。”",
      `“${state.profile.name}那边的气氛比节目正片还先有戏。”`,
      "“有人在看她翻车，也有人已经开始护了。”",
      "“还没开播，人物关系就先立起来了。”"
    ],
    theme: [
      "“站位一出来，练习生群里就安静了。”",
      "“这位置说不是特意给的，谁信。”",
      "“如果她站得住，这波就真要起了。”",
      `“${choiceTitle}这一步，让她看起来更难读了。”`
    ],
    practice: [
      "“她最近训练室出现得越来越晚。”",
      "“嘴上骂她资源，身体还是会看她进步。”",
      "“同期里对她态度最微妙的那批人，现在也不敢太轻敌。”",
      "“业务一上来，很多话就没那么好说了。”"
    ],
    camera: [
      "“试拍那天的回放，好多人都去找了。”",
      "“她是真的会吃镜头，这点很烦，也很要命。”",
      "“节目组如果继续这么拍她，后面热搜跑不了。”",
      "“现在已经不只是资源问题了，她本人也接得住一点。”"
    ],
    mentor: [
      "“导师那边对她的态度，好像和一开始不太一样了。”",
      "“她不管说了什么，至少让人记住了。”",
      "“有的人是被镜头选中，她像是自己也在学着抓镜头。”",
      "“这条线，开始有点像个人物了。”"
    ],
    ranking: [
      "“名次还没出来，围着她的风声已经满天飞。”",
      "“不管最后第几，她都会是这一期讨论中心之一。”",
      "“有人等着看她被抬，也有人等着看她摔。”",
      "“这种氛围里还能稳住的人，后面未必走不远。”"
    ],
    stage: [
      "“第一次公演结束以后，她那个镜头已经被截疯了。”",
      "“喜欢她的人开始更大声，不喜欢她的人也更恨了。”",
      "“但有一件事确实很难再否认，她上台是有存在感的。”",
      `“${state.profile.name}这一场之后，算是真正进了局。”`
    ],
    broadcast: [
      "“节目一播，所有关于她的争论都彻底炸开了。”",
      "“她不是路人脸，这一点今晚谁都看得出来。”",
      "“黑红也好，口碑也好，反正从今天开始会有更多人记住她。”",
      "“她后面是继续冲，还是想办法稳，就看接下来怎么走。”"
    ]
  };
  state.feeds = (sets[nodeId] || state.feeds).slice(0, 4);
}

function finishTurn(choice, customResult, nextIdOverride) {
  const node = getCurrentNode();
  const result = typeof choice.result === "function" ? choice.result(state) : (customResult || choice.result);
  const impacts = applyEffect(choice.effect || {});
  state.logs.unshift({
    turn: state.turn,
    title: choice.title,
    result,
    impact: impacts,
    time: state.world.displayTime
  });
  updateFeedsByNode(state.currentNodeId, choice.title);
  if (!node.isEnding) {
    const nextId = nextIdOverride || choice.next || node.customNext || state.currentNodeId;
    state.currentNodeId = nextId;
    state.chapter = storyNodes[state.currentNodeId].phase;
    state.world.displayTime = formatWorldTime(storyNodes[state.currentNodeId].timeLabel);
    state.complete = storyNodes[state.currentNodeId].isEnding === true;
    state.turn += 1;
  }
  saveGame();
  renderAll();
}

function handleChoice(index) {
  const node = getCurrentNode();
  if (node.isEnding) {
    newGame(false);
    return;
  }
  const choice = node.choices[index];
  if (!choice) return;
  finishTurn(choice);
  toast("主线已推进");
}

function buildCustomBranch(text) {
  const node = getCurrentNode();
  const effect = { mood: 1 };
  let result = `你没有沿着台面上的三个选项走，而是自己先动了。${text}。这一下不算惊天动地，却足够让原本被安排好的气氛偏开一点。`;
  if (text.includes("练") || text.includes("排") || text.includes("学")) {
    effect.skill = 4;
    effect.mood = -1;
    result = "你把注意力硬生生压回训练本身。练习室的灯白得发冷，汗水顺着下巴往下落，你却第一次觉得那些议论离你远了一点。至少这一步，你是在为自己争。";
  } else if (text.includes("经纪人") || text.includes("公司")) {
    effect.company = 4;
    effect.manager = 3;
    result = `你直接去找了${state.npcs.manager.name}。对方没有每句都回答，却把最关键的那层意思留给了你。很多时候，在这个圈子里，愿意让你提前知道，已经是一种偏向。`;
  } else if (text.includes("采访") || text.includes("镜头") || text.includes("直播")) {
    effect.heat = 5;
    effect.controversy = 2;
    effect.public = 1;
    result = "你主动把自己送进镜头里，等于默认接受外界的放大打量。好处是，你会更快被看见；坏处是，别人骂起你来，也会更顺手。";
  } else if (text.includes("休息") || text.includes("睡") || text.includes("安静")) {
    effect.mood = 5;
    effect.heat = -1;
    result = "你把脚步慢下来，硬是从一堆目光和消息里抽出一点空白。热闹没有消失，但至少在这片刻里，你先把自己捡了回来。";
  }
  return {
    title: "自定义行动",
    effect,
    result,
    next: node.customNext || state.currentNodeId
  };
}

function handleCustomAction() {
  if (state.complete) {
    toast("这段展示版已经收束，可以重新开局");
    return;
  }
  const input = document.getElementById("customActionInput");
  const text = input.value.trim();
  if (!text) {
    toast("先输入你想做的事");
    return;
  }
  const choice = buildCustomBranch(text);
  finishTurn(choice, choice.result, choice.next);
  input.value = "";
  toast("自定义行动已生效");
}

function handleTimeJump() {
  if (state.complete) {
    toast("这段展示版已经收束，可以重新开局");
    return;
  }
  const input = document.getElementById("timeJumpInput");
  const text = input.value.trim();
  if (!text) {
    toast("先输入想跳到什么时候");
    return;
  }
  const node = getCurrentNode();
  const choice = {
    title: "时间跳转",
    effect: { heat: 2, mood: 1 },
    result: `你要求把时间推进到“${text}”。这段被跳过去的日子里，训练、舆论和对你的猜测都没有停。等你再抬头时，新的安排已经堆到了眼前。`,
    next: node.jumpNext || node.customNext || state.currentNodeId
  };
  finishTurn(choice, choice.result, choice.next);
  input.value = "";
  toast("时间已推进");
}

function saveGame(showToast = false) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if (showToast) toast("已保存到浏览器本地");
}

function loadGame() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return false;
  try {
    const parsed = JSON.parse(raw);
    Object.assign(state, parsed);
    syncFormWithProfile();
    renderAll();
    toast("已恢复上次进度");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

function exportSave() {
  const text = JSON.stringify(state, null, 2);
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      toast("存档内容已复制，可直接发给别人导入");
    }).catch(() => {
      prompt("请手动复制下面的存档内容", text);
    });
    return;
  }
  prompt("请手动复制下面的存档内容", text);
}

function importSave() {
  const raw = prompt("请粘贴导出的存档内容");
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw);
    Object.assign(state, parsed);
    syncFormWithProfile();
    renderAll();
    saveGame();
    toast("存档导入成功");
  } catch (error) {
    toast("导入失败，内容不是有效存档");
  }
}

function clearSave() {
  localStorage.removeItem(STORAGE_KEY);
  toast("本地存档已清空");
}

function newGame(keepName = false) {
  state.turn = 1;
  state.complete = false;
  state.world = buildWorld();
  state.profile = buildProfile(keepName);
  state.status = buildStatus();
  state.npcs = buildNpcs();
  hydrateNetworks();
  state.logs = [];
  state.currentNodeId = "meeting";
  state.chapter = storyNodes.meeting.phase;
  state.world.displayTime = formatWorldTime(storyNodes.meeting.timeLabel);
  createInitialFeeds();
  syncFormWithProfile();
  renderAll();
  saveGame();
  toast("展示版开局已生成");
}

function bindEvents() {
  document.getElementById("generateBtn").addEventListener("click", () => newGame(false));
  document.getElementById("rerollBtn").addEventListener("click", () => newGame(true));
  document.getElementById("clearBtn").addEventListener("click", clearSave);
  document.getElementById("saveBtn").addEventListener("click", () => saveGame(true));
  document.getElementById("exportBtn").addEventListener("click", exportSave);
  document.getElementById("importBtn").addEventListener("click", importSave);
  document.getElementById("newGameBtn").addEventListener("click", () => newGame(false));
  document.getElementById("customActionBtn").addEventListener("click", handleCustomAction);
  document.getElementById("timeJumpBtn").addEventListener("click", handleTimeJump);
  document.getElementById("optionList").addEventListener("click", event => {
    const button = event.target.closest(".option-btn");
    if (!button) return;
    if (button.dataset.ending === "restart") {
      newGame(false);
      return;
    }
    handleChoice(Number(button.dataset.index));
  });
}

bindEvents();
if (!loadGame()) {
  newGame(false);
}
