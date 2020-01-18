const cheerio = require('cheerio');
const request = require('request');
let fs = require('fs');
let page = fs.readFileSync('recipe.html');
const fastcsv = require('fast-csv');

console.log('starting scrape!');

request(page, function(error, response, html) {
    let $ = cheerio.load(page);
    let title = $('div .recipe-title').text().replace(/\s+/g, ' ').replace(/\n/g, '');
    let summary = $('div .topnote p').text().replace(/\s+/g, ' ').replace(/\n/g, '');
    let units = [];
    $('li .quantity').each(function(i, element) {
        let unit = $(element).text().replace(/\s+/g, ' ').replace(/\n/g, '');
        if (unit === ' ') {
            unit = ''
        } else {
            unit = unit.substring(0, unit.length -1);
        }
        units.push(unit);
    });
    let names = [];
    $('li .ingredient-name').each(function(i, element) {
        let name = $(element).text().replace(/\s+/g, ' ');
        name = name.substring(0, name.length -1);
        names.push(name);
    });
    let ingredients = [];
    for (let i = 0; i < names.length; i++) {
        let ingredient = units[i] + names[i];
        ingredients.push(ingredient);
    }
    console.log(ingredients);
    let steps = [];
    $('.recipe-steps li').each(function(i, element) {
        let step = $(element).text();
        steps.push(step);
    });
    console.log(steps);
    let ingredientStr = '';
    ingredientStr += title + "\n\n";
    ingredientStr += summary + "\n\n";
    for (let w = 0; w < ingredients.length; w++) {
        ingredientStr += ingredients[w] + '\n'
    }
    ingredientStr += '\n ----------------------- \n'
    for (let z = 0; z < steps.length; z++) {
        ingredientStr += steps[z] + '\n\n'
    }
    fs.writeFile('output.txt', ingredientStr, (err) => {
        if (err) throw err;
    })
})