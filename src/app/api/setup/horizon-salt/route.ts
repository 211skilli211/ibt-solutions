import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Check if store already exists
    const existing = await sql`SELECT store_id FROM stores WHERE slug = 'horizon-salt'`;
    if (existing.length > 0) {
      return NextResponse.json({ success: true, storeId: existing[0].store_id, message: 'Store already exists' });
    }

    // Get vendor_id for IBT Solutions (user_id = 2)
    const vendor = await sql`SELECT id FROM vendors WHERE user_id = 2 LIMIT 1`;
    const vendorId = vendor[0]?.id || 2;

    // Create the store
    const storeResult = await sql`
      INSERT INTO stores (vendor_id, name, slug, description, category, status, service_mode, platform, hero_title, hero_subtitle, hero_cta_text, hero_cta_link, branding_color, secondary_color)
      VALUES (
        ${vendorId}, 'Horizon Salt Co.', 'horizon-salt',
        'Premium hand-harvested sea salt from the pristine salt ponds of St. Kitts & Nevis. Rich in minerals, sustainably sourced, and crafted with Caribbean heritage.',
        'food', 'active', 'online', 'marketplace',
        'Pure St. Kitts Sea Salt',
        'Hand-harvested from the historic salt ponds of St. Kitts. A taste of the Caribbean, delivered to your door.',
        'Shop Now', '/store/horizon-salt',
        '#0d9488', '#f59e0b'
      )
      RETURNING store_id
    `;
    const storeId = storeResult[0].store_id;

    // Create products
    const products = [
      {
        title: 'Fine Sea Salt 500g',
        description: 'Premium fine-grained sea salt from St. Kitts salt ponds. Perfect for everyday cooking, seasoning, and finishing dishes.',
        price: 15.00,
        img: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=400'
      },
      {
        title: 'Coarse Sea Salt 1kg',
        description: 'Coarse-grained sea salt ideal for grilling, roasting, and brining. Rich in natural minerals from Caribbean seawater.',
        price: 25.00,
        img: 'https://images.unsplash.com/photo-1626202378726-32d78c744441?w=400'
      },
      {
        title: 'St. Kitts Salt Gift Set',
        description: 'A curated gift set featuring fine and coarse sea salt in a beautiful Caribbean-themed package. Perfect for food lovers.',
        price: 45.00,
        img: 'https://images.unsplash.com/photo-1549465220-1a8b9238f7e7?w=400'
      },
      {
        title: 'Mineral Salt Scrub 300ml',
        description: 'Luxurious body scrub made with St. Kitts sea salt and natural Caribbean oils. Exfoliates and nourishes skin.',
        price: 35.00,
        img: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400'
      }
    ];

    for (const p of products) {
      await sql`
        INSERT INTO listings (type, title, description, price, creator_id, category, store_id, images, status, is_active)
        VALUES ('product', ${p.title}, ${p.description}, ${p.price}, 2, 'food', ${storeId}, ${JSON.stringify([p.img])}, 'active', true)
      `;
    }

    return NextResponse.json({ success: true, storeId, message: 'Store and products created' });
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
