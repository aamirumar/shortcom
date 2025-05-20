const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const fs = require('fs');
const path = require('path');


const app = express();
app.use(cors());
app.use(bodyParser.json());


// Connect to SQLite database
const dbPath = path.resolve(__dirname, 'shop.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error(err.message);
  else console.log('Connected to SQLite database.');
});

// Create tables if they don't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      phone TEXT,
      total REAL,
      date TEXT
    )
  `);
  
  db.run(`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER,
      product TEXT,
      quantity INTEGER,
      price REAL,
      FOREIGN KEY (order_id) REFERENCES orders(id)
    )
  `);
});

app.post('/api/orders', (req, res) => {
  const { name, phone, cartItems, total } = req.body;
  const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' '); // "YYYY-MM-DD HH:MM:SS"

  db.run(
    'INSERT INTO orders (name, phone, total , date) VALUES (? ,?, ?, ?)',
    [name, phone, total , currentDateTime],
    function (err) {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      const orderId = this.lastID;
      const stmt = db.prepare('INSERT INTO order_items (order_id, product, quantity, price) VALUES (?, ?, ?, ?)');

      for (const item of cartItems) {
        stmt.run(orderId, item.name, item.quantity, item.price);
      }

      stmt.finalize((err2) => {
        if (err2) {
          console.error(err2);
          return res.status(500).send(err2);
        }
        res.send({ message: 'Order saved successfully!' });
      });
    }
  );
});


const productFilePath = path.join(__dirname, '../src/data/products.js');
// Load initial products from file
let products = require('../src/data/products');
// const { Console } = require('console');
let currentId = Math.max(0, ...products.map(p => p.id)) + 1;

// Helper to write products back to file
function saveProductsToFile() {
  // console.log(products);
  const exportText = 'module.exports = ' + JSON.stringify(products, null, 2) + ';';
  fs.writeFileSync(productFilePath, exportText);
}

// Get all products
app.get('/products', (req, res) => {
  res.json(products);
});

// Add product
app.post('/products', (req, res) => {
  
  const newProduct = { ...req.body, id: currentId++ };
  products.push(newProduct);
  saveProductsToFile();
  res.status(201).json(newProduct);
});

// Update product
app.put('/products/:id', (req, res) => {
 
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {

    products[index] = {...req.body, id };
    saveProductsToFile();
    res.json(products[index]);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Delete product
app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  products = products.filter(p => p.id !== id);
  saveProductsToFile();
  res.status(204).send();
});


app.listen(5000, () => {
  console.log('Server running at http://localhost:5000');
});
