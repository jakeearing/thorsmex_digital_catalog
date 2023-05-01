from flask import Flask, jsonify
from flask_cors import CORS
from mongoengine import Document, StringField, IntField, ListField, DecimalField, connect
import pandas as pd

app = Flask(__name__)
CORS(app)

# Connect to MongoDB database
connect('thorsmex_catalog', host='mongodb://localhost:27017/')

# Product model created
class Products(Document):
    name = StringField(required=True)
    price = IntField(required=True)
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

# Import data from CSV file
@app.route('/import')
def import_data():
    # CSV file path
    csv_file_path = 'products.csv'

    # Read CSV file using pandas
    df = pd.read_csv(csv_file_path)
    
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
        
        product = Products.objects().with_id(product.id)
        product.id = None
        product.save()

    return 'Data imported successfully'

if __name__ == '__main__':
    app.run()
