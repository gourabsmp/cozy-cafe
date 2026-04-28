// Exact business data fallback — used when Supabase is not configured
export const fallbackCafeInfo = {
  name: 'Cozy Cafe',
  location: 'Cadillac, MI',
  address: '8834 E 34 Rd #131\nCadillac, MI 49601',
  phone: '+1(56)88289017',
  hero_title: 'Cozy Cafe',
  hero_subtitle: "Fresh coffee. Warm vibes. Cadillac's favorite spot.",
  concept: 'Cozy spot for coffee, food, and chill vibes',
  target_audience: 'Students, professionals, locals',
  menu_description: 'Coffee, tea, pastries, snacks, light meals',
  ambiance: 'WiFi, comfy seating, good lighting',
  marketing: 'Social media, loyalty programs, even',
  logo_url: null,
  instagram_url: '',
  facebook_url: '',
  twitter_url: '',
  tiktok_url: '',
};

export const fallbackMenuItems = [
  { id: '1',  name: 'Butter Croissant',    category: 'Pastries',   price: '$200',   description: 'Golden flaky butter croissant baked fresh daily', available: true, sort_order: 1 },
  { id: '2',  name: 'Chocolate Croissant', category: 'Pastries',   price: '$,500',  description: 'Rich chocolate-filled croissant', available: true, sort_order: 2 },
  { id: '3',  name: 'Cinnamon Roll',       category: 'Pastries',   price: '$,300',  description: 'Soft cinnamon roll with vanilla glaze', available: true, sort_order: 3 },
  { id: '4',  name: 'Banana Bread Slice',  category: 'Pastries',   price: '$1,000', description: 'Moist banana bread slice', available: true, sort_order: 4 },
  { id: '5',  name: 'Blueberry Muffin',    category: 'Pastries',   price: '$1,200', description: 'Fresh blueberry muffin', available: true, sort_order: 5 },
  { id: '6',  name: 'Cheese Danish',       category: 'Pastries',   price: '$1,400', description: 'Creamy cheese danish pastry', available: true, sort_order: 6 },
  { id: '7',  name: 'Toast & Jam',         category: 'Breakfast',  price: '$900',   description: 'Toasted bread with assorted jam', available: true, sort_order: 7 },
  { id: '8',  name: 'Pancake Stack',       category: 'Breakfast',  price: '$800',   description: 'Fluffy pancake stack with maple syrup', available: true, sort_order: 8 },
  { id: '9',  name: 'Club Sandwich',       category: 'Sandwiches', price: '$,500',  description: 'Classic triple-decker club sandwich', available: true, sort_order: 9 },
  { id: '10', name: 'Chicken Sandwich',    category: 'Sandwiches', price: '$200',   description: 'Grilled chicken sandwich', available: true, sort_order: 10 },
  { id: '11', name: 'Veggie Sandwich',     category: 'Sandwiches', price: '$100',   description: 'Fresh vegetable sandwich', available: true, sort_order: 11 },
  { id: '12', name: 'Beef Burger',         category: 'Burgers',    price: '$500',   description: 'Juicy beef burger with fresh toppings', available: true, sort_order: 12 },
  { id: '13', name: 'Chicken Burger',      category: 'Burgers',    price: '$800',   description: 'Crispy fried chicken burger', available: true, sort_order: 13 },
  { id: '14', name: 'French Fries',        category: 'Sides',      price: '$500',   description: 'Crispy golden french fries', available: true, sort_order: 14 },
  { id: '15', name: 'Meat Pie',            category: 'Snacks',     price: '$800',   description: 'Savory golden meat pie', available: true, sort_order: 15 },
  { id: '16', name: 'Sausage Roll',        category: 'Snacks',     price: '$700',   description: 'Flaky pastry sausage roll', available: true, sort_order: 16 },
  { id: '17', name: 'Spring Rolls',        category: 'Snacks',     price: '$200',   description: 'Crispy vegetable spring rolls', available: true, sort_order: 17 },
];

export const fallbackReviews = [
  { id: '1', author: 'Sarah M.',  rating: 5, text: 'Absolutely love this place! The croissants are amazing and the vibe is so cozy. My go-to spot every morning!' },
  { id: '2', author: 'James K.',  rating: 5, text: 'Best coffee in Cadillac by far. Great WiFi, comfortable seating — perfect for working remotely.' },
  { id: '3', author: 'Priya L.',  rating: 4, text: 'The ambiance is incredible. Feels like a little escape. The pastries are to die for!' },
  { id: '4', author: 'Marcus T.', rating: 5, text: 'Friendly staff, amazing food, and the loyalty program is such a nice touch. Highly recommend!' },
  { id: '5', author: 'Emily R.',  rating: 5, text: 'I brought my study group here and we stayed for hours. Super welcoming and the coffee is perfection.' },
];

export const fallbackOffers = [
  { id: '1', title: 'Morning Deal',     description: 'Get 20% off any pastry with your morning coffee before 10am', badge: 'Limited Time', active: true },
  { id: '2', title: 'Loyalty Rewards',  description: 'Buy 5 coffees, get your 6th FREE with our loyalty card program', badge: 'Members', active: true },
  { id: '3', title: 'Student Special',  description: 'Show your student ID for a 10% discount on all orders', badge: 'Students', active: true },
];
