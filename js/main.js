// API key and URL to call

// Replaced dynamically by the cryptocurrency ID
const cryptocurrencyId = 'bitcoin';
const apiKey = '829151b9-2424-46c2-9acb-7bf82aec9f3b';
const apiUrl = 'https://api.coincap.io/v2';

// Endpoint, currently assets
const endpoint = `/assets`;

function fetchCoinData()
{
    // Make the GET request
    fetch(`${apiUrl}${endpoint}`, {
    method: 'GET',
    // Give authorization headers with the API key
    headers:
    {
        'Authorization': `Bearer ${apiKey}`,
    },
    })

    // Check the response the API call returns
    .then((response) => {
    if (!response.ok)
    {
        throw new Error('A network error has occured.');
    }
    return response.json();
    })

    // Process the data and log it into the console
    .then((data) => {
        // const coinTemplate = document.getElementById('crypto-template').innerHTML;

        // const renderedCoins = data.data.map((coin) => {
        //     return Mustache.render(coinTemplate, coin);
        // });

        // console.log(renderedCoins.join(''));

        // document.getElementById('crypto-overview-table tbody').innerHTML = renderedCoins.join('');
        var coinTemplate = $("#crypto-template").html();

        var renderTemplate = Mustache.render(coinTemplate, data);

        $("#crypto-overview-table").append(renderTemplate);

        // Remove the loading screen once the page loads
        document.getElementById('loading-screen').style.display = "none";

        // Attach click event handlers to load the history modal
        const learnMoreLinks = document.querySelectorAll('.learn-more-link');
        learnMoreLinks.forEach((link) => {
            link.addEventListener('click', () => {
                loadModal(link.dataset.coinId);
            });
        });
    })

    // Catch errors beforehand to prevent crashing of the web application
    .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
    });
}


// Load the history modal, add a line chart using chart.js

function loadModal(id)
{
    // API key and URL to call
    console.log(id);
    // Get the crypto ID dynamically
    const cryptocurrencyId = id;
    const apiKey = '829151b9-2424-46c2-9acb-7bf82aec9f3b';
    const apiUrl = 'https://api.coincap.io/v2';
    // Calculate timestamps for the past week
    const endTimestamp = Date.now();
    // 7 days in milliseconds
    const startTimestamp = endTimestamp - (7 * 24 * 60 * 60 * 1200);

    // Endpoint, fetches the crypto data through /assets/ and gets the history from the past 7 days
    const endpoint = `/assets/${cryptocurrencyId}/history?interval=d1&start=${startTimestamp}&end=${endTimestamp}`;

    // Create the line chart with graph.js (loaded in index)
    async function createLineChart() {
    try {
    // Make the GET request
    fetch(`${apiUrl}${endpoint}`, {
        method: 'GET',
        // Give authorization headers with the API key
        headers:
        {
            'Authorization': `Bearer ${apiKey}`,
        },
    })

    // Check the response the API call returns
    .then((response) => {
    if (!response.ok)
    {
        // Throw an error message in the console if an error occurs
        throw new Error('A network error has occured.');
    }
    return response.json();
    })

    // Process the data and log it into the console
    .then((data) => {
        const historyModalData = {
            coin: data.data[0],
        };
    
        const historyModalTemplate = document.getElementById('history-modal-template').innerHTML;
        const renderedHistoryModal = Mustache.render(historyModalTemplate, historyModalData);
    
        document.getElementById('history-modal').innerHTML = renderedHistoryModal;
    
        // Display the modal
        document.getElementById('modal-wrapper').style.display = "block";
    
        // Remove the loading screen
        document.getElementById('loading-screen').style.display = "none";
    

        // Extract the datetime and prices from the API data
        const timestamps = data.data.map(entry => new Date(entry.time).toLocaleDateString());
        const prices = data.data.map(entry => parseFloat(entry.priceUsd));

        // Create a line chart using Chart.js
        const ctx = document.getElementById('cryptoChart').getContext('2d');
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
    })}
    // Catch errors pre-emptively and log them into the console
    catch (error)
    {
        console.error('Error:', error);
    }
    // Display the modal
    document.getElementById('modal-wrapper').style.display = "block";
}
// Create the line chart by running the function
createLineChart();
}

// Remove the modal by displaying it as none when the function is activated
function removeModal()
{
    document.getElementById('modal-wrapper').style.display = "none";
}

fetchCoinData();