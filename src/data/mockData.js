export const dashboardStats = [
  {
    id: "products",
    label: "Товари",
    value: "1250",
    hint: "Усього товарів",
    tone: "blue",
  },
  {
    id: "orders",
    label: "Замовлення",
    value: "320",
    hint: "Усього замовлень",
    tone: "green",
  },
  {
    id: "clients",
    label: "Клієнти",
    value: "860",
    hint: "Зареєстрованих клієнтів",
    tone: "yellow",
  },
  {
    id: "income",
    label: "Дохід",
    value: "1 250 000 ₴",
    hint: "За поточний місяць",
    tone: "purple",
  },
];

export const orderStats = [
  {
    id: "total",
    label: "Усього замовлень",
    value: "320",
    tone: "blue",
  },
  {
    id: "done",
    label: "Виконано",
    value: "210",
    tone: "green",
  },
  {
    id: "processing",
    label: "В обробці",
    value: "75",
    tone: "yellow",
  },
  {
    id: "cancelled",
    label: "Скасовано",
    value: "35",
    tone: "red",
  },
];

export const salesPoints = [
  { month: "Січ", value: 52000 },
  { month: "Лют", value: 76000 },
  { month: "Бер", value: 95000 },
  { month: "Кві", value: 148000 },
  { month: "Тра", value: 126000 },
  { month: "Чер", value: 174000 },
];

export const categorySales = [
  { label: "Електроніка", value: "35%", color: "#4285df" },
  { label: "Побутова техніка", value: "25%", color: "#69b96d" },
  { label: "Офісна техніка", value: "20%", color: "#f3c84b" },
  { label: "Інше", value: "20%", color: "#8e6ed1" },
];

export const orders = [
  {
    number: "#10045",
    client: 'ТОВ "Компанія А"',
    date: "07.06.2024",
    amount: "25 000 ₴",
    status: "Виконано",
  },
  {
    number: "#10044",
    client: "ФОП Іваненко І.І.",
    date: "07.06.2024",
    amount: "12 500 ₴",
    status: "В обробці",
  },
  {
    number: "#10043",
    client: 'ТОВ "Компанія Б"',
    date: "06.06.2024",
    amount: "8 700 ₴",
    status: "Очікує",
  },
  {
    number: "#10042",
    client: 'ПП "Партнер"',
    date: "06.06.2024",
    amount: "15 300 ₴",
    status: "Виконано",
  },
  {
    number: "#10041",
    client: "ФОП Петренко П.П.",
    date: "05.06.2024",
    amount: "9 900 ₴",
    status: "В обробці",
  },
  {
    number: "#10040",
    client: 'ТОВ "Сервіс+"',
    date: "05.06.2024",
    amount: "18 600 ₴",
    status: "Скасовано",
  },
  {
    number: "#10039",
    client: "ФОП Коваленко Д.С.",
    date: "04.06.2024",
    amount: "7 400 ₴",
    status: "Очікує",
  },
  {
    number: "#10038",
    client: 'ТОВ "Компанія А"',
    date: "04.06.2024",
    amount: "11 200 ₴",
    status: "Виконано",
  },
  {
    number: "#10037",
    client: 'ПП "Лідер"',
    date: "03.06.2024",
    amount: "13 800 ₴",
    status: "В обробці",
  },
  {
    number: "#10036",
    client: "ФОП Мельник О.В.",
    date: "03.06.2024",
    amount: "6 300 ₴",
    status: "Скасовано",
  },
];

export const topProducts = [
  { product: "Ноутбук Lenovo", sold: 85 },
  { product: "Монітор Dell", sold: 74 },
  { product: "Принтер HP LaserJet", sold: 63 },
  { product: "Смартфон Samsung", sold: 58 },
  { product: "Клавіатура Logitech", sold: 47 },
];

export const products = [
  { name: "Ноутбук Lenovo ThinkBook", sku: "NB-1048", category: "Електроніка", stock: 48, price: "28 500 ₴" },
  { name: "Монітор Dell 24", sku: "MN-2411", category: "Офісна техніка", stock: 74, price: "7 900 ₴" },
  { name: "Принтер HP LaserJet", sku: "PR-5032", category: "Побутова техніка", stock: 31, price: "9 400 ₴" },
  { name: "Смартфон Samsung", sku: "SM-7710", category: "Електроніка", stock: 58, price: "19 900 ₴" },
  { name: "Клавіатура Logitech", sku: "KB-2215", category: "Аксесуари", stock: 122, price: "1 250 ₴" },
];

export const clients = [
  { name: 'ТОВ "Компанія А"', contact: "office@company-a.ua", orders: 42, segment: "Корпоративний" },
  { name: "ФОП Іваненко І.І.", contact: "ivanenko@example.com", orders: 18, segment: "Роздрібний" },
  { name: 'ПП "Партнер"', contact: "partner@example.com", orders: 26, segment: "Партнер" },
  { name: 'ТОВ "Сервіс+"', contact: "service-plus@example.com", orders: 14, segment: "Корпоративний" },
];
