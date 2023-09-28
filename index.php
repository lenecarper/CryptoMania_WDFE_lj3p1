<?php require ('inc/functions.php'); ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css" />
    <title>CryptoMania</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <!-- Mustache template for cryptocurrency data -->
    <template id="crypto-template" type="text/template">
       {{#data}}
            <tr><th>$ {{symbol}}</th></tr>
            <tr><td>{{name}}</td></tr>
            <tr><td>Value: ${{priceUsd}} USD</td></tr>
            <tr><td>Market cap: ${{marketCapUsd}}</td></tr>
            <tr><td>Trade volume past 24 hours: ${{volumeUsd24Hr}}</td></tr>
            <tr><td onclick='loadModal("{{rank}}" - 1)' class="learn-more-link">Learn more about {{name}}</td></tr>
        {{/data}}
    </template>

    <div id="crypto-wrapper"><table id="crypto-overview-table"></table></div>

    <!-- Mustache template for the history modal -->
    <template id="history-modal-template" type="text/template">
        {{#data}}
            <tr><th>$ {{symbol}}</th></tr>
            <tr><td>Cryptocurrency: {{name}}</td></tr>
            <tr><td>Value: ${{priceUsd}} USD</td></tr>
            <tr><td>Market cap: ${{marketCapUsd}}</td></tr>
            <tr><td>Trade volume past 24 hours: ${{volumeUsd24Hr}}</td></tr>
            <tr><td>Supply: {{supply}}</td></tr>
        {{/data}}
    </template>

    <div id="modal-wrapper" style="display: none;">
        <div id="history-modal">
        <table id='history-information'></table>
        <div id="close-modal" onclick="removeModal()">x</div>
        <div id='full-graph' style='width: 100%; margin: 0 auto;'><canvas id='cryptoChart'></canvas></div>
    </div>
        <div id="background-blur"></div>
    </div>

    <div id="loading-screen"><img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" /></div><br><h1 style="text-align: center;">Loading..</h1>
</body>

<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>

<!-- Bootstrap -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

<!-- Mustache JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/4.1.0/mustache.min.js" integrity="sha512-HYiNpwSxYuji84SQbCU5m9kHEsRqwWypXgJMBtbRSumlx1iBB6QaxgEBZHSHEGM+fKyCX/3Kb5V5jeVXm0OglQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<script src="js/main.js"></script>
</html>