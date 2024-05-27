"use strict"


$(document).ready( () => {

    $("#username").focus();

    let isFromCartPage=false;
    if(sessionStorage.getItem("placed_order") == "true"){ // If we have been re-directed from Cart Page
        $("#placing_order").append("<span>You have to Login before placing order</span>");
        isFromCartPage=true;
    }

    $("#log_in").submit( event => {
        event.preventDefault(); // Prevent the default form submission behavior initially

        const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
        const email = $("#username").val().trim();
        if (email == "") { 
            $("#username").next().text("Username is required.");
            isValid = false;
        } else if ( !emailPattern.test(email) ) {
            $("#username").next().text("Must be a valid email address.");
            isValid = false;
        } else {
            $("#username").next().text("");
        }
        $("#username").val(email);

        const passwordentered = $("#password").val().trim();
         if (passwordentered == "") {
             $("#password").next().text("Password is required.");
             isValid = false;
         } else {
             $("#password").next().text("");
         }
         $("#password").val(passwordentered);
        
        const username = $("#username").val().trim();
        const password = $("#password").val().trim();
        
        let users = JSON.parse(sessionStorage.getItem("Users"));
        let isValid = false; // Set isValid flag initially to false
        
        if (users) { // Check if users data exists in sessionStorage
            users.forEach(user => {
                if (user.username === username && user.password === password) {
                    isValid = true; // Set isValid flag to true if valid credentials are found
                }
            });
        }

        if (isValid) {
            sessionStorage.setItem("isLoggedIn", true);
            if (isFromCartPage) {
                sessionStorage.setItem("placed_order", false);
                sessionStorage.setItem("Cart Items", null);
                location.replace("orderPlaced.html");
            } else {
                location.replace("index.html");
            }
        } else {
            $("#errors span").remove();
            $("#errors").append("<span  id='errormsg'>Invalid Credentials</span>");
            $("#username").focus();
        }
    });

});