$(document).ready(function() {
  
    // Getting infor from the form input
    var loginForm = $("form.login");
    var emailInput = $("input#inputEmailLog");
    var passwordInput = $("input#inputPasswordLog");
    // When the form is submitted, we validate there's an email and password entered
    loginForm.on("submit", function(event) {
      event.preventDefault();
      var userData = {
        email: emailInput.val().trim(),
        password: passwordInput.val().trim()
      };
      //if there is no such email ans pw, will return need to signup
      if (!userData.email || !userData.password) {
        return;
      }
      // If we have an email and password we run the loginUser function and clear the form
      loginUser(userData.email, userData.password);
      emailInput.val("");
      passwordInput.val("");
    });
    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function loginUser(email, password) {
      $.post("/api/login", {
        email: email,
        password: password
      }).then(function(data) {
        window.location.replace(data);
        // change the err function
      }),function(err) {
        console.log(err);
      };
    }
  });