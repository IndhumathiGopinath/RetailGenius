/*
  # Add sample products and categories

  1. Sample Data
    - Add electronics category and subcategories
    - Add fashion category and subcategories
    - Add home & living category and subcategories
    - Add sample products in each category
*/

-- Insert main categories
INSERT INTO categories (name, slug, description) VALUES
  ('Electronics', 'electronics', 'Latest gadgets and electronic devices'),
  ('Fashion', 'fashion', 'Trendy clothing and accessories'),
  ('Home & Living', 'home-living', 'Everything for your home');

-- Insert electronics subcategories
INSERT INTO categories (name, slug, description, parent_id) VALUES
  ('Smartphones', 'smartphones', 'Latest smartphones and accessories',
    (SELECT id FROM categories WHERE slug = 'electronics')),
  ('Laptops', 'laptops', 'Powerful laptops for work and gaming',
    (SELECT id FROM categories WHERE slug = 'electronics')),
  ('Audio', 'audio', 'Headphones and speakers',
    (SELECT id FROM categories WHERE slug = 'electronics'));

-- Insert fashion subcategories
INSERT INTO categories (name, slug, description, parent_id) VALUES
  ('Men', 'men', 'Men''s clothing and accessories',
    (SELECT id FROM categories WHERE slug = 'fashion')),
  ('Women', 'women', 'Women''s clothing and accessories',
    (SELECT id FROM categories WHERE slug = 'fashion')),
  ('Accessories', 'accessories', 'Fashion accessories',
    (SELECT id FROM categories WHERE slug = 'fashion'));

-- Insert home & living subcategories
INSERT INTO categories (name, slug, description, parent_id) VALUES
  ('Furniture', 'furniture', 'Modern furniture for your home',
    (SELECT id FROM categories WHERE slug = 'home-living')),
  ('Decor', 'decor', 'Beautiful home decorations',
    (SELECT id FROM categories WHERE slug = 'home-living')),
  ('Kitchen', 'kitchen', 'Kitchen appliances and accessories',
    (SELECT id FROM categories WHERE slug = 'home-living'));

-- Insert sample products
INSERT INTO products (name, slug, description, price, stock_quantity, category_id, image_url) VALUES
  -- Electronics - Smartphones
  ('Premium Smartphone X', 'premium-smartphone-x', 'Latest flagship smartphone with amazing camera', 999.99, 50,
    (SELECT id FROM categories WHERE slug = 'smartphones'),
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=500'),
  
  -- Electronics - Laptops
  ('Ultra Book Pro', 'ultra-book-pro', 'Powerful laptop for professionals', 1299.99, 30,
    (SELECT id FROM categories WHERE slug = 'laptops'),
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=500'),
  
  -- Electronics - Audio
  ('Wireless Headphones', 'wireless-headphones', 'Premium noise-canceling headphones', 299.99, 100,
    (SELECT id FROM categories WHERE slug = 'audio'),
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=500'),
  
  -- Fashion - Men
  ('Classic Denim Jacket', 'classic-denim-jacket', 'Timeless denim jacket for men', 79.99, 45,
    (SELECT id FROM categories WHERE slug = 'men'),
    'https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&q=80&w=500'),
  
  -- Fashion - Women
  ('Summer Floral Dress', 'summer-floral-dress', 'Beautiful floral dress for summer', 59.99, 60,
    (SELECT id FROM categories WHERE slug = 'women'),
    'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=500'),
  
  -- Fashion - Accessories
  ('Leather Wallet', 'leather-wallet', 'Genuine leather wallet', 49.99, 80,
    (SELECT id FROM categories WHERE slug = 'accessories'),
    'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=500'),
  
  -- Home & Living - Furniture
  ('Modern Sofa', 'modern-sofa', 'Comfortable 3-seater sofa', 799.99, 15,
    (SELECT id FROM categories WHERE slug = 'furniture'),
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=500'),
  
  -- Home & Living - Decor
  ('Minimalist Wall Art', 'minimalist-wall-art', 'Abstract wall art for modern homes', 129.99, 40,
    (SELECT id FROM categories WHERE slug = 'decor'),
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=500'),
  
  -- Home & Living - Kitchen
  ('Smart Coffee Maker', 'smart-coffee-maker', 'WiFi-enabled premium coffee maker', 199.99, 25,
    (SELECT id FROM categories WHERE slug = 'kitchen'),
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=500');