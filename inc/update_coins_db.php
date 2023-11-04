<?php
include('db.php');
include('functions.php');

// Get the raw POST data as a string
$inputData = file_get_contents("php://input");

// Decode the JSON string into a PHP associative array
$data = json_decode($inputData, true);

// Validate input data, convert to integers
$id = intval($data['id']);
$amount = intval($data['amount']);

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
