const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");
require("dotenv").config();




// create an instance of express app
let app = express();

// set the view engine
app.set("view engine", "hbs");

// static folder
app.use(express.static("public"));

// setup wax-on
wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts");

// enable forms
app.use(
  express.urlencoded({
    extended: false
  })
);

//importing routes
const landingPage = require('./routes/landing');
const productPage = require('./routes/products')
const countryPage = require('./routes/country')

async function main() {

  // app.get('/', (req, res) => {
  //   res.send("I'm Alive!!!!")
  // })
  app.use('/', landingPage);
  app.use('/products', productPage)
  app.use('/country',countryPage)
}


main();

app.listen(3000, () => {
  console.log("I am a servant");
});