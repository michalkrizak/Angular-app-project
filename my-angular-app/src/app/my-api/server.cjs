const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(express.json()); // Middleware pro zpracování JSON
app.use(cors()); // Povolit CORS pro frontend

const PORT = 3000;

// Funkce pro načtení dat ze souboru
const loadFile = (fileName) => {
  try {
    const data = fs.readFileSync(fileName);
    return JSON.parse(data);
  } catch (error) {
    console.error(`Chyba při načítání ${fileName}:`, error);
    return [];
  }
};

// Funkce pro uložení dat do souboru
const saveFile = (fileName, data) => {
  try {
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Chyba při ukládání ${fileName}:`, error);
    return false;
  }
};

// ====== ROUTY ======

// 📌 **1. Produkty** (CRUD)
const productsFile = "products.json";

app.get("/products", (req, res) => {
  res.json(loadFile(productsFile));
});

app.get("/products/:id", (req, res) => {
  const products = loadFile(productsFile);
  const product = products.find(p => p.id == req.params.id);
  res.json(product || { message: "Produkt nenalezen" });
});

app.post("/products", (req, res) => {
  const products = loadFile(productsFile);
  const newProduct = { id: products.length + 1, ...req.body };
  products.push(newProduct);
  saveFile(productsFile, products);
  res.json(newProduct);
});

app.put("/products/:id", (req, res) => {
  let products = loadFile(productsFile);
  products = products.map(p => (p.id == req.params.id ? { ...p, ...req.body } : p));
  saveFile(productsFile, products);
  res.json({ message: "Produkt aktualizován" });
});

app.delete("/products/:id", (req, res) => {
  let products = loadFile(productsFile);
  products = products.filter(p => p.id != req.params.id);
  saveFile(productsFile, products);
  res.json({ message: "Produkt smazán" });
});

// 📌 **2. Uživatelé** (CRUD)
const usersFile = "users.json";

app.get("/users", (req, res) => {
  res.json(loadFile(usersFile));
});

app.get("/users/:id", (req, res) => {
  const users = loadFile(usersFile);
  const user = users.find(u => u.id == req.params.id);
  res.json(user || { message: "Uživatel nenalezen" });
});

app.post("/users", (req, res) => {
  const users = loadFile(usersFile);
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  saveFile(usersFile, users);
  res.json(newUser);
});

// 📌 **3. Košík** (CRUD)
const cartFile = "carts.json";

app.get("/cart/:userId", (req, res) => {
  const cart = loadFile(cartFile);
  const userCart = cart.find(c => c.userId == req.params.userId);
  res.json(userCart || { message: "Košík nenalezen" });
});

app.post("/cart", (req, res) => {
  const cart = loadFile(cartFile);
  const newCart = { id: cart.length + 1, ...req.body };
  cart.push(newCart);
  saveFile(cartFile, cart);
  res.json(newCart);
});

app.listen(PORT, () => {
  console.log(`✅ Server běží na http://localhost:${PORT}`);
});
