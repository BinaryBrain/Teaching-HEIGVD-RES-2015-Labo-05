<?php

session_start();

$serverIp = $_SERVER['SERVER_ADDR'];
$VMIp = $_SERVER['SERVER_NAME']; // HTTP_HOST with port

function prettyPrint(array $arr) {
	return json_encode($arr, JSON_PRETTY_PRINT);
}

include_once 'view.html';