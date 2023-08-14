fetch('http://localhost:3000/recipes')
.then(response => response.json())
.then(recipes => recipes.forEach(recipe => displayDetails(recipe)))

const recipeName = document.querySelector('#recipe-name')
const recipeImage = document.querySelector('#recipe-image')
const recipeSteps = document.querySelector('#recipe-steps')
const cuisineList = document.querySelector('li')

function displayDetails(recipe) {
    recipeName.textContent = recipe.name
    recipeImage.src = recipe.image
    recipeSteps.textContent = recipe.steps
    // recipeSteps.forEach(recipe => addSteps(recipe))
    cuisineList.addEventListener('click', () => displayDetails(recipe))
}

// function addSteps(recipe) {
//     recipeSteps.textContent = recipe
// }