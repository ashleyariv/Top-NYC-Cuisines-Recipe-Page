const cuisineListDiv = document.querySelector('#cuisine-list')
const recipeName = document.querySelector('#recipe-name')
const recipeImage = document.querySelector('#recipe-image')
const recipeStepsParentDiv = document.querySelector('#parent') 
const stepsContainer = document.querySelector('#steps-container')
const ingredientsContainer = document.querySelector('#ingredients-container')
const commentSectionDiv = document.querySelector('#comments-section')
const commentInput = document.querySelector('#comment-input')
const formSubmission = document.querySelector('#comment-form')
let currentRecipe

//this is delete request to delete recipe
recipeImage.addEventListener('click', () => {
 fetch(`http://localhost:3000/recipes/${currentRecipe.id}`, {
    method: 'DELETE'
 })

})

fetch('http://localhost:3000/recipes')
.then(response => response.json())
.then(recipes => {
    displayDetails(recipes[0])
    recipes.forEach(recipe => {
        addCuisineToDivBar(recipe)
    })
})

function addCuisineToDivBar(recipe) {
    const cuisineListElement = document.createElement('li')
    cuisineListElement.setAttribute('id', 'individual-cuisine')
    cuisineListElement.textContent = recipe.cuisine
    cuisineListDiv.appendChild(cuisineListElement)
    cuisineListElement.addEventListener('mouseover', () => {
        if (recipeStepsParentDiv.style.display === 'none') {
            recipeStepsParentDiv.style.display = 'flex'
        }
        displayDetails(recipe)
    })
}

function displayDetails(recipe) {

    currentRecipe = recipe
    
    recipeName.textContent = recipe.name
    recipeImage.src = recipe.image
    ingredientsContainer.textContent = ""
    recipe.ingredients.forEach(recipe => addIngredients(recipe))
    stepsContainer.textContent = ""
    recipe.steps.forEach(recipe => addSteps(recipe))
    commentSectionDiv.textContent = ""
    recipe.comments.forEach(comment => addComment(comment))
}

function addIngredients(recipe) {
    const pTag = document.createElement('p')
    pTag.textContent = recipe
    ingredientsContainer.appendChild(pTag)
}

function addSteps(recipe) {
    const pTag = document.createElement('p')
    pTag.textContent = recipe
    stepsContainer.appendChild(pTag)
}

function addComment(comment) {
    const newComment = document.createElement('p')
    newComment.setAttribute('id', 'new-comment')
    newComment.textContent = comment
    commentSectionDiv.appendChild(newComment)

    const likeButton = document.createElement('button')
    likeButton.textContent = 0
    const likeImage = document.createElement('img')
    likeImage.setAttribute('id', 'like-image')
    likeImage.src = 'https://www.hubpng.com/files/preview/800x800/png-transparent-thumbs-up-transparent-background-clip-art-thumbs-up-11681695792mrli0prk2gmmxukieqxaxg6rvsnstojugdd3xuy6nw2ukfalbth9buvdihfs3hxmwngh0cwydlcy8mmajkqyi.png'
    likeButton.appendChild(likeImage)
    const dislikeButton = document.createElement('button')
    dislikeButton.textContent = 0 
    const dislikeImage = document.createElement('img')
    dislikeImage.setAttribute('id', 'dislike-image')
    dislikeImage.src = 'https://www.pngfind.com/pngs/m/44-445048_thumbs-down-comments-thumbs-down-icon-png-transparent.png'
    dislikeButton.appendChild(dislikeImage)
    newComment.append(likeButton, dislikeButton)

    likeButton.addEventListener('click', () => {
        likeButton.textContent =  Number(likeButton.textContent) +1
        likeButton.appendChild(likeImage)
    })
    dislikeButton.addEventListener('click', () => {
        dislikeButton.textContent = Number(dislikeButton.textContent) +1
        dislikeButton.appendChild(dislikeImage)
        if (dislikeButton.textContent === '9') alert('Careful! One more dislike, and this comment will be deleted!') 
        if (dislikeButton.textContent === '10') newComment.remove()
    })
}
formSubmission.addEventListener('submit', (event) => {
    event.preventDefault()
    addComment(commentInput.value)
    updateComments(currentRecipe)
    event.target.reset()
})

function updateComments(recipe) {
    fetch(`http://localhost:3000/recipes/${recipe.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        },
        body: JSON.stringify({
            comments: [...recipe.comments, commentInput.value]
        })
    })
}