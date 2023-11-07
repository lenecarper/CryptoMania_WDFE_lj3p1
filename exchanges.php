<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crypto Exchanges</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="css/style.css" />
</head>
<body>
    <!-- Navigation bar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light" style="background-color: #105469 !important;">
        <div class="container-fluid">
            <a class="navbar-brand" href="javascript:void(0);">Cryptomania</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link active" href="index.php">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="cryptoportfolio.php">Cryptofolio</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="exchanges.php">Exchanges</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="news.php">News</a>
                </li>
            </ul>
            </div>
        </div>
    </nav>

    <h1 class="title">Crypto Exchanges</h1><br>
    <ul id="exchange-list"></ul>

    <!-- Mustache.js Template -->
    <script id="exchange-template" type="text/template">
        {{#exchanges}}
        <div class="exchange-container">
            <li class="mt-3">
                <strong>Name:</strong> {{name}}<br>
                <strong>Rank:</strong> {{rank}}<br>
                <strong>Volume (USD):</strong> {{volumeUsd}}<br>
                <strong>Website:</strong> <a href="{{exchangeUrl}}" style="color: grey;">Click here</a>
            </li>
        </div>
        {{/exchanges}}
    </script>
</body>

<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>

<!-- Bootstrap -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

<!-- Mustache JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/4.1.0/mustache.min.js" integrity="sha512-HYiNpwSxYuji84SQbCU5m9kHEsRqwWypXgJMBtbRSumlx1iBB6QaxgEBZHSHEGM+fKyCX/3Kb5V5jeVXm0OglQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<!-- JavaScript Exchange File -->
<script src="js/exchanges.js"></script>
</html>
