-- Make the email unique in the db (to avoid spamming the db with the same email)

ALTER TABLE `subscriptions` ADD UNIQUE(`email`);
