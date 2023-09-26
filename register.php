<?php require ('inc/functions.php'); ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="css/login.css" />
</head>
<body class="container">  
  <div class="login-container">
    <div class="login-content">
      <h1 class="welcome-text">Register for CryptoMania</h1>
      <form class="login-form" method="POST" action="register.php">
        <input type="text" placeholder="Username" class="input-field" name="username-register">
        <input type="password" placeholder="Password" class="input-field" name="password-register"><br>
        <button type="submit" class="btn-neon" name="submit-register">Register</button><br><br>
        <a href="login.php" class="href">Already have an account?</a>
      </form>
    </div>
  </div>
</body>
</html>