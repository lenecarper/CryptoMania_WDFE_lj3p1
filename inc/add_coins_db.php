<?php
include('db.php');
include('functions.php');

// Get the raw POST data as a string
$inputData = file_get_contents("php://input");

// Decode the JSON string into a PHP array
$data = json_decode($inputData, true);

// Validate input data, convert to correct values (float, int)
$coinName = mysqli_real_escape_string($con, $data['coin_name']);
$coinPrice = floatval($data['coin_price']);
$amountCoins = intval($data['amount_coins']);
$totalValue = floatval($data['total_value']);
$userId = $_SESSION['user_id'];

// Insert data into the database
$addCoin = "INSERT INTO cryptofolio (id, name, price, amount, totalValue, bought_on, from_user) VALUES (null, '$coinName', '$coinPrice', '$amountCoins', '$totalValue', NOW(), '$userId')";

// Execute the query, check whether the request was valid
if(mysqli_query($con, $addCoin))
{
    echo "Successfully added to your cryptofolio";
    $_SESSION['successMessage'] = 'Successfully added coin to your cryptofolio!';
}
else
{
    echo "An error occured while adding your coin: " . $addCoin . "<br />" . mysqli_error($con);
}

// Close database connection
mysqli_close($con);
?>
