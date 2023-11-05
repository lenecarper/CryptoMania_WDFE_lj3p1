<?php
include('db.php');
include('functions.php');

// Get the raw POST data as a string
$inputData = file_get_contents("php://input");

// Decode the JSON string into a PHP array
$data = json_decode($inputData, true);

// Validate input data, convert to integers
$id = intval($data['id']);

// Delete data from the database where the ID is the corresponding ID
$deleteCoin = "DELETE FROM cryptofolio WHERE id = '$id'";

// Execute the query, check whether the request was valid
if(mysqli_query($con, $deleteCoin))
{
    echo "Successfully deleted the record from your cryptofolio";
}
else
{
    echo "An error occured while deleting your coin: " . $deleteCoin . "<br />" . mysqli_error($con);
}

// Close database connection
mysqli_close($con);
?>
