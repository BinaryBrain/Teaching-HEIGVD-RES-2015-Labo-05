<?php

session_start();

$serverIp = $_SERVER['SERVER_ADDR'];
$VMIp = $_SERVER['SERVER_NAME']; // HTTP_HOST with port

include_once 'view.html';