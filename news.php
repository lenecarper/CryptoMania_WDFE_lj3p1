<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="css/style.css">
    <title>Crypto News</title>
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
    <div class="container">
        <h1>Crypto News</h1>
        <div id="news-container"></div>
    </div>

    <!-- Mustache.js Template -->
    <script id="news-template" type="text/template">
        {{#articles}}
        <div class="news-article">
            <h2>{{title}}</h2>
            <p>{{description}}</p>
            <p><strong>Source:</strong> {{source.name}}</p>
            <p><strong>Published At:</strong> {{publishedAt}}</p>
            <a href="{{url}}" target="_blank">Read More</a>
        </div>
        {{/articles}}
    </script>

    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.1.min.js" crossorigin="anonymous"></script>

    <!-- Mustache JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/4.1.0/mustache.min.js" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <!-- JavaScript File -->
    <script src="js/news.js"></script>
</body>

</html>
