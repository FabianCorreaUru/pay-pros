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
        $SQL = "SELECT * FROM `brands` ORDER BY Name ASC";
		$Brands = $DB->Query($SQL);
        $Qty = count($Brands);
        $LogoDir = "../img/brands/";
        for($i=0;$i<$Qty;$i++){ 
            $Logo = $Brands[$i]["Name"].".png";
            if(file_exists("../img/brands/$Logo")){
               $Logo = "./img/brands/$Logo"; 
            } 
            else $Logo = "./img/brands/Default.png"; 
            $Brands[$i]["Logo"] = $Logo;
        }       
        $Response["data"] = $Brands;
        break;
    case 'POST':
		$SQL = "INSERT INTO `brands` (`Name`) VALUES ('".$_POST["Name"]."')";
		$Response["data"] = $DB->Query($SQL);
        break;
}

http_response_code(200);
echo json_encode($Response);
?> 
