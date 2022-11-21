<?php
require '../includes/config.php';

$not_exist_id = 0;

if ($_SERVER['REQUEST_METHOD'] != "POST") {
    $error = 'It`s not POST request';
    //21.11.2022 замінено на функцію, був зайвий else
    showError($error);
}

$checkbox = trim(filter_var($_POST['checkbox'],FILTER_SANITIZE_STRING));
$status = trim(filter_var($_POST['status'], FILTER_SANITIZE_NUMBER_INT));
$checkbox = rtrim($checkbox, ',');
$arr = explode(',', $checkbox);
//$checkbox = array(6, 7);
//$status = 1;

//21.11.2022 умову піднято вище
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

$sql = "SELECT `id_user` FROM `users` WHERE `users`.`id_user` IN (".$checkbox.")";
$query = $pdo->query($sql);
//$query->execute(['id_user' => $id_user]);
$users = $query->fetchAll();

foreach ($users as $userid) {
    if (in_array($userid['id_user'], $arr)) {
        $not_exist_id += 1;
    }
}

if ($not_exist_id<count($arr)) {
    $error = 'The selected user does not exist';
    //21.11.2022 замінено на функцію
    showError($error);
}

$sql = "UPDATE `users` SET `status` = $status WHERE `users`.`id_user` IN (".implode(',',$arr).")";
    //WHERE id IN
$query = $pdo->query($sql);
//$user = $query->fetch(PDO::FETCH_OBJ);
//echo $sql;


$result['status'] = true;
$result['id'] = $checkbox;

$newJSON = json_encode($result);

echo $newJSON;

