var user = null;

$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
  
    $.get("/api/user_data").then(function(data) {
        console.log(data);
        user=data;
      $(".user-name").text(data.name);
      
      user = data;

    });
    $.get("/api/user_loans").then(function(data) {
        console.log(data);
      $(".UDIV").text(data);
    });
    $.get("/api/user_debts").then(function(data) {
        console.log(data);
      $(".ODIV").text(data);
    });
  });
  