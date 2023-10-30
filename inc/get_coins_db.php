<?php 
	header('Content-Type: application/json');
	include('functions.php');
	// Connect to the MySQL database
	$db = new mysqli('localhost', 'root', '', 'cryptomania');

	$user_id = $fetch_user['user_id'];

	$getAllCoins = "SELECT * FROM cryptofolio WHERE `from_user` = $user_id";

	$resultGetAllCoins = mysqli_query($db, $getAllCoins);

	$allCoinsArray = array();

	while ($rowAllCoins = mysqli_fetch_assoc($resultGetAllCoins)) {

		$allCoinsArray[] = $rowAllCoins;
	}
	
	echo json_encode($allCoinsArray);
?>