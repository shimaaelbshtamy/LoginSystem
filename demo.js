let loginForm = document.getElementById("loginForm");
let loginEmail = document.getElementById("loginEmail");
let loginPassword = document.getElementById("loginPassword");
let loginError = document.getElementById("loginError");
let loginSucess = document.getElementById("loginSucess");
let registerForm = document.getElementById("registerForm");
let signEmail = document.getElementById("signEmail");
let signUsername = document.getElementById("signUsername");
let signPassword = document.getElementById("signPassword");
let registerError = document.getElementById("registerError");
let registerErrorEmail = document.getElementById("registerErrorEmail");
let registerErrorPassward = document.getElementById("registerErrorPassward");
let excisstUser = document.getElementById("excisstUser");
let sucessSign = document.getElementById("sucessSign");
let noAccountButton = document.getElementById("noAccountButton");
let home = document.getElementById("home");
let usernameDisplay = document.getElementById("usernameDisplay");
let logOut = document.getElementById("logOut");
let allUser =[];


// welcome


logOut.addEventListener("click",function(e){
  e.preventDefault();
  home.classList.add('d-none');
   loginForm.classList.remove('d-none');
})



// login
noAccountButton.addEventListener("click",function(e){
  e.preventDefault();
  registerForm.classList.remove('d-none');
   loginForm.classList.add('d-none');
})

loginForm.addEventListener("submit",function (e) {
e.preventDefault();
login();
  
})
function login(){
  let userData ={
    email:loginEmail.value,
    passward:loginPassword.value
  };
  console.log(userData);
  if (isLogininValid(userData)==true) {
    console.log("your are logged");
    loginSucess.classList.replace("d-none","d-block");
    loginError.classList.add("d-none");
    home.classList.remove("d-none");
    loginForm.classList.add("d-none")

    let userName = localStorage.getItem("userName");
    usernameDisplay.textContent = `Welcome, ${userName}!`;
    
  }else{

    console.log("user not found pleas signup");
    loginError.classList.remove("d-none")
    loginSucess.classList.replace("d-block","d-none")
  }
}
function isLogininValid(userData) {
  for (let i = 0; i < allUser.length; i++) {
   if (
    allUser[i].email.toLowerCase()== userData.email.toLowerCase()&&
    allUser[i].passward.toLowerCase()== userData.passward.toLowerCase()

   ) {
    console.log("user found");
    localStorage.setItem("userName",allUser[i].name)
    return true;
    
   }
    
  }
  
}









// register

if(localStorage.getItem("allUser")!==null){
          allUser =JSON.parse(localStorage.getItem("allUser"))
}

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (checkInputsIsValid()) {
    console.log("added");
    addUser();
  }
});

function addUser(){
  let newUser ={
    name:signUsername.value,
    email:signEmail.value,
    passward:signPassword.value
};
       if(isExist(newUser) == true) {
        console.log("The email already exists.")
         excisstUser.classList.replace("d-none","d-block")
         sucessSign.classList.replace("d-block","d-none")
        } else {
        
          console.log(newUser);
          allUser.push(newUser);
          localStorage.setItem("allUser",JSON.stringify(allUser));
          excisstUser.classList.replace("d-block","d-none")
          sucessSign.classList.replace("d-none","d-block")
          console.log(allUser);
          console.log("user is true");
          // setTimeout(function(){
          //   registerForm.classList.add('d-none');
          // loginForm.classList.remove('d-none');
          // },2000)
          
          registerForm.classList.add('d-none');
          loginForm.classList.remove('d-none');
        }
          
}

function isExist(newUser){
  for (let i = 0; i < allUser.length; i++) {
   if (allUser[i].email.toLowerCase()== newUser.email.toLowerCase()) {
    console.log("The email already exists.");
    return true;
    
   }
  }
}

function validateInput(regex, element, errorMsg) {
  let pattern = regex;

  if (pattern.test(element.value) == true) {
    console.log("valid");
    errorMsg.classList.replace("d-block", "d-none");
    return true;
  } else {
    console.log("invalid");
    errorMsg.classList.replace("d-none", "d-block");
    return false;
  }
}

function checkInputsIsValid() {
  if (
    validateInput(/^[a-zA-Z]{2,}$/, signUsername, registerError) &&
    validateInput(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/,
      signEmail,
      registerErrorEmail
    ) &&
    validateInput(/^[a-zA-Z]{2,}$/
         

          , signPassword, registerErrorPassward)
  ) {
    console.log("All inputs are valid");
    return true;
  } else {
    console.log("There is an error with one or more inputs");
    return false;
  }
}


// function checkInputsIsValid() {
//           let isUsernameValid = validateInput(/^[a-zA-Z]{2,}$/, signUsername, registerError);
//           let isEmailValid = validateInput(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, signEmail, registerErrorEmail);
//           let isPasswordValid = validateInput(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, signPassword, registerErrorPassward);
//           if (isUsernameValid && isEmailValid && isPasswordValid) {
//               console.log("All inputs are valid");
//               return true;
//           } else {
//               console.log("There is an error with one or more inputs");
//               return false;
//           }
//       }
