<?php require ('inc/functions.php'); 

if (!($_SESSION['loggedIn']))
{
    header('location:login.php');
} ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CryptoMania</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="css/style.css" />
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
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

    <!-- Mustache template for cryptocurrency data -->
    <template id="crypto-template" type="text/template">
       {{#processedAssets}}
            <tr><th><img src="https://static.coincap.io/assets/icons/{{symbolLowerCase}}@2x.png" class="crypto-icon-image" />{{symbol}}</th></tr>
            <tr><td style="font-weight: 800;">{{name}}</td></tr>
            <tr><td>USD Value: ${{priceUsd}} USD</td></tr>
            <tr><td>EUR Value: €{{priceEuro}} EUR</td></tr>
            <tr><td>Market cap: ${{marketCapUsd}}</td></tr>
            <tr><td>Trade volume past 24 hours: ${{volumeUsd24Hr}}</td></tr>
            <tr><td onclick='loadModal("{{rank}}" - 1, this);' id="{{id}}" class="learn-more-link">Learn more about {{name}}</td></tr>
        {{/processedAssets}}
    </template>

    <!-- Table to insert the crypto data into -->
    <div id="crypto-wrapper"><table id="crypto-overview-table"></table></div>

    <!-- Mustache template for the history modal -->
    <template id="history-modal-template" type="text/template">
        {{#data}}
            <tr><th>{{id}}</th></tr>
            <tr><td>Cryptocurrency: {{name}}</td></tr>
            <tr><td>Value: ${{priceUsd}} USD</td></tr>
            <tr><td>Market cap: ${{marketCapUsd}}</td></tr>
        {{/data}}
    </template>

    <!-- Modal to insert the modal data into -->
    <div id="modal-wrapper" style="display: none;">
        <div id="history-modal">
            <table id='history-information'></table>
            <div id="close-modal" onclick="removeModal()">x</div>
            <div id='full-graph' style='width: 100%; margin: 0 auto;'><canvas id='cryptoChart'></canvas></div>
            <div class='center'>
                <button class='button btn-glow' id="save-to-database">Save to wallet</button>
            </div>
        </div>
        <div id="background-blur"></div>
    </div>

    <!-- Placeholder loading screen while the data gets fetched from the API -->
    <div id="loading-screen"><img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" /></div><br><h1 style="text-align: center;">Loading..</h1>
</body>

<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>

<!-- Bootstrap -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

<!-- Mustache JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/4.1.0/mustache.min.js" integrity="sha512-HYiNpwSxYuji84SQbCU5m9kHEsRqwWypXgJMBtbRSumlx1iBB6QaxgEBZHSHEGM+fKyCX/3Kb5V5jeVXm0OglQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<!-- Main JS file -->
<script src="js/main.js"></script>
</html>