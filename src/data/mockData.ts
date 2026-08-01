import { Product, Order, SellerStats } from '../types';

export const HERO_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuBvgoBUUW0UbFtM6mAO1ejOjArMWv3g2jvdDR9TgGPRcs3OiSpDn6mYSbMfJszqIMfrTX0-NQet59DHgQO0xtWsK2rP4d27hcBhCZqF1x2NFEPrDORAdkVITvH7Dxl9XDZ-icTlfSw9LFGoNOa9jph_N499yGf3ewX3Cg15S8VtGNGiCyFH3RHfbHtHHSVLTwyvGueki9Ru9WnZSLT7wK52R9ztsiA38GcapqyiuawMaO6pZHb94uUP";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Forge Pro Mechanical Keyboard - Brushed Steel Edition',
    category: 'Electronics',
    price: 189.99,
    originalPrice: 229.00,
    sku: 'MK-8472-PRO',
    stockStatus: 'In Stock',
    stockCount: 42,
    rating: 4.9,
    reviewCount: 215,
    sellerName: 'TechHardware Inc.',
    sellerVerified: true,
    sellerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOOOpnqZU_h-XQ9oF6Ub_VoduyR074rIxWPXhLBLgaDybF7WoB7jAZW8CYT8xX343X0fvIHIQDAu6Qm8E3b0VQZdD_ZLY-6UQQlbm0lHZZ1S4R6brrikzF8dbbGJjPAoVzZ58EVOyYDEZJWX_lE2nmMy7MVTgdX0uh3zSiOFG-MwZbRCYyaW1ir4dlWrJiu5MKZY7BgLv71S4yC9Onx7cfp8jNu0DWO7opzu4FCCDHb8oMoZWk0aC2',
    description: 'Engineered for precision and durability, the Forge Pro features a CNC-machined aircraft-grade aluminum chassis and custom tactile switches. Designed for professionals who demand uncompromising quality and tactile feedback in their daily workflow.',
    condition: 'New',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC886RLtweVMgsf35MVIrYENDA0qhS2zHlUKM3wP2Ul6NA1YmUjly0YY2yPQlVhv7EiXBEiHEz5zz7rs90whiojALwLWeopy8sMb-RlRgv-Tvlt71E63Mpm6BfSQ4G_Ed5JnvZd6yAEuOiEmLKB33-rBSS93AkGhG38xTL27Qn_oefKXSf_ag4TcpSxLHa7m5iEQ7gfPym4Zgdimcj0S23tceEwmzmvnLS2lO5Eiu-IzAL20-OjcWgL',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAkGpBGI_EILKXSjhvNbOKzLOZwAmyVavSTgNNc1QEortRCKiinnOccxMMf-0MzsploVrKPBMjfWrsszXBQLpDHvgFoCJnv29_BhAzAaFAz52SS_UGk_1rrZxTiouUv7-JixDTJEO3PzwZ9DG5N1O4Y8RapEd5YsuWAl7FJppxiF9tHD8qDuluNcuS4axlstPCnuW77Mv2mI5iQMhk5bln2-L04VuvYVE4hpNSXaxNvAdPLKYP5T3ZN',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAVy0ZvRwlu1n4AsDX5_liH7DsScubuc1MW0uQ3IIQH5MrR9Eqclty3MkpmH1AUc5dWbE6XOL8BAjQAOSPIwtBxXWVD70GR23shMmUJHJuNx3SSHHo-Wo67wT18DjJ1C-DUO01x5s4ecVe10FQGqwG4ie9majrCDXvdYuBU28t2Jy26KpEK3KJyicEzH6QzbN8onEC-IdBbql2wFgYRVJcc6B0oagMO05GXtZHSA-uTNVrMhMYMJWrt',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBO6JRtem2vVX5_OyrW8d5r0MbIE3UWZxPsKFLsCNxHG8ZXS8o2CZHqQQn99hobPJBE4BoEA6SSGof8yaxAYyP2nByBdkihLhBbC8DqGe-l8dfpWsQ0nFT7Rg7hLsAAynMTWniVPvmnAMd794gQdvLfrgmahroOVRBWVfw2WpcFl4qKf9_C6E7Y8RW7QVE9ILpfRNcgNRVAalaJAb8-OLs3Ned9K0hL22aEnnoD7qmoR8Q42W0rQ7iI'
    ],
    specs: {
      'Chassis Material': 'Aircraft-grade Aluminum',
      'Switch Type': 'Forge Tactile Pro (50g actuation)',
      'Keycap Material': 'Double-shot PBT',
      'Connectivity': 'USB-C (Detachable), Bluetooth 5.1',
      'Weight': '1.2 kg (2.6 lbs)',
      'Warranty': '2 Years Commercial Warranty'
    }
  },
  {
    id: 'prod-2',
    title: 'ProGrade Industrial Drill XQ-500',
    category: 'Machinery',
    price: 249.99,
    sku: 'PG-DRILL-500',
    stockStatus: 'In Stock',
    stockCount: 18,
    rating: 4.9,
    reviewCount: 128,
    sellerName: 'ForgeTech',
    sellerVerified: true,
    description: 'Heavy-duty cordless drill designed for continuous industrial use with extended high-capacity lithium battery life and brushless motor.',
    condition: 'New',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCsWPpvWxekVHiyHTXkhN9-NjPffSy2ZnIQkUz_zBFkClx_5S4lrwrXmqbARcRIQkExpVbjuxnDsqt8yBwDkp1qq0IWJXDZgwfy9_1MYsAmZebP75dWr1vFh8te2VouuKw99pM8lDOUBhT34YnvuwaGC9otQoHaiGsy3_LREogFMKxxHwHufsqNH9RjHifwn1yIwakuzzu7uKxqAuA0v5Bs6QhzNdAX9l6Z9ZNzkVVBFXsaKTol5tmu'
    ],
    specs: {
      'Motor': 'Brushless 24V High Torque',
      'Max Speed': '2200 RPM',
      'Chuck Size': '1/2 inch All-Metal Ratcheting',
      'Battery': '5.0Ah Lithium-Ion'
    }
  },
  {
    id: 'prod-3',
    title: 'Enterprise Server Rack Mount 4U',
    category: 'IT Infrastructure',
    price: 120.00,
    sku: 'IT-RACK-4U',
    stockStatus: 'In Stock',
    stockCount: 65,
    rating: 4.8,
    reviewCount: 94,
    sellerName: 'DataCore Systems',
    sellerVerified: true,
    description: 'High-density server mounting solution with integrated cable management, heavy-duty slides, and airflow optimization.',
    condition: 'New',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCscFvHK6rdiR72Xlpk81NTdZcqCFDYlQObex5ZExPh4w6yEqxhm_Y4yj2SwKFmyiMff3zW4guPFKwFeSNqV72ettnD7k4djFv0sVxwJWC88KhbQmOqXvRgKjpIFRwtLJULp_V5iNwDjuEgxPLqQrro35JlL8PImQGpBTkVun--FWf5rZDQ6nljZ4Gji9kSARi_ppFvzbpZEARgRaJBE87hFGjs-Dg-Mj3vC3vDAEw_5pfTio5PLD8k'
    ],
    specs: {
      'Form Factor': '4U Rackmount',
      'Material': 'Cold-Rolled Steel',
      'Max Weight Capacity': '150 kg',
      'Cooling Compatibility': 'Dual 120mm Fans Included'
    }
  },
  {
    id: 'prod-4',
    title: 'AeroFit Executive Mesh Chair',
    category: 'Office Supplies',
    price: 385.50,
    sku: 'CHAIR-AEROFIT',
    stockStatus: 'In Stock',
    stockCount: 30,
    rating: 4.9,
    reviewCount: 312,
    sellerName: 'Workspace Ltd',
    sellerVerified: true,
    description: 'Fully adjustable ergonomic seating designed for 12+ hour support in high-performance professional environments.',
    condition: 'New',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBgQyVJFKGn6wNH44ye9dER3MbxaU4hOgSTKtCIGlsu-V6xh9HfumVdnjLK_vy9lwWSQnkaZW2CNe88YiytxHsV3X_s24MeUT80h2NZMBH0KOBK8G2ZjwMxwpm0cGsr6MlHJRGFOI9kpht8yxUNyF_2M0epKCvH1li7nEtacjsWTMvnto-DB1UzZAxnsA2E2CSvPTjg2NHuU8-RApq15238QN2T9CpTC9OkwPI4k5m8kmYVBGc0sVCt'
    ],
    specs: {
      'Mesh Type': 'High-Density Breathable Korean Mesh',
      'Lumbar Support': 'Dynamic 3D Adaptive',
      'Armrests': '4D Adjustable',
      'Weight Rating': '350 lbs'
    }
  },
  {
    id: 'prod-5',
    title: 'OmniSight Pro Surveillance Kit',
    category: 'Security',
    price: 899.00,
    sku: 'SEC-OMNI-4K',
    stockStatus: 'In Stock',
    stockCount: 12,
    rating: 5.0,
    reviewCount: 89,
    sellerName: 'SecureNet',
    sellerVerified: true,
    description: '4K commercial security system with AI motion tracking, night vision, and encrypted local storage hub.',
    condition: 'New',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAYaajcqYSnyS3W-0NDlRjW0e2lDBQrVYROs7Vpt1y0nJcH1asC3x0Rwo1l5_zVcrQ_-ch9LnFZqxuTqjoefLlyXzIaQvj_Q8hqh76TmcFmYAogzWRPkXm61Pkr0ORQ7pxfxSNK543YqwV-gFEQdnh2v7RU3AzK3-fg0O3gFZj-ME_EbS8WumqjHDvCVWVEgIEL9ecKwHuxTuCtWVLvP1q5WcqPCv7Z6XW1AWSif94Kb05cfTivELum'
    ],
    specs: {
      'Resolution': '4K Ultra HD (3840x2160)',
      'Storage': '2TB Enterprise HDD included',
      'Connectivity': 'PoE (Power over Ethernet)',
      'Weatherproof': 'IP67 Rated'
    }
  },
  {
    id: 'prod-6',
    title: 'Executive Presentation Suite',
    category: 'Office Supplies',
    price: 45.00,
    sku: 'OFF-PRES-SET',
    stockStatus: 'Low Stock',
    stockCount: 5,
    rating: 4.8,
    reviewCount: 450,
    sellerName: 'PrintMasters',
    sellerVerified: true,
    description: 'Bulk premium presentation folders and heavy-stock document covers for high-stakes executive client meetings.',
    condition: 'New',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuABk4U63BVafUOZmnhzUpm9FnCY1Fq8V1a7QmSeOVXI1I4ZHq5oS2djRaP9I6hMJ_zAusde9u7_y0UvUR1VABs8xpmXN7Tm60Cp6WiG6s9pjqPhpMsVYITbFx1kK3kBxxIso3jlb4g_zjW-77blxYASzxF_VyiHy_D308ZyrAZAVwKX1QOmR8MvMjnA1rGzbjRrHX05WpCnWVuogHQ3hF4qAiNlbcvymsfce5MzaN1cX2YO9jk7O4nL'
    ],
    specs: {
      'Quantity': '100 Folders per Box',
      'Paper Weight': '350 GSM Matte Touch',
      'Foil Stamping': 'Custom Logo Ready'
    }
  },
  {
    id: 'prod-7',
    title: 'Commercial Espresso Station',
    category: 'Appliances',
    price: 2450.00,
    sku: 'APP-ESPRESSO-2G',
    stockStatus: 'In Stock',
    stockCount: 8,
    rating: 4.9,
    reviewCount: 67,
    sellerName: 'Breakroom Pros',
    sellerVerified: true,
    description: 'Dual-grouphead stainless steel espresso machine engineered for high-traffic corporate office breakrooms or cafes.',
    condition: 'New',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAlKVZIyiR_jzyvjfXbghosxsVXhAC4gPK0-W7t8r_gONNAlwG3zsnW03CCItqxkJH5wwXONxP0yBiedhxUVAXmZIHz7qfca7LiOtdwuNfxkuea8GivYTDeeUsQIGvYMRjx5kQ7EHy8TFT-KCdwabWgp2RbQcQc0XV-kkc8vGi_znibcyEAdGTW8VgocDIMPOJZ39C6axRxeQIMORxTrpPS-xBoGIcASZ6lZ7BSsOmYBD2BlWbtwI1V'
    ],
    specs: {
      'Boiler Capacity': '11 Liters Dual Boiler',
      'Power': '3800W 220V Heavy Duty',
      'Pump': 'Rotary Vane Pump'
    }
  },
  {
    id: 'prod-8',
    title: 'Precision Caliper Set ISO-9001',
    category: 'Instruments',
    price: 315.00,
    sku: 'INST-CALIPER-SET',
    stockStatus: 'In Stock',
    stockCount: 22,
    rating: 5.0,
    reviewCount: 142,
    sellerName: 'MetricTech',
    sellerVerified: true,
    description: 'Master calibration set including digital micrometers and calipers with certified accuracy for quality control.',
    condition: 'New',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBQ4ULXGJNSXm9PrKkJxM7J_FwEcmTifeI--b0SM7HVUhlfp0F2evIx1IuBlOfC0A7WTcFYK8JJTbdqOgo6P532sl-dLabaxXc71Q3qFH8qYVaCixlgqEm7UO5IfLbbTIh0iv8v8s-2oxAKpe3YOD3bS8YxB_0fDdI3gq9-0pbyOS52ZMRPuqx8DsoAyGf-cxr_UpVwi80YAimq_O5dHuUXrUbTAncZ0j_iA6TRv9ZlMqV5c0XLcqBs'
    ],
    specs: {
      'Accuracy': '±0.001 mm',
      'Certification': 'ISO 9001 Certified Traceable',
      'Case': 'Custom Molded Hard Protective Case'
    }
  },
  {
    id: 'prod-9',
    title: 'Commercial Fiberglass Roll R-30',
    category: 'Raw Materials',
    price: 185.00,
    sku: 'MAT-FIBERGLASS-R30',
    stockStatus: 'In Stock',
    stockCount: 150,
    rating: 4.7,
    reviewCount: 78,
    sellerName: 'BuildCorp Supply',
    sellerVerified: true,
    description: 'High-performance thermal insulation roll for commercial warehouse, factory, and facility outfitting.',
    condition: 'New',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBfpDBQkZ3x1ARbetXVGEhW3LKqX81h3jAiOxk2X3r47cw0x1AXg8u9XV_kte35KPj2MdRxOoCUW3IlC3phLVHQT0gBufSUELxUNAtlKdbxJjFXzyKXf1Mce_JVjx-JqCY-OGeBondEWIpS_jPnzYF62bHi_Kqnnhu_DshsA2k87w8TFinq2V1soAZotPfXBGxPh97aEB1prOQAYvIGvktub5ADwo8jGsGGHH9l5PJ4-AvL6THzjM5E'
    ],
    specs: {
      'R-Value': 'R-30 Thermal Efficiency',
      'Dimensions': '48 in x 50 ft Roll',
      'Fire Rating': 'Class A Fire Rated'
    }
  },
  {
    id: 'prod-10',
    title: 'Ergonomic Office Chair Pro',
    category: 'Office Supplies',
    price: 299.00,
    sku: 'APEX-CHAIR-PRO',
    stockStatus: 'In Stock',
    stockCount: 40,
    rating: 4.9,
    reviewCount: 128,
    sellerName: 'Apex Furniture Ltd.',
    sellerVerified: true,
    description: 'Minimalist high-performance ergonomic task chair with silver aluminum frame and breathable mesh back.',
    condition: 'New',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB21onnpnMqXU1mvBcki3bOdj0NrTsrQAFKFSNdIg-TD9kPv5_MgCU2ZnqbH2pjgAasvZrXNzTUSBtRhckT8UPt14Va78b6NV33d6RkPKmhWW463zjN77bFV0_gOknRqqX_pA7mPmYmUuI3gKJt-bJWGDLL3WdO8uRN7p7oNpaWIp-d-6nQhFSdRk5Ah7Xio6xccIU2IEN5Qs2uzfTyF-VDkoHXX9zAylEXpQb27qM1xl236pqZ4rKl'
    ]
  },
  {
    id: 'prod-11',
    title: 'Premium Shipping Boxes',
    category: 'Office Supplies',
    price: 45.00,
    priceSuffix: '/ 100',
    sku: 'LOG-BOX-100',
    stockStatus: 'In Stock',
    stockCount: 500,
    rating: 4.8,
    reviewCount: 450,
    sellerName: 'Logistics Supply Co.',
    sellerVerified: true,
    description: 'Matte black double-walled heavy duty shipping cartons engineered for secure product fulfillment.',
    condition: 'New',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDql3P1Rk9k9VNC6AwhJuUfmNGeecHEoVQcT-eyKganzGjo63O7y23M7Y3035HTT1QVumXTFFa6nrI09gvfyZv2ellMVk50clRJEbIp5qaW3Bzc-SAnC0bC8zqJS2AdbizZOCWHt5cn42f3Ydt-UVfo9BrA71wKeEqDLrY4zJUo4Exise5UQM_nV-oQHgRgHg5oQXMqDLYvAtGl9L--RXWqxyI2lCQVqpv5Nk5KFbiDwolfSHUdpUYB'
    ]
  },
  {
    id: 'prod-12',
    title: 'Industrial Barcode Scanner',
    category: 'Electronics',
    price: 129.99,
    sku: 'TECH-SCANNER-IND',
    stockStatus: 'In Stock',
    stockCount: 85,
    rating: 5.0,
    reviewCount: 89,
    sellerName: 'TechEquip Direct',
    sellerVerified: true,
    description: 'Heavy duty wireless 2D Bluetooth barcode and QR scanner built for rugged warehouse inventory logging.',
    condition: 'New',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCLL2ANTJJhzMBxIKLyYRNMj5KVetkl2RAjMNcOYLxkoXa_Na2Tx2Cc9KKmkzecrt4w5jtQt8B9qEHyeHBfLw43rE34gLtIPHKSu4OQU4_UXkiQZTOWiBsGm6XgjrxHtG74Ix24wa8L2jkZC19p5EdUCQkk5ocEvndCSBwzZjRA0XmyRO2LQLWPJpXvjYxvfm-XWOSeJ_6CgJ5xmnc2n2BpyGRzE6702JzPtwRCCHXjecTxs924fi3m'
    ]
  },
  {
    id: 'prod-13',
    title: 'Dual Monitor Mount',
    category: 'Office Supplies',
    price: 89.50,
    sku: 'WORK-MOUNT-DUAL',
    stockStatus: 'In Stock',
    stockCount: 60,
    rating: 4.7,
    reviewCount: 312,
    sellerName: 'Workspace Solutions',
    sellerVerified: true,
    description: 'Full motion gas spring dual monitor desktop mount supporting up to two 32 inch displays with cable channels.',
    condition: 'New',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDTDxBqk3QSf13jDm3R96Bc8kQ3Qs8tUYYpjNzwJTEVpGiiTMFhUPGIrjn7doclxupd771LDAQB75vyn6-SOpj_CW1D5igGPuS0hHcPceRu5bTfH1w54rPHamSDlUlqCW-hikIVU1hbfymZ7cn8nHZUSouAzMMWRMH1uisfeUsiE_6Ojdnu2JwJ69q4rJ9PDe9eKj_G4un-d1WK1zFuzCoHRw3yGMfYKgWZAYgn3OSGW-uObM4y_6X3'
    ]
  },
  {
    id: 'prod-14',
    title: 'Forge Coiled Aviator Cable',
    category: 'Electronics',
    price: 45.00,
    sku: 'ACC-COILED-NAVY',
    stockStatus: 'In Stock',
    stockCount: 110,
    rating: 4.9,
    reviewCount: 95,
    sellerName: 'TechHardware Inc.',
    sellerVerified: true,
    description: 'Handcrafted double-sleeved coiled USB-C aviator connector cable for mechanical keyboards in deep navy.',
    condition: 'New',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDc69XZJo5UEa6yQSO5XgZgQy5ulbAkKumaaireMU6BMWjmVrMxamiNRmRwENwd0S9tPukgLGHR9w_C2oWPgh732o-we75pmWZdYqjwV7ZBq4xSxBFnHYYmPQp1NL5bqOvv91wmcEIrouubSKWEbpb3qOYG9NwYCLsMTBUWGG1GVzzMOPGfKkwLnlLMI9B5dH-_PL4lCxWQIo1m2tBeKdTYHXh8o2mqGfaj1uEWim0XBdDhedDA7lmu'
    ]
  },
  {
    id: 'prod-15',
    title: 'PBT Keycap Set - Forest Edition',
    category: 'Electronics',
    price: 60.00,
    sku: 'ACC-KEYCAP-FOREST',
    stockStatus: 'In Stock',
    stockCount: 48,
    rating: 4.8,
    reviewCount: 112,
    sellerName: 'TechHardware Inc.',
    sellerVerified: true,
    description: 'Thick PBT dye-sublimated keycaps featuring dark slate legend profile with subtle emerald accent keys.',
    condition: 'New',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC4xoiBbKVDisFV6CuHfX4k24XCht1sWYVv3rk4bOvKwNdxtvpR4dRDjO1DrRAfV4-tZazMXj-vHS7xAQwNDZWfyRqoJHIolWSmnyDh3mZb2cjwMghEh9TdbPvgRo_VM-4EcbFlEbkImH7MhwNLX7c4oisE6dAKaqlB7odF-s2q4T4WlDixAWrJc7u1IlgaO0SGnaq0vXuyRqhfhnGS_dgJ_9U3weBsONPpopjhbyDifIl7u_Ex2rzj'
    ]
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: '#ORD-9021',
    date: '2026-08-01',
    customer: 'Apex Global Logistics',
    amount: 1250.00,
    status: 'Processing',
    itemsCount: 4,
    items: [
      { productId: 'prod-1', name: 'Forge Pro Mechanical Keyboard', quantity: 2, price: 189.99 },
      { productId: 'prod-12', name: 'Industrial Barcode Scanner', quantity: 3, price: 129.99 }
    ]
  },
  {
    id: '#ORD-9020',
    date: '2026-07-31',
    customer: 'Nexus Data Centers',
    amount: 450.00,
    status: 'Shipped',
    itemsCount: 10,
    items: [
      { productId: 'prod-11', name: 'Premium Shipping Boxes', quantity: 10, price: 45.00 }
    ]
  },
  {
    id: '#ORD-9019',
    date: '2026-07-31',
    customer: 'Metropolitan Corp',
    amount: 8900.00,
    status: 'Delivered',
    itemsCount: 8,
    items: [
      { productId: 'prod-5', name: 'OmniSight Pro Surveillance Kit', quantity: 8, price: 899.00 }
    ]
  },
  {
    id: '#ORD-9018',
    date: '2026-07-30',
    customer: 'BuildRight Construction',
    amount: 120.00,
    status: 'Delivered',
    itemsCount: 1,
    items: [
      { productId: 'prod-3', name: 'Enterprise Server Rack Mount 4U', quantity: 1, price: 120.00 }
    ]
  },
  {
    id: '#ORD-9017',
    date: '2026-07-29',
    customer: 'Kohn & Partners Law',
    amount: 3400.00,
    status: 'Processing',
    itemsCount: 6,
    items: [
      { productId: 'prod-4', name: 'AeroFit Executive Mesh Chair', quantity: 6, price: 385.50 }
    ]
  }
];

export const INITIAL_STATS: SellerStats = {
  totalSales: 124592.00,
  salesGrowth: 14.5,
  activeListings: 1204,
  pendingOrders: 84,
  immediateActionOrders: 12,
  totalCommissionPaid: 18688.80,
  commissionRate: 0.15
};

export const SALES_TREND_DATA = [
  { day: 'Jul 2', sales: 2400, orders: 12 },
  { day: 'Jul 5', sales: 3100, orders: 15 },
  { day: 'Jul 8', sales: 2800, orders: 14 },
  { day: 'Jul 11', sales: 4200, orders: 22 },
  { day: 'Jul 14', sales: 3800, orders: 19 },
  { day: 'Jul 17', sales: 5100, orders: 26 },
  { day: 'Jul 20', sales: 4600, orders: 24 },
  { day: 'Jul 23', sales: 5900, orders: 31 },
  { day: 'Jul 26', sales: 6200, orders: 34 },
  { day: 'Jul 29', sales: 7100, orders: 38 },
  { day: 'Aug 1', sales: 8400, orders: 42 },
];
