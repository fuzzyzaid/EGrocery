"use strict"
const $ = selector => document.querySelector(selector);

document.addEventListener("DOMContentLoaded", () => {

   let added_item_list=JSON.parse(sessionStorage.getItem("Cart Items"));
   let total_cost;

   if(added_item_list){
      let table = document.querySelector("table");
      let data = Object.keys(added_item_list[0]);
      total_cost=calculate_total_cost(added_item_list);
      generate_tableHead(table, data); // to generate the table and data cells
      generate_table(table, added_item_list);
      document.getElementById("total_cost").textContent=`Total Cost = $ ${total_cost}`;
      $("#place_order").style.visibility="visible"; // to make the place order button vissible
      $("#no_items").style.visibility="hidden"; // to hide the no items heading
     }


    function generate_tableHead(table, data) {
      let thead = table.createTHead();
      let row = thead.insertRow();
      for (let key of data) {
          let th = document.createElement("th");
          let text = document.createTextNode(key);
          th.appendChild(text);
          row.appendChild(th);
        }
    }
  
    function generate_table(table, added_item_list) {
      for (let element of added_item_list) {
        let row = table.insertRow();
        for (let key in element) {
          let cell = row.insertCell();
          let text = document.createTextNode(element[key]);
          cell.appendChild(text);
        }
      }
    }

    function calculate_total_cost(item_list){
      let sum=0;
          for(let item in item_list){
            sum+=item_list[item].Quantity * Number(item_list[item].Price.replace('$',''))  // to convert $price into number
          }
          return sum.toFixed(2);
    }


  
    $("#place_order").addEventListener("click", ()=>{ // event oto take place when place order button is clicked
      if(sessionStorage.getItem("isLoggedIn") == "false"){
        sessionStorage.setItem("placed_order",true)
        location.replace("login.html");
      }
      else if(sessionStorage.getItem("isLoggedIn") == "true" && sessionStorage.getItem("Cart Items") != null){
        sessionStorage.setItem("placed_order",false);  // to reset the items ordered and boolean value
        sessionStorage.setItem("Cart Items",null);
        location.replace("orderPlaced.html");
      }
    });
        
});