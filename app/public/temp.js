     for (var i=0; i<recipe.ingredientSections.length; i++) {
          if (recipe.ingredientSections[0] === 'Ingredients') {
            recipeIngredients.find('li .quantity').each(function(i, element) {
                let unit = $(element).text().replace(/\s+/g, ' ').replace(/\n/g, '');
                if (unit === ' ') {
                    unit = '';
                } else {
                    unit = unit.substring(0, unit.length -1);
                }
                units.push(unit.substring(1));
            });
            recipeIngredients.find('li .ingredient-name').each(function(i, element) {
                let name = $(element).text().replace(/\s+/g, ' ');
                name = name.substring(0, name.length -1);
                //names.push(name.substring(1));
                names.push(name);
            });
            for (let i = 0; i < names.length; i++) {
                //units[i] = units[i].substring(1);
                let ingredient = units[i] + names[i];
                ingredients.push(ingredient);
            }
            //console.log(ingredients);
            recipe.ingredientSections.ingredients = ingredients;
            console.log(recipe.ingredientSections.ingredients);      
          } else {
            console.log(recipeIngredients.find('.part-name:nth-child(1)'));
              //console.log('multi sections fired');
              for (var w=0; w< recipe.ingredientSections.length; w++) {
                  //console.log(recipeIngredients.find('.part-name:nth-child('+i+')'));
                recipeIngredients.find('.part-name:nth-child('+i+')').next().find('.quantity').each(function(i, element) {
                        let unit = $(element).text().replace(/\s+/g, ' ').replace(/\n/g, '');
                        if (unit === ' ') {
                            unit = '';
                        } else {
                            unit = unit.substring(0, unit.length -1);
                        }
                        units.push(unit.substring(1));
                });
                recipeIngredients.find('.part-name:nth-child('+i+')').next().find('.ingredient-name').each(function(i, element) {
                        let name = $(element).text().replace(/\s+/g, ' ');
                        console.log(name);
                        name = name.substring(0, name.length -1);
                        //names.push(name.substring(1));
                        names.push(name);
                    });
                    for (let i = 0; i < names.length; i++) {
                        //units[i] = units[i].substring(1);
                        let ingredient = units[i] + names[i];
                        ingredients.push(ingredient);
                    }
            }
                //console.log(ingredients);
                recipe.ingredientSections[i].ingredients = ingredients;
                console.log(recipe.ingredientSections[i].ingredients);              
          }
      }



      $(page).find('.recipe-ingredient-wrapper').find('.recipe-ingredients :nth-child('+num+')').find('li').each(function(i, element) {
        console.log('each list fired');
        $(element).find('.quantity').each(function(i, tag) {
            let unit = $(tag).text().replace(/\s+/g, ' ').replace(/\n/g, '');
            if (unit === ' ') {
                unit = '';
            } else {
                unit = unit.substring(0, unit.length -1);
            }
            units.push(unit.substring(1));
        });
        $(element).find('li .ingredient-name').each(function(i, tag) {
            let name = $(tag).text().replace(/\s+/g, ' ');
            name = name.substring(0, name.length -1);
            //names.push(name.substring(1));
            names.push(name);
        });
        for (let i = 0; i < names.length; i++) {
            //units[i] = units[i].substring(1);
            let ingredient = units[i] + names[i];
            //ingredients.push(ingredient);
            console.log(ingredient);
        }
    })

