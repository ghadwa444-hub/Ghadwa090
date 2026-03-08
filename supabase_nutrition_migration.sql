-- Add nutrition information columns to menu_items table
-- Run this SQL in Supabase SQL Editor

ALTER TABLE menu_items
ADD COLUMN IF NOT EXISTS calories INTEGER,
ADD COLUMN IF NOT EXISTS fats DECIMAL(5,1),
ADD COLUMN IF NOT EXISTS protein DECIMAL(5,1),
ADD COLUMN IF NOT EXISTS carbs DECIMAL(5,1);

COMMENT ON COLUMN menu_items.calories IS 'السعرات الحرارية - Calories';
COMMENT ON COLUMN menu_items.fats IS 'الدهون بالجرام - Fats in grams';
COMMENT ON COLUMN menu_items.protein IS 'البروتين بالجرام - Protein in grams';
COMMENT ON COLUMN menu_items.carbs IS 'الكربوهيدرات بالجرام - Carbohydrates in grams';
