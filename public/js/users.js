var user = null;
var loanTransactionNumber = 0;
var totalMoneyLent = 0;
var debtTransactionNumber = 0;
var totalMoneyBorrowed = 0;
var transactionId;


$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    console.log(data);
    user = data;
    $(".user-name").text(user.name);
  });

  $.get("/api/approve").then(function (data) {
    $('#title').html("Please approve the new transaction ");
    $("#message").html("Sent by " + data.lenderName
      + "\n" + "Amount: " + data.amount
      + "\n" + "dueDate: " + data.dueDate
      + "\n" + "message: " + data.message);
    $("#reject").val(data.id);
    $("#accept").val(data.id);
    $('.notificationdiv1').fadeIn(500);
  });

  //add the req for check the pending trans
  $.get("/api/payNotice").then(function (data) {
    $('#paytitle').html("Please receive the payment ");
    $("#paymessage").html("Sent by " + data.borrowerName
      + "\n" + "Amount: " + data.amount);
    $("#payreject").val(data.id);
    $("#payaccept").val(data.id);
    $('.notificationdiv2').fadeIn(500);
  });

//the req to find the all the loan transaction
  $.get("/api/user_loans").then(function (data) {
    console.log(data[0].borrowerName, data[1].payDate, data[0].amount);
    for (let i = 0; i < data.length; i++) {
      //show all the unpaid trans here 
      if (!data[i].payDate) {
        loanTransactionNumber++;
        totalMoneyLent += parseFloat(data[i].amount);
        var newDiv = $("<div>");
        newDiv.attr("class", "loanReminddiv")
        $("#UDIV").append(newDiv);
        var newBtn = $("<button>");
        newDiv.append(newBtn);
        newBtn.attr("class", "loanReminder");
        newBtn.attr("value", data[i].id);
        newBtn.text(data[i].borrowerName + " | " + data[i].dueDate + " | " + data[i].amount);
        newBtn.click(function () {
          console.log($(this).val())
          var loanTransId = $(this).val();
          $('#rembtnid').val(loanTransId);
          $("#overlay-rem").show(500);
          let borrowerId = data[i].borrowerId

          $.ajax({
            url: "/api/borrower_id",
            method: "GET",
            data: { id: borrowerId }
          }).then(function (data) {
            let email = data.email
            //SET A VALUE FOR THIS EMAIL
            $('#remindborrower').val(email);
          });
          
            $("#rembtnid").on("click", function (event) {
              event.preventDefault();
              $.ajax({
                url: "/api/reminder",
                method: "GET",
                data: { id: loanTransId }
              }).then(data => {
                  window.location.href = '/users';
                  }
              )
          });

        });
      }
      else {
        var newDiv = $("<div>");
        newDiv.attr("class", "paymentstoyou")
        $("#paymentstoyouid").append(newDiv);
        var newBtn = $("<button>");
        newDiv.append(newBtn);
        newBtn.attr("class", "paymentstoyoubtn");
        newBtn.attr("value", data[i].id);
        newBtn.text(data[i].borrowerName + " | " + data[i].payDate + " | " + data[i].amount);
      };


    };
    $("#Up").append("Loans: " + loanTransactionNumber + " | ");
    $("#Up").append("Total: $" + totalMoneyLent + " | ");
  });

  //req to get all the debts trans
  $.get("/api/user_debts").then(function (data) {
    // console.log(data);
    // console.log(data[0].lenderName, data[0].dueDate, data[0].payDate);
    //unpaid debts trans
    for (let i = 0; i < data.length; i++) {
      if (!data[i].payDate) {
        debtTransactionNumber++;
        totalMoneyBorrowed += parseFloat(data[i].amount);
        //TODO: reference the user email from the data[i] and store it in a variable
        var newDiv2 = $("<div>");
        newDiv2.attr("class", "paybtndiv")
        $("#ODIV").append(newDiv2);
        var newBtn2 = $("<button>");
        newDiv2.append(newBtn2);
        newBtn2.attr("class", "debtReminder");
        newBtn2.attr("value", data[i].id);
        newBtn2.text(data[i].lenderName + " | " + data[i].dueDate + " | " + data[i].amount);
        newBtn2.click(function () {
          console.log($(this).val())
          var debtTransId = $(this).val();
          $('#paybtnid').val(debtTransId);
          $("#overlay-pay").show(500);
          let lenderId = data[i].lenderId

          $.ajax({
            url: "/api/lender_id",
            method: "GET",
            data: { id: lenderId }
          }).then(function (data) {
            let email = data.email
            //SET A VALUE FOR THIS EMAIL
            $('#lendersemailid').val(email);
          });

        });
      }
      //paid dents trans
      else {
        var newDiv2 = $("<div>");
        newDiv2.attr("class", "paymentsyoumade")
        $("#paymentsyoumadeid").append(newDiv2)
        var newBtn2 = $("<button>");
        newDiv2.append(newBtn2);
        newBtn2.attr("class", "paymentsyoumadebtn");
        newBtn2.attr("value", data[i].id);
        newBtn2.text(data[i].lenderName + " | " + data[i].payDate + " | " + data[i].amount);
      };
    };
    $("#Op").append("Debts: " + debtTransactionNumber + " | ");
    $("#Op").append("Total: $" + totalMoneyBorrowed + " | ");
    $("#balanceDisplay").text(totalMoneyLent - totalMoneyBorrowed);
  });
});