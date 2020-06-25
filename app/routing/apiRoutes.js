var mysql = require("mysql"); //npm mysql
//var inquirer = require("inquirer"); //npm inquirer
var env = require('../../.env');

var connection = mysql.createConnection({ //new mysql connection from the bamazon_DB database
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: env.password,
  database: "recipes_DB",
  insecureAuth: true
});
// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// ===============================================================================

var recipeData = require("../data/recipeData");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/recipes", function(req, res) {
    //let recipe = {};
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    //console.log(res);
    res.json(recipeData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/recipes", function(req, res) {
    //const data = res.req.body.input;
    const data = req.body.input;
    console.log(data.title);
    var steps = '';
    for (var i=0; i<data.steps.length; i++) {
      steps += `${data.steps[i]}\n\n`
    }
    var summary = '';
    for (var i=0; i<data.summary.length; i++) {
      summary += `${data.summary[i]}\n\n`
    }
    console.log(summary);
    var ingredients = '';
    for (var i=0; i<data.ingredients.length; i++) {
      var group = Object.keys(data.ingredients[i]);
      ingredients += `~ ${group}\n`
      console.log(ingredients);

      // var ingList = data.ingredients[group];
      for (var w=0; w<data.ingredients[i][group].length;w++) {
        // \u2022
         ingredients += `${data.ingredients[i][group][w]}\n`
      }
    };
    console.log(ingredients);
    connection.query("INSERT INTO recipes SET ?", {recipe_title: data.title,author_name: data.author,steps: steps,ingredients: ingredients,summary: summary, category: data.category, notes: data.notes}, function(err, response) { //update the product's department name's sales with the total sales
      if(err)throw err;
      console.log(response);
    });
      recipeData.push(req.body);
      res.json(true);
    //});
  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/api/clear", function() {
    // Empty out the arrays of data
    recipeData = [];

    console.log(recipeData);
  });
};