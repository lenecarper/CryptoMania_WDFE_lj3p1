<?php require ('inc/functions.php'); 

if (!($_SESSION['loggedIn']))
{
    header('location:login.php');
} ?>

<!DOCTYPE>
<html>
<head>

	<meta charset="UTF-8">

	<title>Cryptofolio</title>

	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
	<link rel="stylesheet" href="css/style.css" >
</head>
<body>
    <!-- Navigation bar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light" style="background-color: #105469 !important;">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Cryptomania</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link active" href="index.php">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="cryptoportfolio.php">Cryptofolio</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="exchanges.php">Exchanges</a>
                </li>
            </ul>
            </div>
        </div>
    </nav>

		<!-- Table to insert the fetched/saved crypto data into -->
		<table class="table" id="crypto-folio-table">
			<thead>
				<tr>
					<th class="row-crypto">Id</th>
					<th class="row-crypto">Bought on</th>
					<th class="row-crypto">Name</th>
					<th class="row-crypto">Price</th>
					<th class="row-crypto">Amount</th>
					
					<th class="row-crypto">Total</th>
					<th class="row-crypto">Save</th>
					<th class="row-crypto">Delete</th>
				</tr>
			</thead>
			<tbody></tbody>
			<tfoot>
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td id="total-value"></td>
					<td></td>
				</tr>
			</tfoot>
		</table>
	</div>

	<!-- Template to load the previously fetched data into -->
	<template id="coins-cryptofolio-template">
		{{#data}}
			<tr>
				<td class="row-crypto">{{id}}</td>
				<td class="row-crypto">{{bought_on}}</td>
				<td class="row-crypto">{{name}}</td>
				<td class="row-crypto">{{price}}</td>
				<td class="row-crypto"><input type="number" value="{{amount}}" class="amount-input" style="background-color: #147393; border-color: #014055; color: white; text-align: center;"/></td>
				<td class="row-crypto">{{totalValue}}</td>
				<td class="row-crypto"><button type="button" name="update-database" class="button btn-glow" value="{{id}}" id="update-database-button">Update</button></td>
				<td class="row-crypto"><button type="button" name="delete-database" class="button btn-glow" value="{{id}}" id="delete-database-button">Delete</button></td>
			</tr>
		{{/data}}
	</template>


	<!-- jQuery -->
	<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>

	<!-- Bootstrap -->
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min.js" integrity="sha384-LtrjvnR4Twt/qOuYxE721u19sVFLVSA4hf/rRt6PrZTmiPltdZcI7q7PXQBYTKyf" crossorigin="anonymous"></script>	

	<!-- Mustache JS -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.3.0/mustache.js"></script>

	<!-- Chart JS -->
	<script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
    
    <!-- Main JS file  -->
	<script src="js/main.js"></script>
</body>
</html>