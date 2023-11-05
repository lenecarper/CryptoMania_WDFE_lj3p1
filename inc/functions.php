<?php
// Start a session
session_start();

// Register user function
function registerUser($username, $password)
{
    // Connect to the MySQL database
    $db = new mysqli('localhost', 'root', '', 'cryptomania');

    // Check the connection
    if ($db->connect_errno) {
        return "Connection failed: " . $db->connect_error;
    }

    // Check if the username already exists in the database
    $checkQuery = $db->prepare("SELECT COUNT(*) FROM users WHERE username = ?");
    $checkQuery->bind_param("s", $username);
    $checkQuery->execute();
    $checkQuery->bind_result($count);
    $checkQuery->fetch();
    $checkQuery->close();

    // If any results are found, throw an error
    if ($count > 0)
    {
        return "Username already exists. Please choose a different username.";
    }

    // Hash the password before storing it in the database
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert the user into the database
    $insertQuery = $db->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    $insertQuery->bind_param("ss", $username, $hashedPassword);

    // Check whether the query was executed successfully
    if ($insertQuery->execute())
    {
        // Close the query, redirect to login page
        $insertQuery->close();
        $db->close();
        header('location:login.php');
    }
    else
    {
        // Close the query, throw an error
        $insertQuery->close();
        $db->close();
        return "Error registering user: " . $db->error;
    }
}

// Check whether the registration button has been clicked
if (isset($_POST['submit-register']))
{
    // Get variables through form POST requests
    $username = $_POST['username-register'];
    $password = $_POST['password-register'];

    // Call the registerUser function with the form data
    $registrationResult = registerUser($username, $password);

    // Display the result of the registration attempt
    echo $registrationResult;
}

// Login user function
function loginUser($loginUsername, $loginPassword)
{
    // Connect to the MySQL database
    $db = new mysqli('localhost', 'root', '', 'cryptomania');

    // Check the connection
    if ($db->connect_errno) {
        return "Connection failed: " . $db->connect_error;
    }

    // Retrieve the user's hashed password from the database
    $selectQuery = $db->prepare("SELECT `user_id`, `password` FROM users WHERE username = ?");
    $selectQuery->bind_param("s", $loginUsername);
    $selectQuery->execute();
    $selectQuery->bind_result($userId, $hashedPassword);
    $selectQuery->fetch();
    $selectQuery->close();

    // Check if the user was found in the database
    if ($userId) {
        // Verify the provided password with the stored hash
        if (password_verify($loginPassword, $hashedPassword))
        {
            // Redirect to homepage if valid
            $db->close();
            header('location:index.php');
        }
        else
        {
            // Return an error if invalid
            $db->close();
            return "Incorrect password.";
        }
    }
    else
    {
        // If no user corresponds with the credentials, throw an error
        $db->close();
        return "User not found.";
    }
}

// Check whether the login button has been clicked
if (isset($_POST['submit-login']))
{
    // Connect to the MySQL database
    $db = new mysqli('localhost', 'root', '', 'cryptomania');
    
    // Get variables through form POST requests
    $loginUsername = $_POST['username-login'];
    $loginPassword = $_POST['password-login'];

    // Call the loginUser function with the form data
    $loginResult = loginUser($loginUsername, $loginPassword);

    // Display the result of the registration attempt
    echo $loginResult;

    // Run a query to select all users with the given credentials or die with an error code
    $select_user = mysqli_query($db, "SELECT * FROM `users` WHERE `username` = '$loginUsername'") or die('Could not find the specified user.');
    // If any results are found, fetch the user data and redirect to the homepage
    if (mysqli_num_rows($select_user) > 0) 
    {
        $fetch_user = mysqli_fetch_assoc($select_user);
        if ($fetch_user['user_id'] != "") 
        {
            $_SESSION['user_id'] = $fetch_user['user_id'];
            $_SESSION['loggedIn'] = true;
            // Redirect user to index
            header('location:index.php');
        }
    }
}

?>