import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST() {
  try {
    // Check if store already exists
    const existing = await sql`SELECT store_id FROM stores WHERE slug = 'st-kitts-salt-pond'`;
    if (existing.length > 0) {
      return NextResponse.json({ message: 'Salt Pond store already exists', store_id: existing[0].store_id });
    }

    // Use Billy's existing vendor record (user_id=2, vendor_id from IBT Solutions)
    // One vendor can have multiple stores
    const vendor = await sql`SELECT id FROM vendors WHERE user_id = 2 LIMIT 1`;
    if (vendor.length === 0) {
      return NextResponse.json({ error: 'No vendor found for user_id 2' }, { status: 400 });
    }
    const vendorId = vendor[0].id;

    // Create store
    const store = await sql`
      INSERT INTO stores (
        vendor_id, name, slug, description, category, subtype, status, subscription_type,
        branding_color, secondary_color, hero_title, hero_subtitle, hero_cta_text, hero_cta_link,
        is_active, is_featured, created_at
      ) VALUES (
        ${vendorId},
        'St. Kitts Salt Pond',
        'st-kitts-salt-pond',
        'Premium natural sea salt harvested from the pristine salt ponds of St. Kitts. Rich in minerals, sun-dried, and hand-processed using traditional Caribbean methods.',
        'Retail',
        'specialty_food',
        'active',
        'basic',
        '#d97706',
        '#92400e',
        'St. Kitts Salt Pond',
        'Premium Natural Sea Salt from the Caribbean',
        'Shop Now',
        '/store/st-kitts-salt-pond',
        true,
        true,
        NOW()
      )
      RETURNING store_id
    `;
    const storeId = store[0].store_id;

    // Create product listings
    const products = [
      {
        title: 'Coarse Sea Salt — 500g',
        description: 'Hand-harvested coarse sea salt from St. Kitts salt ponds. Perfect for cooking, seasoning, and finishing dishes. Rich in natural minerals.',
        price: 15.00,
        sub_category: 'salt',
      },
      {
        title: 'Fine Sea Salt — 250g',
        description: 'Finely ground sea salt, ideal for everyday cooking and baking. Sun-dried and minimally processed.',
        price: 10.00,
        sub_category: 'salt',
      },
      {
        title: 'Salt Sampler Gift Box',
        description: 'A curated gift box featuring 3 varieties of St. Kitts sea salt: coarse, fine, and smoked. Beautifully packaged in eco-friendly materials.',
        price: 35.00,
        sub_category: 'gift_box',
      },
      {
        title: 'Smoked Sea Salt — 200g',
        description: 'Artisan smoked sea salt, cold-smoked over local hardwoods for a rich, complex flavor. A gourmet chef favorite.',
        price: 20.00,
        sub_category: 'salt',
      },
    ];

    for (const p of products) {
      await sql`
        INSERT INTO listings (store_id, title, description, price, category, sub_category, is_active, is_featured, created_at)
        VALUES (${storeId}, ${p.title}, ${p.description}, ${p.price}, 'specialty_food', ${p.sub_category}, true, true, NOW())
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
