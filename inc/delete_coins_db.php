<?php
include('db.php');
include('functions.php');

// Get the raw POST data as a string
$inputData = file_get_contents("php://input");

// Decode the JSON string into a PHP associative array
$data = json_decode($inputData, true);

// Validate and sanitize the input data
$id = intval($data['id']); // Convert to integer

// Delete data from the database
$deleteCoin = "DELETE FROM cryptofolio WHERE id = '$id'";

if(mysqli_query($con, $deleteCoin)) {
    echo "Successfully deleted the record from your cryptofolio";
} else {
    echo "Oops, can not delete the record from your cryptofolio: " . $deleteCoin . "<br />" . mysqli_error($con);
}

// Close database connection
mysqli_close($con);
?>
