<?php
// Turn off error reporting
//error_reporting(0);

$result = [];
$result['status'] = false;
$result['error'] = null;

$user = 'root';
$pass = 'root';
$db = 'user_task3';
$host = 'localhost';

$dsn = 'mysql:host=' . $host . ';dbname=' . $db;
$pdo = new PDO($dsn, $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);