const express = require('express');
const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

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
    res.render("template", pageData);
});

/**
 * Create Server
 */
const port = 4001;
app.listen(port, function() {
    console.log(`Server Started at PORT : ${port}`);
});