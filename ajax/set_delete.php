<?php
require '../includes/config.php';

$checkbox = trim(filter_var($_POST['checkbox'],FILTER_SANITIZE_STRING));
$checkbox = rtrim($checkbox, ',');
$arr = explode(',', $checkbox);
//$checkbox = array(6, 7);

$error = [];

if (!$arr) {
    $error = 'No users selected';
};

if (!is_array($arr)) {
    $error = 'Not correct id';
};

if ($error != []) {
    $result['error'] = ['code'=> 100, 'message'=> $error];
    $newJSON = json_encode($result);
    echo $newJSON;
    exit();
}

$sql = "DELETE FROM `users` WHERE `users`.`id_user` IN (".implode(',',$arr).")";
    //WHERE id IN
$query = $pdo->query($sql);
//$user = $query->fetch(PDO::FETCH_OBJ);
//echo $sql;


$result['status'] = true;
$result['id'] = $checkbox;

$newJSON = json_encode($result);

echo $newJSON;

