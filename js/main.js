// API key and URL to call
const apiUrl = 'https://api.coincap.io/v2';

// Replaced dynamically by the cryptocurrency ID
const cryptocurrencyId = 'bitcoin';

// Arrays to save the asset and history data in
const assetDataArray = [];
const historyDataArray = [];

async function fetchCoinData()
{
    try {
        const apiKey = '829151b9-2424-46c2-9acb-7bf82aec9f3b';
        // Calculate timestamps for the past week
        const endTimestamp = Date.now();
        // 7 days in milliseconds
        const startTimestamp = endTimestamp - (7 * 24 * 60 * 60 * 1200);



        // Make the GET request
        const assetCall = await fetch(`https://api.coincap.io/v2/assets`, {
            method: 'GET',
            // Give authorization headers with the API key
            headers:
            {
                'Authorization': `Bearer ${apiKey}`,
            },
        })

        // Check if the request went through
        if (!assetCall.ok)
        {
            throw new Error('Error fetching data from `assets`');
        }

        // Gather the data
        const assetData = await assetCall.json();
        assetDataArray.push(assetData);
        console.log(assetDataArray);

        var coinTemplate = $("#crypto-template").html();

        var renderTemplate = Mustache.render(coinTemplate, assetData);

        $("#crypto-overview-table").append(renderTemplate);

        // Remove the loading screen once the page loads
        document.getElementById('loading-screen').style.display = "none";

        // // Attach click event handlers to load the history modal
        // const learnMoreLinks = document.querySelectorAll('.learn-more-link');

        // Make the GET request
        const historyCall = await fetch(`https://api.coincap.io/v2/assets/${cryptocurrencyId}/history?interval=d1&start=${startTimestamp}&end=${endTimestamp}`, {
            method: 'GET',
            // Give authorization headers with the API key
            headers:
            {
                'Authorization': `Bearer ${apiKey}`,
            },
        })

        // Check if the request went through
        if (!historyCall.ok)
        {
            throw new Error('Error fetching data from `history`');
        }

        // Gather the data
        const historyData = await historyCall.json();
        historyDataArray.push(historyData);
        console.log(historyDataArray);

    // Catch errors beforehand to prevent crashing of the web application
    } catch(error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Load the history modal, add a line chart using chart.js
function loadModal(id)
{
    // Get the crypto ID dynamically
    const cryptocurrencyId = id;
    console.log('Cryptocurrency ID: ' + cryptocurrencyId);
    const assets = assetDataArray[0].data;

    var historyModalTemplate = $("#history-modal-template").html();

    const historyContext = {
        symbol: assets[cryptocurrencyId].symbol,
        name: assets[cryptocurrencyId].name,
        priceUsd: assets[cryptocurrencyId].priceUsd,
        marketCapUsd: assets[cryptocurrencyId].marketCapUsd
    }

    console.log(historyContext);
    var renderTemplate = Mustache.render(historyModalTemplate, historyContext);

    $("#history-information").append(renderTemplate);

    // Display the modal
    document.getElementById('modal-wrapper').style.display = "block";

    // Remove the loading screen
    document.getElementById('loading-screen').style.display = "none";

    // Create the line chart with graph.js (loaded in index)
    function createLineChart()
    {
        const historyInfo = historyDataArray[0].data;
        // Extract the datetime and prices from the API data
        const timestamps = historyInfo[cryptocurrencyId].data.map(entry => new Date(entry.time).toLocaleDateString());
        const prices = historyInfo[cryptocurrencyId].data.map(entry => parseFloat(entry.priceUsd));
        var canvas = document.getElementById('cryptoChart');

        // Create a line chart using Chart.js
        if (canvas && canvas.chart)
        {
            canvas.chart.destroy();
        }

        const ctx = canvas.getContext('2d');
        const chart = new Chart(ctx, {
            // Graph options, display time, cryptocurrency price & change border (color)
            type: 'line',
            data: {
                labels: timestamps,
                datasets: [{
                    label: `${cryptocurrencyId} Price (USD)`,
                    data: prices,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                }],
            },
            // Scaling options, display time and price text
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Date',
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Price (USD)',
                        },
                    },
                },
            },
        });
        canvas.chart = chart;
    }
    createLineChart();
}

// Remove the modal by displaying it as none when the function is activated
function removeModal()
{
    document.getElementById('modal-wrapper').style.display = "none";
}
fetchCoinData();