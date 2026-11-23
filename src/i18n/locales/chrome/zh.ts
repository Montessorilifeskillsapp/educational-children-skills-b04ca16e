// "chrome" namespace, zh: must match the English shape in ./en.ts.
import type { en } from './en';

export const zh: typeof en = {
  back: '返回', home: '首页', goHome: '前往主屏幕', curriculumSections: '课程领域', sequence: '序列：{{sequence}}',
  continueLearning: '继续学习',
  titles: {
    practicalLife: '日常生活', sensorial: '感官发展', mathematics: '数学', language: '语言', geography: '地理',
    botany: '植物学', art: '艺术', cultural: '文化研究', graceCourtesy: '优雅与礼仪', allPracticalLife: '全部日常生活活动',
  },
  menu: {
    menu: '菜单', login: '登录', dashboard: '面板', cultural: '文化', plans: '方案', familyDashboard: '家庭面板', profiles: '档案',
    schoolAdmin: '学校管理', appAdmin: '应用管理', accessCodes: '访问码', terms: '服务条款', privacy: '隐私政策',
  },
  shop: {
    region: '选购 Montessori Life Skills 故事书', title: '选购 Montessori Life Skills 故事书', graceTitle: '选购优雅与礼仪教具',
    body: '精美插图故事书，让蒙台梭利生活技能生动起来。', browse: '浏览图书',
  },
  card: {
    premium: '高级版活动', completed: '✓ 已完成', materialAlt: '{{title}}蒙台梭利教具', iconAlt: '{{title}}活动图标',
    aria: '{{title}}——{{category}}活动，{{difficulty}}级别。{{status}}。{{action}}',
    done: '已完成', notDone: '未完成', lockedAction: '高级版活动，打开查看解锁方式', start: '点击开始',
    difficulty: { Beginner: '入门', Intermediate: '中级', Advanced: '进阶', Easy: '简单', Medium: '中等' },
  },
  notFound: {
    title: '哎呀！页面未找到', body: '您要找的页面似乎自己去探险学习了。我们带您回去继续探索吧！',
    goHome: '返回首页', goBack: '返回', looking: '您可能在找：',
    s1: '• 日常生活活动', s2: '• 学习活动', s3: '• 进度面板', s4: '• 高级版方案',
  },
};
