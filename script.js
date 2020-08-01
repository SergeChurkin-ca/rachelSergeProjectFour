const recipeApp = {};
recipeApp.meals = [];
// make API call 

recipeApp.getRecipe = () => {

    $('button').click(function() {
        recipeApp.ingredient = $('input').val();
        recipeApp.url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${recipeApp.ingredient}`;


        $.ajax({

            url: recipeApp.url,
            method: 'GET',
            datatype: 'json',
            data: {
                per_page: '3',
            }
        }).then((res) => {
            for (let i = 0; i < 3; i++) {
                console.log("this is length of needed array", res.meals.length);
                // here we are getting random 3 meals - still have to exclude conisidence
                const random = [Math.floor(Math.random() * res.meals.length)];

                const title = res.meals[random].strMeal;
                const dishImage = res.meals[random].strMealThumb;
                const recipeId = res.meals[random].idMeal;


                // second call to get recipe by id
                $.ajax({
                    url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`,
                    method: 'GET',
                    datatype: 'json',
                    data: {
                        per_page: '3',
                    }
                }).then((res) => {
                    console.log(res, "second call warks")
                    const recipe = res.meals[0].strInstructions;
                    const ingredient = res.meals[0].strIngredient1
                    console.log(ingredient)
                    console.log("here is an output of", recipe);
// here we output our results nicely now have title, id(will remove just have to see the result), recipe and image
                    $('body').append(`
                        <h2>${title}</h2>
                        ${recipeId}
                        <h3>${ingredient}</h3>
                        ${recipe}
                        
                        <img src="${dishImage}" width="250px">

                        `)
                })
            }
        });
    })
}


$(function() {
    recipeApp.getRecipe();

})
