import { v4 as uuidv4 } from 'uuid';

const products = [
  { id: uuidv4(), name: '100 Count Concrete Anchor 1/4" Red', price: 2.99, gtin: 3926909999, modelnumber: 110303100, category: "Hardware", sub: "Anchors"},
  { id: uuidv4(), name: '100 Count Concrete Anchor 1/4" Brown', price: 2.99, gtin: 3926909999, modelnumber: 110404100, category: "Hardware", sub: "Anchors"},
  { id: uuidv4(), name: '100 Count Concrete Anchor 3/8" Blue', price: 2.99, gtin: 3926909999, modelnumber: 110505100, category: "Hardware", sub: "Anchors"},
  { id: uuidv4(), name: '100 Count Drywall Anchor White', price: 2.99, gtin: 3926909999, modelnumber: 130101100, category: "Hardware", sub: "Anchors"},
  { id: uuidv4(), name: '100 Count Concrete Anchor 7/32" White', price: 2.99, gtin: 3926909999, modelnumber: 110101100, category: "Electrical", sub: "Raceway"},  
  { id: uuidv4(), name: '1020 Cable Raceway 2 of 43.3in L', price: 19.99, gtin: 3925909900, modelnumber: 510101262, category: "Electrical", sub: "Raceway"},
  { id: uuidv4(), name: 'Cable Raceway End Cap', price: 9.99, gtin: 3925909900, modelnumber: 519002001, category: "Electrical", sub: "Raceway"},
  { id: uuidv4(), name: 'Cable Raceway Inside Elbow', price: 9.99, gtin: 3925909900, modelnumber: 512002001, category: "Electrical", sub: "Raceway"},
  { id: uuidv4(), name: 'Cable Raceway Outside Elbow', price: 9.99, gtin: 3925909900, modelnumber: 521002001, category: "Electrical", sub: "Raceway"},
];

export default products;