import supabase from '../config/supabase.js';

export const getAllMenuItems = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    let query = supabase.from('menu_items').select('*').order('sort_order', { ascending: true });
    if (category && category !== 'All') query = query.eq('category', category);
    if (search) query = query.ilike('name', `%${search}%`);
    const { data, error } = await query;
    if (error) return next(error);
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

export const createMenuItem = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('menu_items').insert(req.body).select().single();
    if (error) return next(error);
    res.status(201).json({ success: true, data });
  } catch (err) { next(err); }
};

export const updateMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('menu_items').update(req.body).eq('id', id).select().single();
    if (error) return next(error);
    if (!data) return res.status(404).json({ success: false, message: 'Menu item not found' });
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

export const deleteMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('menu_items').delete().eq('id', id);
    if (error) return next(error);
    res.json({ success: true, message: 'Menu item deleted' });
  } catch (err) { next(err); }
};

export const getCategories = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('menu_items').select('category');
    if (error) return next(error);
    const cats = [...new Set(data.map(i => i.category).filter(Boolean))];
    res.json({ success: true, data: cats });
  } catch (err) { next(err); }
};
