// Budget line items imported from "Chad + Eric Wedding Planner.xlsx" (Shopping List tab)
// on 2026-10-01. `link` values are the real hyperlinks embedded in the sheet cells
// (extracted via scripts/extract_links.py). Items with estimated: null had no price yet.
const WEDDING_BUDGET_CATEGORIES = [
  {
    name: "Decor",
    items: [
      { item: "Mr. & Mr. Sign", estimated: 14.99, purchased: false, link: "https://a.co/d/0hzXgfEY" },
      { item: "5x7 Guest Picture Frames (100)", estimated: 53.99, purchased: false, link: "https://www.amazon.com/Golden-State-5x7-Paper-Picture-Frames-Paper-Photo-Frame-Cards-DIY-Cardboard-Photo-Frame/dp/B0B5FGCTFD/" },
      { item: "Custom Wedding Guestbook", estimated: 70, purchased: false, link: "https://www.etsy.com/listing/1830401342/minimalist-wedding-guest-book-green" },
      { item: "Polaroid Photobook", estimated: 34.99, purchased: false, link: "https://www.etsy.com/listing/1809087297/personalized-linen-hardcover-photo-album" },
      { item: "Reserved for Grandpa of Groom Sign", estimated: 21.99, purchased: false, link: "https://www.amazon.com/Wedding-Reserved-Banner-Accessories-Ceremony/dp/B09CM5VYQ4/" },
      { item: "Disposable Plates & Cutlery (x2)", estimated: 84, purchased: false, link: "https://www.amazon.com/I00000-150Pcs-Plastic-Disposable-Dinnerware/dp/B0FDVXVBJT/" },
      { item: "Pet Drink Sign", estimated: 44, purchased: false, link: "https://www.etsy.com/listing/4457027368/custom-pet-signature-drink-sign-with-dog" },
      { item: "Velvet Terracotta Table Cloths (x2)", estimated: 51.96, purchased: false, link: "https://www.cvlinens.com/products/velvet-120-round-tablecloth-terracotta?variant=39971791765583" },
      { item: "Velvet Olive Green Table Cloths (x2)", estimated: 51.96, purchased: false, link: "https://www.cvlinens.com/products/velvet-120-round-tablecloth-olive-green?variant=39971792060495" },
      { item: "Velvet Dusty Blue Table Cloths (x2)", estimated: 51.96, purchased: false, link: "https://www.cvlinens.com/products/velvet-120-round-tablecloth-dusty-blue?variant=29717053603919" },
      { item: "Velvet Ivory Table Cloths (x3)", estimated: 29.79, purchased: false, link: "https://www.cvlinens.com/products/velvet-90x156-rectangular-tablecloth-ivory?variant=32859332018255" },
      { item: "Velvet Terracotta Table Runners (x4)", estimated: 7.48, purchased: false, link: "https://www.cvlinens.com/products/velvet-table-runner-terracotta?variant=39971791863887" },
      { item: "Velvet Olive Green Table Runner (x2)", estimated: 7.48, purchased: false, link: "https://www.cvlinens.com/products/velvet-table-runner-olive-green?variant=39971792158799" },
      { item: "Velvet Dusty Blue Table Runners (x2)", estimated: 7.48, purchased: false, link: "https://www.cvlinens.com/products/velvet-table-runner-dusty-blue?variant=29717052129359" },
      { item: "Velvet Ivory Round Table Cloths (x2)", estimated: null, purchased: false, link: "https://www.cvlinens.com/products/velvet-120-round-tablecloth-ivory" },
      { item: "Velvet Ivory Table Runners (x6)", estimated: 22.44, purchased: false, link: "https://www.cvlinens.com/products/velvet-table-runner-ivory?variant=32859332313167" },
      { item: "Velvet Ivory Napkins (x50)", estimated: 47.5, purchased: false, link: "https://www.cvlinens.com/products/velvet-20x20-linen-napkin-ivory?variant=32859332149327" },
      { item: "Velvet Terracotta Napkins (x18)", estimated: 1.9, purchased: false, link: "https://www.cvlinens.com/products/velvet-20x20-linen-napkin-terracotta?variant=39971791798351" },
      { item: "Velvet Olive Green Napkins (x2)", estimated: 1.9, purchased: false, link: "https://www.cvlinens.com/products/velvet-20x20-linen-napkin-olive-green?variant=39971792093263" },
      { item: "Velvet Dusty Blue Napkins (x2)", estimated: 1.9, purchased: false, link: "https://www.cvlinens.com/products/velvet-20x20-linen-napkin-dusty-blue?variant=29716789035087" },
      { item: "48 Ribbed Flameless Candle Sticks", estimated: 47.99, purchased: false, link: "https://www.amazon.com/Funtery-Flameless-Flickering-Candlesticks-Christmas/dp/B0DZ2FXKDY/" },
      { item: "36 Flameless Tealight Candles", estimated: 14.99, purchased: false, link: "https://www.amazon.com/Flickering-Flameless-Realistic-TeaLights-Centerpieces/dp/B0DQKYSKMT/" },
      { item: "Disposable Cups 48ct (x4)", estimated: 168, purchased: false, link: "https://a.co/d/0bqFfJKm" },
      { item: "Scalloped Paper Napkins (200ct)", estimated: 15.99, purchased: false, link: "https://www.amazon.com/Scalloped-Napkins-Disposable-Anniversary-Reception/dp/B0CZRKMWB9/" },
      { item: "Ceiling Draping", estimated: 86.99, purchased: false, link: "https://www.amazon.com/gp/product/B0DH23RRXF/" },
      { item: "Ceiling Draping Hanging Kit", estimated: 29.99, purchased: false, link: "https://www.amazon.com/gp/product/B0FPX8YTYC/" },
      { item: "Chicken Wire (Ceiling Floral Arrangement)", estimated: 11.99, purchased: false, link: "https://www.amazon.com/TOYPOPOR-Anti-Rust-Hexagonal-Galvanized-Vegetables/dp/B0BN57253Z/" },
      { item: "Fishing Wire for Hanging", estimated: 6.99, purchased: false, link: "https://www.amazon.com/Fishing-Acejoz-Invisible-Hanging-Supports/dp/B09BFBP2J5/" },
      { item: "48 Floating Flameless Tealight Candles", estimated: 39.99, purchased: false, link: "https://www.amazon.com/Homemory-Flameless-Flickering-Waterproof-Centerpieces/dp/B0CKRFGVV4/" },
      { item: "30 Parasols", estimated: 123.49, purchased: false, link: "https://www.amazon.com/Zealor-Umbrellas-Japanese-Parasols-Decoration/dp/B0DRP5NGZM/" }
    ]
  },
  {
    name: "Flowers & Plants",
    items: [
      { item: "10 Bouquets (2 bundles each)", estimated: 200, purchased: false },
      { item: "6 Boutonnieres (3 bundles mixed)", estimated: 20, purchased: false },
      { item: "Jumbo Ferns", estimated: 300, purchased: false },
      { item: "Artificial Daisies", estimated: 9.9, purchased: false, link: "https://us.shein.com/6-30-PCS-Artificial-Daisy-Flowers-Fabric-Faux-Daisies-Spring-Wildflower-Decor-For-Party-Home-Office-Wedding-Engagement-No-Vase-Included-Home-Decor-Living-Room-Mother-S-Day-Tabletop-Display-Fall-Decor-Autumn-p-72815376.html" },
      { item: "Artificial Burnt Orange Peonies", estimated: 9.84, purchased: false, link: "https://us.shein.com/12-24pcs-Artificial-Peony-Flowers-Simulated-Peony-Flower-Heads-With-Stems-For-Wedding-Party-Decoration-Cake-Decoration-And-Home-Living-Room-Table-Centerpieces-Fake-Plants-Fall-Decor-Room-Desk-Garden-Decor-Room-Decoration-Stuff-p-24967913.html" },
      { item: "Artificial White Delphinium (x2)", estimated: 13.8, purchased: false, link: "https://us.shein.com/MEHELANY-6-4-2-1-Pcs-29-2-Inches-White-Gypsophila-Artificial-Flowers-Delphinium-Silk-Flowers-Long-Stem-Hyacinth-Fake-Flowers-Realistic-Texture-p-51136804.html" },
      { item: "Artificial Light Blue Delphinium (x2)", estimated: 13.8, purchased: false, link: "https://us.shein.com/MEHELANY-6pcs-29-2-Inches-Light-Blue-Gypsophila-Delphinium-Hyacinth-Artificial-Flowers-Lifelike-Texture-p-51119806.html" },
      { item: "Artificial Baby's Breath", estimated: 10.4, purchased: false, link: "https://us.shein.com/180pcs-White-Artificial-Baby-s-Breath-Flowers-White-Fake-Baby-s-Breath-Bulk-Artificial-Baby-s-Breath-Bouquet-p-389858035.html" },
      { item: "Artificial Orange Poppies (x2)", estimated: 27, purchased: false, link: "https://us.shein.com/1-3-6pcs-Artificial-Poppy-Flowers-50cm-Fake-Flowers-For-Wall-Living-Room-Bedroom-Wedding-Party-Decor-p-421615783.html" },
      { item: "Artificial White Daffodils", estimated: 9.4, purchased: false, link: "https://us.shein.com/2pcs-6pcs-55cm-Artificial-Daffodil-Magnolia-Silk-Flowers-p-36083830.html" },
      { item: "Artificial Dusty Blue Chrysanthemums", estimated: 11.04, purchased: false, link: "https://us.shein.com/1-2-5-12pcs-Artificial-Chrysanthemum-Flower-Balls-Embroidered-Balls-Wedding-Decor-p-17927418.html" },
      { item: "Artificial White Peonies/Roses (2 bunches)", estimated: 8.4, purchased: false, link: "https://us.shein.com/1-Bouquet-2-Bouquets-Silk-Peony-Flowers-Artificial-Rose-Flowers-27-Stems-Artificial-Peony-Flowers-p-17292378.html" },
      { item: "Artificial Green Wisteria (x2)", estimated: 25, purchased: false, link: "https://us.shein.com/MEHELANY-6-3-1pcs-Artificial-Wisteria-Flower-Pendant-Lover-s-Tear-Pendant-Plant-Silk-Artificial-Amaranth-Wedding-Pendant-p-217384235.html" }
    ]
  },
  {
    name: "Gifts & Attire",
    items: [
      { item: "Custom Grooms Party Totes ($20 each)", estimated: 160, purchased: false, link: "https://www.etsy.com/listing/4374771805/personalized-embroidered-corduroy-tote" },
      { item: "Flower Girl Shirt", estimated: 20, purchased: false, link: "https://www.etsy.com/listing/4353168096/personalized-in-my-flower-girl-era-t" },
      { item: "Ring Bearer Shirt", estimated: 40, purchased: false, link: "https://www.etsy.com/listing/4347311276/personalized-the-ring-dude-t-shirt-ring" },
      { item: "Tear Hankies (4ct)", estimated: 28.99, purchased: false, link: "https://a.co/d/0bq9Ee5R" },
      { item: "Bridesmaid Proposal Box", estimated: 156, purchased: false, link: "https://www.etsy.com/listing/4473211964/personalized-bridesmaid-proposal-gift" },
      { item: "Custom Wood Hangers (8 count)", estimated: 64, purchased: false, link: "https://www.etsy.com/listing/1536962746/personalized-bridesmaid-hangers-wedding" },
      { item: "Hangover Kit", estimated: 124, purchased: false, link: "https://www.etsy.com/listing/1886012930/bachelorette-survival-kit-bachelorette" },
      { item: "Custom Puzzle", estimated: 62, purchased: false, link: "https://www.etsy.com/listing/1647623086/personalized-bridesmaid-proposal-puzzle" },
      { item: "Bachelor Trip - East Austin Airbnb (2 nights)", estimated: 700, purchased: false, link: "https://www.airbnb.com/rooms/14969194" },
      { item: "Grooms Suits - Chad (Custom Linen, Azazie)", estimated: null, purchased: false },
      { item: "Grooms Suits - Eric (Custom Linen, Azazie)", estimated: null, purchased: false }
    ]
  },
  {
    name: "Favors",
    items: [
      { item: "Custom Wedding Guest Matchbooks", estimated: null, purchased: false, link: "https://www.etsy.com/listing/4321175280/custom-matchboxes-wedding-match-favors" },
      { item: "Custom Wedding Guest Candles", estimated: null, purchased: false, link: "https://www.etsy.com/listing/4369204928/wedding-favors-personalized-bridal" },
      { item: "Custom Wedding Guest Chocolate", estimated: null, purchased: false, link: "https://www.etsy.com/listing/4423626113/luxury-wedding-chocolate-favors" },
      { item: "Custom Wedding Fans", estimated: null, purchased: false, link: "https://www.etsy.com/listing/4436934008/personalized-wedding-clack-hand-fans" }
    ]
  },
  {
    name: "Venue, Catering & Photography",
    items: [
      { item: "Venue contract + deposit", estimated: null, purchased: false },
      { item: "Photographer", estimated: null, purchased: false },
      { item: "Catering", estimated: null, purchased: false }
    ]
  }
];
