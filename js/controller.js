// Settings
var API_PARKING = './api/parking.php';
var API_PARKING_EXIT = './api/parking_exit.php';
var API_VEHICLES = './api/vehicles.php';
var API_BRANDS = './api/brands.php';
var API_MODELS = './api/models.php';
var API_COLORS = './api/colors.php';
var ParkingCollection = [];
var FloorPlaceCollection = [];
var BrandsCollection = [];
var ModelsCollection = [];
var ColorsCollection = [];
var SelectedFloor = 1;
var CurrentSection = "Parking";

// Init
ShowSection("Parking");
ShowFloor(1);

var ModalBrands = document.getElementById("ModalBrands");
var ModalModels = document.getElementById("ModalModels");
var ModalColors = document.getElementById("ModalColors");
var AddBrand = document.getElementById("AddBrand");
var AddModel = document.getElementById("AddModel");
var AddColor = document.getElementById("AddColor");
var CloseModalBrand = document.getElementById("CloseModalBrand");
var CloseModalModel = document.getElementById("CloseModalModel");
var CloseModalColor = document.getElementById("CloseModalColor");

function ShowSection(Section){
	document.getElementById(CurrentSection).style.display = "none";
	document.getElementById(Section).style.display = "inline"; 
	CurrentSection = Section;
	if(Section=="Parking") GetParking();
	else if(Section=="Brands") GetBrands();
	else if(Section=="Models") GetModels();
	else if(Section=="Colors") GetColors();
}

function ShowFloor(Floor){

	document.getElementById("ParkingFloors").style.display = "inline-block";	
	document.getElementById("ParkingForm").style.display = "none";
	document.getElementById("ParkingExitForm").style.display = "none";
	document.getElementById("CurrentFloor").innerHTML = "- Piso Número "+Floor;

	document.getElementById("ParkingFloor"+SelectedFloor).style.display = "none";
	document.getElementById("ParkingFloor"+Floor).style.display = "inline-block";

	document.getElementById("BtnFloor"+SelectedFloor).classList.remove("btn-parking-active");
	document.getElementById("BtnFloor"+SelectedFloor).classList.add("btn-parking-blue");
	document.getElementById("BtnFloor"+Floor).classList.remove("btn-parking-blue");
	document.getElementById("BtnFloor"+Floor).classList.add("btn-parking-active");
	
	SelectedFloor = Floor;
}

async function IngressVehicle(){

	document.getElementById("BtnFloor"+SelectedFloor).classList.remove("btn-parking-active");
	document.getElementById("BtnFloor"+SelectedFloor).classList.add("btn-parking-blue");
	document.getElementById("ParkingFloors").style.display = "none";
	document.getElementById("ParkingExitForm").style.display = "none";
	document.getElementById("ParkingForm").style.display = "inline-block";
  document.getElementById("CurrentFloor").innerHTML = "- Ingresar Vehiculo";
  CleanParkingForm();
  DisplayError("FormParkingError","");
  
  const ParkingFloor = document.getElementById('ParkingFloor');
	var event = new Event('change');
	ParkingFloor.dispatchEvent(event);

	const VehicleRegistration = document.getElementById("VehicleRegistration");
	VehicleRegistration.value = "";

  const VehicleBrand = document.getElementById("VehicleBrand");
  VehicleBrand.innerHTML = "";
  const BrandsOptions = await fetch(API_BRANDS, { method: 'GET' } );
  BrandsOptions.json().then((data) => {
		data.data.forEach(function myFunction(item, index){
	  		let Option = document.createElement("option");
				Option.text = item.Name;
				Option.value = item.Id;		
				VehicleBrand.appendChild(Option);
		});
	});

	const VehicleModel = document.getElementById("VehicleModel");
	VehicleModel.innerHTML = "";
  const ModelsOptions = await fetch(API_MODELS, { method: 'GET' } );
  ModelsOptions.json().then((data) => {
		data.data.forEach(function myFunction(item, index){
	  		let Option = document.createElement("option");
				Option.text = item.Name;
				Option.value = item.Id;		
				VehicleModel.appendChild(Option);
		});
	});

	const VehicleColor = document.getElementById("VehicleColor");
	VehicleColor.innerHTML = "";
  const ColorsOptions = await fetch(API_COLORS, { method: 'GET' } );
  ColorsOptions.json().then((data) => {
		data.data.forEach(function myFunction(item, index){
	  		let Option = document.createElement("option");
				Option.text = item.Name;
				Option.value = item.Id;		
				VehicleColor.appendChild(Option);
		});
	});

}

async function RegisterExit(){

	document.getElementById("BtnFloor"+SelectedFloor).classList.remove("btn-parking-active");
	document.getElementById("BtnFloor"+SelectedFloor).classList.add("btn-parking-blue");
	document.getElementById("ParkingFloors").style.display = "none";
	document.getElementById("ParkingForm").style.display = "none";
	document.getElementById("ParkingExitForm").style.display = "inline-block";
  document.getElementById("CurrentFloor").innerHTML = "- Registrar Salida";

  const ParkingSelectExit = document.getElementById("ParkingSelectExit");
  ParkingSelectExit.innerHTML = "";
	ParkingCollection.forEach(function myFunction(item, index){
			let Parking = item.split("-");
			let Id = Parking[0];
			let Registration = Parking[1];
			let Floor = Parking[2];
			let Place = Parking[3];
	  	let Option = document.createElement("option");
			Option.text = "Matricula: "+Registration+" | Piso Número "+Floor+" | Lugar Número "+Place;
			Option.value = Id;		
			ParkingSelectExit.appendChild(Option);
	});
}

function getPlaces(FloorObject) {
	const ParkingPlace = document.getElementById("ParkingPlace");
	ParkingPlace.innerHTML = "";
  var FloorSelected = FloorObject.value;  
  var QtyPlacesFree = 0;
  for(var i=1; i<11; i++){
  	 let CheckPlace = FloorSelected+"-"+i;
  	 if(!FloorPlaceCollection.includes(CheckPlace)){
		  	let Option = document.createElement("option");
				Option.text = "Lugar "+i;
				Option.value = i;		
				ParkingPlace.appendChild(Option);
				QtyPlacesFree++;
		 }
  } 
  if(QtyPlacesFree==0){
  	let Option = document.createElement("option");
		Option.text = "No hay más Lugares disponibles";
		Option.value = 0;		
		ParkingPlace.appendChild(Option);
  } 
  else{
  	DisplayError("FormParkingError","");
  } 
}

async function GetParking(){
	CleanParkingForm();
	ParkingCollection = [];
  FloorPlaceCollection = [];
  const FreePlace = "<div class='btn-parking btn-parking-green'> LUGAR <br> LIBRE </div>";
  for(var i=1; i<6; i++){
  	 for(var j=1; j<11; j++){
  	 		let PlaceId = "Place-"+i+"-"+j;
  	 		document.getElementById(PlaceId).innerHTML = FreePlace;
  	 }
  }
	try {
	   const res = await fetch(API_PARKING, { method: 'GET' } );
	   res.json().then((data) => {
          data.data.forEach(function myFunction(item, index, arr){
        	  	let Id = item.Id;
          		let Registration = item.Registration.toUpperCase();
          		let Floor = item.Floor;
          		let Place = item.Place;
          		let Style = item.Style;
          		let PlaceId = "Place-"+Floor+"-"+Place;
          	  ParkingCollection.push(Id+"-"+Registration+"-"+Floor+"-"+Place);
          	  FloorPlaceCollection.push(Floor+"-"+Place);   
          		let Car = "<div class='car'><img src='./img/car.png' style='background-color: "+Style+"'><p><b><span>"+Registration+"</span></b></p></div>";
          		document.getElementById(PlaceId).innerHTML = Car;
					});
          if(FloorPlaceCollection.length==50){
          	 document.getElementById("ParkingFull").innerHTML = "El Parking Esta Lleno";
          } 
          else{
          	 document.getElementById("ParkingFull").innerHTML = "";
          }    
       }).catch((err) => {
          console.log(err);
       }) 
	} catch(err){
	   console.log(err.message);
	}
}

async function GetBrands(){
	let BrandsList = "";
	BrandsCollection = [];
	try {
	   const res = await fetch(API_BRANDS, { method: 'GET' } );
	   res.json().then((data) => {
          data.data.forEach(function myFunction(item, index, arr){
          	  BrandsCollection.push(item.Name);
   						BrandsList+= "<div class='section-item'><img src='"+item.Logo+"' class='logo'/><h3>"+item.Name+"</h3></div>";
					});
				  document.getElementById("BrandsList").innerHTML = BrandsList; 
       }).catch((err) => {
          console.log(err);
       }) 
	} catch(err){
	   console.log(err.message);
	}
}

async function GetModels(){
	let ModelsList = "";
	ModelsCollection = [];
	try {
	   const res = await fetch(API_MODELS, { method: 'GET' } );
	   res.json().then((data) => {
          data.data.forEach(function myFunction(item, index, arr){
          	  ModelsCollection.push(item.Name);
   						ModelsList+= "<div class='section-item'><h2>"+item.Name+"</h2></div>";
					});
				  document.getElementById("ModelsList").innerHTML = ModelsList; 
       }).catch((err) => {
          console.log(err);
       }) 
	} catch(err){
	   console.log(err.message);
	}
}

async function GetColors(){
	let ColorsList = "";
	ColorsCollection = [];
	try {
	   const res = await fetch(API_COLORS, { method: 'GET' } );
	   res.json().then((data) => {
          data.data.forEach(function myFunction(item, index, arr){
          	  ColorsCollection.push(item.Name);
   						ColorsList+= "<div class='section-item'>";
   						ColorsList+= "<div class='section-item-color' style='background-color: "+item.Style+"'><h2>"+item.Style+"</h2></div>";
   						ColorsList+= "<h3>"+item.Name+"</h3></div>";
					});
				  document.getElementById("ColorsList").innerHTML = ColorsList; 
       }).catch((err) => {
          console.log(err);
       }) 
	} catch(err){
	   console.log(err.message);
	}
}

function CleanParkingForm(){
	let VehicleBrand = document.getElementById("VehicleBrand");
	let VehicleModel = document.getElementById("VehicleModel");
	let VehicleColor = document.getElementById("VehicleColor");
	VehicleBrand.disabled = false;
  VehicleModel.disabled = false;
  VehicleColor.disabled = false;
  console.log("CLEAN");
}

const VehicleRegistration = document.getElementById("VehicleRegistration");

VehicleRegistration.addEventListener('keyup', async event => {
	CleanParkingForm();
	if(VehicleRegistration.value.length==7){
	  try{
	 	  let Params = new URLSearchParams({ Registration: VehicleRegistration.value });
	    const res = await fetch(API_VEHICLES + "?" + Params , { method: 'GET' } );
    	res.json().then((data) => {
    		  if(data.data!==undefined){
   					  VehicleBrand.value = data.data.BrandId;
   					  VehicleBrand.disabled = true;
   					  VehicleModel.value = data.data.ModelId;
   					  VehicleModel.disabled = true;
   					  VehicleColor.value = data.data.ColorId;
   					  VehicleColor.disabled = true;
    		  }   		
      }).catch((err) => {
          console.log(err);
      }) 	    
	  } catch(err){
	    console.log(err.message);
	  } 		
	}
});

const FormParking = document.getElementById("FormParking");

FormParking.addEventListener('submit', async event => {

	event.preventDefault();
	DisplayError("FormParkingError","");
  let VehicleRegistration = document.getElementById('VehicleRegistration');
  let VehicleBrand = document.getElementById('VehicleBrand');
  let VehicleModel = document.getElementById('VehicleModel');
  let VehicleColor = document.getElementById('VehicleColor');
  let ParkingFloor = document.getElementById('ParkingFloor');
  let ParkingPlace = document.getElementById('ParkingPlace');
	if(VehicleRegistration.value==""){
			DisplayError("FormParkingError","Ingresa la matricula del vehiculo");
	}
	else if(VehicleRegistration.value.length!==7){
      DisplayError("FormParkingError","La matricula debe tener 7 caracteres");
	}
	else if(ParkingPlace.value=="0"){
      DisplayError("FormParkingError","No hay más lugares disponibles en el Piso "+ParkingFloor.value);
	}
	else if(ParkingPlace.value==""){
      DisplayError("FormParkingError","Seleciona un lugar");
	}
	else{	
		let formData = new FormData();
	  formData.append('Registration',VehicleRegistration.value);
	  formData.append('BrandId',VehicleBrand.value);
	  formData.append('ModelId',VehicleModel.value);
	  formData.append('ColorId',VehicleColor.value);
	  formData.append('Floor',ParkingFloor.value);
	  formData.append('Place',ParkingPlace.value);
	  try{
	    const res = await fetch(API_PARKING, { method: 'POST', body: formData } );
	    const resData = res.json();
	    VehicleRegistration.value = "";
	    GetParking();
	    ShowFloor(ParkingFloor.value);
	  } catch(err){
	    console.log(err.message);
	  } 
	}

});

const FormParkingExit = document.getElementById("FormParkingExit");

FormParkingExit.addEventListener('submit', async event => {

	event.preventDefault();
	const ParkingSelectExit = document.getElementById("ParkingSelectExit");
	let formData = new FormData();
	formData.append('ParkingId',ParkingSelectExit.value);	
  try{
    const res = await fetch(API_PARKING_EXIT, { method: 'POST', body: formData } );
    const resData = res.json();
    GetParking();
    ShowFloor(1);
  } catch(err){
    console.log(err.message);
  } 
});

const FormBrand = document.getElementById("FormBrand");

FormBrand.addEventListener('submit', async event => {

	event.preventDefault();
	DisplayError("FormBrandError","");
  let BrandName = document.getElementById('BrandName');
	if(BrandName.value==""){
			DisplayError("FormBrandError","Ingresa un nombre");
	}
	else if(BrandsCollection.includes(BrandName.value)){
		  DisplayError("FormBrandError","El nombre ya esta ingresado");
	}
	else{	
		let formData = new FormData();
	  formData.append('Name',BrandName.value);
	  try{
	    const res = await fetch(API_BRANDS, { method: 'POST', body: formData } );
	    const resData = res.json();
	    BrandName.value = "";
	    GetBrands();
	    CloseModalBrand.click();
	  } catch(err){
	    console.log(err.message);
	  }
	}
});

const FormModel = document.getElementById("FormModel");

FormModel.addEventListener('submit', async event => {

	event.preventDefault();
	DisplayError("FormModelError","");
  let ModelName = document.getElementById('ModelName');
	if(ModelName.value==""){
			DisplayError("FormModelError","Ingresa un nombre");
	}
	else if(ModelsCollection.includes(ModelName.value)){
		  DisplayError("FormModelError","El nombre ya esta ingresado");
	}
	else{	
		let formData = new FormData();
	  formData.append('Name',ModelName.value);
	  try{
	    const res = await fetch(API_MODELS, { method: 'POST', body: formData } );
	    const resData = res.json();
	    ModelName.value = "";
	    GetModels();
	    CloseModalModel.click();
	  } catch(err){
	    console.log(err.message);
	  }
	}
});

const FormColor = document.getElementById("FormColor");

FormColor.addEventListener('submit', async event => {

	event.preventDefault();
	DisplayError("FormColorError","");
  let ColorName = document.getElementById('ColorName');
  let ColorStyle = document.getElementById('ColorStyle');
	if(ColorName.value==""){
			DisplayError("FormColorError","Ingresa un nombre");
	}
	else if(ColorsCollection.includes(ColorName.value)){
		  DisplayError("FormColorError","El color ya esta ingresado");
	}
	else if(ColorStyle.value==""){
		DisplayError("FormColorError","Ingresa un estilo");
	}
	else{	
		let formData = new FormData();
	  formData.append('Name',ColorName.value);
	  formData.append('Style',ColorStyle.value);
	  try{
	    const res = await fetch(API_COLORS, { method: 'POST', body: formData } );
	    const resData = res.json();
	    ColorName.value = "";
	    ColorStyle.value = "";
	    GetColors();
	    CloseModalColor.click();
	  } catch(err){
	    console.log(err.message);
	  }
	}
});

function DisplayError(Id,Error){
	if(Id=="FormParkingError"){
		if(FloorPlaceCollection.length<50){
	      document.getElementById(Id).innerHTML = Error;
		}
	}
	else{
	    document.getElementById(Id).innerHTML = Error;
	}	
}

AddBrand.onclick = function() {
  ModalBrands.style.display = "block";
}

AddModel.onclick = function() {
  ModalModels.style.display = "block";
}

AddColor.onclick = function() {
  ModalColors.style.display = "block";
}

CloseModalBrand.onclick = function(event) {
	ModalBrands.style.display = "none";
}

CloseModalModel.onclick = function(event) {
	ModalModels.style.display = "none";
}

CloseModalColor.onclick = function(event) {
	ModalColors.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == ModalBrands) {
    ModalBrands.style.display = "none";
  }
  else if (event.target == ModalModels) {
  	ModalModels.style.display = "none";
  }	
  else if (event.target == ModalColors) {
  	ModalColors.style.display = "none";
  }
} 
