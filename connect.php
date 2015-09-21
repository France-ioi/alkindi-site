<?php

use Aws\DynamoDb\DynamoDbClient;
use Aws\DynamoDb\Session\SessionHandler;
require_once __DIR__.'/config.php';

function connect($config) {
   try {
      $pdo_options[PDO::ATTR_ERRMODE] = PDO::ERRMODE_EXCEPTION;
      $pdo_options[PDO::MYSQL_ATTR_INIT_COMMAND] = "SET NAMES utf8";
      $connexionString = "mysql:host=".$config->db->host.";dbname=".$config->db->database;
      if ($config->db->logged) {
         $db = new LoggedPDO($connexionString, $config->db->user, $config->db->password, $pdo_options);
      } else {
         $db = new PDO($connexionString, $config->db->user, $config->db->password, $pdo_options);
      }
   } catch (Exception $e) {
      die("Erreur : " . $e->getMessage());
   }
   return $db;
}

function initSession($config) {
   if ($config->aws->dynamoSessions == true) {
      initSessionDynamoDB($config);
   }
   session_name('contest2');
   if (isset($_POST["SID"]) && ($_POST["SID"] != "null")) {
      session_id($_POST["SID"]);
   }
   session_start();
   if (!isset($_SESSION['CREATED'])) {
       $_SESSION['CREATED'] = time();
   } else if (time() - $_SESSION['CREATED'] > 3600) {
      restartSession();
   }
}

function restartSession() {
   if (isset($_SESSION)) {
      session_destroy();
      session_unset();
   }
   session_start();
   $_SESSION['CREATED'] = time();  // update creation time
}

initSession($config);
$db = connect($config);


?>
