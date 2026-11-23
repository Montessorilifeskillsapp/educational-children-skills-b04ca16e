// "home" namespace, zh: must match the English shape in ./en.ts.
import type { en } from './en';

export const zh: typeof en = {
  header: { curriculumSections: '课程领域', openSectionMenu: '打开领域菜单', openMenu: '打开菜单' },
  hero: {
    badge: '正宗 AMI/AMS 示范',
    title: '清楚知道该教什么，以及如何示范。',
    subtitle: '为 2–6 岁儿童设计的分步蒙台梭利活动，专为家长、教师和教室助理打造。',
    body: '了解需要准备什么、如何示范每项活动、观察什么，以及下一步做什么。',
    seeHow: '了解使用方式',
    statActivities: '100+ 项活动', statAges: '2–6 岁', statAreas: '9 个课程领域', statGuidance: '分步指导',
  },
  problem: {
    eyebrow: '更清晰的起点',
    title: '蒙台梭利不该需要花几个小时去搜索。',
    body: '您想给孩子有意义的工作，但零散的信息让人很难知道该准备什么、何时准备。',
    q1: '下一项活动是什么？', q2: '孩子准备好了吗？', q3: '需要哪些教具？', q4: '如何正确示范？',
    q5: '应该说什么，不该说什么？', q6: '要观察什么？', q7: '什么时候进入下一步？',
    closing: 'Montessori Life Skills 把这些答案交到您手中。',
    steps: [
      {
        "title": "顺序",
        "body": "蒙台梭利工作由简到繁、由干到湿、由具体到抽象。每项活动都在为下一项活动准备手和心智。",
        "points": [
          "先倒谷物，再倒水。",
          "先在两个小壶之间倒水，再倒入多个杯子或通过漏斗倒水。",
          "课程按示范顺序列出每个领域的活动。"
        ],
        "link": "查看活动顺序"
      },
      {
        "title": "准备度",
        "body": "孩子是否准备好，要靠观察，而不是由年龄决定。在提供新活动之前，先观察孩子工作。",
        "points": [
          "能用双手平稳地端托盘。",
          "已掌握顺序中较早的工作，例如倒谷物。",
          "能平静地专注于一项活动直到完成。",
          "通过观看他人或伸手拿教具表现出兴趣。"
        ],
        "link": "打开准备度指南"
      },
      {
        "title": "准备环境",
        "body": "在邀请孩子之前准备好完整的活动，让所需的一切都放在托盘上。",
        "points": [
          "真实的儿童尺寸教具：两个相同的小壶，其中一个装水。",
          "一个能放下所有物品的托盘，配一块吸水用的海绵和一块擦干布。",
          "放在低矮开放的架子上，孩子能独立取放托盘。",
          "所有物品干净、齐全、完好。"
        ],
        "link": "查看示例活动"
      },
      {
        "title": "示范",
        "body": "缓慢地以精确的动作示范，让孩子清楚看到每一步。",
        "points": [
          "坐在孩子身旁，让孩子能清楚看到您的手。",
          "语言与动作分开：先说话，再安静地做动作。",
          "在关键时刻放慢，也就是水流到壶嘴的时候。",
          "完成整个循环，包括擦干水滴并把托盘放回架子。"
        ],
        "link": "查看完整示范"
      },
      {
        "title": "邀请与您的话语",
        "body": "以简单的邀请开始，然后让教具自己说话。话越少，孩子的注意力越能停留在您的手上。",
        "points": [
          "蹲到与孩子视线齐平，邀请：“你想学习倒水吗？”",
          "如果孩子说不，平静地接受，改天再提供。",
          "说出活动名称，示范时保持安静。",
          "工作时避免表扬或纠正；洒水也是学习的一部分。"
        ],
        "link": "查看完整示范"
      },
      {
        "title": "观察",
        "body": "孩子开始后，请退后一步。观察而不打扰；教具本身会让孩子知道哪里需要纠正。",
        "points": [
          "握持与控制：孩子如何握住并倾斜小壶。",
          "专注：孩子在工作上停留多久。",
          "重复：孩子是否选择再倒一次。",
          "错误控制：孩子洒水后如何用托盘上的海绵处理。"
        ],
        "link": "了解观察的位置"
      },
      {
        "title": "进入下一步",
        "body": "当孩子能独立工作，并完成从架子取出到放回架子的整个循环时，就可以进入下一步。",
        "points": [
          "从架子上取下托盘，并整理好放回，供下一个人使用。",
          "能有控制地倒水，并主动擦干洒出的水。",
          "重复减少、兴趣转向别处时：提供下一项活动。",
          "如果工作变得随意，改天重新示范，而不是急于前进。"
        ],
        "link": "查看下一步"
      }
    ],
  },
  sample: {
    eyebrow: '看看真实的活动', title: '这就是您将使用的内容。',
    subtitle: '倒水 · 目的：协调、专注与独立。',
    imageAlt: '一个孩子在木托盘上把水从一个小玻璃壶倒入另一个，一只手握着把手，另一只手扶着壶',
    materialsTitle: '教具', materialsText: '两个相同的儿童尺寸小壶、水、一个托盘、海绵和擦干布。',
    preparationTitle: '准备', preparationText: '在邀请孩子之前，先把整个活动摆放好。',
    presentationTitle: '示范', presentationText: '缓慢地示范握持、提起、控制倒水、放回和清理。',
    observationTitle: '观察', observationText: '留意动作控制、专注、重复以及独立清理。',
    nextLabel: '下一项活动', nextText: '完整访问后可继续更深入的进阶序列。',
    cta: '从一项免费活动开始',
  },
  how: {
    eyebrow: '您的第一个工作周期', title: '准备。示范。观察。',
    body: '在选择高级版之前，先用一项免费入门活动体验完整流程。',
    prepareTitle: '准备', prepareText: '打开活动，备齐所列教具，并阅读书面示范步骤。',
    presentTitle: '示范', presentText: '离开屏幕与孩子一起工作，缓慢而清晰地按顺序进行。',
    observeTitle: '观察', observeText: '完成后记录活动，并根据序列决定下一步。',
    move: '从<1>寻找活动</1>，到<3>清楚知道该准备和示范什么。</3>',
    cta: '完成您的第一项活动',
  },
  curriculum: {
    eyebrow: '连贯的课程', title: '不再收集零散活动，而是遵循序列。',
    body: '零散的点子只能回答一个问题。Montessori Life Skills 将工作从入门到进阶有序排列，让成人看清哪些内容相互关联、下一步是什么。',
    explore: '探索序列 →', imageAlt: '{{area}}蒙台梭利教具',
  },
  areas: {
    practicalLife: '日常生活', sensorial: '感官', mathematics: '数学', language: '语言',
    geography: '地理', botany: '植物学', art: '艺术', graceCourtesy: '优雅与礼仪',
  },
  founder: {
    eyebrow: '认识创始人', imageAlt: 'Kerry Howard，AMI 认证蒙台梭利导师及创始人',
    badge: 'AMI 认证 3–6 岁初级导师',
    lead: '本应用中的每一项活动，都源自 Kerry 的专业培训和她 40 年在预备环境中引导儿童的经验——让您可以放心，您在家中所做的示范忠于玛利亚·蒙台梭利博士的方法，而不是 Pinterest 上的模仿。',
    body: '她的使命：让每个家庭都能接触到正宗的蒙台梭利教育，无需教室。',
    cta: '阅读 Kerry 的简介',
  },
  pricing: {
    eyebrow: '高级版访问', title: '继续完整课程。',
    body: '试用入门活动后，高级版将开放完整、有序的课程序列，费用不到典型蒙台梭利幼儿园一个月的学费，并附家庭教育标准指南和可打印的学习档案。',
    guarantee: '30 天退款保证 · 随时取消',
    bestValue: '最超值', annualTitle: '高级版（年付）', perYear: '/年', perMonth: '/月', perSession: '/次',
    annualEquivalent: '相当于 $16.58/月', annualNote: '一个孩子。比按月付费 12 个月节省 $160.88。',
    fFullCurriculum: '完整课程', fActivities: '100+ 项活动', fAllAreas: '所有课程领域', fProgress: '进度跟踪',
    fPresentations: '书面示范步骤', fMaterials: '教具信息', fVideos: '教学视频（如有）',
    startPremium: '开通高级版',
    flexible: '灵活', monthlyTitle: '高级版（月付）', monthlyBody: '相同的高级版访问，按月计费。随时取消。', monthlyCta: '查看月付方案',
    familyEyebrow: '最多四个孩子', familyTitle: '家庭版', familyBody: '或 $49/月。每个孩子都有独立的档案、目标和进度。', familyCta: '查看家庭版方案',
    consultEyebrow: '一对一', consultTitle: '私人咨询',
    consultBody: '与 AMI 认证导师进行 60 分钟视频咨询，根据您的孩子和目标量身定制。',
    cGuidance: '个性化课程指导', cRoutine: '融入家庭日常', cPlan: '可执行的书面行动计划', cFollowUp: '两周邮件跟进',
    cPackage: '3 次咨询套餐：$600', consultCta: '预约咨询',
  },
  beyond: {
    eyebrow: '第一项活动之后', title: '回到序列，分享有效的方法。',
    continueTitle: '继续工作', continueText: '回到每个孩子的档案，记录进度，并选择下一项合适的活动。',
    shareTitle: '与他人分享', shareText: '把 Montessori Life Skills 分享给其他家长、教师、照护者或教室助理。',
    schoolsTitle: '面向学校', schoolsText: '正宗示范，与国际蒙台梭利协会（Association Montessori Internationale，AMI）和美国蒙台梭利协会（American Montessori Society，AMS）的理念一致，适用于 AMI、AMS 及独立蒙台梭利学校。欢迎联系我们，探讨贵校的需求。',
    contactUs: '联系我们',
  },
  faq: {
    eyebrow: '问题', title: '常见问题',
    q1: '使用这个应用需要接受过蒙台梭利培训吗？', a1: '不需要。每项活动都有书面示范步骤和教学说明，适合家长、照护者、助理和教师。',
    q2: '适合哪个年龄段？', a2: '本课程为引导 3–6 岁儿童的成人设计。活动按发展准备度排列，而不是按固定的年龄表。',
    q3: '可以给多个孩子使用吗？', a3: '可以。高级版适用于一个孩子，家庭版最多适用于四个孩子，每个孩子的进度分开记录。',
    q4: '高级版包含 Kerry 的歌曲吗？', a4: '不包含。10 首歌曲合集需单独一次性购买，价格 $99.99，家庭可终身使用和下载。任何人都可以播放免费的 10 秒试听。',
    q5: '没有网络能用吗？', a5: '获取最新活动内容、购买链接、账户功能和受保护的视频需要网络连接。',
    q6: '课程是如何组织的？', a6: '每个课程领域内的活动从入门到进阶排列，教具与示范指导集中在同一处。',
    q7: '如果我不满意怎么办？', a7: '高级版方案提供 30 天退款保证。详情请见保证页面。',
    q8: '我的孩子会使用这个应用吗？', a8: '不会。Montessori Life Skills 是供成人使用的教学资源。您阅读示范步骤、准备教具，然后离开屏幕、动手引导孩子。这个应用绝不会成为孩子的屏幕时间。',
    q9: '这些示范与 AMI 和 AMS 一致吗？', a9: '是的。这些示范遵循由玛利亚·蒙台梭利博士创立的国际蒙台梭利协会（Association Montessori Internationale，AMI）以及美国蒙台梭利协会（American Montessori Society，AMS）的蒙台梭利方法，由一位受过 AMI 培训的 3–6 岁导师为家庭和教室编写。',
  },
  cta: {
    title: '准备好下一次示范了吗？',
    body: '使用成人指南选择活动、备齐教具，并清晰地示范课程，让孩子通过动手操作来学习。',
    explore: '探索免费活动', viewPlans: '查看方案与价格',
    noCard: '无需信用卡', cancelAnytime: '随时取消', guarantee: '30 天保证', community: '加入我们的社区',
  },
  aiDisclaimer: '部分图片经过 AI 修改。',
  footer: {
    tagline: '为引导 3–6 岁儿童的家长、教育者、照护者和教室助理提供的备课与示范资源。',
    product: '产品', activities: '活动', progress: '进度跟踪', pricing: '价格', about: '关于我们', readinessGuide: '免费入学准备指南',
    support: '支持', help: '帮助中心', contact: '联系我们', guarantee: '30 天保证', privacy: '隐私政策', terms: '服务条款',
    accessibility: '无障碍', cookies: 'Cookie 设置',
    trustRefund: '30 天退款', trustCancel: '随时取消', trustNoCard: '免费版无需绑卡', trustBuilt: '由 AMI 导师打造',
    complianceLabel: '隐私与学生保护',
    complianceRegions: { us: '美国', eu: '欧盟和英国', de: '德国', es: '西班牙和拉丁美洲', cn: '中国', in: '印度', ea: '肯尼亚和乌干达' },
    complianceNoAds: '不向儿童投放广告，不跟踪儿童',
    rights: '© {{year}} Montessori Life Skills。保留所有权利。',
  },
};
