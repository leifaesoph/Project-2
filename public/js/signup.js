$(document).ready(function() {
  // Getting references to our form and input
  // var signUpForm = $("form.signup1");
  var emailInput = $("input#inputEmailSign");
  var passwordInput = $("input#inputPasswordSign");
  var nameInput = $("input#nameInput");
  var phoneInput = $("input#contactInput");


  //DMS UPDATED THIS MONDAY PM -----------------------------------------------------------------
  // When the signup button is clicked, we validate the email and password are not blank
  $(".btnsubmit2").on("click", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      name: nameInput.val().trim(),
      phone: phoneInput.val().trim()
    };
    console.log(userData)

    var promise = $.post("/api/signup", userData);
    
    promise.then(function(data){
        $.post("/api/login", {
          email:  emailInput.val().trim(),
          password: passwordInput.val().trim()

        }).then(function(data) {
            console.log(data);
          window.location.replace("/users");
      //     // If there's an error, log the error
        })
      }, function(err) {
        $('.errormessage').fadeIn(500).fadeOut(1000); 
        // $("").append("error");
        // alert(err.responseText);
      })
  });


  //-----------------------

// $(".btnsubmit2").on("click", function(event) {
//       event.preventDefault();
//       var transData = {
//         email: emailInput.val().trim(),
//         money: moneyInput.val().trim(),
//         date: dateInput.val().trim(),
//         // text: textInput.val().trim()
//       };
//       console.log(transData)

//       var promise = $.post("/api/sendTrans", transData);
    
//       promise.then(function(data){
//           $.post("/api/sendTrans", {
//             email: emailInput.val().trim(),
//         money: moneyInput.val().trim(),
//         date: dateInput.val().trim(),
//         // text: textInput.val().trim()

//           }).then(function(data) {
//               console.log(data);
//             window.location.replace("/users");
//         //     // If there's an error, log the error
//           })
//         }, function(err) {
//           // $('.errormessage').fadeIn(500).fadeOut(1000); 
//           // $("").append("error");
//           alert(err.responseText);
//         })
//     });

});

//-------------------------------------------------------------------------------





  