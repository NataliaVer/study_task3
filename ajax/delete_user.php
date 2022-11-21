<?php

require '../includes/config.php';

if ($_SERVER['REQUEST_METHOD'] != "POST") {
    $error = 'It`s not POST request';
    //21.11.2022 замінено на функцію, був зайвий else
    showError($error);
}

$id_user = trim(filter_var($_POST['id_user'], FILTER_SANITIZE_NUMBER_INT));

//id_user = 9;
if (empty($id_user)) {
    $error = 'id empty';
    //21.11.2022 замінено на функцію
    showError($error);
}


$sql = 'SELECT * FROM `users` WHERE `users`.`id_user` = :id_user';
$query = $pdo->prepare($sql);
$query->execute(['id_user' => $id_user]);
$user = $query->fetch(PDO::FETCH_OBJ);

if (!$user->id_user) {
    $error = 'Such a user does not exist or has already been deleted';
    //21.11.2022 замінено на функцію
    showError($error);
}

$sql = 'DELETE FROM `users` WHERE `users`.`id_user`=:id_user';
$query = $pdo->prepare($sql);
$query->execute(['id_user' => $id_user]);
//$user = $query->fetch(PDO::FETCH_OBJ);

$result['status'] = true;
$result['id'] = $id_user;

$newJSON = json_encode($result);

echo $newJSON;