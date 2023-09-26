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
      <h1 class="welcome-text">Log in to CryptoMania</h1>
      <form class="login-form" method="POST" action="login.php">
        <input type="text" placeholder="Username" class="input-field" name="username-login">
        <input type="password" placeholder="Password" class="input-field" name="password-login"><br>
        <button type="submit" class="btn-neon" name="submit-login">Login</button><br><br>
        <a href="register.php" class="href">No account yet?</a>
      </form>
    </div>
  </div>
</body>
</html>