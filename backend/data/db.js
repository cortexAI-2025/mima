const bcrypt = require('bcryptjs');

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------
const products = [
  {
    id: '1',
    name: 'سلطة الأفوكادو والجمبري',
    description:
      'سلطة طازجة بالأفوكادو الكريمي والجمبري المشوي مع صلصة الليمون والأعشاب',
    price: 85,
    image: 'https://picsum.photos/seed/food1/300/200',
    category: 'classic',
    badge: 'جديد',
  },
  {
    id: '2',
    name: 'شريحة لحم بصوص الفلفل',
    description:
      'شريحة لحم بقري مشوية على الفحم مع صوص الفلفل الأسود والخضروات الموسمية',
    price: 190,
    image: 'https://picsum.photos/seed/food2/300/200',
    category: 'sport',
    badge: 'الأكثر طلباً',
  },
  {
    id: '3',
    name: 'مكرونة الترافل الأسود',
    description:
      'مكرونة إيطالية فاخرة مع الترافل الأسود وصلصة الكريمة والبارميزان',
    price: 130,
    image: 'https://picsum.photos/seed/food3/300/200',
    category: 'classic',
    badge: '',
  },
  {
    id: '4',
    name: 'تارت التوت البري',
    description:
      'تارت محلية الصنع بالتوت البري الطازج وكريمة الفانيليا على قاعدة بسكويت هشة',
    price: 55,
    image: 'https://picsum.photos/seed/food4/300/200',
    category: 'light',
    badge: 'خالٍ من السكر',
  },
  {
    id: '5',
    name: 'برغر مغربي فاخر',
    description:
      'برغر مغربي بلحم الضأن المتبل بالبهارات المغربية وصلصة الحريسة',
    price: 95,
    image: 'https://picsum.photos/seed/food5/300/200',
    category: 'sport',
    badge: 'غني بالبروتين',
  },
  {
    id: '6',
    name: 'شاورما الدجاج المغربية',
    description:
      'شاورما دجاج متبلة بالتوابل المغربية الأصيلة مع الخضروات والصلصة السرية',
    price: 75,
    image: 'https://picsum.photos/seed/food6/300/200',
    category: 'classic',
    badge: '',
  },
  {
    id: '7',
    name: 'سموذي الفواكه الطازجة',
    description:
      'مزيج من الفواكه الموسمية الطازجة مع العسل الطبيعي وبذور الشيا',
    price: 45,
    image: 'https://picsum.photos/seed/food7/300/200',
    category: 'light',
    badge: 'صحي',
  },
  {
    id: '8',
    name: 'طاجن الدجاج بالليمون',
    description:
      'طاجن مغربي أصيل بالدجاج والليمون المخلل والزيتون والتوابل التقليدية',
    price: 110,
    image: 'https://picsum.photos/seed/food8/300/200',
    category: 'classic',
    badge: 'تراثي',
  },
];

// ---------------------------------------------------------------------------
// Chef collections
// ---------------------------------------------------------------------------
const chefCollections = [
  {
    id: 'chef1',
    title: 'طبق الشيف المميز',
    image: 'https://picsum.photos/seed/food10/300/200',
  },
  {
    id: 'chef2',
    title: 'وصفة الأسبوع',
    image: 'https://picsum.photos/seed/food20/300/200',
  },
  {
    id: 'chef3',
    title: 'الأطباق الموسمية',
    image: 'https://picsum.photos/seed/food30/300/200',
  },
  {
    id: 'chef4',
    title: 'إبداعات مغربية',
    image: 'https://picsum.photos/seed/food40/300/200',
  },
];

// ---------------------------------------------------------------------------
// Users  (seed user — password hash generated synchronously at startup)
// ---------------------------------------------------------------------------
const users = [
  {
    id: 'u1',
    name: 'Badiaa RADI',
    email: 'badiaa@mimanaturals.com',
    passwordHash: bcrypt.hashSync('password123', 10),
    memberId: 'MIMA-2024-8847',
    points: 850,
    level: 'gold',
    joinedAt: '2024-01-15',
  },
];

// ---------------------------------------------------------------------------
// Orders  (starts empty — populated by POST /api/orders)
// ---------------------------------------------------------------------------
const orders = [];

// ---------------------------------------------------------------------------
// Loyalty history  (seed data for the default user)
// ---------------------------------------------------------------------------
const loyaltyHistory = [
  {
    userId: 'u1',
    date: '2024-03-22',
    description: 'شريحة لحم بصوص الفلفل',
    amount: 190,
    points: 19,
  },
  {
    userId: 'u1',
    date: '2024-03-18',
    description: 'مكرونة الترافل الأسود + سموذي',
    amount: 175,
    points: 18,
  },
  {
    userId: 'u1',
    date: '2024-03-10',
    description: 'برغر مغربي فاخر + تارت التوت',
    amount: 150,
    points: 15,
  },
];

// ---------------------------------------------------------------------------
// Helper – derive loyalty level from point total
// ---------------------------------------------------------------------------
function getLoyaltyLevel(points) {
  if (points >= 1200) return 'platinum';
  if (points >= 700) return 'gold';
  if (points >= 300) return 'silver';
  return 'bronze';
}

module.exports = { products, chefCollections, users, orders, loyaltyHistory, getLoyaltyLevel };
