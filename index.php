<!DOCTYPE html>
<html lang="en">
	<head>
	    <meta charset="utf-8">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	    <meta name="viewport" content="width=device-width, initial-scale=1">
	    <meta name="description" content="Parking">
		<title>Pay-Pros - Etapa 1</title>
		<link rel="stylesheet" href="style/style.css">
	</head>

	<body>	
		<nav>
		   <ul>
			  <li onclick="ShowSection('Parking')"> <h3>Parking</h3> </li>
			  <li onclick="ShowSection('Brands')"> <h3>Marcas</h3> </li>
			  <li onclick="ShowSection('Models')"> <h3 >Modelos</h3> </li>
			  <li onclick="ShowSection('Colors')"> <h3 >Colores</h3> </li>
		   </ul>
		</nav>		
		<div class="container">
			<?php 
				include "sections/parking.php"; 
				include "sections/brands.php";
				include "sections/models.php";
				include "sections/colors.php";
			?>  
		</div> 
		<script src="js/controller.js"></script>	
	</body>
</html>