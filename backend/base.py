from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from mongoengine import Document, StringField, IntField, connect

app = Flask(__name__)
CORS(app)

client = MongoClient('mongodb://localhost:27017/')
db = client.thorsmex_catalog

connect('thorsmex_catalog')

# Product model created
class Product(Document):
    name = StringField(required=True)
    description = StringField()
    price = IntField(required=True)
    
    meta = {'collection': 'catalog'}
  
# Place holder for simple route to return products files from Mongodb.  
@app.route('/products')
def get_products():
    products = Product.objects()
    return jsonify(products)  
    
if __name__ == '__main__':
    app.run()
