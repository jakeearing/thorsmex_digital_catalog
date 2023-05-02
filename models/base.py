from flask import Flask
from flask_cors import CORS
from mongoengine import Document, StringField, IntField, ListField, DecimalField, connect
import pandas as pd

app = Flask(__name__)
CORS(app)

connect('thorsmex_catalog', host='mongodb://localhost:27017/')

# MongoDB products model created
class Products(Document):
    name = StringField(required=True)
    price = DecimalField(precision=2,required=True)
    volumeDiscount = DecimalField(precision=2)
    stock = ListField(IntField())
    pieces = IntField()
    gtin = IntField(required=True)
    modelNumber = StringField(required=True)
    category = StringField(required=True)
    subCategory = StringField(required=True)
    description = StringField()
    details = StringField()
    specs = StringField()
    height = DecimalField(precision=2)
    width = DecimalField(precision=2)
    weight = DecimalField(precision=2)
    english = StringField(null=True)
    stock_NC = IntField()
    stock_TX = IntField()
    stock_MX = IntField()

@app.route('/import')
def import_data():
    # Set CSV file path and read csv file
    csv_file_path = 'products.csv'
    df = pd.read_csv(csv_file_path)
    # Current products will be deleted
    Products.objects().delete()

    # Insert data into MongoDB
    for index, row in df.iterrows():
        product = Products(
            name=row['name'],
            price=row['price'],
            volumeDiscount=row['volume_discount'],
            stock=[row['stock_NC'], row['stock_TX'], row['stock_MX']],
            pieces=row['pieces'],
            gtin=row['gtin'],
            modelNumber=row['model_number'],
            category=row['category'],
            subCategory=row['sub_category'],
            description=row['description'],
            details=row['details'],
            specs=row['specs'],
            height=row['height'],
            width=row['width'],
            weight=row['weight'],
            english=row['english'],
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

if __name__ == '__main__':
    app.run()
