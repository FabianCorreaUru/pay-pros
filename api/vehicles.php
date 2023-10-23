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
        $SQL = "SELECT * FROM `vehicles` WHERE `Registration` = '".$_GET["Registration"]."'";
        $Result = $DB->Query($SQL);
        if(isset($Result[0])){
            $Response["data"] = $Result[0];
        }
        break;
}

http_response_code(200);
echo json_encode($Response);
?> 
