var user = null;
var loanTransactionNumber = 0;
var totalMoneyLent = 0;
var debtTransactionNumber = 0;
var totalMoneyBorrowed = 0;

$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
  
    $.get("/api/user_data").then(function(data) {
        console.log(data);
        user=data;
      $(".user-name").text(user.name);
    });


    $.get("/api/approve").then(function(data){

      $('#title').html("Please approve the new transaction ");
            $("#message").html("Sended By " + data.lenderName 
            +"\n"+"Amount: "+ data.amount
            +"\n"+"dueDate: "+ data.dueDate
            +"\n"+"message: "+ data.message);

      $("#reject").val(data.id);
      $("#accept").val(data.id);
      $("#modalOpen").on("click", function(event){
        event.preventDefault();
        $('#modal').modal('show');
      });
    });



    $.get("/api/user_loans").then(function(data
      
      ) {
        console.log(data[0].borrowerName, data[0].dueDate, data[0].amount);
        for(var i = 0; i < data.length; i++) {
          loanTransactionNumber++;
          totalMoneyLent += parseFloat(data[i].amount);
          var newDiv = $("<div>");
          newDiv.attr("class", "loanReminddiv")
          $("#UDIV").append(newDiv);

          var newBtn=$("<button>");
          newDiv.append(newBtn);
          newBtn.attr("class", "loanReminder");
          newBtn.attr("value", data[i].id);
          newBtn.text(data[i].borrowerName + " | " + data[i].dueDate + " | " + data[i].amount); 

          newBtn.click(function(){
            $("#overlay-rem").show(500);
          });
        };

        $("#Up").prepend("Loans: " + loanTransactionNumber + " | ");
        $("#Up").prepend("Total: $" + totalMoneyLent + " | ");
    });
    $.get("/api/user_debts").then(function(data) {
        console.log(data);
        console.log(data[0].lenderName, data[0].dueDate, data[0].amount);
        for(var i = 0; i < data.length; i++) {
          debtTransactionNumber++;
          totalMoneyBorrowed += parseFloat(data[i].amount);

          var newDiv2 = $("<div>");
          newDiv2.attr("class", "paybtndiv")
          $("#ODIV").append(newDiv2)

          var newBtn2=$("<button>");
          newDiv2.append(newBtn2);


          newBtn2.attr("class", "debtReminder");
          
          newBtn2.attr("value", data[i].id);
          newBtn2.text(data[i].lenderName + " | " + data[i].dueDate + " | " + data[i].amount); 

          newBtn2.click(function(){
            $("#overlay-pay").show(500);
          });
        };
        $("#Op").append("Debts: " + debtTransactionNumber + " | ");
        $("#Op").append("Total: $" + totalMoneyBorrowed + " | ");
        $("#balanceDisplay").text(totalMoneyLent - totalMoneyBorrowed);
    });



  });

 
  