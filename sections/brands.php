
<div class="section" id="Brands">
    <h1> Listado De Marcas <button id="AddBrand" class="button-register"> Registrar Marca </button> </h1>
    <div class="section-list" id="BrandsList"> </div>
</div>

<div id="ModalBrands" class="modal">
  <div class="modal-content">
	  <div class="modal-header">
	    <span class="close" id="CloseModalBrand">&times;</span>
	    <h2>Registrar Marca</h2>
	  </div>
	  <div class="modal-body">
	   	 <form id="FormBrand" method="POST" action="index.php">
		  	<p> <b> Nombre: </b> </p> 
		  	<input type="text" id="BrandName" name="BrandName" value=""/>
		  	<p id="FormBrandError" class="error"> </p>
		  	<button id="RegisterBrand" class="button"> Registrar </button>	
		 </form>	
	  </div>
	</div>
</div>