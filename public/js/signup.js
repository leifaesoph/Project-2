$(document).ready(function() {
  // Getting the data form  input
  var emailInput = $("input#inputEmailSign");
  var passwordInput = $("input#inputPasswordSign");
  var nameInput = $("input#nameInput");
  var phoneInput = $("input#contactInput");
  
  // When the signup button is clicked, we validate the email and password are not blank
  $(".btnsubmit2").on("click", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      name: nameInput.val().trim(),
      phone: phoneInput.val().trim()
    };
    // console.log(userData)
    var promise = $.post("/api/signup", userData);
    promise.then(function(data){
      //after submit the form will go to the login and then go to the user page
        $.post("/api/login", {
          email:  emailInput.val().trim(),
          password: passwordInput.val().trim()
        }).then(function(data) {
            console.log(data);
          window.location.replace("/users");
        })
      }, function(err) {
        $('.errormessage').fadeIn(500).fadeOut(1000); 
      })
  });
});





  