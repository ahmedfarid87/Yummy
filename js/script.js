
$(document).ready(function () {
  nameSearch('').then(function () {
    $(".loading-page").fadeOut(2000, function() {
    })
  })
  })


// * N A V   B A R 


  $("ul li").eq(0).on("click",function () {
    displayInputSearch(); 
    closeLeftNav()
  })
  $("ul li").eq(1).on("click",function () {
    getCategory(); 
    closeLeftNav()
  })
  $("ul li").eq(2).on("click",function () {
    getArea();
    closeLeftNav()
  })
  $("ul li").eq(3).on("click",function () {
    getIngredients(); 
    closeLeftNav()
  })
  $("ul li").eq(4).on("click",function () {
    displayContactInputs();
    closeLeftNav()
  })


function closeLeftNav() {
    let innerWidth = $(".nav-left").innerWidth()
    $("section.sideBar").animate({left:-innerWidth},500)
    $(".toggle-icon").addClass("fa-align-justify");
    $(".toggle-icon").removeClass("fa-x");
    $(".links ul li").animate({top:210},300)
}

function openLeftNav() {
    $("section.sideBar").animate({left:0},500)
    $(".toggle-icon").removeClass("fa-align-justify");
    $(".toggle-icon").addClass("fa-x");
    for (let i = 0; i < 5; i++) {
        $(".links ul li").eq(i).css("transition","0s")
        $(".links ul li").eq(i).animate({top:0},(i+5)*100)
        
    }
}

$(".toggle-icon").on("click", function(){
    if ($("section.sideBar").css("left")=="0px") {
        closeLeftNav()
    }else {
        openLeftNav()
    }
    
})





    // *S E A R C H    I N P U T S 

  function displayInputSearch(){
    document.getElementById("input-search").innerHTML = `
    <div class="col-md-6 mb-4">
      <input onkeyup="nameSearch(this.value)" type="text" name="searchName" placeholder="Search By Name" class="form-control text-black">
    </div>
    <div class="col-md-6 mb-4">
      <input onkeyup="letterSearch(this.value)" type="text" name="searchLetter" placeholder="Search By First Letter" class="form-control text-black" maxlength="1">
    </div>`
    document.getElementById("Data").innerHTML = '';
  }
  
  
  async function nameSearch(name) {
    $(".loading-section").fadeIn(300)  
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    let data = await res.json();
    if (data.meals) {
      mealDisplay(data.meals)
    }else {
      mealDisplay([])
    }
    $(".loading-section").fadeOut(300)
  }
  
  async function letterSearch(letter) {
    $(".loading-section").fadeIn(300)  
    letter == "" ? letter ="a" : "";
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    let data = await res.json();
    
    if (data.meals) {
      mealDisplay(data.meals)
    }else {
      mealDisplay([])
    }
    $(".loading-section").fadeOut(300)
  }
  




// ?  G E T   C A T E G O R I E S 
async function getCategory() {
  $(".loading-section").fadeIn(300)
  document.getElementById("input-search").innerHTML = " ";
    let res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    let data = await res.json();
    displayCategory(data.categories.slice(0,20));
    $(".loading-section").fadeOut(300)
}

function displayCategory(data) {
    let cartona = ``;
    for (let i = 0; i < data.length; i++) {
        cartona += `<div class="col-md-3 animate__animated animate__fadeInUp ">
        <div onclick="categoryMeals('${data[i].strCategory}')" class="item position-relative rounded-3 overflow-hidden">
          <img class="w-100" src="${data[i].strCategoryThumb}" alt="meal">
          <div class="info position-absolute rounded-3 text-center text-black p-3">
            <h4>${data[i].strCategory}</h4>
            <p>${data[i].strCategoryDescription.split(" ").slice(0,15).join(" ")} ....</p>
          </div>
        </div>
      </div>
        `
        document.getElementById("Data").innerHTML = cartona ;
    }
    
}

async function categoryMeals(category) {
  $(".loading-section").fadeIn(300)
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    let data = await res.json();
    mealDisplay(data.meals.slice(0,20));
    $(".loading-section").fadeOut(300)
}



//  ~ G E T   A R E A 

async function getArea() {
  $(".loading-section").fadeIn(300)
  document.getElementById("input-search").innerHTML = " ";
    let res = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    let data = await res.json();
    displayArea(data.meals);
    $(".loading-section").fadeOut(300)

}

function displayArea(data) {
    let cartona = ``
    for (let i = 0; i < data.length; i++) {
        cartona += ` <div class="col-md-3 animate__animated animate__fadeInUp">
        <div onclick="areaMeals('${data[i].strArea}')" class="area text-white text-center">
          <i class="fa-solid fa-earth-africa fa-3x mb-3"></i>
          <h3>${data[i].strArea}</h3>
        </div>
      </div>
        `
        document.getElementById("Data").innerHTML = cartona ;
    }
}

async function areaMeals(area) {
  $(".loading-section").fadeIn(300)
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    let data = await res.json();
    mealDisplay(data.meals.slice(0,20))
    $(".loading-section").fadeOut(300)
}


// * G E T   I N G R E D I E N T S 

async function getIngredients() {
  $(".loading-section").fadeIn(300)
  document.getElementById("input-search").innerHTML = " ";
    let res = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
    let data = await res.json();
    console.log(data.meals);
    dispalyIngredients(data.meals.slice(0,20))
    $(".loading-section").fadeOut(300)

}

function dispalyIngredients(data) {
    let cartona = ``;
    for (let i = 0; i < data.length; i++) {
        cartona += `<div class="col-md-3 animate__animated animate__fadeInUp">
        <div onclick="ingredientsMeals('${data[i].strIngredient}')" class="ingredients text-white text-center">
          <i class="fa-solid fa-bowl-rice fa-3x mb-2"></i>
          <h3>${data[i].strIngredient}</h3>
          <p>${data[i].strDescription.split(" ").slice(0,10).join(" ")} ....</p>
        </div>
      </div>
        `
        document.getElementById("Data").innerHTML = cartona ;
    }
}

async function ingredientsMeals(ingredient) {
  $(".loading-section").fadeIn(300)
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    let data = await res.json();
    mealDisplay(data.meals.slice(0,20))
    $(".loading-section").fadeOut(300)
}



//   & G E T   M E A L S   D E T A I L S 

async function getMealsDetails(id){
  $(".loading-section").fadeIn(300)
  document.getElementById("input-search").innerHTML = " ";
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let data = await res.json();
    console.log(data.meals);
    displayMealsDetails(data.meals[0])
    $(".loading-section").fadeOut(300)
}

function displayMealsDetails(data) {
    if (data.strTags == null) {
        data.strTags = "No Tags Available"
    }

    let recipes = ``;
    for (let i = 0; i <21; i++) {
        if(data[`strIngredient${i}`]){
            recipes += `<span class="bg-primary p-2 m-2 rounded-3 d-inline-block fs-6">${data[`strIngredient${i}`]} ${data[`strMeasure${i}`]} </span>`
        }
    }

    let cartona = `<div class="col-md-4 text-center">
    <div class="img rounded-4 overflow-hidden mb-3"><img class="w-100" src="${data.strMealThumb}" alt="thumbnails"></div>
    <h2>${data.strMeal}</h2>
  </div>
  <div class="col-md-8">
    <h2 class="text-capitalize">how to cook it...</h2>
    <p class="mb-3">${data.strInstructions}</p>
    <h4 class="text-capitalize">area : ${data.strArea}</h4>
    <h4 class="text-capitalize">category : ${data.strCategory}</h4>
    <h4 class="text-capitalize">recipes : ${recipes} </h4>
    <h4 class="text-capitalize mb-3">tags : ${data.strTags}</h4>
    <a class="btn btn-danger text-capitalize" href="${data.strYoutube}" target="_blank">youtube</a>
    <a class="btn btn-dark text-capitalize" href="${data.strSource}" target="_blank">source</a>

  </div>
    `
    document.getElementById("Data").innerHTML = cartona ;
}



// ^ M E A L S    D I S P L A Y 

function mealDisplay(data) {
    let cartona = ``
    for (let i = 0; i < data.length; i++) {
        cartona += `<div class="col-md-3 animate__animated animate__fadeInUp">
        <div onclick="getMealsDetails('${data[i].idMeal}')" class="meal position-relative rounded-3 overflow-hidden">
          <div class="img"><img class="w-100" src="${data[i].strMealThumb}" alt="meal icon"></div>
          <div class="mealinfo d-flex justify-content-center align-items-center rounded-3 p-3">
            <h2 class="text-capitalize text-center fs-3 ">${data[i].strMeal}</h2>
          </div>
        </div>
      </div>
        
        `
        document.getElementById("Data").innerHTML = cartona ;
    }
    
}






//   ! C O N T A C T    F O R M  

function displayContactInputs() {
  document.getElementById("input-search").innerHTML = " ";
  document.getElementById("Data").innerHTML = `
  <div class="contact-us d-flex justify-content-center align-items-center">
          <div class="container text-center w-75">
            <h2 class="text-capitalize mb-5 fs-1">contact us</h2>
            <div class="row gy-3 mb-3">
              <div class="col-md-6">
                <input type="text" onkeyup=" nameValidation(); btnSubmit()" name="name" class="form-control mb-2" id="userName" placeholder="Enter Your Name">
                <p id="nameAlert" class="text-danger text-center d-none">! special character and numbers not allowed</p>
              </div>
              <div class="col-md-6">
                <input type="email" name="name" onkeyup="emailValidation();btnSubmit()" class="form-control mb-2" id="userEmail" placeholder="Enter Your Email">
                <p id="mailAlert" class="text-danger text-center d-none">! Email is not Valid (example@ghhh.com)</p>
              </div>
              <div class="col-md-6">
                <input type="tel" name="name" onkeyup="phoneValidation(); btnSubmit()" class="form-control mb-2" id="userPhone" placeholder="Enter Your Phone">
                <p id="phoneAlert" class="text-danger text-center d-none">! Enter Valid Phone Number</p>
              </div>
              <div class="col-md-6">
                <input type="number" onkeyup=" ageValidation(); btnSubmit()" name="name" class="form-control mb-2" id="userAge" placeholder="Enter Your Age">
                <p id="ageAlert" class="text-danger text-center d-none">! Enter Valid Age</p>
              </div>
              <div class="col-md-6">
                <input type="password" onkeyup="passwordValidation(); btnSubmit()" name="name" class="form-control mb-2" id="userPass" placeholder="Enter Your password">
                <p id="passAlert" class="text-danger text-center d-none">! your password must have minimum 8 character , at least one letter and one number</p>
              </div>
              <div class="col-md-6">
                <input onkeyup="repasswordValidation(); btnSubmit()" type="password"  name="name" class="form-control mb-2" id="userRePass" placeholder="Enter Your Name">
                <p id="repassAlert" class="text-danger text-center d-none">! your password not the same</p>
              </div>
            </div>
            <button id="btnSubmit" disabled class="btn btn-outline-danger p-2 px-3" >Submit</button>
          </div>
        </div>
  `}



  let flag1 = false;
  let flag2 = false;
  let flag3 = false;
  let flag4 = false;
  let flag5 = false;
  let flag6 = false;


  function nameValidation() {
    flag1 = true ;
    let regex= /^[a-zA-Z ]+$/;
    if (regex.test(document.getElementById("userName").value)) {
      $("#nameAlert").addClass("d-none")
      return true ;
    }else {
      $("#nameAlert").removeClass("d-none")
      return false
    }
  }
  
  function emailValidation() {
    flag2 = true;
    let regex=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex.test(document.getElementById("userEmail").value)) {
      $("#mailAlert").addClass("d-none")
      return true
    }else {
      $("#mailAlert").removeClass("d-none")
      return false
    }
  }
  
  function phoneValidation() {
    flag3 = true;
    let regex=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (regex.test(document.getElementById("userPhone").value)) {
      $("#phoneAlert").addClass("d-none")
      return true
    }else {
      $("#phoneAlert").removeClass("d-none")
      return false
    }
  }
  
  function ageValidation() {
    flag4 = true;
    let regex=/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
    if (regex.test(document.getElementById("userAge").value)) {
      $("#ageAlert").addClass("d-none")
      return true
    }else {
      $("#ageAlert").removeClass("d-none")
      return false
    }
  }
  
  function passwordValidation() {
    flag5 = true;
    let regex=/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
    if (regex.test(document.getElementById("userPass").value)) {
      $("#passAlert").addClass("d-none")
      return true
    }else {
      $("#passAlert").removeClass("d-none")
      return false
    }
  }
  
  function repasswordValidation() {
    flag6 = true;
     if (document.getElementById("userRePass").value == document.getElementById("userPass").value) {
      $("#repassAlert").addClass("d-none")
      return true
     }else {
      $("#repassAlert").removeClass("d-none")
      return false
     }
  }
  


  function btnSubmit() {
    if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6) {
      if (nameValidation() && emailValidation() && phoneValidation() && ageValidation() && passwordValidation() && repasswordValidation()) {
        document.getElementById("btnSubmit").removeAttribute("disabled")
      }else {
        document.getElementById("btnSubmit").setAttribute("disabled", true)
      }
    }
    
    
  }


