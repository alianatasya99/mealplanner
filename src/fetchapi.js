document.addEventListener('DOMContentLoaded', async () => {
    const ingredientDropdown = document.getElementById('ingredient-dropdown');

    // Fetch the list of ingredients from the API
    //List all the Ingredients
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const data = await response.json();

    // Populate the dropdown with ingredients from the API response
    data.meals.forEach(ingredient => {
        const option = document.createElement('option');
        option.value = ingredient.strIngredient;
        option.textContent = ingredient.strIngredient;
        ingredientDropdown.appendChild(option);
    });

    const fetchMealBtn = document.getElementById('fetch-meal-btn');
    fetchMealBtn.addEventListener('click', async () => {
        const selectedIngredient = ingredientDropdown.value;
        const meals = await fetchMealData(selectedIngredient);
        displayMealData(meals);
    });

});
const fetchMealData = async (mealType) => {
    //Search meal by name
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealType}`);
    const data = await response.json();
    return data.meals;
};

const displayMealData = (meals) => {
    const mealContainer = document.getElementById('meal-container');
    mealContainer.innerHTML = '';

    if (meals) {
        meals.forEach(meal => {
            const mealDiv = document.createElement('div');
            mealDiv.innerHTML = `
                <h2>${meal.strMeal}</h2>
                <p><strong>Category:</strong> ${meal.strCategory}</p>
                <center><img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width: 400px; height: auto;"></center>
                <h3>Meal Instruction:</h3>
                    ${meal.strInstructions}
                <h3>Ingredients:</h3>
                <ul>
                    ${getIngredientsList(meal)}
                </ul>
                <h3>Youtube Link:</h3>
                <a href="${meal.strYoutube}" target="_blank">Watch Video: How to Prepare</a>
            `;
            mealContainer.appendChild(mealDiv);
        });
    } else {
        mealContainer.innerHTML = 'No meals found.';
    }
};
const getIngredientsList = (meal) => {
    const ingredientsList = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && measure) {
            ingredientsList.push(`<li>${measure} ${ingredient}</li>`);
        }
    }
    return ingredientsList.join('');
};

document.addEventListener('DOMContentLoaded', () => {
    const fetchMealBtn = document.getElementById('fetch-meal-btn');
    const mealTypeDropdown = document.getElementById('meal-type-dropdown');

    fetchMealBtn.addEventListener('click', async () => {
        const mealType = mealTypeDropdown.value;
        const meals = await fetchMealData(mealType);

        displayMealData(meals);
    });
});
