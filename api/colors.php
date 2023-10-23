<?php

include_once "../dao/DBManager.php"; 
$DB = DBManager::getInstance();
$Response = array();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: access");
header('Access-Control-Allow-Methods: PUT, GET, POST');
header('Content-Type: application/json');

switch($_SERVER['REQUEST_METHOD']){
    case 'GET':
        $SQL = "SELECT * FROM `colors` ORDER BY Name ASC";
		$Response["data"] = $DB->Query($SQL);
        break;
    case 'POST':
		$SQL = "INSERT INTO `colors` (`Name`,`Style`) VALUES ('".$_POST["Name"]."','".$_POST["Style"]."')";
		$Response["data"] = $DB->Query($SQL);
        break;
}

http_response_code(200);
echo json_encode($Response);
?> 
