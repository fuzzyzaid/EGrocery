"use strict";

$(document).ready( () => {

    let username;
    let user_password;

    $("#first_name").focus();

    
    $("#sign_up").submit( event => { // for checking the form credentials
        let isValid = true;

         const firstName = $("#first_name").val().trim();
         if (firstName == "") {
             $("#first_name").next().text("First Name is required.");
             isValid = false;
         } else {
             $("#first_name").next().text("");
         }
         $("#first_name").val(firstName);


        const lastName = $("#last_name").val().trim();
        if (lastName == "") {
            $("#last_name").next().text("Last Name is required.");
            isValid = false;
        } else {
            $("#last_name").next().text("");
        }
        $("#last_name").val(lastName);


          const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
          const phone = $("#phone").val().trim();
          if (phone == "") { 
              $("#phone").next().text("Phone Number is required.");
              isValid = false; 
          } else if ( !phonePattern.test(phone) ) {
              $("#phone").next().text("Use 999-999-9999 format.");
              isValid = false;
          } else {
              $("#phone").next().text("");
          }
          $("#phone").val(phone);


        const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;
        const email = $("#email").val().trim();
        if (email == "") { 
            $("#email").next().text("Email is required.");
            isValid = false;
        } else if ( !emailPattern.test(email) ) {
            $("#email").next().text("Must be a valid email address.");
            isValid = false;
        } else {
            $("#email").next().text("");
        }
        $("#email").val(email);
        username=email;


           

        const password = $("#password").val().trim();
        if ( password.length < 8) {
            $("#password").next().text("Must be 8 or more characters.");
            isValid = false;
        } else {
            $("#password").next().text("");
        }
        $("#password").val(password);
        
        const verify = $("#verify").val().trim();
        if (verify == "") { 
            $("#verify").next().text("Password is required.");
            isValid = false; 
        } else if (verify !== password) { 
            $("#verify").next().text("Passowrd didn't matched");
            isValid = false;
        } else {
            $("#verify").next().text("");
        }
        $("#verify").val(verify);
        user_password=verify;


        if (isValid) {
            let users=JSON.parse(sessionStorage.getItem("Users"));
            users.push({ "username":username,"password":user_password}); 
            sessionStorage.setItem("Users",JSON.stringify(users));  // storing a default user in the local storage.
            console.log(sessionStorage.getItem("Users"));
        }
                 
        if (isValid == false) {
            event.preventDefault();                
        }
    });

});