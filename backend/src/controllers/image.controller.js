import supabase from '../config/supabase.js';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;

const getPublicUrl = (bucket, path) => `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;

export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file provided' });
    const { bucket = 'cafe-images', folder = 'general' } = req.body;
    const ext = req.file.originalname.split('.').pop();
    const fileName = `${folder}/${uuidv4()}.${ext}`;

    const { error } = await supabase.storage.from(bucket).upload(fileName, req.file.buffer, {
      contentType: req.file.mimetype,
      upsert: false
    });
    if (error) return next(error);

    const publicUrl = getPublicUrl(bucket, fileName);
    res.status(201).json({ success: true, url: publicUrl, path: fileName, bucket });
  } catch (err) { next(err); }
};

export const deleteImage = async (req, res, next) => {
  try {
    const { bucket, path } = req.body;
    if (!bucket || !path) return res.status(400).json({ success: false, message: 'bucket and path required' });
    const { error } = await supabase.storage.from(bucket).remove([path]);
    if (error) return next(error);
    res.json({ success: true, message: 'Image deleted' });
  } catch (err) { next(err); }
};

// Gallery CRUD
export const getGallery = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('gallery').select('*').order('sort_order', { ascending: true });
    if (error) return next(error);
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

export const addGalleryItem = async (req, res, next) => {
  try {
    const { data, error } = await supabase.from('gallery').insert(req.body).select().single();
    if (error) return next(error);
    res.status(201).json({ success: true, data });
  } catch (err) { next(err); }
};

export const updateGalleryItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('gallery').update(req.body).eq('id', id).select().single();
    if (error) return next(error);
    res.json({ success: true, data });
  } catch (err) { next(err); }
};

export const deleteGalleryItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from('gallery').delete().eq('id', id);
    if (error) return next(error);
    res.json({ success: true, message: 'Gallery item deleted' });
  } catch (err) { next(err); }
};
