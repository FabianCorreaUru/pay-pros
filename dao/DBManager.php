<?php

class DBManager
{
	private $DBServer;
	private $DBName;
	private $DBUser;
	private $DBPass;
	private $LastError;
    private $LastResponse;
	private static $instance;	
	    
    private function __construct(){
    	$this->DBServer = "localhost";
		$this->DBName = "paypros";
		$this->DBUser = "root";
		$this->DBPass = "";
    }

    public static function getInstance(){
        if (!self::$instance instanceof self) self::$instance = new self;
        return self::$instance;
    }
        
    function SetParams($Server,$DataBase,$User,$Pass){
        $this->DBServer = $Server;
        $this->DBName = $DataBase;
        $this->DBUser = $User;
        $this->DBPass = $Pass;
    }    

    function Connect(){		
		$conn = new mysqli($this->DBServer,$this->DBUser,$this->DBPass,$this->DBName);
		if($conn->connect_error) trigger_error('Database Connection Failed: '.$conn->connect_error,E_USER_ERROR);
		return $conn;
    }
	
    function Disconnect($conn){
        $conn->close();
    }
    
	function GetErrorMessage(){
        return $this->LastError;
    }

    function GetLastResponse(){
        return $this->LastResponse;
    }

    function GetDataBase(){
        return $this->DBName;
    }
    
    function Query($SQL){
        $conn = $this->Connect();
        $rs=$conn->query($SQL);
		if($rs===false){
        	$this->LastError = $conn->error;
			trigger_error('Wrong SQL: '.$SQL.' Error: '.$conn->error,E_USER_ERROR);
			$this->Disconnect($conn);
		}
		else{			
			if(strpos(strtoupper($SQL),'SELECT')!==false){
				$arr = array();
				if($rs->num_rows>0){				
					while($row = $rs->fetch_assoc()) array_push($arr,$row);				
				}
				$this->Disconnect($conn);		
				return $arr;					
			}		
			else if(strpos(strtoupper($SQL),'INSERT')!==false){	
				$LastInsertedId = $conn->insert_id;	
				$this->Disconnect($conn);		
				return $LastInsertedId; 
			}
			else{
				$AffectedRows = $conn->affected_rows;
				$this->Disconnect($conn);		
				return $AffectedRows;			
			}			
		}        
    }
}

?>
