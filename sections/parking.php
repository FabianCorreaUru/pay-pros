<div class="section" id="Parking">
    <h1> Parking <span id="CurrentFloor"> </span> </h1>
    <div class="section-left">          
        <div id="BtnFloor1" class="btn-parking btn-parking-blue" onclick="ShowFloor(1)"> Piso Número 1 </div> 
        <div id="BtnFloor2" class="btn-parking btn-parking-blue" onclick="ShowFloor(2)"> Piso Número 2 </div>
        <div id="BtnFloor3" class="btn-parking btn-parking-blue" onclick="ShowFloor(3)"> Piso Número 3 </div>
        <div id="BtnFloor4" class="btn-parking btn-parking-blue" onclick="ShowFloor(4)"> Piso Número 4 </div>
        <div id="BtnFloor5" class="btn-parking btn-parking-blue" onclick="ShowFloor(5)"> Piso Número 5 </div>
        <div id="BtnIngress" class="btn-parking btn-parking-green" onclick="IngressVehicle()"> Ingresar Vehículo </div>  
        <div id="BtnIngress" class="btn-parking btn-parking-red" onclick="RegisterExit()"> Registrar Salida </div>                
    </div>
    <div class='section-parking'>
        <div id='ParkingFloors'>
<?php
    $Parking = "";
    for($i=1;$i<6;$i++){ 
        $Parking.= "<div id='ParkingFloor".$i."' class='parking-floor'>";
        $Parking.= "<table> <tbody>";
        $Parking.= "<tr>";
        $Parking.= "<td class='parking-place' id='Place-".$i."-1'> </td>";
        $Parking.= "<td class='parking-place' id='Place-".$i."-2'> </td>";
        $Parking.= "<td class='parking-place' id='Place-".$i."-3'> </td>";
        $Parking.= "<td class='parking-place' id='Place-".$i."-4'> </td>";
        $Parking.= "<td class='parking-place' id='Place-".$i."-5'> </td>";
        $Parking.= "</tr>";
        $Parking.= "<tr>";
        $Parking.= "<td class='parking-place' id='Place-".$i."-6'> </td>";
        $Parking.= "<td class='parking-place' id='Place-".$i."-7'> </td>";
        $Parking.= "<td class='parking-place' id='Place-".$i."-8'> </td>";
        $Parking.= "<td class='parking-place' id='Place-".$i."-9'> </td>";
        $Parking.= "<td class='parking-place' id='Place-".$i."-10'> </td>";
        $Parking.= "</tr>";
        $Parking.= "</tbody> </table>";
        $Parking.= "</div>";
    }
    echo $Parking;
?>      
        </div> 

        <div id="ParkingForm" class="parking-floor">
           <form id="FormParking" method="POST" action="index.php" class="form-container">
              <div class="parking-form-block-1">
                <p> <b> Matricula: </b> </p> <input type="text" id="VehicleRegistration" name="VehicleRegistration" value=""/>
              </div>              
              <div class="parking-form-block-1">
                <p> <b> Marca: </b> </p> <select id="VehicleBrand" name="VehicleBrand"> </select>
              </div>
              <div class="parking-form-block-1">
                <p> <b> Modelo: </b> </p> <select id="VehicleModel" name="VehicleModel"> </select>
              </div>
             <div class="parking-form-block-1">
                <p> <b> Color: </b> </p> <select id="VehicleColor" name="VehicleColor"> </select>
              </div>
              <div class="parking-form-block-1">
                <p> <b> Piso: </b> </p> 
                <select id="ParkingFloor" name="ParkingFloor" onchange="getPlaces(this)"> 
                    <option value="1"> Piso 1 </option> 
                    <option value="2"> Piso 2 </option>
                    <option value="3"> Piso 3 </option>
                    <option value="4"> Piso 4 </option>
                    <option value="5"> Piso 5 </option>
                </select>
              </div> 
              <div class="parking-form-block-1">
                <p> <b> Lugares Disponibles: </b> </p> <select id="ParkingPlace" name="ParkingPlace"> </select>
              </div> 
              <div class="parking-form-block-2">
                <p id="FormParkingError" class="error"> </p> 
              </div> 
              <div class="parking-form-block-2">
                <h1 id="ParkingFull" class="error"> </h1> 
              </div> 
              <div class="parking-form-block-1">
                <button id="Parking" class="button"> Ingresar </button>  
              </div>   
           </form>
        </div>

        <div id="ParkingExitForm" class="parking-floor">
           <form id="FormParkingExit" method="PATCH" action="index.php" class="form-container">
              <div class="parking-form-block-3">
                <p> <b> Seleciona ( Matricula / Piso / Lugar ) para marcar la salida: </b> </p> 
                <select id="ParkingSelectExit" name="ParkingSelectExit" style="text-align: center;"> </select>
              </div>             
              <div class="parking-form-block-3">
                <button id="ParkingExit" class="button"> Marcar Salida </button>  
              </div>   
           </form>
        </div>
        
    </div>                     

</div>

