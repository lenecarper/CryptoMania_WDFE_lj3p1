<?php
	// Send a header along to the webpage to prevent callbacks or errors
	header('Content-Type: application/json');
	include('functions.php');

	// Connect to the MySQL database
	$db = new mysqli('localhost', 'root', '', 'cryptomania');

	// Select everything from the cryptofolio table
	$getAllCoins = "SELECT * FROM cryptofolio";

	// Run the query
	$resultGetAllCoins = mysqli_query($db, $getAllCoins);

	// Create an array to store all coins
	$allCoinsArray = array();

	// Add the coins into the array as long as there is another result
	while ($rowAllCoins = mysqli_fetch_assoc($resultGetAllCoins))
	{
		$allCoinsArray[] = $rowAllCoins;
	}
	
	// Echo the array as a JSON array
	echo json_encode($allCoinsArray);
?>