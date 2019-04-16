$(document).ready(function () {
  // Getting references to our form and input
  // var signUpForm = $("form.signup1");
  var emailInput = $("input#inputEmailSign");
  var passwordInput = $("input#inputPasswordSign");
  var nameInput = $("input#nameInput");
  var phoneInput = $("input#contactInput");

  // When the signup button is clicked, we validate the email and password are not blank
  $(".btnsubmit2").on("click", function (event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      name: nameInput.val().trim(),
      phone: phoneInput.val().trim()
    };
    // console.log(userData);
    // if (userData.includes("")) {
    //   return;
    // }
    $.ajax({
      url: "/api/signup",
      method: "POST",
      data: userData
    }).then(function (data) {
      console.log(data);
      window.location.replace(data);
      // If there's an error, log the error
    }, function (err) {
      console.log(err);
    });
  })
});