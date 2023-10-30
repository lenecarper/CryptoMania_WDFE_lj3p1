<?php
session_start();
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

    if ($count > 0)
    {
        return "Username already exists. Please choose a different username.";
    }

    // Hash the password before storing it in the database
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert the user into the database
    $insertQuery = $db->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    $insertQuery->bind_param("ss", $username, $hashedPassword);

    if ($insertQuery->execute())
    {
        $insertQuery->close();
        $db->close();
        header('location:login.php');
    }
    else
    {
        $insertQuery->close();
        $db->close();
        return "Error registering user: " . $db->error;
    }
}

if (isset($_POST['submit-register']))
{
    $username = $_POST['username-register'];
    $password = $_POST['password-register'];

    // Call the registerUser function with the form data
    $registrationResult = registerUser($username, $password);

    // Display the result of the registration attempt
    echo $registrationResult;
}

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
        // Verify the provided password against the stored hash
        if (password_verify($loginPassword, $hashedPassword)) {
            // Password is correct; you can perform additional actions here if needed.
            $db->close();
            header('location:index.php');
        } else {
            // Password is incorrect
            $db->close();
            return "Incorrect password.";
        }
    } else {
        // User not found
        $db->close();
        return "User not found.";
    }
}

if (isset($_POST['submit-login']))
{
    $loginUsername = $_POST['username-login'];
    $loginPassword = $_POST['password-login'];

    // Call the loginUser function with the form data
    $loginResult = loginUser($loginUsername, $loginPassword);

    // Display the result of the registration attempt
    echo $loginResult;

    $_SESSION['user_id'] = "SELECT `user_id` FROM users WHERE username = '$loginUsername'";

    // Redirect user to index
    header('location:index.php');
}

?>