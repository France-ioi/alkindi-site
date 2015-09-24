function changeMenuStyle(name) {
      $(".menu tr td").removeClass("current-menu-item");
      $(".link" + name).addClass("current-menu-item");
}

// This function used a regexp to check the syntax of an email
function isEmailValid(email) {
   var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
   return re.test(email);
}

// Function called when the user click the subscribe button
function saveEmail() {
   // get the email typed in the text box
   var email = $("#emailInputTextBox").val();

   // check the validity of the email
   if (isEmailValid(email)) {
      $.ajax({
         type: "POST",
         url: "email.php",
         data: { email: email },
         dataType: "json",
         timeout: 30000,
         success: function(result) {
            $("#SubscriptionResultMessage").html(result.message);
         },
         error: function(request, status, err) {
            $("#SubscriptionResultMessage").html(err.message);
         }
      });
   } else {
      $("#SubscriptionResultMessage").html("Format d'email incorrect");
   }
}
