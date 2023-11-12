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
const { app, BrowserWindow } = require('electron');
const fs = require('fs')
const path = require('path')

var btnCreate = document.getElementById('btnCreate')
var btnRead = document.getElementById('btnRead')
var btnDelete = document.getElementById('btnDelete')
var btnUpdate = document.getElementById('btnUpdate')
var fileName = document.getElementById('fileName')
var fileContents = document.getElementById('fileContents')

let pathName = path.join(__dirname, 'Files')

btnCreate.addEventListener('click', function(){ 
  let file = path.join(pathName, fileName.value)
  let contents = fileContents.value
  fs.writeFile(file, contents, function(err){ 
    if(err){
      return console.log(err)
    }
    var txtfile = document.getElementById("fileName").value
    alert(txtfile + " text file was created")    
    console.log("The file was created")
  
  })
  
})

btnRead.addEventListener('click', function(){  //read contents of the created text file
  let file = path.join(pathName, fileName.value)
 
  fs.readFile(file, function(err, data){ 
    if(err){
      return console.log(err)
    }
    fileContents.value = data
    console.log("The file was read!")
  })
  
})

btnDelete.addEventListener('click', function(){  
  let file = path.join(pathName, fileName.value)
 
  fs.unlink(file, function(err){ 
    if(err){
      return console.log(err)
    }
    fileName.value = ""
    fileContents.value = ""
    console.log("The file was deleted!")
  })
  
})

btnUpdate.addEventListener('click', function(){  
  let file = path.join(pathName, fileName.value)
  let contents = fileContents.value

  fs.writeFile(file, contents, function(err){
    if(err){
      return console.log(err)
    }
    var txtfile = document.getElementById("fileName").value
    alert(txtfile + " text file was updated")    
    console.log("The file was updated")
  })
})

let clearBtn = document.getElementById('clear-btn')

clearBtn.addEventListener('click', function(){ 
 fileName.value = ""
 fileContents.value = ""
})
