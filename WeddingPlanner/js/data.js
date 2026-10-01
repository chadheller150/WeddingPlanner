// Core wedding data imported from "Chad + Eric Wedding Planner.xlsx" on 2026-10-01.
// Guest list lives in data-guests.js and budget line items in data-budget.js
// (both load before this file — see index.html) to keep each file small.
// Edit these arrays directly to update the site, or use each tab's add/edit UI
// (UI edits save to this browser's localStorage and layer on top of this file).

const WEDDING = {
  names: { partnerA: "Chad", partnerB: "Eric", fullA: "Chad Heller", fullB: "Eric Yarbrough" },
  hashtag: "#HeSaidHellerYes",
  // Confirmed from the Zola wedding site (eric-chad). Tuesday, July 18, 2028.
  weddingDate: "2028-07-18",
  details: {
    date: "2028-07-18",
    dayOfWeek: "Tuesday",
    ceremonyTime: "6:00 PM",
    venue: "Wild Roots Gateways and Gatherings",
    address: "10201 FM 86, Lockhart, TX 78644",
    city: "Lockhart, TX",
    attire: "Formal (Formal Cocktail Dress / Snazzy Suit)",
    unplugged: true,
    zolaUrl: "https://www.zola.com/wedding/eric-chad",
    mapUrl: "https://maps.apple.com/?q=Wild+Roots+Gateways+and+Gatherings,+10201+FM+86,+Lockhart,+TX+78644"
  },

  guests: WEDDING_GUESTS,

  // From the Zola "Wedding Party" section. Sides inferred where not stated — correct as needed.
  weddingParty: [
    { role: "Groom", name: "Chad Heller", side: "" },
    { role: "Groom", name: "Eric Yarbrough", side: "" },
    { role: "Officiant", name: "Haydee Barrera", side: "" },
    { role: "Mother of the Groom", name: "Shawn Heller", side: "Chad's Side" },
    { role: "Mother of the Groom", name: "Johanna Escobar", side: "Eric's Side" },
    { role: "Maid of Honor", name: "Ashlee Heller", side: "Chad's Side" },
    { role: "Best Woman", name: "Jennilee Tamplen", side: "Chad's Side" },
    { role: "Best Man", name: "Adriel Barrera", side: "Chad's Side" },
    { role: "Maid of Honor", name: "Macy Portillo", side: "Eric's Side" },
    { role: "Best Woman", name: "Julisa Bosquez", side: "Eric's Side" },
    { role: "Groomsman", name: "Gabe Portillo", side: "Eric's Side" },
    { role: "Flower Girl", name: "Sofia Wilkins", side: "" },
    { role: "Ring Bearer", name: "Sawyer Wilkins", side: "" },
    { role: "Ring Bearer", name: "Logan Herrera", side: "" }
  ],

  // Real priced line items from the Shopping List tab, plus open categories
  // carried over from the Checklist/Month-by-Month tabs that don't have estimates yet.
  budget: { categories: WEDDING_BUDGET_CATEGORIES },

  // Paper goods / stationery — quantities are from the sheet; status tracked here.
  paperGoods: [
    { item: "Canva Signage (design set)", qty: null, status: "Not started" },
    { item: "Save the Dates", qty: 35, status: "Not started" },
    { item: "Invitations", qty: 35, status: "Not started" },
    { item: "Table Number Tents", qty: 8, status: "Not started" },
    { item: "Placecards", qty: 60, status: "Not started" },
    { item: "Bar Menu Tents", qty: 10, status: "Not started" },
    { item: "Food Menu", qty: 20, status: "Not started" },
    { item: "Welcome Sign", qty: 1, status: "Not started" },
    { item: "Stickers", qty: 35, status: "Not started" },
    { item: "Program", qty: 35, status: "Not started" },
    { item: "Row Reserved Cards", qty: 5, status: "Not started" },
    { item: "Loved Ones in Heaven Sign", qty: 1, status: "Not started" },
    { item: "Unplugged Ceremony Sign", qty: 2, status: "Not started" },
    { item: "This Way Sign", qty: 4, status: "Not started" },
    { item: "Party Favors Sign", qty: 1, status: "Not started" },
    { item: "Guest Book Sign", qty: 1, status: "Not started" },
    { item: "Gifts & Cards Sign", qty: 1, status: "Not started" },
    { item: "Grooms Party Invites", qty: 10, status: "Not started" }
  ],

  checklist: [
    { phase: "12-18 months", category: "Venue", task: "Confirm venue contract + date", details: "Lock date + deposit", due: "2026-10-14", status: "In Progress" },
    { phase: "12-18 months", category: "Guest List", task: "Draft guest list (A/B)", details: "Must-haves vs nice-to-haves", due: "2026-11-03", status: "Not Started" },
    { phase: "10-14 months", category: "Vendors", task: "Book photographer", details: "Contract + deposit", due: "2026-12-13", status: "Not Started" },
    { phase: "8-12 months", category: "Vendors", task: "Book catering", details: "Taste + service style", due: "2027-02-11", status: "Not Started" },
    { phase: "6-8 months", category: "Stationery", task: "Design & send Save the Dates", details: "Website live", due: "2027-03-23", status: "Not Started" },
    { phase: "4-6 months", category: "Decor", task: "Finalize table design mockup", details: "One test table at home", due: "2027-05-22", status: "Not Started" },
    { phase: "3 months", category: "Guests", task: "Send invitations", details: "Track RSVPs weekly", due: "2027-08-10", status: "Not Started" },
    { phase: "1 month", category: "Timeline", task: "Finalize day-of timeline", details: "Share with vendors", due: "2027-10-29", status: "Not Started" },
    { phase: "2 weeks", category: "Final", task: "Confirm headcount + seating", details: "Send to caterer", due: "2027-12-08", status: "Not Started" }
  ],

  monthByMonth: [
    { window: "12-18 months", focus: "Foundation", tasks: "Book venue, draft budget, guest list", notes: "Lock priorities" },
    { window: "10-12 months", focus: "Vendors", tasks: "Book photographer, caterer", notes: "" },
    { window: "8-10 months", focus: "Design", tasks: "Color palette, decor plan", notes: "DIY planning" },
    { window: "6-8 months", focus: "Stationery", tasks: "Save the dates, website", notes: "" },
    { window: "4-6 months", focus: "Details", tasks: "Rentals, menu, florals", notes: "Mock table" },
    { window: "2-3 months", focus: "Guests", tasks: "Invites, RSVPs", notes: "" },
    { window: "1 month", focus: "Finalize", tasks: "Timeline, seating", notes: "" },
    { window: "2 weeks", focus: "Confirm", tasks: "Headcount, payments", notes: "" }
  ],

  dayOfTimeline: [
    { time: "12:30 PM", event: "Venue access / refresh + getting-ready space open", location: "Wild Roots", responsible: "You + party", notes: "Pools, volleyball, trails available 12:30-4:30" },
    { time: "1:00 PM", event: "DIY load-in + setup begins", location: "Wild Roots (Pearl)", responsible: "You + helpers", notes: "Unpack decor by zones" },
    { time: "2:30 PM", event: "Photographer arrives (details)", location: "Wild Roots", responsible: "Photographer", notes: "Rings, invites, attire, florals" },
    { time: "5:00 PM", event: "Welcome — guests arrive & explore venue", location: "Wild Roots", responsible: "Usher/Greeter", notes: "Welcome sign; fans provided (Texas heat)" },
    { time: "6:00 PM", event: "Ceremony — unplugged", location: "Wild Roots (shade)", responsible: "Haydee (Officiant)", notes: "Short & sweet; phones away" },
    { time: "6:30 PM", event: "Reception — dinner, drinks, dancing", location: "The Pearl + covered dance floor", responsible: "Caterer/DJ/Bartender", notes: "Temperature-controlled indoor + outdoor" },
    { time: "7:15 PM", event: "Toasts", location: "The Pearl", responsible: "MOH/Best", notes: "" },
    { time: "7:30 PM", event: "First dance", location: "Dance floor", responsible: "DJ", notes: "" },
    { time: "10:30 PM", event: "Last call", location: "Bar", responsible: "Bartender", notes: "" },
    { time: "11:00 PM", event: "Reception ends", location: "Wild Roots", responsible: "—", notes: "" },
    { time: "12:00 AM", event: "After party", location: "Stock tank pools + on-site stay", responsible: "You", notes: "Runs until 2:00 AM (Wed 7/19)" }
  ],

  packing: [
    { category: "Ceremony", item: "Welcome sign + easel", qty: 1, who: "You", goesTo: "Car 1 / Trunk", notes: "" },
    { category: "Reception", item: "Centerpiece bins (vases/candles)", qty: 3, who: "Helper 1", goesTo: "Car 2 / Backseat", notes: "Label bins by table zone" },
    { category: "Reception", item: "Card box + guest book", qty: 1, who: "You", goesTo: "Car 1 / Front seat", notes: "" },
    { category: "Food", item: "Cake cutting set", qty: 1, who: "Helper 2", goesTo: "Car 2", notes: "" },
    { category: "Emergency", item: "Emergency kit", qty: 1, who: "You", goesTo: "Car 1", notes: "Bobby pins, tide pen, meds" }
  ],

  notesIdeas: [
    { idea: "Spotify Jam session with QR codes on each table so guests can add a song" },
    { idea: "Photo with each guest included in invite with short note, or photo memory with guest on table" },
    { idea: "Brunch at Johanna's, 7/28?" },
    { idea: "Fabric ceiling draping" },
    { idea: "Mist spray for artificial flowers" },
    { idea: "Jennilee to decorate venue chalkboards" },
    { idea: "56 guests = 1 rectangle (seats 7) + 6 circles (seats 8); 7 tablecloths, 7 runners, 200 disposable cups, 30 invites/save-the-dates, 7 table numbers, 56 placecards" },
    { idea: "Gift for Haydee or Seth (officiant)" }
  ],

  // Vendors are not yet in the source sheet — the Checklist references
  // Venue / Photographer / Catering as bookings still to make. Add real
  // vendor contacts here as you book them (also editable from the Vendors tab).
  vendors: []
};
