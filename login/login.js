
document.getElementById('email').addEventListener('input', onChangeEmail);
document.getElementById('password').addEventListener('input', onChangePassword);


function onChangeEmail() {
   toggleButtonDisable();
   toggleEmailErrors();
}

function onChangePassword(){
    toggleButtonDisable();
    togglePasswordErrors();
}

function isEmailValid() {
    const email = document.getElementById("email").value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

function toggleEmailErrors(){
    const email = document.getElementById('email').value;
    if (!email){
        document.getElementById('email-required-error').style.display = "block";
    }else{
        document.getElementById('email-required-error').style.display = "none";
    }

    if (validateEmail(email)){
        document.getElementById('email-invalid-error').style.display = "none";
    }else{
        document.getElementById('email-invalid-error').style.display = "block";
    }
}

function togglePasswordErrors(){
    const password = document.getElementById('password').value;
    if(!password){
        document.getElementById('password-required-error').style.display = "block"
    }else{
        document.getElementById('password-required-error').style.display = "none";
    }
}

function toggleButtonDisable(){
    const emailValid = isEmailValid();
    document.getElementById('login').disabled = !emailValid;

    const passwordValid = isPasswordValid();
    document.getElementById('login').disabled = !emailValid || !passwordValid;
}

function isPasswordValid() {
    const password = document.getElementById('password').value;
    if (!password) {
        return false;
    }
    return true;
}

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}



function register(){
    window.location.href="cadastro/index.html";
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Send a request to the server to authenticate the user's email and password
  fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      // If the user is authenticated, redirect them to the home page
      if (data.authenticated) {
        window.location.href = "pages.login/home/home.html";
      } else {
        // If the user is not authenticated, display an error message
        alert("Invalid email or password");
      }
    })
    .catch((error) => {
      console.error("Error authenticating user:", error);
      alert("An error occurred while logging in. Please try again later.");
    });
}


