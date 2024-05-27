$(document).ready( () => {

    if(sessionStorage.getItem("isLoggedIn") == null){ // To check if user is coming back after creating or login

      sessionStorage.setItem("isLoggedIn","false"); // setting the logged in value as false initially
  
      let users=[];
      users.push({ "username":"abc@gmail.com","password":"JS123456"}) 
      sessionStorage.setItem("Users",JSON.stringify(users));  // storing a default user in the local storage.

    }
    
    $(".add_to_cart_btn").click(evt=>{
      let isValid = true;
      let quantityInput = $(evt.currentTarget).closest('.product-description').find('.qty'); // Get the quantity input related to the clicked button
      let quantityentered = Number(quantityInput.val());
      console.log("Quantity Entered "+quantityentered);
     
      if(isNaN(quantityentered)){
        quantityInput.next().text("Please enter a number");
          isValid = false;
      }
     else if ( quantityentered <= 0) {
        quantityInput.next().text("Quantity must be greater than 0");
          isValid = false;
      }else if (  quantityentered % 1 !== 0 ) {
        quantityInput.next().text("Quantity cannot be in decimal");
        isValid = false;
    } else if (quantityentered > 20) {
      quantityInput.next().text("Maximum quantity allowed is 20");
      isValid = false;
   } 
      else {
        quantityInput.next().text("");
      }

      if(isValid){

      let items_added_list=[];
      let items_obj;

      if(evt.currentTarget.baseURI === "http://127.0.0.1:5500/products.html"){ // if items are added from products page
      let product_priceNew= evt.currentTarget.parentNode.parentNode.childNodes[1].innerHTML;
      let quantityNew= evt.currentTarget.parentNode.parentNode.childNodes[3].childNodes[3].value;
      let productNameNew= evt.currentTarget.parentNode.parentNode.parentNode.children[5].innerHTML;
      evt.currentTarget.setAttribute("disabled",true);
      console.log("from products page" +quantityNew);

      items_obj={
        "Name":productNameNew,
        "Quantity":Number(quantityNew),
        "Price":product_priceNew 
      }
      console.log("products page" +items_obj);

      }
      else{ // if items are added from home page
        let product_price= evt.currentTarget.offsetParent.childNodes[3].children[6].children[0].innerHTML;
        let quantity=evt.currentTarget.offsetParent.childNodes[3].children[6].children[1].children[1].value;
        let productName=evt.currentTarget.offsetParent.childNodes[3].children[5].innerHTML;
        evt.currentTarget.setAttribute("disabled",true);
        console.log("home page" +quantity);


        items_obj={
          "Name":productName,
          "Quantity":Number(quantity),
          "Price":product_price 
        }
        console.log("home page" +items_obj);
      }
      

      if(sessionStorage.getItem("Cart Items") == null || sessionStorage.getItem("Cart Items") == "null" ){ // If we land on home page at the starting
      
        items_added_list.push(items_obj);
        sessionStorage.setItem("Cart Items",JSON.stringify(items_added_list));
      }

      else{ // when comes back after adding items to add more
        let added_item_list=JSON.parse(sessionStorage.getItem("Cart Items"));
        let isItemAlreadyAdded = false;
        for (let i = 0; i < added_item_list.length; i++) {
          if (added_item_list[i].Name === items_obj.Name) {
            let totalQuantity = Number(added_item_list[i].Quantity) + Number(quantityentered);
              if (totalQuantity <= 20) {
                  added_item_list[i].Quantity = totalQuantity;
              } else {
                  added_item_list[i].Quantity = 20;
              } 
              isItemAlreadyAdded = true;
              break;  
          }
         
      }
          if (!isItemAlreadyAdded) {
            added_item_list.push(items_obj);
          }
        sessionStorage.setItem("Cart Items",JSON.stringify(added_item_list));
      }
    }
      });
      
   

      $(".slider").bxSlider({
          auto: true,
          autoControls: true,
          captions: true,
          minSlides: 1,
          maxSlides: 1,
          slideWidth: 850,
          slideMargin: 10
        }),

      $("#tabs").tabs()

})