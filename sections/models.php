
<div class="section" id="Models">
	<h1> Listado De Modelos <button id="AddModel" class="button-register"> Registrar Modelo </button> </h1>
	<div class="section-list" id="ModelsList"> </div>	
</div>

<div id="ModalModels" class="modal">
  <div class="modal-content">
	  <div class="modal-header">
	    <span class="close" id="CloseModalModel">&times;</span>
	    <h2>Registrar Modelo</h2>
	  </div>
	  <div class="modal-body">
	   	 <form id="FormModel" method="POST" action="index.php">
		  	<p> <b> Nombre: </b> </p> 
		  	<input type="text" id="ModelName" name="ModelName" value=""/>
		  	<p id="FormModelError" class="error"> </p>
		  	<button id="RegisterModel" class="button"> Registrar </button>	
		 </form>	
	  </div>
	</div>
</div>
