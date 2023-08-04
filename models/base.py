from flask import Flask
from flask_cors import CORS
from mongoengine import Document, StringField, IntField, ListField, DecimalField, connect
import pandas as pd
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app, origins=["https://www.thorsmexcatalog.com", "http://localhost:3000"])

# Load environment variables from .env file
load_dotenv()

# Retrieve the MongoDB URI from the environment variable
mongodb_uri = os.getenv('MONGODB_URI')
if mongodb_uri is None:
    raise ValueError("MongoDB URI not found in .env file")

# Connect to MongoDB using the retrieved URI
connect('thorsmex_catalog', host=mongodb_uri)

# MongoDB products model created
class Products(Document):
    name = StringField(required=True)
    modelNumber = StringField(required=True)
    price_indv = DecimalField(precision=2,required=True)
    price_box = DecimalField(precision=2,required=True)
    price_pallet = DecimalField(precision=2,required=True) 
    msrp = DecimalField(precision=2,required=True) 
    unit_cost = DecimalField(precision=2)
    count_indv = IntField()
    count_box = IntField()
    count_pallet = IntField()
    height_indv = DecimalField(precision=2)
    width_indv = DecimalField(precision=2)
    length_indv = DecimalField(precision=2)
    weight_indv = DecimalField(precision=2)
    height_box = DecimalField(precision=2)
    width_box = DecimalField(precision=2)
    length_box = DecimalField(precision=2)
    weight_box = DecimalField(precision=2) 
    height_pallet = DecimalField(precision=2)
    width_pallet = DecimalField(precision=2)
    length_pallet = DecimalField(precision=2)
    weight_pallet = DecimalField(precision=2)
    packaging_type = StringField()
    stock = ListField(IntField())
    gtin = IntField(required=True)
    category = StringField(required=True)
    subCategory = StringField(required=True)
    description = StringField()
    details = StringField()
    specs = StringField()
    product_sheet = StringField()
    english_packaging = StringField()
    stock_NC = IntField()
    stock_TX = IntField()
    stock_MX = IntField()

@app.route('/api/import')
def import_data():
    # Set XLSX file path and read XLSX file
    xlsx_file_path = 'products.xlsx'
    df = pd.read_excel(xlsx_file_path)
    # Current products will be deleted
    Products.objects().delete()

    # Insert data into MongoDB
    for index, row in df.iterrows():
        product = Products(
            name=row['name'].replace("_x000D_", ""),
            modelNumber=row['model_number'],
            price_indv=row['price_indv'],
            price_box=row['price_box'],
            price_pallet=row['price_pallet'],
            msrp=row['msrp'],
            unit_cost=row['unit_cost'],
            count_indv=row['count_indv'],
            count_box=row['count_box'],
            count_pallet=row['count_pallet'],
            height_indv=row['height_indv'],
            width_indv=row['width_indv'],
            length_indv=row['length_indv'],
            weight_indv=row['weight_indv'],
            height_box=row['height_box'],
            width_box=row['width_box'],
            length_box=row['length_box'],
            weight_box=row['weight_box'],
            height_pallet=row['height_pallet'],
            width_pallet=row['width_pallet'],
            length_pallet=row['width_pallet'],
            weight_pallet=row['weight_pallet'],
            packaging_type=row['packaging_type'],
            stock=[row['stock_NC'], row['stock_TX'], row['stock_MX']],
            gtin=row['gtin'],
            category=row['category'],
            subCategory=row['sub_category'],
            description=row['description'].replace("_x000D_", ""),
            details=row['details'].replace("_x000D_", ""),
            specs=row['specs'].replace("_x000D_", ""),
            product_sheet=row['product_sheet'],
            english_packaging=row['english_packaging'],
            stock_NC=row['stock_NC'],
            stock_TX=row['stock_TX'],
            stock_MX=row['stock_MX']
        )
        product.save()

    return 'Data imported successfully'

# This route will convert the database to JSON, to be accessed by React.
@app.route('/api/products')
def get_products():
    products = Products.objects().to_json()
    return products

@app.route('/api/products/<model_number>')
def get_product(model_number):
    product = Products.objects(modelNumber=model_number).first()
    if not product:
        return {'error': 'Product not found'}
    return product.to_json()

# Import data when the server starts
import_data()

if __name__ == '__main__':
    app.run(
    ssl_context=('cert.pem', 'key.pem'),
    host='www.thorsmexcatalog.com',
    port=5000
)
