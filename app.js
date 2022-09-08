const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "7415589504",
    database: "crud_db"
});

connection.connect(function(error) {
    if (error) {
        console.log("Database Error", error);
    } else {
        console.log("Database Connected");
    }
});


app.get("/", function(req, res) {
    let pageData = {
        title: "Home Page",
        pageName: "homepage"
    };
    res.render("template", pageData);
});

app.get("/create-product", function(req, res) {
    let pageData = {
        title: "Create New Product",
        pageName: "create-product"
    };
    res.render("template", pageData);
});

app.get("/products", function(req, res) {
    let pageData = {
        title: "All Products",
        pageName: "all-products"
    };
    let getAllProducts = "SELECT * FROM products";
    connection.query(getAllProducts, function(error, result) {
        if (error) {
            console.log("Database Query Error ::: ", error);
        } else {
            console.log("result", result);
            pageData.products = result;
            res.render("template", pageData);
        }
    });
});

app.post("/create-product", function(req, res) {
    console.log("req.body", req.body);
    let title = req.body.title;
    let description = req.body.description;
    let price = req.body.price;
    let quantity = req.body.quantity;
    let isFeatured = req.body.isFeatured;
    console.log("title", title, description, price, quantity, isFeatured);
    let insertProduct = `INSERT INTO products(title, description, price, quantity, isFeatured) VALUES('${title}', '${description}', '${price}', '${quantity}', '${isFeatured}')`;
    console.log("insertProduct", insertProduct);
    connection.query(insertProduct, function(error, result) {
        if (error) {
            console.log("Database Query Error", error);
        } else {
            console.log("result", result);
            res.redirect('/products');
        }
    });
});

/**
 * Create Server
 */
const port = 4001;
app.listen(port, function() {
    console.log(`Server Started at PORT :` + port);
});