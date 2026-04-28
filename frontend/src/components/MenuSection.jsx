import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Plus, Sparkles, X } from 'lucide-react';
import { useCafe } from '../context/CafeContext';

const orderedCategories = ['Pastries', 'Breakfast', 'Sandwiches', 'Burgers', 'Sides', 'Snacks'];
const categoryTabs = ['All', 'Signature', ...orderedCategories];
const featuredItemNames = ['Butter Croissant', 'Pancake Stack', 'Beef Burger'];
const featuredLimit = 8;

const categoryFallbackImages = {
  Pastries: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1600&q=80',
  Breakfast: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=1600&q=80',
  Sandwiches: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=1600&q=80',
  Burgers: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1600&q=80',
  Sides: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=1600&q=80',
  Snacks: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=1600&q=80'
};

const itemImageMap = {
  'Butter Croissant': 'https://images.unsplash.com/photo-1555507036-ab794f4ade2a?auto=format&fit=crop&w=1600&q=80',
  'Chocolate Croissant': 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1600&q=80',
  'Cinnamon Roll': 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?auto=format&fit=crop&w=1600&q=80',
  'Banana Bread Slice': 'https://images.unsplash.com/photo-1606101209092-75f90f0e89f7?auto=format&fit=crop&w=1600&q=80',
  'Blueberry Muffin': 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=1600&q=80',
  'Cheese Danish': 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=1600&q=80',
  'Toast & Jam': 'https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&w=1600&q=80',
  'Pancake Stack': 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=1600&q=80',
  'Club Sandwich': 'https://images.unsplash.com/photo-1528736235302-52922df5c122?auto=format&fit=crop&w=1600&q=80',
  'Chicken Sandwich': 'https://images.unsplash.com/photo-1540713434306-58505cf1b6fc?auto=format&fit=crop&w=1600&q=80',
  'Veggie Sandwich': 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1600&q=80',
  'Beef Burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1600&q=80',
  'Chicken Burger': 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=1600&q=80',
  'French Fries': 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=1600&q=80',
  'Meat Pie': 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=1600&q=80',
  'Sausage Roll': 'https://images.unsplash.com/photo-1619740455993-f5b2ad8bfb1d?auto=format&fit=crop&w=1600&q=80',
  'Spring Rolls': 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=1600&q=80'
};

const defaultFoodImage =
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1600&q=80';

const headerReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const cardMotion = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 18 }
};

export default function MenuSection() {
  const { menuItems, loading } = useCafe();
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const featuredItems = useMemo(() => {
    const mapped = featuredItemNames
      .map((name) => menuItems.find((item) => item.name === name))
      .filter(Boolean);

    if (mapped.length === featuredItemNames.length) return mapped;

    const fallbackItems = menuItems.filter((item) => orderedCategories.includes(item.category));
    return [...mapped, ...fallbackItems.filter((item) => !mapped.some((featured) => featured.id === item.id))].slice(0, 3);
  }, [menuItems]);

  const categories = useMemo(() => {
    const existing = new Set(menuItems.map((item) => item.category));
    return categoryTabs.filter((category) => category === 'All' || category === 'Signature' || existing.has(category));
  }, [menuItems]);

  useEffect(() => {
    if (!categories.includes(activeCategory)) {
      setActiveCategory('All');
    }
  }, [activeCategory, categories]);

  useEffect(() => {
    setShowAll(false);
  }, [activeCategory]);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'Signature') return featuredItems;
    if (activeCategory === 'All') return menuItems;
    return menuItems.filter((item) => item.category === activeCategory);
  }, [activeCategory, featuredItems, menuItems]);

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
    <section
      id="menu"
      className="section-padding relative overflow-hidden pt-28 md:pt-24 bg-[linear-gradient(180deg,#f6efe5_0%,#fbf5ed_22%,#fffaf4_100%)]"
    >
      <div className="menu-ambient-glow menu-ambient-glow-left" />
      <div className="menu-ambient-glow menu-ambient-glow-right" />

      <div className="container">
        <motion.div
          className="menu-showcase-shell relative overflow-hidden rounded-[36px] border border-[rgba(212,168,67,0.18)] px-5 py-8 shadow-[0_28px_70px_rgba(30,20,12,0.09)] md:px-8 md:py-10 xl:px-10"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.35 }}
        >
          <motion.div
            className="mx-auto max-w-[760px] text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35 }}
            variants={headerReveal}
          >
            <span className="section-label">Our Menu</span>
            <h2 className="section-title">Crafted with love</h2>
            <div className="mb-5 mt-4 flex items-center justify-center gap-3 text-cafe-gold">
              <span className="h-px w-12 bg-cafe-gold/60" />
              <Coffee size={15} />
              <span className="h-px w-12 bg-cafe-gold/60" />
            </div>
            <p className="mx-auto max-w-[760px] text-sm leading-relaxed text-cafe-muted md:text-base">
              Handcrafted bites, comforting classics, and cafe favorites made for every mood.
            </p>
          </motion.div>

          <motion.div
            className="mt-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.3, delay: 0.08 }}
            variants={headerReveal}
          >
            <div className="menu-picks-strip mx-auto max-w-[1040px] rounded-full bg-cafe-espresso px-3 py-3 md:px-4">
              <div className="menu-picks-scroll flex items-center gap-3 overflow-x-auto pb-1">
                <span className="shrink-0 inline-flex items-center gap-2 rounded-full border border-cafe-gold/25 bg-cafe-gold/10 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-cafe-gold">
                  <Sparkles size={12} />
                  Chef&apos;s Picks
                </span>

                {featuredItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    className="group shrink-0 flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-left transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <img
                      src={getMenuImage(item)}
                      alt={item.name}
                      className="h-10 w-10 rounded-full object-cover md:h-11 md:w-11"
                      loading="lazy"
                      decoding="async"
                      onError={(event) => handleImageError(event, item)}
                    />
                    <div>
                      <p className="font-serif text-sm font-semibold text-white">{item.name}</p>
                      <p className="text-xs uppercase tracking-[0.18em] text-cafe-gold/80">{item.price}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mt-6 md:mt-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.3, delay: 0.12 }}
            variants={headerReveal}
          >
            <div className="menu-filter-scroll -mx-4 px-4 md:mx-0 md:px-0">
              <div className="menu-tabbar mx-auto flex w-max min-w-full items-center gap-2 rounded-full border border-cafe-gold/20 bg-[rgba(255,251,245,0.88)] p-2 shadow-[0_16px_34px_rgba(30,20,12,0.08)] md:min-w-0 md:justify-center">
                {categories.map((category) => {
                  const isActive = activeCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={`menu-tab shrink-0 whitespace-nowrap rounded-full border px-4 py-2.5 text-[0.76rem] font-bold uppercase tracking-[0.18em] transition-all duration-300 ${
                        isActive
                          ? 'border-cafe-gold bg-gradient-to-r from-[#d4a843] to-[#f0d48a] text-cafe-espresso shadow-[0_10px_24px_rgba(212,168,67,0.24)] scale-[1.02]'
                          : 'border-cafe-gold/12 bg-transparent text-cafe-rich hover:border-cafe-gold/35 hover:bg-cafe-gold/8'
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
                exit="exit"
                variants={cardMotion}
                transition={{ duration: 0.28 }}
              >
                {loading ? (
                  <div className="menu-grid grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-7 2xl:grid-cols-4">
                    {Array.from({ length: 8 }).map((_, index) => (
                      <div key={index} className="menu-card skeleton-card" />
                    ))}
                  </div>
                ) : displayedItems.length > 0 ? (
                  <div className="menu-grid grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-7 2xl:grid-cols-4">
                    {displayedItems.map((item, index) => (
                      <motion.article
                        key={item.id}
                        layout
                        variants={cardMotion}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3, delay: index * 0.04 }}
                        className="menu-card group flex flex-col overflow-hidden rounded-[24px] border border-[rgba(212,168,67,0.25)] bg-[#fffdf8] shadow-[0_18px_40px_rgba(29,18,10,0.09)] transition-all duration-300 hover:-translate-y-2 hover:border-cafe-gold/60 hover:shadow-[0_24px_44px_rgba(29,18,10,0.14)]"
                      >
                        <button type="button" className="text-left" onClick={() => setSelectedItem(item)}>
                          <div className="menu-card-media relative overflow-hidden">
                            <img
                              src={getMenuImage(item)}
                              alt={item.name}
                              className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.08]"
                              loading="lazy"
                              decoding="async"
                              onError={(event) => handleImageError(event, item)}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-cafe-espresso/55 via-cafe-espresso/10 to-transparent" />
                            <span className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-[#d4a843] to-[#f0d48a] px-4 py-2 text-sm font-bold text-cafe-espresso shadow-[0_12px_24px_rgba(212,168,67,0.28)]">
                              {item.price}
                            </span>
                          </div>
                        </button>

                        <div className="flex flex-1 flex-col p-4 md:p-[18px]">
                          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-cafe-gold">
                            {item.category}
                          </span>
                          <h3 className="menu-card-title mt-2 font-serif font-bold leading-tight text-cafe-espresso">
                            {item.name}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-cafe-muted">{item.description}</p>

                          <div className="mt-auto flex items-center justify-between pt-5">
                            <span className="rounded-full border border-cafe-gold/20 bg-cafe-gold/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-cafe-muted">
                              Freshly prepared
                            </span>

                            <button
                              type="button"
                              onClick={() => setSelectedItem(item)}
                              className="flex h-10 w-10 items-center justify-center rounded-full bg-cafe-espresso text-cafe-gold shadow-[0_12px_24px_rgba(26,18,11,0.18)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_0_8px_rgba(212,168,67,0.12)]"
                              aria-label={`View ${item.name}`}
                            >
                              <Plus size={18} />
                            </button>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-[28px] border border-cafe-gold/20 bg-[#fffdf8] px-6 py-14 text-center shadow-[0_18px_40px_rgba(29,18,10,0.07)]">
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
                className="btn-premium rounded-full bg-cafe-espresso px-6 py-3 text-sm uppercase tracking-[0.18em] text-cafe-gold hover:-translate-y-1"
              >
                {showAll ? 'Show Less' : 'View More'}
              </button>
            </div>
          )}
        </motion.div>
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
