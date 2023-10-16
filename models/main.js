const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const csv = require('csv-parser');

dotenv.config();

const app = express();
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const productSchema = new mongoose.Schema({
  modelNumber: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  description: { type: String },
  details: { type: String },
  specs: { type: String },
  product_sheet: { type: String },
  msrp: { type: mongoose.Decimal128, required: true },
  price_1_49: { type: mongoose.Decimal128, required: true },
  price_50_499: { type: mongoose.Decimal128, required: true },
  price_500_999: { type: mongoose.Decimal128, required: true },
  price_1000_3000: { type: mongoose.Decimal128, required: true },
  price_3000_5000: { type: mongoose.Decimal128, required: true },
  price_5000_7000: { type: mongoose.Decimal128, required: true },
  price_7000_9000: { type: mongoose.Decimal128, required: true },
  price_indv: { type: mongoose.Decimal128, required: true },
  count_indv: { type: Number },
  price_box: { type: mongoose.Decimal128, required: true },
  count_box: { type: Number },
  price_pallet: { type: mongoose.Decimal128, required: true },
  count_pallet: { type: Number },
  unit_cost: { type: mongoose.Decimal128 },
  height_indv: { type: mongoose.Decimal128 },
  width_indv: { type: mongoose.Decimal128 },
  length_indv: { type: mongoose.Decimal128 },
  weight_indv: { type: mongoose.Decimal128 },
  height_box: { type: mongoose.Decimal128 },
  width_box: { type: mongoose.Decimal128 },
  length_box: { type: mongoose.Decimal128 },
  weight_box: { type: mongoose.Decimal128 },
  height_pallet: { type: mongoose.Decimal128 },
  width_pallet: { type: mongoose.Decimal128 },
  length_pallet: { type: mongoose.Decimal128 },
  weight_pallet: { type: mongoose.Decimal128 },
  packaging_type: { type: String },
  english_packaging: { type: String },
  gtin: { type: Number, required: true },
});

// Create the 'Product' model using the schema
const Product = mongoose.model('Product', productSchema, 'products');

// Import data from CSV
app.get('/api/import', async (req, res) => {
  try {
    // Set CSV file path and read CSV file
    const csvFilePath = './products.csv';
    const products = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        // Convert values to appropriate types
        const product = new Product({
          modelNumber: row.model_number,
          name: row.name,
          category: row.category,
          subCategory: row.sub_category,
          description: row.description,
          details: row.details,
          specs: row.specs,
          product_sheet: row.product_sheet,
          msrp: mongoose.Types.Decimal128.fromString(row.msrp),
          price_1_49: mongoose.Types.Decimal128.fromString(row.price_1_49),
          price_50_499: mongoose.Types.Decimal128.fromString(row.price_50_499),
          price_500_999: mongoose.Types.Decimal128.fromString(row.price_500_999),
          price_1000_3000: mongoose.Types.Decimal128.fromString(row.price_1000_3000),
          price_3000_5000: mongoose.Types.Decimal128.fromString(row.price_3000_5000),
          price_5000_7000: mongoose.Types.Decimal128.fromString(row.price_5000_7000),
          price_7000_9000: mongoose.Types.Decimal128.fromString(row.price_7000_9000),
          price_indv: mongoose.Types.Decimal128.fromString(row.price_indv),
          count_indv: Number(row.count_indv),
          price_box: mongoose.Types.Decimal128.fromString(row.price_box),
          count_box: Number(row.count_box),
          price_pallet: mongoose.Types.Decimal128.fromString(row.price_pallet),
          count_pallet: Number(row.count_pallet),
          unit_cost: mongoose.Types.Decimal128.fromString(row.unit_cost),
          height_indv: mongoose.Types.Decimal128.fromString(row.height_indv),
          width_indv: mongoose.Types.Decimal128.fromString(row.width_indv),
          length_indv: mongoose.Types.Decimal128.fromString(row.length_indv),
          weight_indv: mongoose.Types.Decimal128.fromString(row.weight_indv),
          height_box: mongoose.Types.Decimal128.fromString(row.height_box),
          width_box: mongoose.Types.Decimal128.fromString(row.width_box),
          length_box: mongoose.Types.Decimal128.fromString(row.length_box),
          weight_box: mongoose.Types.Decimal128.fromString(row.weight_box),
          height_pallet: mongoose.Types.Decimal128.fromString(row.height_pallet),
          width_pallet: mongoose.Types.Decimal128.fromString(row.width_pallet),
          length_pallet: mongoose.Types.Decimal128.fromString(row.length_pallet),
          weight_pallet: mongoose.Types.Decimal128.fromString(row.weight_pallet),
          packaging_type: row.packaging_type,
          english_packaging: row.english_packaging,
          gtin: Number(row.gtin),
        });

        products.push(product);
      })
      .on('end', async () => {
        // Delete existing products
        await Product.deleteMany();

        // Insert data into MongoDB
        await Product.insertMany(products);

        res.send('Data imported successfully');
      });
  } catch (error) {
    console.error('Error importing data:', error);
    res.status(500).send('Error importing data');
  }
});

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).send('Error getting products');
  }
});

// Get a product by model number
app.get('/api/products/:model_number', async (req, res) => {
  try {
    const product = await Product.findOne({ modelNumber: req.params.model_number });
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(product);
    }
  } catch (error) {
    console.error('Error getting product:', error);
    res.status(500).send('Error getting product');
  }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});