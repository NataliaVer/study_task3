<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '../includes/config.php';

$checkbox = $_POST['checkbox'];
$status = trim(filter_var($_POST['status'], FILTER_SANITIZE_NUMBER_INT));
//$checkbox = array(6, 7);
//$status = 1;

$error = [];

if (!$checkbox) {
    $error = 'No users selected';
};

if (!is_array($checkbox)) {
    $error = 'Not correct id';
};

if ($error != []) {
    $result['error'] = ['code'=> 100, 'message'=> $error];
    $newJSON = json_encode($result);
    echo $newJSON;
    exit();
}

$sql = "UPDATE `users` SET `status` = $status WHERE `users`.`id_user` IN (".implode(',',$checkbox).")";
    //WHERE id IN
$query = $pdo->query($sql);
//$user = $query->fetch(PDO::FETCH_OBJ);
//echo $sql;


$result['status'] = true;
$result['id'] = $checkbox;

$newJSON = json_encode($result);

echo $newJSON;

