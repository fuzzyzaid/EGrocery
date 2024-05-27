"use strict"

$(document).ready( ()=>{

    $("#about a").click( evt => {
        evt.preventDefault();
        const elem = evt.currentTarget;
        
        if ($(elem).prev().attr("class") == "hide") {  // to check if the above div element has the class hide or not
            $(elem).prev().show();
            $(elem).prev().toggleClass("hide");  // remove the class hide from above div element
            elem.textContent="Read Less";
        }
        else {
            $(elem).prev().hide();
            $(elem).prev().toggleClass("hide");
            elem.textContent="Read More";
        }
 
    });

});