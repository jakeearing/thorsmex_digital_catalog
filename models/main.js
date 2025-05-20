const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const csv = require('csv-parser');
const iconv = require('iconv-lite');
const nodemailer = require('nodemailer');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

let products = [];

function loadProductsFromCSV(csvFilePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(csvFilePath)
      .pipe(iconv.decodeStream('utf8'))
      .pipe(csv())
      .on('data', (row) => {
        results.push({
          modelNumber: row.model_number,
          name: row.name,
          category: row.category,
          subCategory: row.sub_category,
          description: row.description,
          details: row.details,
          specs: row.specs,
          product_sheet: row.product_sheet,
          msrp: parseFloat(row.msrp).toFixed(2),
          price_indv: parseFloat(row.price_indv).toFixed(2),
          count_indv: Number(row.count_indv),
          price_box: parseFloat(row.price_box).toFixed(2),
          count_box: Number(row.count_box),
          price_pallet: parseFloat(row.price_pallet).toFixed(2),
          count_pallet: Number(row.count_pallet),
          unit_cost: parseFloat(row.unit_cost).toFixed(2),
          height_indv: parseFloat(row.height_indv).toFixed(2),
          width_indv: parseFloat(row.width_indv).toFixed(2),
          length_indv: parseFloat(row.length_indv).toFixed(2),
          weight_indv: parseFloat(row.weight_indv).toFixed(2),
          height_box: parseFloat(row.height_box).toFixed(2),
          width_box: parseFloat(row.width_box).toFixed(2),
          length_box: parseFloat(row.length_box).toFixed(2),
          weight_box: parseFloat(row.weight_box).toFixed(2),
          height_pallet: parseFloat(row.height_pallet).toFixed(2),
          width_pallet: parseFloat(row.width_pallet).toFixed(2),
          length_pallet: parseFloat(row.length_pallet).toFixed(2),
          weight_pallet: parseFloat(row.weight_pallet).toFixed(2),
          packaging_type: row.packaging_type,
          english_packaging: row.english_packaging,
          gtin: Number(row.gtin).toFixed(0),
        });
      })
      .on('end', () => resolve(results))
      .on('error', reject);
  });
}

// Load CSV at startup
const csvPath = './products.csv';
loadProductsFromCSV(csvPath)
  .then((data) => {
    products = data;
    console.log(`Loaded ${products.length} products from CSV.`);
  })
  .catch((err) => {
    console.error('Failed to load products:', err);
  });

app.get('/api/products', (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.json(products);
});

app.get('/api/products/:model_number', (req, res) => {
  const product = products.find(p => p.modelNumber === req.params.model_number);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// Endpoint to handle form submission
app.post('/api/send-email', (req, res) => {
  const formData = req.body;

  // Create a Nodemailer transporter with SMTP configuration
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: true
    }
  });

  // Construct the email message based on the form type and set the email subject
  let emailMessage;
  let emailSubject;
  emailSubject = 'Thorsmex Catalog Contact Form';
  emailMessage = `
    Nature of Inquiry: ${formData.inquiryType}
    Subject: ${formData.subject}
    Message: ${formData.message}
    Full Name: ${formData.fullName}
    Email Address: ${formData.email}
    Phone Number: ${formData.phone}
    Company: ${formData.company}
    City: ${formData.city}
    State: ${formData.state}
    Country: ${formData.country}
  `;

  // Define the email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    // Set the email subject based on the form type
    subject: emailSubject,
    text: emailMessage,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email' });
    } else {
      console.log('Email sent:', info.response);
      res.json({ message: 'Email sent successfully' });
    }
  });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});