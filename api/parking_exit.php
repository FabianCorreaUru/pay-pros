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
    case 'POST':
        $ParkingId = $_POST["ParkingId"];
        $Date = date("Y-m-d H:i:s");        
        $SQL = "UPDATE `parking` SET Active = 0, ExitDate = '".$Date."' WHERE Id = $ParkingId";
        $Response["data"] = $DB->Query($SQL);  
        break;   
}

http_response_code(200);
echo json_encode($Response);
?> 
