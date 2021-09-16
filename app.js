import {API_KEY} from './config.js'

//Class Fit Meals. Display Highly Nutritious Meals. All Classes Inherit This Endpoint.
class FitMeals {
    constructor(API_URL) {
        this.API_URL = API_URL;
    }

    static getRandomHealthyMeals(API_URL) {
       
        fetchRecipes(API_URL)

        async function fetchRecipes(url) {
            const response = await fetch(url);
            const data = await response.json();

            displayRecipes(data.results)
        }

        function displayRecipes(recipes) {
            let main = document.querySelector('#main');
            main.innerHTML = '';

            recipes.forEach((recipe) => {
                const { image, title, nutrition, sourceUrl} = recipe;

                const recipeElement = document.createElement('div');
                recipeElement.classList.add('card');

                recipeElement.innerHTML = `
                <img src="${ image }">
                <h3>${ title }</h3>
                <ul>
                    <li>Calories - ${ nutrition.nutrients[0].amount }</li>
                    <li>Protein - ${ nutrition.nutrients[8].amount }g</li>
                    <li>Carbs - ${ nutrition.nutrients[3].amount }g</li>
                    <li>Fat - ${ nutrition.nutrients[1].amount }g</li>
                </ul>
                <h4><a href="${ sourceUrl }" target="_blank">Visit Site</a></h4>
                `

                main.appendChild(recipeElement);
            })
        }
    }
}




//Initial Event: Call Random Healthy Recipes From FitMeals Class
document.addEventListener('DOMContentLoaded', FitMeals.getRandomHealthyMeals(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${ API_KEY }&addRecipeNutrition=true&minProtein=15&maxFat=20&sort=random&number=9`))

//Event: User Selects Option From Header 
document.querySelectorAll('.nav-links').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        if(link.innerHTML === 'Low Carb/ High Protein') {
            FitMeals.getRandomHealthyMeals(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${ API_KEY }&addRecipeNutrition=true&minProtein=25&maxCarbs=20&sort=popularity&number=9`)
        } else if(link.innerHTML === 'High Protein') {
            FitMeals.getRandomHealthyMeals(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${ API_KEY }&addRecipeNutrition=true&minProtein=45&maxFat=20&sort=random&number=9`)
        } else if(link.innerHTML === 'Low Fat') {
            FitMeals.getRandomHealthyMeals(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${ API_KEY }&addRecipeNutrition=true&minProtein=15&maxFat=10&sort=random&number=6`)
        } else {
            FitMeals.getRandomHealthyMeals( `https://api.spoonacular.com/recipes/complexSearch?apiKey=${ API_KEY }&addRecipeNutrition=true&minProtein=15&maxFat=20&minCalories=700&sort=random&number=9`)
        }

    })
})

//Event: User Searches For A Recipe
const submitForm = document.querySelector('#submit-form');
const search = document.querySelector('.search');

submitForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let userQuery = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${ API_KEY }&addRecipeNutrition=true&sort=random&number=6&query=` + search.value;

    FitMeals.getRandomHealthyMeals(userQuery)
    search.value = '';
})