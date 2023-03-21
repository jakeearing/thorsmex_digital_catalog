const products = [
  {
    name: 'THORQUETE Concrete Anchor 1/4" Red TP2X - 100 CT',
    price: 2.99,
    gtin: 3926909999,
    modelnumber: 110303100,
    category: "Hardware",
    sub: "Anchors",
    description: "Thorsmex plastic anchors to fix objects with screws on concrete walls and ceilings or solid surfaces.",
    details: `It performs a double expansion, that is, it opens towards the four cardinal points.
    It consists of 2 wings that do not allow the plug to rotate inside the hole when the screw is inserted.
    It has a neck that prevents the plug from sinking, even when the perforation is deeper.
    Has a guide that allows the screw to be inserted correctly
    Free of burrs that prevent double expansion, test with a 10 x 1 1/2” (38mm) screw.
    Operating temperatures -50ºC to +80°C
    Recommended load: 60 kg in concrete 50 kg in partition
    Resistance to extraction: 40 Kg in concrete 40 Kg in partition`,
    specifications: `Red
    Made with high density polyethylene
    Flexible
    Resistant to impact and extraction`,
  },
  {
    name: 'THORQUETE Concrete Anchor 5/16" Brown TP2B - 100 CT',
    price: 2.99,
    gtin: 3926909999,
    modelnumber: 110404100,
    category: "Hardware",
    sub: "Anchors",
    description: "Thorsmex plastic anchors to fix objects with screws on concrete walls and ceilings or solid surfaces.",
    details: `It performs a double expansion, that is, it opens towards the four cardinal points.
    It consists of 2 wings that do not allow the plug to rotate inside the hole when the screw is inserted.
    It has a neck that prevents the plug from sinking, even when the perforation is deeper.
    Has a guide that allows the screw to be inserted correctly
    Free of burrs that prevent double expansion, test with a 10 x 1 3/4” (44.5 mm) screw.
    Operating temperatures -50ºC to +80ºC
    Recommended load: 176.24 kg in concrete 80 kg in partition
    Resistance to extraction: 80 Kg in concrete 40 Kg in partition`,
    specifications: `Brown
    Made with high density polyethylene
    Flexible
    Resistant to impact and extraction`,
  },
  {
    name: 'THORQUETE Concrete Anchor 3/8" Blue TP3 - 100 CT',
    price: 2.99,
    gtin: 3926909999,
    modelnumber: 110505100,
    category: "Hardware",
    sub: "Anchors",
    description: "Thorsmex nylon anchors to fix objects with screws on concrete walls and ceilings or solid surfaces.",
    details: `It performs a double expansion, that is, it opens towards the four cardinal points.
    It consists of 2 wings that do not allow the plug to rotate inside the hole when the screw is inserted.
    It has a neck that prevents the plug from sinking, even when the perforation is deeper.
    Has a guide that allows the screw to be inserted correctly
    Free of burrs that prevent double expansion, test with a 12 x 2” (50.8mm) screw.
    Operating temperatures -50ºC to +80º C
    Recommended load: 140 Kg on concrete
    Resistance to extraction: 100 Kg in concrete`,
    specifications: `Blue
    Made with high density polyethylene
    Flexible
    Resistant to impact and extraction`,
  },
  {
    name: 'PERFORATHOR Drywall Anchor White TPD - 100 CT',
    price: 2.99,
    gtin: 3926909999,
    modelnumber: 130101100,
    category: "Hardware",
    sub: "Anchors",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    details: `No wall drilling required
    Load capacity: 5 Kg
    Resistance to extraction: 5 Kg
    Operating temperature -40ºC to + 80ºC
    Recommended Thorsman screw No. 10 x 1 ½” (38mm)`,
    specifications: `White
    Made with Polyamide (nylon No. 6 with fiber)
    Impact resistence`,
  },
  {
    name: 'THORQUETE Concrete Anchor 7/32" White TP0 - 100 CT',
    price: 2.99,
    gtin: 3926909999,
    modelnumber: 110101100,
    category: "Electrical",
    sub: "Anchors",
    description: "Thorsmex plastic anchors to fix objects with screws on concrete walls and ceilings or solid surfaces.",
    details: `It performs a double expansion, that is, it opens towards the four cardinal points.
    It consists of 2 wings that do not allow the plug to rotate inside the hole when the screw is inserted.
    It has a neck that prevents the plug from sinking, even when the perforation is deeper.
    Has a guide that allows the screw to be inserted correctly
    Free of burrs that prevent double expansion, test with 8 x 3/4” (19.1mm) screw.
    Operating temperatures -50ºC to +80ºC
    Recommended load: 40 kg in concrete 30 kg in partition
    Resistance to extraction: 15 Kg in concrete`,
    specifications: `White
    Made with high density polyethylene
    Flexible
    Resistant to impact and extraction`,
  },
  {
    name: 'Cable Clip Nail-in  3/4" - 100 CT',
    price: 8.99,
    gtin: 3926909999,
    modelnumber: 310100100,
    category: "Electrical",
    sub: "Cable Clips",
    description: "Thorsmex staples with integrated nail to fasten round conductors to exterior walls or ceilings with TC Rc.",
    details: `Resistance to corrosion, humidity and extreme climates.
    Operating temperatures: -10ºC to +120ºC
    It is installed directly to the wall by means of a 19.1mm x 2.0mm nail.`,
    specifications: `Black
    Made with Polypropylene
    Flexible
    The nail is made of galvanized steel, resistant to oxidation.
    Nail hardness 48 HRc Tol. -1 HRc`,
  },
  {
    name: 'Cable Clip Nail-in 5/64" - 100 CT',
    price: 9.99,
    gtin: 3926909999,
    modelnumber: 310400100,
    category: "Electrical",
    sub: "Cable Clips",
    description: "Thorsmex staples with integrated nail to fasten round conductors to exterior walls or ceilings with TC Rc.",
    details: `Resistance to corrosion, humidity and extreme climates
    Operating temperatures: -10ºC to +120°C
    Installs directly to the wall by means of a 2 mm (5/64”) x 38 mm (1 1/2”) nail.`,
    specifications: `Gray
    Made with Polypropylene
    Flexible
    The nail is made of galvanized steel, resistant to oxidation.
    Nail hardness 48 HRc Tol. -1 HRc`,
  },
  {
    name: 'Cable Clip with Nail Clear 1 3/16" - 100 CT',
    price: 9.99,
    gtin: 3926909999,
    modelnumber: 321000100,
    category: "Electrical",
    sub: "Cable Clips",
    description: "Thorsmex staples with integrated nail to fasten round conductors to exterior walls or ceilings with TC Rc.",
    details: `Resistance to corrosion, humidity and extreme climates.
    Operating temperatures: -10ºC to +120ºC
    Installs directly to the wall by means of a 30.0 mm (1 3/16”) x 2.0 mm (5/64”) nail.`,
    specifications: `Transparent
    Made with Polypropylene
    Flexible
    The nail is made of galvanized steel, resistant to oxidation.
    Nail hardness 48 HRc Tol. -1 HRc`,
  },
  {
    name: 'Cable Clip Nail-in 3/64" - 100 CT',
    price: 9.99,
    gtin: 3926909999,
    modelnumber: 310200100,
    category: "Electrical",
    sub: "Cable Clips",
    description: "Thorsmex staples with integrated nail to fasten round conductors to exterior walls or ceilings with TC Rc.",
    details: `Resistance to corrosion, humidity and extreme climates
    Operating temperatures: -10ºC to +120ºC
    Installs directly to the wall by means of a 1.2 mm (3/64”) x 20 mm (3/4”) nail.`,
    specifications: `Transparent
    Made with Polypropylene
    Flexible
    The nail is made of galvanized steel, resistant to oxidation.
    Nail hardness 48 HRc Tol. -1 HRc`,
  },
];

export default products;