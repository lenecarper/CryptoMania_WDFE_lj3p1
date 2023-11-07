$(document).ready(function () {
    const apiKey = '5874d5baffcb41b59a1b2902307537fe'; // Replace with your API key
    const apiUrl = 'https://newsapi.org/v2/everything?q=crypto&apiKey=' + apiKey;

    // Fetch cryptocurrency news from the API
    $.get(apiUrl, function (data) {
        const articles = data.articles;
        const template = $('#news-template').html();

        // Render news articles using Mustache.js template
        const renderedArticles = Mustache.render(template, { articles: articles });

        // Append rendered articles to the news-container
        $('#news-container').html(renderedArticles);
    });
});
