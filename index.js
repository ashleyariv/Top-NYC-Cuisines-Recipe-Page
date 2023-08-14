fetch('http://localhost:3000/recipes')
.then(response => response.json())
.then(recipes => recipes.forEach(recipe => addCuisineToDivBar(recipe)))

const recipeName = document.querySelector('#recipe-name')
const recipeImage = document.querySelector('#recipe-image')
const recipeSteps = document.querySelector('#recipe-steps')
const cuisineListDiv = document.querySelector('#cuisine-list')

function addCuisineToDivBar(recipe) {
    const cuisineListElement = document.createElement('li')
    cuisineListElement.textContent = recipe.cuisine
    cuisineListDiv.appendChild(cuisineListElement)
    cuisineListElement.addEventListener('mouseover', () => displayDetails(recipe))
}

function displayDetails(recipe) {
    recipeName.textContent = recipe.name
    recipeImage.src = recipe.image
    recipeSteps.forEach(recipe => addSteps(recipe))
    cuisineListElement.addEventListener('click', () => displayDetails(recipe))
}

function addSteps(recipe) {
    const ptag = document.createElement('p')
    ptag.textontent = recipe
    recipeSteps.textContent = recipe
}
