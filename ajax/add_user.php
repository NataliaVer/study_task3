<?php

require_once '../includes/config.php';

if ($_SERVER['REQUEST_METHOD'] != "POST") {
    $error = 'It`s not POST request';
    //21.11.2022 замінено на функцію, був зайвий else
    showError($error);
}

$id_user = trim(filter_var($_POST['id_user'], FILTER_SANITIZE_NUMBER_INT));
$first_name = trim(filter_var($_POST['first_name'], FILTER_SANITIZE_STRING));
$last_name = trim(filter_var($_POST['last_name'], FILTER_SANITIZE_STRING));
$status = trim(filter_var($_POST['status'], FILTER_SANITIZE_NUMBER_INT));
$role = trim(filter_var($_POST['role'], FILTER_SANITIZE_STRING));

// $first_name = 'test_n';
// $last_name = 'test_n';
// $status = '0';
// $role = 'User';

//21.11.2022 умову піднято вище
if ($first_name == null || $last_name == null) {
    $error = 'Please enter first name or last name';
} else if (strlen($first_name) <= 3) {
    $error = 'Enter the first name must be more than three characters';
} else if (strlen($last_name) <= 3) {
    $error = 'Enter the last name must be more than three characters';
} else if (!$role) {
    $error = 'Please enter role';
}
//21.11.2022 замінено на функцію
if ($error != []) {
    showError($error);
}

$sql = 'SELECT `first_name`, `last_name` FROM `users` WHERE `first_name` = :first_name || `last_name` = :last_name';
$query = $pdo->prepare($sql);
$query->execute(['first_name' => $first_name, 'last_name' => $last_name]);

$user = $query->fetch(PDO::FETCH_OBJ);

if ($user->first_name == $first_name && $user->last_name == $last_name) {
    $error = 'This first name and last name are already registered';
    //21.11.2022 замінено на функцію
    showError($error);
}

$sql = 'INSERT INTO `users` (`id_user`, `first_name`, `last_name`, `status`, `role`) VALUES (?, ?, ?, ?, ?)';
$query = $pdo->prepare($sql);
$query->execute([$id_user, $first_name, $last_name, $status, $role]);

$result['status'] = true;
$result['id_user'] = $id_user;

$newJSON = json_encode($result);

echo $newJSON;