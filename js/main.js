// API key and URL to call
const apiUrl = 'https://api.coincap.io/v2';

// Arrays to save the asset and history data in
const assetDataArray = [];
let historyDataArray = [];

// Placeholder ID, replace dynamically in the future
let cryptocurrencyId;

async function fetchCoinData()
{
    try {
        const apiKey = '829151b9-2424-46c2-9acb-7bf82aec9f3b';

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

        // Process the data and add symbolLowerCase property to each asset object
        const processedAssets = assetData.data.map(asset => {
            return {
                changePercent24Hr: asset.changePercent24Hr,
                explorer: asset.explorer,
                id: asset.id,
                marketCapUsd: asset.marketCapUsd,
                maxSupply: asset.maxSupply,
                name: asset.name,
                priceUsd: asset.priceUsd,
                rank: asset.rank,
                supply: asset.supply,
                volumeUsd24Hr: asset.volumeUsd24Hr,
                vwap24Hr: asset.vwap24Hr,
                symbol: asset.symbol,
                symbolLowerCase: asset.symbol.toLowerCase() // Add symbolLowerCase property
            };
        });

        assetDataArray.push(processedAssets);
        console.log('ASSETS.');
        console.log(assetDataArray);

        // console.log(processedAssets[0].symbolLowerCase + "wdjkkbdwbhwd");

        var coinTemplate = $("#crypto-template").html();

        var renderTemplate = Mustache.render(coinTemplate, assetData);

        $("#crypto-overview-table").append(renderTemplate);

        // Remove the loading screen once the page loads
        document.getElementById('loading-screen').style.display = "none";

    // Catch errors beforehand to prevent crashing of the web application
    } catch(error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

// Load the history modal, add a line chart using chart.js
async function loadModal(id, $this) {
    const apiKey = '829151b9-2424-46c2-9acb-7bf82aec9f3b';
    // Calculate timestamps for the past week
    const endTimestamp = Date.now();
    // 7 days in milliseconds
    const startTimestamp = endTimestamp - (7 * 24 * 60 * 60 * 1200);

    cryptocurrencyId = $this.id;
    console.log(cryptocurrencyId + ' - Full ID');

    // Make the GET request
    const historyCall = await fetch(`https://api.coincap.io/v2/assets/${cryptocurrencyId}/history?interval=d1&start=${startTimestamp}&end=${endTimestamp}`, {
        method: 'GET',
        // Give authorization headers with the API key
        headers: {
            'Authorization': `Bearer ${apiKey}`,
        },
    });

    // Check if the request went through
    if (!historyCall.ok) {
        throw new Error('Error fetching data from `history`');
    }

    // Gather the data
    const historyData = await historyCall.json();
    historyDataArray = [historyData];
    console.log('HISTORY.');
    console.log(historyDataArray);
    console.log('Full cryptocurrency ID: ' + cryptocurrencyId);

    // Get the crypto ID dynamically
    const cryptoId = id;
    console.log('Cryptocurrency ID: ' + cryptoId);
    const assets = assetDataArray[0];

    var historyModalTemplate = $("#history-modal-template").html();

    const historyContext = {
        id: assets[cryptoId].id,
        name: assets[cryptoId].name,
        priceUsd: assets[cryptoId].priceUsd,
        marketCapUsd: assets[cryptoId].marketCapUsd,
        symbolLowerCase: assets[cryptoId].symbol.toLowerCase()
    };

    console.log(historyContext);

    var renderHistory = Mustache.render(historyModalTemplate, historyContext);
    console.log(renderHistory);

    // Check if the rendered template is not empty before appending
    if (renderHistory.trim()) {
        $("#history-information").append(renderHistory);
        // Display the modal
        document.getElementById('modal-wrapper').style.display = "block";
    } else {
        console.error('Empty template. Data might be missing or incorrect.');
    }

    // Remove the loading screen
    document.getElementById('loading-screen').style.display = "none";


    // Create the line chart with graph.js (loaded in index)
    function createLineChart()
    {
        // Extract the datetime and prices from the API data
        const timestamps = historyDataArray[0].data.map(entry => new Date(entry.time).toLocaleDateString());
        const prices = historyDataArray[0].data.map(entry => parseFloat(entry.priceUsd));
        const assets = assetDataArray[0];
        const cryptoName = assets[cryptoId].name;
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
                    label: `${cryptoName} Price (USD)`,
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

// Add an event listener to the "Save to Database" button
document.getElementById('save-to-database').addEventListener('click', function() {
    // Extract the data you want to save (you can customize this part)
    const dataToSave = {
        // Example data, modify this to match your use case
        name: 'Bitcoin',
        priceUsd: 50000,
        marketCapUsd: 900000000000
    };

    // Make an AJAX request to save the data
    $.ajax({
        url: 'save_crypto_data.php', // URL to your PHP backend file
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(dataToSave),
        success: function(response) {
            console.log(response); // Log the server response (success or error message)
        },
        error: function(error) {
            console.error('Error saving data:', error);
        }
    });
});

fetchCoinData();