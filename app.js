const STORAGE_KEY = "entertainment-royal-simulator-save-v2";

    const db = {
      surnames: ["闻", "沈", "顾", "裴", "姜", "温", "迟", "程", "岑", "许", "祁", "宋", "陆", "乔", "苏", "林", "谢", "简"],
      given: ["夏", "枝", "遥", "棠", "妤", "岚", "予", "澈", "漾", "霁", "栀", "宁", "屿", "澄", "星", "言", "初", "梨", "宛", "昭"],
      cities: ["临川市", "海栖市", "霁城", "望京市", "南岚市", "栖湾市"],
      companies: ["曜升传媒", "澜映娱乐", "星峤文化", "映禾影业", "灿汐传媒", "晟光娱乐"],
      shows: ["《星阶之上》", "《追光训练营》", "《明日舞台》", "《灼灼新声》"],
      occupations: ["练习生", "十八线演员", "网红", "爱豆", "待爆小花", "新人歌手"],
      routes: ["玩票型", "事业型", "野心型", "花瓶型"],
      royalReasons: ["公司高层明确押注你", "家里资本链条很深，公司不敢怠慢", "品牌和平台都愿意提前给你开路", "老板私下点名，今年重点项目先推你", "你本来就是公司今年选秀线的门面筹码"],
      looks: ["眉眼明艳，镜头浓颜", "轮廓精致，气质偏冷", "笑起来很甜，皮相上镜", "五官立体，氛围感很强", "眼神漂亮，站着就容易被拍"],
      faceNotes: ["肩颈线漂亮，上镜优势明显", "骨相利落，近景耐看", "肤色冷白，适合浓妆", "眼尾有故事感，很吃镜头", "体态舒展，站姿很稳"],
      goals: ["起初只是来玩一玩，现在不想轻易认输", "想在镜头前证明自己不是摆设", "想借这次机会拿到真正属于自己的位置", "看似随意，其实很想红得体面", "不想永远只被人记成那个资源很好的人"],
      personalities: [
        ["外柔内韧", "心思细密", "见招拆招", "爱憎分明"],
        ["表里分明", "不动声色", "进退有度", "自尊心强"],
        ["沉得住气", "玲珑剔透", "不肯服输", "慢热谨慎"],
        ["嘴硬心软", "审时度势", "藏锋守拙", "心气很高"]
      ],
      tags: ["清冷门面", "黑红预备役", "镜头宠儿", "资源咖", "热搜体质", "氛围感选手", "舞台脸", "争议新人"],
      colors: ["月白银", "雾玫瑰", "碎金杏", "海盐蓝", "浅樱粉"],
      eventTemplates: [
        {
          id: "stage_plan",
          title: "初舞台路线待定",
          desc: "会议室很安静，策划案被拆成两版摆在你面前。一版稳妥，强调完整度；一版张扬，几乎把所有记忆点都堆到你身上。你知道，今天的选择会影响第一次真正被所有人看见的方式。",
          choices: [
            { title: "先看稳妥方案", desc: "把舞台完成度放在第一位。", effect: { favor: 4, controversy: -3, skill: 3, mood: 1 }, result: "你把稳妥方案逐条看完，发现公司给你留了退路，也给了你能站稳的空间。至少这一步，不至于让所有骂声同时砸下来。" },
            { title: "先看最捧你的版本", desc: "直接面对最强势的偏爱。", effect: { heat: 8, controversy: 6, company: 3, mood: -1 }, result: "你翻开另一版时，连灯位和镜头切换都在向你倾斜。那不是照顾，而是明牌偏爱。你心里很清楚，这一页一旦签下去，等于主动走进争议中心。" },
            { title: "先问经纪人打算把我捧到哪一步", desc: "先弄清路线再决定。", effect: { company: 4, favor: 2, public: 1 }, result: "你没有急着选，只抬眼问经纪人这条线的终点。她沉默几秒，给了你一个比想象中更明确的回答。你第一次真正感觉到，公司对你不是试试，而是押注。" }
          ]
        },
        {
          id: "pre_interview",
          title: "先导采访问题被改了",
          desc: "节目组把你的采访问题单独拿出来改了几轮。保守一点，能给你一个比较干净的形象；激进一点，能迅速让外界记住你，但也更容易招来阴阳怪气。",
          choices: [
            { title: "接受节目组修改后的版本", desc: "顺着安排走，先保全整体形象。", effect: { company: 3, public: 2, controversy: -2 }, result: "你没有和节目组硬碰硬，只把几个细节默默记下来。气氛顺了，后续录制也更好推进，但你也更清楚自己正在被精细包装。" },
            { title: "要求保留更真实的回答", desc: "不想把自己做成太假的样子。", effect: { public: 4, favor: 2, heat: 2 }, result: "你在几道最像话术的问题上停住，提出要把答案说得更像你自己。执行导演盯着你看了一会儿，最后还是点头。那一刻，你知道他开始重新评估你了。" },
            { title: "直接看完整采访流程", desc: "先把整个节奏摸透。", effect: { skill: 2, company: 2, mood: 1 }, result: "你要来了整套流程表，从出场顺序到备采节点都比别人多知道一点。信息没有立刻变成优势，但在这个圈子里，提前知道就已经很值钱。" }
          ]
        },
        {
          id: "dorm",
          title: "宿舍分配风声先传出来了",
          desc: "名单还没官宣，练习室里已经有人在议论。有人说你会被安排进最有镜头的宿舍，也有人等着看会不会有人对你当场甩脸色。",
          choices: [
            { title: "装作没听见，先观察", desc: "不急着对流言做反应。", effect: { mood: 1, controversy: -1, favor: 2 }, result: "你没接这茬，只把那几句酸话轻轻放过去。表面看起来风平浪静，实际上不少人都开始记住你了。" },
            { title: "主动和室友打招呼破冰", desc: "先把人际风险压下来。", effect: { favor: 5, public: 1, mood: 1 }, result: "你比传闻更早一步进门，先把话说开。虽然并不是所有人都买账，但至少最尴尬的那个瞬间没有发生。" },
            { title: "去找经纪人确认消息来源", desc: "先弄清是谁在放风。", effect: { company: 3, heat: 2, controversy: 1 }, result: "你没有去问同组的人，而是先去找了经纪人。她给你的回答不算直接，却足够说明一件事：这个消息不是空穴来风。" }
          ]
        },
        {
          id: "styling",
          title: "定妆主题在向你倾斜",
          desc: "原本统一的定妆主题忽然被改得更贴你的脸和气质。这样的偏移不可能没人发现，而一旦被发现，所有人的视线都会开始变得锋利。",
          choices: [
            { title: "配合完成定妆", desc: "先拿到最有利的视觉结果。", effect: { heat: 5, company: 4, controversy: 3 }, result: "你坐在灯下，没有说多余的话，只把整套妆造做完。镜子里的人确实漂亮得扎眼，可越漂亮，越像一场被安排好的宣告。" },
            { title: "要求妆造低调一点", desc: "不想在这一轮把矛盾拉满。", effect: { controversy: -3, public: 2, company: -1 }, result: "你没有硬顶，只是平静地提出想收一收。造型师愣了一下，最后替你改了几个最醒目的部分，场面因此柔和了不少。" },
            { title: "悄悄记下是谁改了方案", desc: "不表态，但把信息留住。", effect: { skill: 2, company: 1, mood: 1 }, result: "你配合流程，却没放过细节。改方案的人、传话的人、点头的人，你都默默记住了。以后这些线索，说不定会有用。" }
          ]
        },
        {
          id: "warmup",
          title: "练习室第一次合练",
          desc: "镜头还没正式开，合练室里已经有人开始较劲。你的一举一动都比别人更容易被看见，跳得好会被说理所应当，跳不好会被骂得更凶。",
          choices: [
            { title: "主动加练，把动作先抠顺", desc: "用完成度先堵住一部分嘴。", effect: { skill: 4, mood: -2, public: 2 }, result: "你把音乐一遍遍放回去，直到汗水把衣摆都浸出褶皱。辛苦是真的，进步也是真的，至少有人开始承认你不只是一个站着好看的人。" },
            { title: "观察所有人的状态再决定", desc: "先摸清竞争关系。", effect: { skill: 1, favor: 2, mood: 1 }, result: "你没有急着往前冲，而是先站在边上看了一轮。谁跳得稳，谁情绪差，谁在偷偷盯你，你心里慢慢有了底。" },
            { title: "故意表现轻松一点", desc: "不想让别人看出你的紧绷。", effect: { heat: 2, controversy: 2, mood: 2 }, result: "你表面上笑得随意，动作也放得轻巧。有人觉得你游刃有余，也有人开始在背后说，你果然和别人不是一个赛道。" }
          ]
        }
      ],
      firstNpcArchetypes: [
        { role: "经纪人", looks: "短发利落，五官锋锐，有压迫感", traits: ["精明强干", "滴水不漏", "冷静克制", "说一不二"], tags: ["铁腕经纪", "护短", "利益优先"], ability: { "资源运作": "A", "公关能力": "A", "判断力": "A-" } },
        { role: "执行导演", looks: "斯文清隽，笑意很浅", traits: ["八面玲珑", "审时度势", "避重就轻", "城府不浅"], tags: ["懂流量", "会做戏", "笑面狐狸"], ability: { "综艺策划": "A", "镜头感知": "A", "现场协调": "B+" } },
        { role: "同期练习生", looks: "眉眼清秀，气质干净，镜头缘不错", traits: ["表面客气", "心气很高", "要强好胜", "敏感细致"], tags: ["竞争对手", "训练室强手", "不好惹"], ability: { "唱功": "B+", "跳舞": "A-", "镜头感": "B+" } }
      ],
      feedStart: [
        "“还没正式进组，待遇就已经不太像普通新人了。”",
        "“脸是能打的，但资源也是真明牌。”",
        "“她要是真能撑住舞台，黑红未必不是路。”",
        "“这波路透和物料顺序，看着就是有人在后面铺路。”"
      ]
    };

    const state = {
      turn: 1,
      world: null,
      profile: null,
      status: null,
      npcs: [],
      feeds: [],
      logs: [],
      currentEvent: null,
      chapter: "序章"
    };

    function pick(list) { return list[Math.floor(Math.random() * list.length)]; }
    function pickMany(list, count) {
      const pool = [...list];
      const out = [];
      while (pool.length && out.length < count) {
        out.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
      }
      return out;
    }
    function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
    function randomName() { return pick(db.surnames) + pick(db.given) + pick(db.given); }
    function randomGrade() { return pick(["A", "A-", "B+", "B", "B-", "C+", "C"]); }

    function addDays(dateStr, delta) {
      const [y, m, d] = dateStr.split("-").map(Number);
      const date = new Date(y, m - 1, d + delta);
      const yy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      return `${yy}-${mm}-${dd}`;
    }

    function formatDisplayDate(dateStr, slot) {
      const [y, m, d] = dateStr.split("-").map(Number);
      const slotMap = { morning: "上午10:10", noon: "中午12:20", afternoon: "下午16:30", evening: "晚上21:20" };
      return `架空纪年${y}年${m}月${d}日，${slotMap[slot] || slotMap.evening}`;
    }

    function nextTimeTick(world, days) {
      const order = ["morning", "noon", "afternoon", "evening"];
      let idx = order.indexOf(world.slot);
      if (idx < 0) idx = 3;
      idx += 1;
      let add = days || 0;
      if (!days && idx >= order.length) { idx = 0; add = 1; }
      if (days && idx >= order.length) idx = idx % order.length;
      world.date = addDays(world.date, add);
      world.slot = order[idx % order.length];
      world.displayTime = formatDisplayDate(world.date, world.slot);
    }

    function chineseToNumber(raw) {
      const map = { "一": 1, "二": 2, "两": 2, "三": 3, "四": 4, "五": 5, "六": 6, "七": 7, "八": 8, "九": 9, "十": 10 };
      if (/^\d+$/.test(raw)) return Number(raw);
      if (raw === "十") return 10;
      if (raw.length === 2 && raw[0] === "十") return 10 + (map[raw[1]] || 0);
      if (raw.length === 2 && raw[1] === "十") return (map[raw[0]] || 0) * 10;
      return map[raw] || 1;
    }

    function parseJumpDays(text) {
      if (!text) return 0;
      if (text.includes("明天")) return 1;
      if (text.includes("后天")) return 2;
      if (text.includes("一周")) return 7;
      if (text.includes("半个月")) return 15;
      if (text.includes("一个月")) return 30;
      const dayMatch = text.match(/([一二两三四五六七八九十\d]+)天后/);
      if (dayMatch) return chineseToNumber(dayMatch[1]);
      const weekMatch = text.match(/([一二两三四五六七八九十\d]+)周后/);
      if (weekMatch) return chineseToNumber(weekMatch[1]) * 7;
      return 0;
    }

    function toast(text) {
      const node = document.getElementById("toast");
      node.textContent = text;
      node.classList.add("show");
      clearTimeout(node._timer);
      node._timer = setTimeout(() => node.classList.remove("show"), 2200);
    }

    function makeBaseWorld() {
      return {
        city: pick(db.cities),
        company: pick(db.companies),
        show: pick(db.shows),
        date: "2026-04-18",
        slot: "evening",
        displayTime: formatDisplayDate("2026-04-18", "evening")
      };
    }

    function buildProfile(keepName) {
      const nameInput = document.getElementById("nameInput").value.trim();
      const ageInput = Number(document.getElementById("ageInput").value);
      const genderInput = document.getElementById("genderInput").value;
      const toneInput = document.getElementById("toneInput").value;
      const extraInput = document.getElementById("extraInput").value.trim();
      const personality = pick(db.personalities);
      const world = makeBaseWorld();
      const profile = {
        name: keepName && state.profile ? state.profile.name : (nameInput || randomName()),
        age: ageInput || Math.floor(Math.random() * 9) + 18,
        gender: genderInput || pick(["女", "男"]),
        occupation: pick(db.occupations),
        route: toneInput === "随机" ? pick(db.routes) : toneInput,
        reason: pick(db.royalReasons),
        looks: pick(db.looks),
        faceNote: pick(db.faceNotes),
        personality: personality.join("、"),
        goal: extraInput ? `${extraInput}。表面上看不出来，但这件事会影响你接下来很多次选择。` : pick(db.goals),
        tags: pickMany(db.tags, 3),
        fanColor: pick(db.colors),
        ability: {
          "演技": randomGrade(),
          "唱功": randomGrade(),
          "跳舞": randomGrade(),
          "综艺": randomGrade(),
          "镜头感": pick(["A", "A-", "B+"]),
          "时尚": pick(["A", "A-", "B+"])
        }
      };
      return { world, profile };
    }

    function syncFormWithProfile() {
      if (!state.profile) return;
      document.getElementById("nameInput").value = state.profile.name || "";
      document.getElementById("ageInput").value = state.profile.age || "";
      document.getElementById("genderInput").value = state.profile.gender || "";
      document.getElementById("toneInput").value = db.routes.includes(state.profile.route) ? state.profile.route : "随机";
      document.getElementById("extraInput").value = "";
    }

    function buildOpeningStory() {
      const { world, profile } = state;
      return `四月末的风从${world.city}的高楼缝隙里穿过去，吹过摄影棚、练习室和贴满海报的综艺大楼，把整个娱乐圈吹得明亮又浮躁。

你现在的身份是${profile.occupation}。在大多数人眼里，你的资历还不够，作品也不算多，可偏偏从定妆、路透、镜头顺序到节目对接，处处都比同层级的人要显眼。关于你是“皇族”的风声，早就在圈子里悄悄传开。

有人说，是因为${profile.reason}；也有人说，公司只是想赌你这张脸能不能换来一场爆红。你自己也清楚，这份偏爱从来不是白拿的。镜头多一秒，争议就会跟着多一层。

而现在，${world.show}的企划案被推到你面前。经纪人抬眼看你，语气淡淡的：“从今天开始，你不是普通新人了。想玩，还是想赢，你最好尽快想清楚。”`;
    }

    function buildInitialNpcs() {
      const manager = db.firstNpcArchetypes[0];
      const director = db.firstNpcArchetypes[1];
      const rival = db.firstNpcArchetypes[2];
      state.npcs = [
        {
          id: "npc_manager",
          name: randomName(),
          gender: "女",
          age: Math.floor(Math.random() * 7) + 28,
          role: manager.role,
          looks: manager.looks,
          personality: manager.traits,
          tags: manager.tags,
          favor: 60,
          network: "",
          ability: manager.ability
        },
        {
          id: "npc_director",
          name: randomName(),
          gender: "男",
          age: Math.floor(Math.random() * 6) + 29,
          role: director.role,
          looks: director.looks,
          personality: director.traits,
          tags: director.tags,
          favor: 42,
          network: "",
          ability: director.ability
        },
        {
          id: "npc_rival",
          name: randomName(),
          gender: state.profile.gender === "女" ? "女" : pick(["女", "男"]),
          age: Math.floor(Math.random() * 5) + 19,
          role: rival.role,
          looks: rival.looks,
          personality: rival.traits,
          tags: rival.tags,
          favor: 28,
          network: "",
          ability: rival.ability
        }
      ];
      state.npcs[0].network = `${state.profile.name}\n├─ 直属艺人：${state.profile.name}\n├─ 所属公司：${state.world.company}\n├─ 对接项目：${state.world.show}\n└─ 圈内评价：能捧人，也能压事`;
      state.npcs[1].network = `${state.npcs[1].name}\n├─ 所属项目：${state.world.show}\n├─ 对接对象：${state.world.company}\n├─ 工作往来：${state.npcs[0].name}\n└─ 当前印象：${state.profile.name}有话题度，值得押镜头`;
      state.npcs[2].network = `${state.profile.name}\n├─ 同期身份：同节目选手\n├─ 当前关系：表面客气，暗暗较劲\n└─ 外界印象：实力比你更容易服众`;
    }

    function buildStatus() {
      state.status = {
        heat: 42,
        controversy: 38,
        public: 47,
        company: 72,
        mood: 56,
        skill: 48
      };
    }

    function buildFeeds() {
      state.feeds = db.feedStart.map((text, idx) => ({ id: `feed_${idx}`, title: `热议 ${idx + 1}`, body: text }));
    }

    function chooseNewEvent() {
      const pool = db.eventTemplates.filter(item => !state.logs.slice(0, 4).some(log => log.eventId === item.id));
      state.currentEvent = JSON.parse(JSON.stringify(pick(pool.length ? pool : db.eventTemplates)));
    }

    function updateChapter() {
      if (state.turn <= 3) state.chapter = "序章";
      else if (state.turn <= 6) state.chapter = "录制前夜";
      else if (state.turn <= 10) state.chapter = "镜头渐亮";
      else state.chapter = "争议发酵期";
    }

    function newGame(keepName = false) {
      state.turn = 1;
      state.logs = [];
      const created = buildProfile(keepName);
      state.world = created.world;
      state.profile = created.profile;
      buildInitialNpcs();
      buildStatus();
      buildFeeds();
      chooseNewEvent();
      updateChapter();
      syncFormWithProfile();
      renderAll();
      saveGame();
      toast("新的开局已经生成");
    }

    function calcFanSummary() {
      const totalBase = 18 + state.status.heat * 0.8 + state.status.public * 0.4 + state.status.company * 0.25;
      const only = totalBase * (0.22 + state.status.public / 400);
      const passerby = totalBase * (0.26 + state.status.heat / 500);
      const black = totalBase * (0.08 + state.status.controversy / 450);
      return {
        total: `${totalBase.toFixed(1)}万`,
        only: `${only.toFixed(1)}万`,
        passerby: `${passerby.toFixed(1)}万`,
        black: `${black.toFixed(1)}万`
      };
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
      const p = state.profile;
      document.getElementById("profilePanel").innerHTML = `
        <div class="small">姓名：${p.name}｜年龄：${p.age}｜性别：${p.gender}</div>
        <div class="small" style="margin-top: 6px;">容貌：${p.looks}｜体态：${p.faceNote}</div>
        <div class="small" style="margin-top: 6px;">性格：${p.personality}</div>
        <div class="small" style="margin-top: 6px;">职业：${p.occupation}｜路线：${p.route}</div>
        <div class="small" style="margin-top: 6px;">目标：${p.goal}</div>
        <div class="badge-list" style="margin-top: 12px;">
          ${p.tags.map(tag => `<span class="badge">${tag}</span>`).join("")}
        </div>
        <div class="ability-grid">
          ${Object.entries(p.ability).map(([key, value]) => `<div class="ability"><span>${key}</span><strong>${value}</strong></div>`).join("")}
        </div>
        <div class="tree">粉丝数量
├─ 总关注量：${fans.total}
├─ 唯粉：${fans.only}
├─ 看脸路人粉：${fans.passerby}
├─ 潜在黑粉：${fans.black}
└─ 应援色：${p.fanColor}</div>
      `;
    }

    function renderStory() {
      const opening = buildOpeningStory();
      const last = state.logs[0];
      const text = last ? `${opening}

这已经是第${state.turn}回合。刚刚发生的事还压在空气里，没有完全散掉。

${last.story}` : opening;
      document.getElementById("storyBlock").textContent = text;
      document.getElementById("storyTimeBadge").textContent = state.world.displayTime;
      document.getElementById("chapterBadge").textContent = state.chapter;
      document.getElementById("eventTitle").textContent = `【事件】${state.currentEvent.title}`;
      document.getElementById("eventDesc").textContent = state.currentEvent.desc;
      document.getElementById("optionList").innerHTML = state.currentEvent.choices.map((choice, index) => `
        <button class="option-btn" data-index="${index}">
          <strong>${index + 1}. ${choice.title}</strong>
          <span>${choice.desc}</span>
        </button>
      `).join("");
    }

    function renderNPCs() {
      document.getElementById("npcList").innerHTML = state.npcs.map(npc => `
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
            ${Object.entries(npc.ability).map(([k, v]) => `<div class="ability"><span>${k}</span><strong>${v}</strong></div>`).join("")}
          </div>
          <div class="small" style="margin-top: 10px;">对主角好感度：${npc.favor}</div>
          <div class="tree">${npc.network}</div>
        </article>
      `).join("");
    }

    function renderFeeds() {
      document.getElementById("feedList").innerHTML = state.feeds.map(feed => `
        <article class="feed-item">
          <div class="feed-head">
            <strong>${feed.title}</strong>
            <span class="badge">围观中</span>
          </div>
          <div class="small" style="margin-top: 10px;">${feed.body}</div>
        </article>
      `).join("");
    }

    function renderLogs() {
      const target = document.getElementById("logList");
      if (!state.logs.length) {
        target.innerHTML = `<div class="center-empty">还没有行动记录。先生成开局，再选择一项事件行动。</div>`;
        return;
      }
      target.innerHTML = state.logs.map(log => `
        <article class="log-item">
          <div class="log-head">
            <strong>第 ${log.turn} 回合｜${log.title}</strong>
            <span class="badge">${log.time}</span>
          </div>
          <div class="small" style="margin-top: 10px;">${log.result}</div>
          <div class="status-line">
            ${log.impact.map(item => `<span class="status-pill">${item}</span>`).join("")}
          </div>
        </article>
      `).join("");
    }

    function renderHeader() {
      document.getElementById("turnChip").textContent = `第 ${state.turn} 回合`;
      document.getElementById("timeChip").textContent = state.world ? state.world.displayTime : "时间未开始";
    }

    function renderAll() {
      renderHeader();
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
        favor: "关系缓和"
      };
      const sign = delta > 0 ? "+" : "";
      return `${names[key] || key}${sign}${delta}`;
    }

    function applyEffect(effect) {
      const impact = [];
      Object.entries(effect).forEach(([key, delta]) => {
        if (key === "favor") {
          state.npcs[0].favor = clamp(state.npcs[0].favor + delta, 0, 100);
          impact.push(impactLabel(key, delta));
          return;
        }
        state.status[key] = clamp(state.status[key] + delta, 0, 100);
        impact.push(impactLabel(key, delta));
      });
      return impact;
    }

    function evolveFeeds(actionTitle, resultText) {
      const fresh = [
        `“${state.profile.name}这次${actionTitle}，看起来不像表面那么被动。”`,
        `“节目组现在是真的很会拍她，路人盘开始有点动静了。”`,
        `“有人夸她聪明，也有人说她就是被资本托着走。”`,
        `“她这一步之后，争议和讨论度都明显更高了。”`
      ];
      state.feeds = fresh.slice(0, 4).map((body, idx) => ({ id: `feed_${state.turn}_${idx}`, title: `热议 ${idx + 1}`, body }));
      if (resultText.includes("低调") || resultText.includes("退路")) {
        state.feeds[3].body = "“这回倒没有想象中那么招摇，至少看得出来她会收着一点。”";
      }
    }

    function buildConsequenceStory(actionTitle, resultText) {
      return `你选了<strong>${actionTitle}</strong>。

${resultText}

事情没有因为你的选择立刻结束。相反，空气里像是多了一层更细的张力。有人开始重新打量你，也有人把你放进了新的判断里。娱乐圈最擅长的，从来不是给答案，而是让一件事在无数双眼睛里继续发酵。`;
    }

    function finishTurn(title, resultText, effect, eventId) {
      const impact = applyEffect(effect);
      const story = buildConsequenceStory(title, resultText);
      nextTimeTick(state.world, 0);
      state.logs.unshift({
        turn: state.turn,
        title,
        result: resultText,
        impact,
        story,
        time: state.world.displayTime,
        eventId
      });
      evolveFeeds(title, resultText);
      state.turn += 1;
      updateChapter();
      chooseNewEvent();
      saveGame();
      renderAll();
    }

    function handleChoice(index) {
      const choice = state.currentEvent.choices[index];
      if (!choice) return;
      finishTurn(choice.title, choice.result, choice.effect, state.currentEvent.id);
      toast("本回合已推进");
    }

    function buildCustomResult(text) {
      const effect = { mood: 1 };
      let result = `你没有顺着现成的选项走，而是自己开了口。${text}。这种主动让现场的人都愣了一下，也让一部分原本被安排好的节奏出现了轻微偏移。`;
      if (text.includes("练") || text.includes("学") || text.includes("排")) {
        effect.skill = 4;
        effect.mood = -1;
        result = "你把精力直接投进训练里，没有去管外面的声音。练习室的灯很亮，地板上映出的影子一遍遍重叠。辛苦是真的，进步也是真的，至少有人开始承认你不只是一个站着好看的人。";
      } else if (text.includes("经纪人") || text.includes("公司")) {
        effect.company = 4;
        effect.favor = 3;
        result = "你没有绕路，直接把问题抛向最该回答的人。对方虽然没有把所有牌都翻开，但愿意和你多说，已经是一种态度。";
      } else if (text.includes("直播") || text.includes("采访") || text.includes("镜头")) {
        effect.heat = 5;
        effect.controversy = 2;
        effect.public = 1;
        result = "你主动把自己送到镜头前，话一出口，外界就不可能再安静。有人会因为这一面更喜欢你，也一定有人因此更想挑你的刺。";
      } else if (text.includes("休息") || text.includes("回家") || text.includes("睡")) {
        effect.mood = 5;
        effect.heat = -1;
        result = "你把脚步慢下来，暂时离开了那些一直追着你的视线。喧闹没有消失，但至少这一小段时间里，你先把自己捡回来了。";
      }
      return { result, effect };
    }

    function handleCustomAction() {
      const input = document.getElementById("customActionInput");
      const text = input.value.trim();
      if (!text) {
        toast("先输入你想做的事");
        return;
      }
      const built = buildCustomResult(text);
      finishTurn("自定义行动", built.result, built.effect, "custom");
      input.value = "";
      toast("自定义行动已生效");
    }

    function handleTimeJump() {
      const input = document.getElementById("timeJumpInput");
      const text = input.value.trim();
      if (!text) {
        toast("先输入想跳到什么时候");
        return;
      }
      const days = parseJumpDays(text);
      nextTimeTick(state.world, days || 1);
      const effect = { heat: pick([1, 2, 3]), controversy: pick([-1, 0, 1]), mood: 1 };
      const result = `你主动要求把时间推进到“${text}”。这段空出来的日子里，训练、舆论和对你的猜测都没有停下。等你再抬头时，新的安排已经堆到眼前了。`;
      const impact = applyEffect(effect);
      state.logs.unshift({
        turn: state.turn,
        title: "时间跳转",
        result,
        impact,
        story: result,
        time: state.world.displayTime,
        eventId: "jump"
      });
      state.turn += 1;
      updateChapter();
      chooseNewEvent();
      saveGame();
      renderAll();
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
          prompt("复制失败，请手动复制下面的存档内容", text);
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
        saveGame();
        syncFormWithProfile();
        renderAll();
        toast("存档导入成功");
      } catch (error) {
        toast("导入失败，内容不是有效存档");
      }
    }

    function clearSave() {
      localStorage.removeItem(STORAGE_KEY);
      toast("本地存档已清空");
    }

    function bindEvents() {
      document.getElementById("generateBtn").addEventListener("click", () => newGame(false));
      document.getElementById("rerollBtn").addEventListener("click", () => newGame(true));
      document.getElementById("clearBtn").addEventListener("click", clearSave);
      document.getElementById("saveBtn").addEventListener("click", () => saveGame(true));
      document.getElementById("exportBtn").addEventListener("click", exportSave);
      document.getElementById("importBtn").addEventListener("click", importSave);
      document.getElementById("newGameBtn").addEventListener("click", () => newGame(false));
      document.getElementById("optionList").addEventListener("click", event => {
        const button = event.target.closest(".option-btn");
        if (!button) return;
        handleChoice(Number(button.dataset.index));
      });
      document.getElementById("customActionBtn").addEventListener("click", handleCustomAction);
      document.getElementById("timeJumpBtn").addEventListener("click", handleTimeJump);
    }

    bindEvents();
    if (!loadGame()) newGame(false);
