<?php

require_once __DIR__."/connect.php";

// construct a request to check if the email is already present in the db
$query = "SELECT * FROM `subscriptions` WHERE email = (:mail)";
$stmt = $db->prepare($query);

// get the return result (fetchObject return false on failure)
$stmt->execute(array("mail" => $_POST['email']));
$result = $stmt->fetchObject();

// check the result, if it's false, the email is not already in the database, so we can add it
if (!$result) {
   // construct the request for email insertion
   $query = "INSERT INTO subscriptions (email) VALUES (:mail)";
   $stmt = $db->prepare($query);

   // execute the request and test the result
   if ($stmt->execute(array("mail" => $_POST['email']))) {
      $message = "Ton email a bien été enregistré. Merci de ton inscription.";
   } else {
      $message = "Erreur lors de l'enregistrement";
   }
} else {
   $message = "Ton email a déjà été enregistré.";
}

echo json_encode(array("message" => $message));

?>