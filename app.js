const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

// funnction to get recipes
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML ="<h2>Fetching Recipes...</h2>";
    try {
        
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    recipeContainer.innerHTML =""; //empty string
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');

        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belong to <span>${meal.strCategory}</span> Category</p>
        `

        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);

        // Adding EventListener to recipe button
        button.addEventListener('click', () =>{
            openRecipePopup(meal);
        })

        recipeContainer.appendChild(recipeDiv);
    });
    } 
    catch (error) {
        recipeContainer.innerHTML ="<h2>Error in Fetching Recipes...</h2>";
    }
}
//Function to fetch ingredents and measurements
const fetchIngredents = (meal) =>{
    let ingredentsList = "";
    for(let i =1; i<=20; i++){
        const ingredents = meal[`strIngredient${i}`];
        if(ingredents){
            const measure = meal[`strMeasure${i}`];
            ingredentsList += `<li>${measure} ${ingredents}</li>`
        }
        else{
            break;
        }
    }
    
    return ingredentsList;
}

const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredents</h3>
    <ul class="recipeNameList">${fetchIngredents(meal)}</ul>
    <div class="recipeInstructions">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
    </div>
    `
    recipeDetailsContent.parentElement.style.display = "block";
}

// Close Button
recipeCloseBtn.addEventListener('click', ()=> {
    recipeDetailsContent.parentElement.style.display = "none";
})

searchBtn.addEventListener('click', (e)=>{
    e.preventDefault(); //page not refresh auto
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML = `<h2>Type the meal in the search box.</h2>`;
        return;
    }
    fetchRecipes(searchInput);
});

// SCROLL
ScrollReveal({ 
    distance: '80px',
    duration: 2000,
    delay: 200,
});

ScrollReveal().reveal('h1', { origin: 'left' });
// ScrollReveal().reveal('.contact form', { origin: 'button' });
ScrollReveal().reveal('.search-box', { origin: 'right' });
ScrollReveal().reveal('.recipe-container', { origin: 'top' }); 