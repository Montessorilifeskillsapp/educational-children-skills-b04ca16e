// "growth" namespace, zh: must match the English shape in ./en.ts.
import type { en } from './en';

export const zh: typeof en = {
  shared: { invalidEmail: '请输入有效的电子邮件地址。', genericError: '出了点问题，请重试。', close: '关闭', email: '电子邮件' },
  readiness: {
    readyTitle: '您的指南已准备好', readyBody: '已在新标签页中打开。使用“另存为 PDF”保存副本。',
    openAgain: '再次打开指南', seePremium: '开通高级版查看完整序列',
    eyebrow: '免费指南', titleHome: '领取免费的蒙台梭利幼小衔接准备指南', titleActivity: '看看这节课在孩子学习序列中的位置',
    body: '按年龄匹配的入学准备清单和一周 AMI 示例课程，并标注每节课对应的美国教育标准。',
    ageGroup: '孩子年龄', years: '{{age}} 岁', preparing: '正在准备…', submit: '领取免费指南',
    footnote: '偶尔发送蒙台梭利小贴士，可随时退订。', privacy: '隐私',
  },
  cookies: {
    region: 'Cookie 选项', title: '您的隐私选择',
    body: '我们在不使用 Cookie 的情况下统计访问量。如果您同意，我们还会使用分析 Cookie，并记录哪些页面和活动被使用，以改进应用。请参阅我们的<1>隐私政策</1>。',
    acceptAll: '全部接受', rejectAll: '全部拒绝', settings: 'Cookie 设置',
    dialogBody: '选择此应用可以在您的设备上使用哪些内容。您可以随时通过“Cookie 设置”链接更改。',
    gpc: '您的浏览器正在发送隐私信号（全球隐私控制），因此分析功能保持关闭。',
    necessary: '必要', necessaryBody: '保持登录状态，并保存您的设置和课程以供离线使用。始终开启。', alwaysOn: '始终开启',
    analytics: '分析',
    analyticsBody: '由 Google 和 Montessori Life Skills 提供。包括分析 Cookie 以及哪些页面和活动被使用的记录。由 Lovable 提供的无 Cookie 访问统计无论如何都会继续。',
    save: '保存选择',
  },
  consult: {
    errName: '请输入您的姓名', errNameLong: '姓名须少于 100 个字符', errEmail: '请输入有效的电子邮件地址',
    errAge: '孩子年龄须少于 60 个字符', errTopics: '请告诉我们您想讨论的内容', errTopicsLong: '讨论内容须少于 2000 个字符',
    errTimes: '偏好时间须少于 500 个字符', sendFailed: '无法发送您的请求，请重试。',
    sentTitle: '请求已发送', sentBody: '谢谢。Kerry 已收到您的请求，她会回复至 <1>{{email}}</1> 与您约定时间。',
    title: '预约私人咨询', body: '请简单介绍您的孩子以及希望获得哪些帮助。Kerry 会通过电子邮件回复，与您约定时间。',
    name: '您的姓名', childAge: '孩子年龄', optional: '（选填）', agePlaceholder: '例如：4 岁', package: '套餐',
    single: '单次咨询', bundle: '三次咨询', topics: '您想讨论什么？',
    topicsPlaceholder: '目标、日常安排、环境布置、关于课程的问题…',
    times: '偏好的日期和时间', timesPlaceholder: '例如：工作日上午，美国中部时间',
    cancel: '取消', sending: '正在发送…', send: '发送请求',
  },
  exit: {
    doneTitle: '您已加入名单', doneBody: '谢谢！我们会向您发送最新动态和抢先体验机会。', back: '返回页面',
    title: '离开之前', body: '加入名单，抢先体验新活动并获取 Montessori Life Skills 的最新动态。绝无垃圾邮件，可随时退订。',
    placeholder: '您的电子邮件地址', emailLabel: '电子邮件地址', submitting: '正在登记…', submit: '通知我',
    footnote: '抢先体验和不定期更新，可随时退订。',
  },
  guidePage: {
  "title": "蒙台梭利幼小衔接准备指南",
  "body": "根据孩子年龄提供的入学准备清单和一周 AMI 初级示例课程，并标注每节课对应的美国教育标准。",
  "b1": "按年龄匹配的入学准备清单",
  "b2": "AMI 序列中的五节示例课",
  "b3": "每节课对应的 Common Core 与 NGSS 标准",
  "b4": "可打印——可保存为 PDF",
  "childAge": "孩子的年龄",
  "included": "{{age}} 岁包含：",
  "points": "+ {{count}} 项入学准备清单",
  "footnote": "我们会偶尔发送蒙台梭利小贴士，可随时退订。",
  "privacy": "隐私政策"
},
  guide: {
  "docTitle": "蒙台梭利入学准备指南——{{age}} 岁",
  "save": "另存为 PDF",
  "sub": "一周 AMI 初级示例课程，对应美国教育标准 · Montessori Life Skills",
  "intro": "正如玛利亚·蒙台梭利博士所观察到的，手是心智的工具。本指南展示了 AMI 初级序列中适合 {{age}} 岁孩子的一周示例课程，并标注每节课对应的美国教育标准。",
  "checklist": "入学准备清单",
  "observe": "观察，而非测试。每个孩子都有自己的节奏。",
  "week": "示例一周",
  "day": "日",
  "lesson": "课程",
  "gains": "孩子的收获",
  "standards": "标准",
  "days": [
    "周一",
    "周二",
    "周三",
    "周四",
    "周五"
  ],
  "indirect": "间接预备",
  "ctaTitle": "完整序列。",
  "cta": "高级版按顺序包含所有 AMI 初级示范、分步指南、课程视频和可打印的家庭教育档案。高级版年付 $199/年，或 $29.99/月，享 30 天保证。",
  "footer": "标准代码：Common Core（CCSS）、NGSS、NCSS 和美国国家核心艺术标准。本文件为对照图，并非认证。© {{year}} Montessori Life Skills。",
  "titles": {
    "Dry Pouring": "干物倒取",
    "Greeting Others": "问候他人",
    "Knobbed Cylinders": "带插座圆柱体",
    "Pink Tower": "粉红塔",
    "Sandpaper Letters": "砂纸字母",
    "Red Rods": "红棒",
    "Number Rods": "数棒",
    "Spindle Box": "纺锤棒箱",
    "Land and Water Forms": "陆地与水域模型",
    "Golden Beads": "金色串珠",
    "Moveable Alphabet": "活动字母",
    "Parts of a Plant": "植物的部分"
  },
  "areas": {
    "Practical Life": "日常生活",
    "Grace and Courtesy": "优雅与礼仪",
    "Sensorial": "感官",
    "Language": "语言",
    "Math": "数学",
    "Geography": "地理",
    "Botany": "植物学"
  },
  "purposes": {
    "3": [
      "动作协调、专注与独立。",
      "自信与得体的社交语言。",
      "大小的视觉辨别；为书写做准备的三指抓握。",
      "三维渐变大小的视觉辨别。",
      "通过触觉将每个音与其书写符号联系起来。"
    ],
    "4": [
      "渐变长度；数棒的直接预备。",
      "把 1–10 的数量与符号理解为单一、可数的长度。",
      "数散放的数量以及零的概念。",
      "为早期阅读和书写建立音与符号的联系。",
      "具体理解地球上的陆地与水域。"
    ],
    "5": [
      "十进制：个、十、百、千。",
      "在手能书写之前，按发音拼出单词。",
      "巩固数量、符号与零。",
      "说出并观察活体植物的各部分。",
      "通过触摸和命名认识成对的陆地与水域形态。"
    ]
  },
  "checks": {
    "3": [
      "小心地搬托盘或椅子",
      "倒取干物，偶有洒落",
      "能听从两步指令",
      "向熟悉的成人问好",
      "按大小或颜色分类物品",
      "对字母发音感兴趣"
    ],
    "4": [
      "倒水时很少洒出",
      "专注于一项活动 10 分钟以上",
      "按大小排序物品",
      "认识几个字母的发音",
      "一一对应地数到 10",
      "会说请、谢谢和对不起"
    ],
    "5": [
      "完成多步骤活动并归位",
      "能说出大多数字母的发音",
      "按发音拼出简单单词",
      "数 10 以上的数量并与数字对应",
      "用三指握笔",
      "在小组中轮流发言"
    ]
  }
},
};
