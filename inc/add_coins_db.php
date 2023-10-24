<?Php 
	include('db.php');

	// Get the raw POST data as a string
	$inputData = file_get_contents("php://input");

	// Decode the JSON string into a PHP associative array
	$data = json_decode($inputData, true);

	$coinName = $_POST['coin_name'];
	$coinPrice = $_POST['coin_price'];
	$amountCoins = $_POST['amount_coins'];
	$totalValue = $_POST['total_value'];
	
	$addCoin = "INSERT INTO cryptofolio (id, name, price, amount, totalValue, bought_on) 
			VALUES (null, '$coinName', '$coinPrice', '$amountCoins', '$totalValue', NOW())";

	if( mysqli_query($con, $addCoin) )
	{
		echo "Succesfully added to your cryptofolio";
	}
	else
	{
		echo "Oops, can not add a coin to your cryptofolio:" . $addCoin . "<br />" . mysqli_error($con);
	}
		 

?>