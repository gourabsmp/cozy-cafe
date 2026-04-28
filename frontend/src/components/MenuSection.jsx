import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Plus, X, ShoppingBag } from 'lucide-react';
import { useCafe } from '../context/CafeContext';

const categoryImages = {
  Pastries: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1600&q=80',
  Breakfast: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1600&q=80',
  Sandwiches: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=1600&q=80',
  Burgers: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1600&q=80',
  Sides: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1600&q=80',
  Snacks: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=1600&q=80'
};

const itemImages = {
  'Butter Croissant': 'https://images.unsplash.com/photo-1555507036-ab794f4ade2a?auto=format&fit=crop&w=1600&q=80',
  'Chocolate Croissant': 'https://images.unsplash.com/photo-1657283310439-907a2f0bcf89?auto=format&fit=crop&w=1600&q=80',
  'Cinnamon Roll': 'https://images.unsplash.com/photo-1614211976408-0f55b53f00f4?auto=format&fit=crop&w=1600&q=80',
  'Banana Bread Slice': 'https://images.unsplash.com/photo-1606101209092-75f90f0e89f7?auto=format&fit=crop&w=1600&q=80',
  'Blueberry Muffin': 'https://images.unsplash.com/photo-1558303420-f814d8a590f5?auto=format&fit=crop&w=1600&q=80',
  'Cheese Danish': 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=1600&q=80',
  'Toast & Jam': 'https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&w=1600&q=80',
  'Pancake Stack': 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=1600&q=80',
  'Club Sandwich': 'https://images.unsplash.com/photo-1528736235302-52922df5c122?auto=format&fit=crop&w=1600&q=80',
  'Chicken Sandwich': 'https://images.unsplash.com/photo-1540713434306-58505cf1b6fc?auto=format&fit=crop&w=1600&q=80',
  'Veggie Sandwich': 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1600&q=80',
  'Beef Burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1600&q=80',
  'Chicken Burger': 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=1600&q=80',
  'French Fries': 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=1600&q=80',
  'Meat Pie': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1600&q=80',
  'Sausage Roll': 'https://images.unsplash.com/photo-1605522561233-768ad7a8fabf?auto=format&fit=crop&w=1600&q=80',
  'Spring Rolls': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80'
};
const itemImagesById = {
  '1': 'https://images.unsplash.com/photo-1555507036-ab794f4ade2a?auto=format&fit=crop&w=1600&q=80',
  '2': 'https://images.unsplash.com/photo-1657283310439-907a2f0bcf89?auto=format&fit=crop&w=1600&q=80',
  '3': 'https://images.unsplash.com/photo-1614211976408-0f55b53f00f4?auto=format&fit=crop&w=1600&q=80',
  '4': 'https://images.unsplash.com/photo-1606101209092-75f90f0e89f7?auto=format&fit=crop&w=1600&q=80',
  '5': 'https://images.unsplash.com/photo-1558303420-f814d8a590f5?auto=format&fit=crop&w=1600&q=80',
  '6': 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=1600&q=80',
  '7': 'https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&w=1600&q=80',
  '8': 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=1600&q=80',
  '9': 'https://images.unsplash.com/photo-1528736235302-52922df5c122?auto=format&fit=crop&w=1600&q=80',
  '10': 'https://images.unsplash.com/photo-1540713434306-58505cf1b6fc?auto=format&fit=crop&w=1600&q=80',
  '11': 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1600&q=80',
  '12': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1600&q=80',
  '13': 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=1600&q=80',
  '14': 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=1600&q=80',
  '15': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1600&q=80',
  '16': 'https://images.unsplash.com/photo-1605522561233-768ad7a8fabf?auto=format&fit=crop&w=1600&q=80',
  '17': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80'
};

export default function MenuSection() {
  const { menuItems, loading } = useCafe();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = useMemo(() => {
    const cats = new Set(menuItems.map((item) => item.category));
    return ['All', ...Array.from(cats)];
  }, [menuItems]);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return menuItems;
    return menuItems.filter((item) => item.category === activeCategory);
  }, [menuItems, activeCategory]);

  const getMenuImage = (item) =>
    item.image_url ||
    itemImagesById[item.id] ||
    itemImages[item.name] ||
    categoryImages[item.category] ||
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=80';

  return (
    <section id="menu" className="section-padding bg-cafe-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label">Gastronomy</span>
          <h2 className="section-title">Our Curated Menu</h2>
          <div className="gold-divider mx-auto" />
          <p className="max-w-2xl mx-auto text-cafe-muted italic">
            "A symphony of flavors, crafted with the finest ingredients and a passion for perfection."
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-500 interactive ${
                activeCategory === cat
                  ? 'bg-cafe-espresso text-cafe-gold shadow-2xl scale-110'
                  : 'bg-white text-cafe-espresso border border-cafe-gold/20 hover:border-cafe-gold hover:bg-cafe-gold/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          <AnimatePresence mode="popLayout">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="product-card h-[500px] skeleton" />
              ))
            ) : (
              filteredItems.map((item) => (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: "circOut" }}
                  className="product-card flex flex-col h-full group interactive"
                  onClick={() => setSelectedItem(item)}
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={getMenuImage(item)} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cafe-espresso/60 to-transparent" />
                    
                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 glass px-4 py-2 rounded-full border border-cafe-gold/30">
                      <span className="text-cafe-espresso font-black text-lg">{item.price}</span>
                    </div>

                    {/* Category Label */}
                    <div className="absolute bottom-4 left-6">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cafe-gold bg-cafe-espresso/80 px-3 py-1 rounded-sm">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-2xl font-bold text-cafe-espresso font-serif mb-3 line-clamp-1 group-hover:text-cafe-gold transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-cafe-muted text-sm leading-relaxed line-clamp-3 flex-1">
                      {item.description}
                    </p>
                    
                    <div className="mt-8 flex items-center justify-between">
                      <div className="flex gap-1">
                        <Coffee size={14} className="text-cafe-gold" />
                        <span className="text-[10px] font-bold text-cafe-muted uppercase tracking-widest">Premium Selection</span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-cafe-gold flex items-center justify-center text-cafe-espresso shadow-lg transition-all duration-500 group-hover:bg-cafe-espresso group-hover:text-cafe-gold group-hover:rotate-90">
                        <Plus size={20} />
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))
            )}
          </AnimatePresence>
        </div>

        {!loading && filteredItems.length === 0 && (
          <div className="text-center py-20">
            <ShoppingBag size={48} className="mx-auto mb-4 text-cafe-gold opacity-20" />
            <p className="text-cafe-muted italic">Our chefs are currently preparing more delights...</p>
          </div>
        )}
      </div>

      {/* Modal / Details */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 z-[110] bg-cafe-espresso/90 backdrop-blur-md" 
              onClick={() => setSelectedItem(null)} 
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[120] w-[95%] max-w-2xl bg-white rounded-[2rem] overflow-hidden shadow-2xl"
            >
              <div className="relative h-80">
                <img src={getMenuImage(selectedItem)} alt={selectedItem.name} className="w-full h-full object-cover" />
                <button 
                  onClick={() => setSelectedItem(null)} 
                  className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-white/40 transition-all interactive"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-cafe-gold mb-2 block">{selectedItem.category}</span>
                    <h3 className="text-4xl font-serif font-black text-cafe-espresso">{selectedItem.name}</h3>
                  </div>
                  <div className="text-3xl font-black text-cafe-gold">{selectedItem.price}</div>
                </div>
                <p className="text-cafe-muted text-lg leading-relaxed mb-8 border-l-4 border-cafe-gold pl-6 py-2 italic">
                  {selectedItem.description}
                </p>
                <button className="w-full btn-premium btn-premium-gold justify-center py-5 text-lg interactive">
                  <ShoppingBag size={22} /> Add to Order
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
