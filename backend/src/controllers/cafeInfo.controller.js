import supabase from '../config/supabase.js';

export const getCafeInfo = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('cafe_info').select('*').single();
    if (error) return next(error);
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

export const updateCafeInfo = async (req, res, next) => {
  try {
    const { data: existing } = await supabase.from('cafe_info').select('id').single();
    let result;
    if (existing) {
      const { data, error } = await supabase.from('cafe_info').update(req.body).eq('id', existing.id).select().single();
      if (error) return next(error);
      result = data;
    } else {
      const { data, error } = await supabase.from('cafe_info').insert(req.body).select().single();
      if (error) return next(error);
      result = data;
    }
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};
