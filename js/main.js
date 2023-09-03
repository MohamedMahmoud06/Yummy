let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");

closeNav();
$(document).ready(function () {
  $(".loading").fadeOut(400);
  $("body").css("overflow", "visible");
  getCategories()
});

function openNav() {
  $(".navmenu").animate({ left: 0 }, 20);
  $(".open-close-icon").removeClass("fa-align-justify");
  $(".open-close-icon").addClass("fa-x");
  for (let i = 0; i <= 5; i++) {
    $(".links ul li").animate({ top: 0 }, (i + 5) * 10);
  }
}

function closeNav() {
  let boxWidth = $(".navmenu .tab").outerWidth();
  $(".navmenu").animate(
    {
      left: -boxWidth,
    },
    400
  );
  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-x");

  $(".links li").animate({ top: 400 }, 2000);
}
$(".btn").click(function(){
    let widthBox=$(".navmenu .tab").outerWidth() 
    $(".navmenu").animate({left:`${-widthBox}`},2000)
    
    if ($(".navmenu").css("left") == "0px") {
        closeNav();
      } else {
        openNav();
      }
})

async function getMealDetails(mealID) {
    closeNav()
    rowData.innerHTML = ""
    $(".loading").fadeIn(400)

    searchContainer.innerHTML = "";
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    data = await data.json();

    displayMealDetails(data.meals[0])
    $(".loading").fadeOut(400)

}

function displayMealDetails(meal) {
    
    searchContainer.innerHTML = "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let temp = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    rowData.innerHTML = temp
}
function displayMeals(arr) {
    let temp = "";
    
    for (let i = 0; i < arr.length; i++) {
        temp += `
        <div class="col-md-3">
        <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
        <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
        <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
        <h3>${arr[i].strMeal}</h3>
        </div>
        </div>
        </div>
        `
    }
    
    rowData.innerHTML = temp
}

displayMeals(arr)


async function getCategories() {
    rowData.innerHTML = ""
    $(".loading").fadeIn(400)
    searchContainer.innerHTML = "";

    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    data = await data.json()

    displayCategories(data.categories)
    $(".loading").fadeOut(400)

}
function displayCategories(arr) {
    let temp = "";

    for (let i = 0; i < arr.length; i++) {
        temp += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = temp
}
async function getCategoryMeals(category) {
    rowData.innerHTML = ""
    $(".loading").fadeIn(400)

    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    data = await data.json()

data=data
    displayMeals(data.meals.slice(0, 20))
    $(".loading").fadeOut(400)

}
displayMeals(data)
async function getArea() {
    rowData.innerHTML = ""
    $(".loading").fadeIn(400)

    searchContainer.innerHTML = "";

    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    data = await data.json()
    console.log(data.meals);

    displayArea(data.meals)
    $(".loading").fadeOut(400)

}


function displayArea(arr) {
    let temp = "";

    for (let i = 0; i < arr.length; i++) {
        temp += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }

    rowData.innerHTML = temp
}
async function getAreaMeals(area) {
    rowData.innerHTML = ""
    $(".loading").fadeIn(400)

    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    data = await data.json()


    displayMeals(data.meals.slice(0, 20))
    $(".loading").fadeOut(400)

}
function showSearchInputs() {
    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    rowData.innerHTML = ""
}

async function searchByName(term) {
    closeNav()
    rowData.innerHTML = ""
    $(".loading").fadeIn(400)

    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    data = await data.json()

    data.meals ? displayMeals(data.meals) : displayMeals([])
    $(".loading").fadeOut(400)

}

async function searchByFLetter(term) {
    closeNav()
    rowData.innerHTML = ""
    $(".loading").fadeIn(400)

    term == "" ? term = "b" : "";
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    data = await data.json()

    data.meals ? displayMeals(data.meals) : displayMeals([])
    $(".loading").fadeOut(400)

}
async function getIngredients() {
    rowData.innerHTML = ""
    $(".loading").fadeIn(400)

    searchContainer.innerHTML = "";

    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    data = await data.json()
    console.log(data.meals);

    displayIngredients(data.meals.slice(0, 20))
    $(".loading").fadeOut(400)

}


function displayIngredients(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}
async function getIngredientsMeals(ingredients) {
    rowData.innerHTML = ""
    $(".loading").fadeIn(400)

    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    data = await data.json()


    displayMeals(data.meals.slice(0, 20))
    $(".loading").fadeOut(400)

}
function showContacts() {
    rowData.innerHTML = `<form id="myForm" onsubmit="return validateForm()" oninput="checkFormValidity()">
    <div class="mb-3">
      <label for="name" class="form-label">Name:</label>
      <input type="text" id="name" class="form-control" required>
    </div>

    <div class="mb-3">
      <label for="email" class="form-label">Email:</label>
      <input type="email" id="email" class="form-control" required>
    </div>

    <div class="mb-3">
      <label for="phoneNumber" class="form-label">Phone Number:</label>
      <input type="text" id="phoneNumber" class="form-control" required>
    </div>

    <div class="mb-3">
      <label for="age" class="form-label">Age:</label>
      <input type="number" id="age" class="form-control" required>
    </div>

    <div class="mb-3">
      <label for="password" class="form-label">Password:</label>
      <input type="password" id="password" class="form-control" required>
    </div>

    <div class="mb-3">
      <label for="rePassword" class="form-label">Re-enter Password:</label>
      <input type="password" id="rePassword" class="form-control" required>
    </div>

    <button id="submitButton" class="btn btn-primary" disabled>Submit</button>
  </form>`
   


}



function validateForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var password = document.getElementById("password").value;
    var rePassword = document.getElementById("rePassword").value;

    var nameRegex = /^[a-zA-Z\s]+$/;
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var phoneRegex = /^(01)[0-2]\d{8}$/;
    var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!name.match(nameRegex)) {
      alert("Please enter a valid name.");
      return false;
    }

    if (!email.match(emailRegex)) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (!phoneNumber.match(phoneRegex)) {
      alert("Please enter a valid Egyptian phone number.");
      return false;
    }

    

    if (!password.match(passwordRegex)) {
      alert("Please enter a valid password (at least 6 characters, including at least one uppercase letter, one lowercase letter, and one digit).");
      return false;
    }

    if (password !== rePassword) {
      alert("Passwords do not match.");
      return false;
    }

    alert("Form submitted successfully!");
    return true;
  }

  function checkFormValidity() {
    var form = document.getElementById("myForm");
    var submitButton = document.getElementById("submitButton");

    if (form.checkValidity()) {
      submitButton.removeAttribute("disabled");
    } else {
      submitButton.setAttribute("disabled", "disabled");
    }
  }