<?php
include('db.php');
include('functions.php');

// Get the raw POST data as a string
$inputData = file_get_contents("php://input");

// Decode the JSON string into a PHP associative array
$data = json_decode($inputData, true);

// Validate and sanitize the input data
$id = intval($data['id']); // Convert to integer
$amount = intval($data['amount']); // Convert to integer

// Update data in the database
$updateCoin = "UPDATE cryptofolio SET amount = '$amount' WHERE id = '$id'";

if(mysqli_query($con, $updateCoin)) {
    echo "Successfully updated your cryptofolio";
} else {
    echo "Oops, can not update the coin in your cryptofolio: " . $updateCoin . "<br />" . mysqli_error($con);
}

// Close database connection
mysqli_close($con);
?>
