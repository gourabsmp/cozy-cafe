import supabase from '../config/supabase.js';

const singletonController = (table) => ({
  get: async (req, res, next) => {
    try {
      const { data, error } = await supabase.from(table).select('*').single();
      if (error && error.code !== 'PGRST116') return next(error);
      res.json({ success: true, data: data || {} });
    } catch (err) { next(err); }
  },
  update: async (req, res, next) => {
    try {
      const { data: existing } = await supabase.from(table).select('id').single();
      let result;
      if (existing) {
        const { data, error } = await supabase.from(table).update(req.body).eq('id', existing.id).select().single();
        if (error) return next(error);
        result = data;
      } else {
        const { data, error } = await supabase.from(table).insert(req.body).select().single();
        if (error) return next(error);
        result = data;
      }
      res.json({ success: true, data: result });
    } catch (err) { next(err); }
  }
});

export const themeController = singletonController('theme_settings');
export const animationController = singletonController('animation_settings');
export const socialController = singletonController('social_links');
