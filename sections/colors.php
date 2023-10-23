
<div class="section" id="Colors">
   <h1> Colores Disponibles <button id="AddColor" class="button-register"> Registrar Colors </button> </h1>
   <div class="section-list" id="ColorsList"> </div>   
</div>

<div id="ModalColors" class="modal">
  <div class="modal-content">
	  <div class="modal-header">
	    <span class="close" id="CloseModalColor">&times;</span>
	    <h2>Registrar Colors</h2>
	  </div>
	  <div class="modal-body">
	   	 <form id="FormColor" method="POST" action="index.php">
		  	<p> <b> Nombre: </b> </p> 
		  	<input type="text" id="ColorName" name="ColorName" value=""/>
		  	<p> <b> Estilo CSS: </b> </p>
		  	<input type="text" id="ColorStyle" name="ColorStyle" value=""/>
		  	<p id="FormColorError" class="error"> </p> 
		  	<button id="RegisterColor" class="button"> Registrar </button>
		 </form>	
	  </div>
	</div>
</div>