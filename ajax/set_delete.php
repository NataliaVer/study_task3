<?php
require '../includes/config.php';

if ($_SERVER['REQUEST_METHOD'] != "POST") {
    $error = 'It`s not POST request';
    //21.11.2022 замінено на функцію, був зайвий else
    showError($error);
}

$checkbox = trim(filter_var($_POST['checkbox'],FILTER_SANITIZE_STRING));
$checkbox = rtrim($checkbox, ',');
$arr = explode(',', $checkbox);
//$checkbox = array(6, 7);

if (!$arr) {
    $error = 'No users selected';
};

if (!is_array($arr)) {
    $error = 'Not correct id';
};

if ($error != []) {
    //21.11.2022 замінено на функцію
    showError($error);
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

