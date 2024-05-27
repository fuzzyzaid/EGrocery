$(document).ready(function() {
    var isLoggedIn = sessionStorage.getItem("isLoggedIn");
    console.log(typeof(isLoggedIn));

    if (isLoggedIn == "true") {
        $("#signupOrLogout").html('<a href="#" onclick="logout()">Logout</a>');
    } else {
        $("#signupOrLogout").html('<a href="signup.html">Sign Up/Login</a>');
    }
});

function logout() {
    sessionStorage.setItem("isLoggedIn","false");
    window.location.href = "index.html";
}