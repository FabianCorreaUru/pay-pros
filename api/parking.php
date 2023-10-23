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
        $SQL = "SELECT p.Id, p.Floor, p.Place, v.Registration, 
                b.Name AS Brand, m.Name AS Model, C.Name AS Color, C.Style AS Style
                FROM parking p 
                JOIN vehicles v ON p.VehicleId=v.Id 
                JOIN brands b ON v.BrandId=b.Id
                JOIN models m ON v.ModelId=m.Id
                JOIN colors c ON v.ColorId=c.Id
                WHERE Active = 1
                ORDER BY p.Floor ASC, p.Place ASC";
		$Response["data"] = $DB->Query($SQL);
        break;
    case 'POST':
        $Registration = $_POST["Registration"];
        $BrandId = $_POST["BrandId"];
        $ModelId = $_POST["ModelId"];
        $ColorId = $_POST["ColorId"];
        $Floor = $_POST["Floor"];
        $Place = $_POST["Place"];
        $Date = date("Y-m-d H:i:s");

        // First Check If Vehicle Is Register
        $SQL = "SELECT Id FROM `vehicles` WHERE Registration = '$Registration'";
        $Result = $DB->Query($SQL);
        if(isset($Result[0])){
            $VehicleId = $Result[0]["Id"];
        }
        else{
             // Ingress The New Vehicle
            $SQL_VEHICLE = "INSERT INTO `vehicles` (`Registration`,`BrandId`,`ModelId`,`ColorId`) VALUES ('".$Registration."',$BrandId,$ModelId,$ColorId)";
            $VehicleId = $DB->Query($SQL_VEHICLE);
        }

        // Ingress The Parking
        $SQL_PARKING = "INSERT INTO `parking` (`VehicleId`,`Floor`,`Place`,`Active`,`EntryDate`,`ExitDate`) VALUES ($VehicleId,$Floor,$Place,1,'".$Date."',NULL)";
        $Response["data"] = $DB->Query($SQL_PARKING);        
        break;     
}

http_response_code(200);
echo json_encode($Response);
?> 
