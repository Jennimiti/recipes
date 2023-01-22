function listItem(text) {
    return "<li>" + text + "</li>"
}

function formatList(list) {
    var result = []
    for (var i = 0; i < list.length; i++) {
        const element = list[i];
        const formatted = listItem(element)
        result.push(formatted)
    }

    return result.join("")    
}

function renderRecipe(recipe) {
    // render name
    document.getElementById("recipeName").innerHTML = recipe.name;
    //fill Input mit Portionen
    document.getElementById("recipePortions").value = recipe.portions

    //Render Image
    document.getElementById("recipeImage").src = recipe.image
    document.getElementById("recipeImage").alt = recipe.name

    // render ingredients
    document.getElementById("recipeIngredients").innerHTML = formatList(
        recipe.ingredients.map(function(ingredient) {
            return '<span class="ingredient-amount">' + (ingredient.amount ?? "") + " " + 
            (ingredient.unit ?? "") + '</span><span class="ingredient-name">' + ingredient.name + "</span>"
        })
    )

    // render Instructions
    document.getElementById("recipeInstructions").innerHTML = formatList(recipe.instructions)
}

// Jetzt machen wir wirklich den Umrechner
// i: ingredients + Multiplikator => [?] => ingredients mit angepasster Menge
function convertIngredientAmounts(recipe, multiplier) {
    var convertedIngredients = recipe.ingredients.map(function (ingredient) {
        const amount = ingredient.amount != null 
            ? Math.round(ingredient.amount / recipe.portions * multiplier) 
            : null
        return {
            name: ingredient.name,
            unit: ingredient.unit,
            amount: amount
        }
    })
    return {
        ...recipe,
        portions: multiplier,
        ingredients: convertedIngredients
    }
}


function loadRecipe(recipe) {
    renderRecipe(recipe)

    //hier kommt das Inputfeld
    const inputField = document.getElementById("recipePortions")
    inputField.addEventListener("change", function (event) {
        renderRecipe(convertIngredientAmounts(recipe, event.target.value))
    }) 
}