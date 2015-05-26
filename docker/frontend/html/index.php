<?php

session_start();

$serverIp = $_SERVER['SERVER_ADDR'];
$VMIp = $_SERVER['HTTP_HOST'];

include_once 'view.html';