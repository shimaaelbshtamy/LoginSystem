
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


logOut.addEventListener("click", function (e) {
  e.preventDefault();
  localStorage.removeItem("userName");
  home.classList.add("d-none");
  loginForm.classList.remove("d-none");
});


noAccountButton.addEventListener("click", function (e) {
  e.preventDefault();
  registerForm.classList.remove("d-none");
  loginForm.classList.add("d-none");
});


loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  login();
});

async function login() {
  const userData = {
    email: loginEmail.value,
    password: loginPassword.value,
  };

  try {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Login successful:", data);

      loginSucess.classList.replace("d-none", "d-block");
      loginError.classList.add("d-none");
      home.classList.remove("d-none");
      loginForm.classList.add("d-none");

      usernameDisplay.textContent = `Welcome, ${data.user.name || "User"}!`;
      localStorage.setItem("userName", data.user.name);
    } else {
      console.error("Login failed:", data.message);
      loginError.textContent = data.message || "Invalid email or password.";
      loginError.classList.remove("d-none");
      loginSucess.classList.replace("d-block", "d-none");
    }
  } catch (error) {
    console.error("Error connecting to the API:", error);
    loginError.textContent = "Connection error. Please try again later.";
    loginError.classList.remove("d-none");
  }
}

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (checkInputsIsValid()) {
    addUser();
  }
});

// async function addUser() {
//   const newUser = {
//     name: signUsername.value,
//     email: signEmail.value,
//     password: signPassword.value,
//   };

//   try {
//     const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newUser),
//     });

//     const data = await response.json();
//     if (response.ok) {
//       console.log("User registered successfully:", data);

//       excisstUser.classList.replace("d-block", "d-none");
//       sucessSign.classList.replace("d-none", "d-block");
//       registerForm.classList.add("d-none");
//       loginForm.classList.remove("d-none");
//     } else {
//       console.error("Registration failed:", data.message);
//       excisstUser.textContent = data.message || "This email already exists.";
//       excisstUser.classList.replace("d-none", "d-block");
//     }
//   } catch (error) {
//     console.error("Error connecting to the API:", error);
//     excisstUser.textContent = "Connection error. Please try again later.";
//     excisstUser.classList.replace("d-none", "d-block");
//   }
// }

async function addUser() {
  const newUser = {
    name: signUsername.value.trim(),
    email: signEmail.value.trim(),
    password: signPassword.value.trim(),
    rePassword: signPassword.value.trim(), // تأكد من تطابق كلمة المرور وإعادة كتابتها
    phone: "01010700701", // أضف رقم الهاتف إذا كان مطلوبًا
  };

  try {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    const data = await response.json();
    console.log("Response Data:", data); // عرض الإجابة للتشخيص
    if (response.ok) {
      excisstUser.classList.replace("d-block", "d-none");
      sucessSign.classList.replace("d-none", "d-block");
      registerForm.classList.add("d-none");
      loginForm.classList.remove("d-none");
    } else {
      console.error("Registration failed:", data.message);
      excisstUser.textContent = data.message || "An error occurred during registration.";
      excisstUser.classList.replace("d-none", "d-block");
    }
  } catch (error) {
    console.error("Error connecting to the API:", error);
    excisstUser.textContent = "Connection error. Please try again later.";
    excisstUser.classList.replace("d-none", "d-block");
  }
}


function validateInput(regex, element, errorMsg) {
  if (regex.test(element.value)) {
    errorMsg.classList.replace("d-block", "d-none");
    return true;
  } else {
    errorMsg.classList.replace("d-none", "d-block");
    return false;
  }
}

function checkInputsIsValid() {
  const isUsernameValid = validateInput(/^[a-zA-Z]{2,}$/, signUsername, registerError);
  const isEmailValid = validateInput(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/,
    signEmail,
    registerErrorEmail
  );
  const isPasswordValid = validateInput(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
    signPassword,
    registerErrorPassward
  );

  return isUsernameValid && isEmailValid && isPasswordValid;
}
