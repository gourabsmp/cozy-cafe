import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Coffee, ChevronDown, X } from 'lucide-react';
import { useCafe } from '../context/CafeContext';

const orderedCategories = ['Pastries', 'Breakfast', 'Sandwiches', 'Burgers', 'Sides', 'Snacks'];
const categoryTabs = ['All', ...orderedCategories];
const featuredLimit = 8;

const categoryFallbackImages = {
  Pastries: '/menu/fallbacks/fallback-pastries.jpg',
  Breakfast: '/menu/fallbacks/fallback-breakfast.jpg',
  Sandwiches: '/menu/fallbacks/fallback-sandwiches.jpg',
  Burgers: '/menu/fallbacks/fallback-burgers.jpg',
  Sides: '/menu/fallbacks/fallback-sides.jpg',
  Snacks: '/menu/fallbacks/fallback-snacks.jpg'
};

const itemImageMap = {
  'Butter Croissant': '/menu/fallbacks/fallback-pastries.jpg',
  'Chocolate Croissant': '/menu/items/chocolate-croissant.jpg',
  'Cinnamon Roll': '/menu/items/cinnamon-roll.jpg',
  'Banana Bread Slice': '/menu/fallbacks/fallback-pastries.jpg',
  'Blueberry Muffin': '/menu/items/blueberry-muffin.jpg',
  'Cheese Danish': '/menu/items/cheese-danish.jpg',
  'Toast & Jam': '/menu/items/toast-jam.jpg',
  'Pancake Stack': '/menu/items/pancake-stack.jpg',
  'Club Sandwich': '/menu/items/club-sandwich.jpg',
  'Chicken Sandwich': '/menu/items/chicken-sandwich.jpg',
  'Veggie Sandwich': '/menu/items/veggie-sandwich.jpg',
  'Beef Burger': '/menu/items/beef-burger.jpg',
  'Chicken Burger': '/menu/items/chicken-burger.jpg',
  'French Fries': '/menu/items/french-fries.jpg',
  'Meat Pie': '/menu/fallbacks/fallback-snacks.jpg',
  'Sausage Roll': '/menu/fallbacks/fallback-snacks.jpg',
  'Spring Rolls': '/menu/items/spring-rolls.jpg'
};

const defaultFoodImage = '/menu/fallbacks/fallback-default.jpg';

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 }
};

export default function MenuSection() {
  const { menuItems, loading } = useCafe();
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = useMemo(() => {
    const existing = new Set(menuItems.map((item) => item.category));
    return categoryTabs.filter((category) => category === 'All' || existing.has(category));
  }, [menuItems]);

  useEffect(() => {
    if (!categories.includes(activeCategory)) setActiveCategory('All');
  }, [activeCategory, categories]);

  useEffect(() => {
    setShowAll(false);
  }, [activeCategory]);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return menuItems;
    return menuItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, menuItems]);

  const displayedItems = useMemo(() => {
    if (showAll) return filteredItems;
    return filteredItems.slice(0, featuredLimit);
  }, [filteredItems, showAll]);

  const showViewToggle = filteredItems.length > featuredLimit;

  const getMenuImage = (item) =>
    item.imageUrl ||
    item.image_url ||
    itemImageMap[item.name] ||
    categoryFallbackImages[item.category] ||
    defaultFoodImage;

  const handleImageError = (event, item) => {
    const categoryFallback = categoryFallbackImages[item?.category] || defaultFoodImage;
    if (event.currentTarget.src !== categoryFallback) {
      event.currentTarget.src = categoryFallback;
      return;
    }
    event.currentTarget.src = defaultFoodImage;
  };

  return (
    <section id="menu" className="section-padding bg-[#fffaf4] pt-28 md:pt-24">
      <div className="container">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mx-auto max-w-5xl rounded-[30px] border border-cafe-gold/14 bg-white px-6 py-7 shadow-[0_18px_42px_rgba(29,18,10,0.05)] lg:px-8 lg:py-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.32 }}
            variants={reveal}
          >
            <div className="section-header !mb-0 max-w-[42rem]">
              <span className="section-label">Our Menu</span>
              <h2 className="mt-3 font-serif text-[clamp(2.6rem,7vw,4.6rem)] font-bold leading-[0.96] text-cafe-rich">
                Crafted with love
              </h2>
              <div className="mx-auto mb-5 mt-4 flex items-center justify-center gap-3 text-cafe-gold">
                <span className="h-px w-12 bg-cafe-gold/60" />
                <Coffee size={15} />
                <span className="h-px w-12 bg-cafe-gold/60" />
              </div>
              <p className="mx-auto mt-5 max-w-[32rem] text-balance text-sm leading-relaxed text-cafe-muted md:text-base">
                Handcrafted bites, comforting classics, and cafe favorites made for every mood.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="mt-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.3, delay: 0.06 }}
            variants={reveal}
          >
            <div className="mx-auto max-w-4xl">
              <div className="relative mx-auto mb-4 block md:hidden">
                <div className="rounded-[22px] border border-cafe-gold/18 bg-white p-2 shadow-[0_12px_26px_rgba(29,18,10,0.06)]">
                  <div className="mb-2 flex items-center justify-between px-3 pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cafe-gold">Category</span>
                    <ChevronDown size={16} className="text-cafe-gold" />
                  </div>
                  <select
                    value={activeCategory}
                    onChange={(event) => setActiveCategory(event.target.value)}
                    className="w-full appearance-none rounded-[16px] border border-cafe-gold/20 bg-[linear-gradient(180deg,#fffdf9_0%,#f8efe1_100%)] px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-cafe-rich outline-none transition-all duration-300 focus:border-cafe-gold"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="hidden items-center justify-center gap-2 border-b border-cafe-gold/14 pb-3 md:flex">
                {categories.map((category) => {
                  const isActive = activeCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={`shrink-0 rounded-full border px-4 py-2.5 text-[0.78rem] font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${
                        isActive
                          ? 'border-cafe-gold bg-gradient-to-r from-[#d4a843] to-[#f0d48a] text-cafe-espresso shadow-[0_14px_28px_rgba(212,168,67,0.24)]'
                          : 'border-cafe-gold/18 bg-white text-cafe-rich shadow-[0_8px_18px_rgba(29,18,10,0.04)] hover:-translate-y-0.5 hover:border-cafe-gold/40 hover:bg-[#fff8ef]'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <div className="mt-8 md:mt-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${showAll ? 'all' : 'featured'}`}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={reveal}
                transition={{ duration: 0.24 }}
              >
                {loading ? (
                  <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div key={index} className="skeleton-card min-h-[220px]" />
                    ))}
                  </div>
                ) : displayedItems.length > 0 ? (
                  <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    {displayedItems.map((item, index) => (
                      <motion.article
                        key={item.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 16 }}
                        transition={{ duration: 0.26, delay: index * 0.03 }}
                        className="group overflow-hidden rounded-[24px] border border-cafe-gold/14 bg-white shadow-[0_12px_28px_rgba(29,18,10,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-cafe-gold/30 hover:shadow-[0_16px_34px_rgba(29,18,10,0.08)]"
                      >
                        <button
                          type="button"
                          onClick={() => setSelectedItem(item)}
                          className="flex h-full w-full flex-col text-left sm:flex-row"
                        >
                          <div className="relative h-[200px] w-full overflow-hidden sm:h-auto sm:w-[220px] sm:min-w-[220px]">
                            <img
                              src={getMenuImage(item)}
                              alt={item.name}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                              width="960"
                              height="720"
                              loading="lazy"
                              decoding="async"
                              sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 540px"
                              onError={(event) => handleImageError(event, item)}
                            />
                            <span className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-[#d4a843] to-[#f0d48a] px-4 py-2 text-sm font-bold text-cafe-espresso shadow-[0_10px_22px_rgba(212,168,67,0.24)]">
                              {item.price}
                            </span>
                          </div>

                          <div className="flex flex-1 flex-col p-5">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cafe-gold">
                                  {item.category}
                                </p>
                                <h3 className="mt-2 font-serif text-[1.45rem] font-bold leading-tight text-cafe-espresso">
                                  {item.name}
                                </h3>
                              </div>
                            </div>

                            <p className="mt-3 text-sm leading-relaxed text-cafe-muted">{item.description}</p>

                            <div className="mt-auto flex items-center justify-between pt-5">
                              <span className="rounded-full bg-[#f7efe4] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-cafe-muted">
                                Freshly prepared
                              </span>

                              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cafe-espresso text-cafe-soft-gold transition-all duration-300 group-hover:scale-105">
                                <ArrowUpRight size={18} />
                              </span>
                            </div>
                          </div>
                        </button>
                      </motion.article>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-[24px] border border-cafe-gold/16 bg-white px-6 py-14 text-center shadow-[0_12px_28px_rgba(29,18,10,0.04)]">
                    <p className="font-serif text-2xl text-cafe-rich">No items found in this selection.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {!loading && showViewToggle && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll((value) => !value)}
                className="btn-premium rounded-full bg-cafe-espresso px-6 py-3 text-sm uppercase tracking-[0.18em] text-cafe-soft-gold hover:-translate-y-1"
              >
                {showAll ? 'Show Less' : 'View More'}
              </button>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[110] bg-cafe-espresso/88"
              onClick={() => setSelectedItem(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed left-1/2 top-1/2 z-[120] w-[95%] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[28px] bg-white shadow-2xl"
            >
              <div className="relative h-72 md:h-80">
                <img
                  src={getMenuImage(selectedItem)}
                  alt={selectedItem.name}
                  className="h-full w-full object-cover"
                  width="1200"
                  height="900"
                  onError={(event) => handleImageError(event, selectedItem)}
                />
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/35"
                  aria-label="Close menu item details"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="p-7 md:p-10">
                <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-[0.22em] text-cafe-gold">{selectedItem.category}</span>
                    <h3 className="mt-2 font-serif text-3xl font-bold text-cafe-espresso md:text-4xl">{selectedItem.name}</h3>
                  </div>
                  <span className="rounded-full bg-gradient-to-r from-[#d4a843] to-[#f0d48a] px-5 py-2 text-xl font-bold text-cafe-espresso">
                    {selectedItem.price}
                  </span>
                </div>
                <p className="border-l-4 border-cafe-gold pl-5 text-base leading-relaxed text-cafe-muted md:text-lg">
                  {selectedItem.description}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
