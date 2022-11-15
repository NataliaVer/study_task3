<?php
require '../includes/config.php';

$id_user = trim(filter_var($_POST['id_user'], FILTER_SANITIZE_NUMBER_INT));
$first_name = trim(filter_var($_POST['first_name'], FILTER_SANITIZE_STRING));
$last_name = trim(filter_var($_POST['last_name'], FILTER_SANITIZE_STRING));
$status = trim(filter_var($_POST['status'], FILTER_SANITIZE_NUMBER_INT));
$role = trim(filter_var($_POST['role'], FILTER_SANITIZE_STRING));

// $id_user = 6;
// $first_name = 'test_n';
// $last_name = 'test_n';
// $status = '0';
// $role = 'User';

$sql = 'SELECT `first_name`, `last_name` FROM `users` WHERE `users`.`first_name` = :first_name AND `users`.`last_name` = :last_name';
$query = $pdo->prepare($sql);
$query->execute(['first_name' => $first_name, 'last_name' => $last_name]);
$user = $query->fetch(PDO::FETCH_OBJ);

$error = [];

if (empty($id_user)) {
    $error = 'id empty';
//} else if (!$user->id_user == $id_user) {
//    $error = 'This id not property for
//     this user';
} else if ($first_name == null || $last_name == null) {
    $error = 'Please enter first name or last name';
} else if ($user->first_name == $first_name && $user->last_name == $last_name) {
    $error = 'This first name and last name are already registered';
} else if (strlen($first_name) <= 3) {
    $error = 'Enter the first name must be more than three characters';
} else if (strlen($last_name) <= 3) {
    $error = 'Enter the last name must be more than three characters';
} else if (!$role) {
    $error = 'Please enter role';
}

if ($error != []) {
    $result['error'] = ['code'=> 100, 'message'=> $error];
    $newJSON = json_encode($result);
    echo $newJSON;
    exit();
}


$sql = 'UPDATE `users` SET `first_name` = :first_name, `last_name` = :last_name, `status` = :status, `role` = :role WHERE `id_user` =:id';

$query = $pdo->prepare($sql);
$query->execute(['id' => $id_user, 'first_name' => $first_name, 'last_name' => $last_name, 'status' => $status, 'role' => $role]);
//$user = $query->fetch(PDO::FETCH_OBJ);

$result['status'] = true;
$result['id'] = $id_user;


$newJSON = json_encode($result);

echo $newJSON;

?>


