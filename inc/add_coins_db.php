<?php
include('db.php');
include('functions.php');

// Get the raw POST data as a string
$inputData = file_get_contents("php://input");

// Decode the JSON string into a PHP associative array
$data = json_decode($inputData, true);

// Validate and sanitize the input data
$coinName = mysqli_real_escape_string($con, $data['coin_name']);
$coinPrice = floatval($data['coin_price']); // Convert to float
$amountCoins = intval($data['amount_coins']); // Convert to integer
$totalValue = floatval($data['total_value']); // Convert to float
$userId = $_SESSION['user_id'];

// Insert data into the database
$addCoin = "INSERT INTO cryptofolio (id, name, price, amount, totalValue, bought_on, from_user) 
            VALUES (null, '$coinName', '$coinPrice', '$amountCoins', '$totalValue', NOW(), '$userId')";

if(mysqli_query($con, $addCoin)) {
    echo "Successfully added to your cryptofolio";
    $_SESSION['successMessage'] = 'Successfully added coin to your cryptofolio!';
} else {
    echo "Oops, can not add a coin to your cryptofolio: " . $addCoin . "<br />" . mysqli_error($con);
}

// Close database connection
mysqli_close($con);
?>
