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

/**
 * To check database connection
 */
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

app.get("/create-category", function(req, res) {
    let pageData = {
        title: "Create Category",
        pageName: "create-category"
    };
    res.render("template", pageData);
});

app.post("/create-category", function(req, res) {
    let title = req.body.title;
    let description = req.body.description;
    let insertCategory = `INSERT INTO category(title, description) VALUES('${title}', '${description}')`;
    connection.query(insertCategory, function(error, result) {
        if (error) {
            console.log("Database Query Error ::: ", error);
        } else {
            res.redirect('/categories');
        }
    });
});

app.get("/categories", function(req, res) {
    let pageData = {
        title: "All Categories",
        pageName: "all-categories"
    };
    let allCat = `SELECT * FROM category`;
    connection.query(allCat, function(error, result) {
        if (error) {
            console.log("Database Query Error ::: ", error);
        } else {
            pageData.categories = result;
            res.render("template", pageData);
        }
    });
});

app.get("/edit-category", function(req, res) {
    let pageData = {
        title: "Edit Category",
        pageName: "edit-category"
    };
    const categoryId = req.query.cat_id;
    console.log("categoryId", categoryId);
    let getSingleCategory = `SELECT * FROM category WHERE id='${categoryId}'`;
    connection.query(getSingleCategory, function(error, result) {
        if (error) {
            console.log("Database Query Error ::: ", error);
        } else {
            let catData = result[0];
            console.log("catData", catData.title);
            pageData.category = catData;
            res.render("template", pageData);
        }
    });

});

app.get('/delete-category', function(req, res) {
    if (req.query.cat_id) {
        let categoryId = req.query.cat_id;
        const deleteCat = `DELETE FROM category WHERE id='${categoryId}'`;
        connection.query(deleteCat, function(error, result) {
            if (error) {
                console.log("Database Query Error", error);
            } else {
                res.redirect('/categories');
            }
        });
    }
});

app.post("/update-category", function(req, res) {
    console.log("req.body", req.body);
    const title = req.body.title;
    const description = req.body.description;
    const categoryId = req.body.category_Id;
    console.log("title", title);
    console.log("description", description);
    console.log("categoryId", categoryId);

    let updateCat = `UPDATE category SET title='${title}', description='${description}' WHERE id='${categoryId}'`;
    connection.query(updateCat, function(error, result) {
        if (error) {
            console.log("Database Query Error", error);
        } else {
            res.redirect('/categories');
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