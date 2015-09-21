<?php

$config = (object) array(
   "db" => (object) array(
      "host" => "127.0.0.1",
      "database" => "alkindi",
      "user" => "",
      "password" => "",
      "logged" => false
   ),
   "aws" => (object) array(
      "key" => "",
      "secret" => "",
      "region" => "",
      "dynamoSessions" => false
   )
);

if (is_readable(__DIR__.'/config_local.php')) {
   include_once __DIR__.'/config_local.php';
}
