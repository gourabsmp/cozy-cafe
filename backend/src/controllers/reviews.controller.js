import supabase from '../config/supabase.js';

const crudController = (table) => ({
  getAll: async (req, res, next) => {
    try {
      const { data, error } = await supabase.from(table).select('*').order('created_at', { ascending: false });
      if (error) return next(error);
      res.json({ success: true, data });
    } catch (err) { next(err); }
  },
  create: async (req, res, next) => {
    try {
      const { data, error } = await supabase.from(table).insert(req.body).select().single();
      if (error) return next(error);
      res.status(201).json({ success: true, data });
    } catch (err) { next(err); }
  },
  update: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { data, error } = await supabase.from(table).update(req.body).eq('id', id).select().single();
      if (error) return next(error);
      if (!data) return res.status(404).json({ success: false, message: 'Not found' });
      res.json({ success: true, data });
    } catch (err) { next(err); }
  },
  remove: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) return next(error);
      res.json({ success: true, message: 'Deleted' });
    } catch (err) { next(err); }
  }
});

export const reviewsController = crudController('reviews');
export const offersController = crudController('offers');
