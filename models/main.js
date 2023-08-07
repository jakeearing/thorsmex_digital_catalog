const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

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

// Import data
app.get('/api/import', async (req, res) => {
  try {
    // Set XLSX file path and read XLSX file
    const xlsxFilePath = 'products.xlsx';
    const df = pd.read_excel(xlsxFilePath);

    // Delete existing products
    await Product.deleteMany();

    // Insert data into MongoDB
    for (const row of df) {
      const product = new Product({
        name: row.name.replace("_x000D_", ""),
        modelNumber: row.model_number,
        price_indv: row.price_indv,
        price_box: row.price_box,
        price_pallet: row.price_pallet,
        msrp: row.msrp,
        unit_cost: row.unit_cost,
        count_indv: row.count_indv,
        count_box: row.count_box,
        count_pallet: row.count_pallet,
        height_indv: row.height_indv,
        width_indv: row.width_indv,
        length_indv: row.length_indv,
        weight_indv: row.weight_indv,
        height_box: row.height_box,
        width_box: row.width_box,
        length_box: row.length_box,
        weight_box: row.weight_box,
        height_pallet: row.height_pallet,
        width_pallet: row.width_pallet,
        length_pallet: row.width_pallet,
        weight_pallet: row.weight_pallet,
        packaging_type: row.packaging_type,
        stock: [row.stock_NC, row.stock_TX, row.stock_MX],
        gtin: row.gtin,
        category: row.category,
        subCategory: row.sub_category,
        description: row.description.replace("_x000D_", ""),
        details: row.details.replace("_x000D_", ""),
        specs: row.specs.replace("_x000D_", ""),
        product_sheet: row.product_sheet,
        english_packaging: row.english_packaging,
        stock_NC: row.stock_NC,
        stock_TX: row.stock_TX,
        stock_MX: row.stock_MX
      });

      await product.save();
    }

    res.send('Data imported successfully');
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