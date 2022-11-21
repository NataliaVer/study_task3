<?php
// Turn off error reporting
//error_reporting(0);
//21.11.2022 додано функцію для виводу помилок
function showError($text) {
    $result['error'] = ['code'=> 100, 'message'=> $text];
    $newJSON = json_encode($result);
    echo $newJSON;
    exit();
}

$error = [];

$result = [];
$result['status'] = false;
$result['error'] = null;

$user = 'root';
$pass = 'root';
$db = 'user_task3';
$host = 'localhost';

$dsn = 'mysql:host=' . $host . ';dbname=' . $db;
$pdo = new PDO($dsn, $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);