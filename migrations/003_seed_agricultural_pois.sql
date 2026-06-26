-- Migration: Insert sample agricultural POIs
-- These represent agricultural plots/farms across the Caribbean regions

INSERT INTO ibt_pois (name, description, lat, lng, category, island, images) VALUES
  ('Caribbean Organic Cocoa Farm', 'Sustainable cacao plantation producing premium organic chocolate beans using traditional Trinidadian methods.', 10.75, -61.20, 'agricultural', 'Trinidad', '[]'),
  ('Jamaica Blue Mountain Coffee Estate', 'World-renowned coffee farm growing beans at high altitude in the Blue Mountains with rich volcanic soil.', 18.15, -77.28, 'agricultural', 'Jamaica', '[]'),
  ('Bahamas Pineapple Plantation', 'Large-scale pineapple farm supplying local markets and resorts across the Bahamas archipelago.', 25.10, -77.30, 'agricultural', 'Bahamas', '[]'),
  ('Trinidad Sugar Cane Fields', 'Historic sugar cane cultivation area with heritage processing mill dating back to the colonial era.', 10.65, -61.25, 'agricultural', 'Trinidad', '[]'),
  ('Jamaica Spice & Herb Garden', 'Diverse herb farm growing allspice, thyme, scotch bonnet peppers, and medicinal herbs for export.', 18.08, -77.35, 'agricultural', 'Jamaica', '[]');
