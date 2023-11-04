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
                symbolLowerCase: asset.symbol.toLowerCase()
            };
        });

        // Push all values into one large array
        assetDataArray.push(processedAssets);
        // Log all the assets and object values into the console
        console.log('ASSETS.');
        console.log(assetDataArray);

        // Get the template from the HTML
        var coinTemplate = $("#crypto-template").html();
        // Get all the assets with custom values and add them to the template
        var assetTemplateData = { processedAssets: assetDataArray[0] };

        if (coinTemplate)
        {
            // Render the template into HTML
            var renderTemplate = Mustache.render(coinTemplate, assetTemplateData);
            // Append the template to the table
            $("#crypto-overview-table").append(renderTemplate);

            // Remove the loading screen once the page loads
            document.getElementById('loading-screen').style.display = "none";
        }
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
    // Append the history data to an array
    historyDataArray = [historyData];
    // Log the entire crypto ID and history data into the console
    console.log('HISTORY.');
    console.log(historyDataArray);
    console.log('Full cryptocurrency ID: ' + cryptocurrencyId);

    // Get the crypto ID dynamically
    const cryptoId = id;
    // Log the cryptocurrency ID into the console, create an assets variable
    console.log('Cryptocurrency ID: ' + cryptoId);
    const assets = assetDataArray[0];

    // Get the history modal template from the HTML
    var historyModalTemplate = $("#history-modal-template").html();

    // Define the history context
    const historyContext = {
        id: assets[cryptoId].id,
        name: assets[cryptoId].name,
        priceUsd: assets[cryptoId].priceUsd,
        marketCapUsd: assets[cryptoId].marketCapUsd,
        symbolLowerCase: assets[cryptoId].symbol.toLowerCase()
    };

    // Create a mustache render request with the modal history data
    var renderHistory = Mustache.render(historyModalTemplate, historyContext);
    // Append the modal history data to the history information template
    $("#history-information").append(renderHistory);

    // Display the modal
    document.getElementById('modal-wrapper').style.display = "block";
    
    // Add an event listener to the "Save to Database" button
    document.getElementById('save-to-database').addEventListener('click', function() {
        // Data to save into the database (from assets)
        const dataToSave = {
            // Example data, modify this to match your use case
            coin_name: assets[cryptoId].name,
            coin_price: assets[cryptoId].priceUsd,
            amount_coins: 1,
            total_value: assets[cryptoId].marketCapUsd
        };

        // Make an AJAX request to save the data
        $.ajax({
            // PHP database upload URL as a JSON POST request
            url: 'inc/add_coins_db.php',
            type: 'POST',
            contentType: 'application/json',
            // Convert data to a JSON string
            data: JSON.stringify(dataToSave),
             // Log the server response (success or error message)
            success: function(response) {
                console.log(response);
            },
            error: function(error) {
                console.error('Error saving data:', error);
            }
        });
    });

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

        // Get a new 2d canvas and chart
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

$(document).ready(function() {
    // Fetch data from the server
    $.ajax({
        url: 'inc/get_coins_db.php',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            // Use Mustache.js to render the template
            var cryptofolioTemplate = $('#coins-cryptofolio-template').html();
            var renderedCryptofolio = Mustache.render(cryptofolioTemplate, { data: data });

            // Append the rendered data to the table body
            $('#crypto-folio-table tbody').html(renderedCryptofolio);
            console.log(data);
        },
        error: function(xhr, status, error) {
            // Handle errors here
            console.error(xhr.responseText);
        }
    });

    // Event listener for update button clicks
    $('#crypto-folio-table').on('click', '#update-database-button', function() {
        // Get the ID of the clicked row
        const id = $(this).val();
        // Get the updated amount from the input field in the same row
        const amount = $(this).closest('tr').find('.amount-input').val();

        // Create an object with the data to be updated
        const dataToUpdate = {
            id: id,
            amount: amount
        };

        // Make an AJAX request to update the database
        $.ajax({
            url: 'inc/update_coins_db.php',
            method: 'POST',
            dataType: 'json',
            data: JSON.stringify(dataToUpdate),
            contentType: 'application/json',
            success: function(response) {
                // Handle the success response from the server
                console.log(response);
                alert('Successfully updated ' + id);
            },
            error: function(xhr, status, error) {
                // Handle errors here
                console.error(xhr.responseText);
            }
        });
    });

    // Event listener for delete button clicks
    $('#crypto-folio-table').on('click', '#delete-database-button', function() {
        // Get the ID of the clicked row
        const id = $(this).val();

        // Make an AJAX request to delete the record from the database
        $.ajax({
            url: 'inc/delete_coins_db.php',
            method: 'POST',
            dataType: 'json',
            data: JSON.stringify({ id: id }),
            contentType: 'application/json',
            success: function(response) {
                // Handle the success response from the server
                console.log(response);
                alert('Successfully deleted ' + id);
            },
            error: function(xhr, status, error) {
                // Handle errors here
                console.error(xhr.responseText);
            }
        });
    });

});

fetchCoinData();