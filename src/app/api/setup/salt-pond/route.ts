import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

/**
 * POST /api/setup/salt-pond
 * One-time setup: create St. Kitts Salt Pond vendor + store + listings
 * This is a convenience endpoint for initial setup (remove after use)
 */
export async function POST() {
  try {
    // Check if already exists
    const existing = await sql`SELECT store_id FROM stores WHERE slug = 'st-kitts-salt-pond'`;
    if (existing.length > 0) {
      return NextResponse.json({ message: 'Salt Pond store already exists', store_id: existing[0].store_id });
    }

    // Create vendor record
    const vendor = await sql`
      INSERT INTO vendors (store_name, slug, description, category, subtype, business_address, website_url, is_verified, is_active, created_at)
      VALUES (
        'St. Kitts Salt Pond',
        'st-kitts-salt-pond',
        'Premium natural sea salt harvested from the pristine salt ponds of St. Kitts. Rich in minerals, sun-dried, and hand-processed using traditional Caribbean methods.',
        'Retail',
        'specialty_food',
        'Salt Pond, Southeast Peninsula, St. Kitts & Nevis',
        'https://saltpond.kn',
        true,
        true,
        NOW()
      )
      RETURNING vendor_id
    `;
    const vendorId = vendor[0].vendor_id;

    // Create store
    const store = await sql`
      INSERT INTO stores (vendor_id, category, subtype, name, slug, description, subscription_type, status, is_active, is_featured, branding_color, secondary_color, hero_title, hero_subtitle, hero_cta_text, hero_cta_link, service_mode, platform, created_at)
      VALUES (
        ${vendorId},
        'Retail',
        'specialty_food',
        'St. Kitts Salt Pond',
        'st-kitts-salt-pond',
        'Premium natural sea salt harvested from the pristine salt ponds of St. Kitts. Rich in minerals, sun-dried, and hand-processed using traditional Caribbean methods.',
        'basic',
        'active',
        true,
        true,
        '#d97706',
        '#92400e',
        'St. Kitts Salt Pond',
        'Premium Natural Sea Salt from the Caribbean',
        'Shop Now',
        '/store/st-kitts-salt-pond',
        'online',
        'marketplace',
        NOW()
      )
      RETURNING store_id
    `;
    const storeId = store[0].store_id;

    // Create product listings
    const products = [
      {
        title: 'Coarse Sea Salt — 500g',
        slug: 'coarse-sea-salt-500g',
        description: 'Hand-harvested coarse sea salt from St. Kitts salt ponds. Perfect for cooking, seasoning, and finishing dishes. Rich in natural minerals.',
        price: 15.00,
        category: 'specialty_food',
        sub_category: 'salt',
        images: ['https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=400'],
      },
      {
        title: 'Fine Sea Salt — 250g',
        slug: 'fine-sea-salt-250g',
        description: 'Finely ground sea salt, ideal for everyday cooking and baking. Sun-dried and minimally processed.',
        price: 10.00,
        category: 'specialty_food',
        sub_category: 'salt',
        images: ['https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=400'],
      },
      {
        title: 'Salt Sampler Gift Box',
        slug: 'salt-sampler-gift-box',
        description: 'A curated gift box featuring 3 varieties of St. Kitts sea salt: coarse, fine, and smoked. Beautifully packaged in eco-friendly materials.',
        price: 35.00,
        category: 'specialty_food',
        sub_category: 'gift_box',
        images: ['https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400'],
      },
      {
        title: 'Smoked Sea Salt — 200g',
        slug: 'smoked-sea-salt-200g',
        description: 'Artisan smoked sea salt, cold-smoked over local hardwoods for a rich, complex flavor. A gourmet chef favorite.',
        price: 20.00,
        category: 'specialty_food',
        sub_category: 'salt',
        images: ['https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=400'],
      },
    ];

    for (const p of products) {
      await sql`
        INSERT INTO listings (store_id, title, slug, description, price, category, sub_category, images, is_active, is_featured, created_at)
        VALUES (${storeId}, ${p.title}, ${p.slug}, ${p.description}, ${p.price}, ${p.category}, ${p.sub_category}, ${p.images}, true, true, NOW())
      `;
    }

    return NextResponse.json({
      success: true,
      vendor_id: vendorId,
      store_id: storeId,
      store_slug: 'st-kitts-salt-pond',
      products_created: products.length,
      message: 'St. Kitts Salt Pond store created successfully'
    });
  } catch (error: any) {
    console.error('Salt Pond setup error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
