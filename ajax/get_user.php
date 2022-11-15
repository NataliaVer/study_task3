<?php

require '../includes/config.php';

$id = trim(filter_var($_GET['id_user'], FILTER_SANITIZE_NUMBER_INT));

//var_dump($id);
//$id = 6;

$sql = "SELECT * FROM `users` WHERE `users`.`id_user` = $id";
$query = $pdo->query($sql);
$user = $query->fetch(PDO::FETCH_OBJ);

//var_dump($pdo->errorInfo());

$error = [];

if (empty($id)) {
    $error = 'id empty';
} else if (!$user->id_user) {
     $error = 'This user does not exist';
}

if ($error != []) {
    //echo $error;
    $result['error'] = ['code'=> 100, 'message'=> $error];
    $newJSON = json_encode($result);
    echo $newJSON;
    exit();
}

$userObj->id_user = trim(filter_var($user->id_user, FILTER_SANITIZE_NUMBER_INT));
$userObj->first_name = trim(filter_var($user->first_name, FILTER_SANITIZE_STRING));
$userObj->last_name = trim(filter_var($user->last_name, FILTER_SANITIZE_STRING));
$userObj->status = trim(filter_var($user->status, FILTER_SANITIZE_NUMBER_INT));
$userObj->role = trim(filter_var($user->role, FILTER_SANITIZE_STRING));

$result['status'] = true;
$result['user'] = $userObj;

$newJSON = json_encode($result);

echo $newJSON;


