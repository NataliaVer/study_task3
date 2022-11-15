<?php

require '../includes/config.php';
$error = [];

if ($_SERVER['REQUEST_METHOD'] != "POST") {
    $error = 'It`s not POST request';
} else {

$id_user = trim(filter_var($_POST['id_user'], FILTER_SANITIZE_NUMBER_INT));

//id_user = 9;


$sql = 'SELECT * FROM `users` WHERE `users`.`id_user` = :id_user';
$query = $pdo->prepare($sql);
$query->execute(['id_user' => $id_user]);
$user = $query->fetch(PDO::FETCH_OBJ);

if (empty($id_user)) {
    $error = 'id empty';
} else if (!$user->id_user) {
    $error = 'Such a user does not exist or has already been deleted';
}
}

if ($error != []) {
    $result['error'] = ['code'=> 100, 'message'=> $error];
    $newJSON = json_encode($result);
    echo $newJSON;
    exit();
}

$sql = 'DELETE FROM `users` WHERE `users`.`id_user`=:id_user';
$query = $pdo->prepare($sql);
$query->execute(['id_user' => $id_user]);
//$user = $query->fetch(PDO::FETCH_OBJ);

$result['status'] = true;
$result['id'] = $id_user;

$newJSON = json_encode($result);

echo $newJSON;