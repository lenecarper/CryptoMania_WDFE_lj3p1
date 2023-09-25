// API key and URL to call
const cryptocurrencyId = 'bitcoin'; // Replace this dynamically in an on-click??
const apiKey = '829151b9-2424-46c2-9acb-7bf82aec9f3b';
const apiUrl = 'https://api.coincap.io/v2';

// Endpoint, currently assets
const endpoint = `/assets`;

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
    const coin = Object.keys(data).map(function(key)
    {
        return data[key];
    });

    // Loop through all the coins with the constant variable 'value'
    for (const value of coin)
    {
        // Log the data of the currently selected coin into the console
        console.log(value);
        // Loop through all the coins and print them into the HTML
        for (let i = 0; i < value.length; i++)
        {
            // Add values into the crypto-wrapper tabs, replacing with template soon
            document.getElementById('crypto-wrapper').innerHTML +=
            // Add a table with the crypto data printed into them
            "<table>" +
            "<tr><th>$ " + value[i].symbol + "</th></tr>" +
            "<tr><td>" + value[i].name + "</td></tr>" +
            "<tr><td>" + "Value: " + "$" + value[i].priceUsd + " USD" + "</td></tr>" +
            "<tr><td>" + "Market cap: " + "$" + value[i].marketCapUsd + "</td></tr>" +
            "<tr><td>" + "Trade volume past 24 hours: " + "$" + value[i].volumeUsd24Hr + "</td></tr>" +
            // Load the modal on click, display graph and information below
            "<tr><td onclick='loadModal(" + '"' + value[i].id + '"' + ")'>Learn more about " + value[i].name + "</td></tr>" +
            "</table>";
        }
        // Remove the loading screen once the page loads
        document.getElementById('loading-screen').style.display = "none";
    }
})

// Catch errors beforehand to prevent crashing of the web application
.catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
});


// Load the history modal, add a line chart using chart.js

function loadModal(id)
{
    // API key and URL to call
    console.log(id);
    const cryptocurrencyId = id; // Replace this dynamically in an on-click??
    const apiKey = '829151b9-2424-46c2-9acb-7bf82aec9f3b';
    const apiUrl = 'https://api.coincap.io/v2';
    // Calculate timestamps for the past week
    const endTimestamp = Date.now();
    // 7 days in milliseconds
    const startTimestamp = endTimestamp - (7 * 24 * 60 * 60 * 1200);

    // Endpoint, fetches the crypto data through /assets/ and gets the history from the past 7 days
    const endpoint = `/assets/${cryptocurrencyId}/history?interval=d1&start=${startTimestamp}&end=${endTimestamp}`;

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
        throw new Error('A network error has occured.');
    }
    return response.json();
    })
    
    // Process the data and log it into the console
    .then((data) => {
        const crypto = Object.keys(data).map(function(key)
        {
            return data[key];
        });

        var coin = crypto[0];
        console.log(coin);
        document.getElementById('history-modal').innerHTML = 
        "<table id='history-information'><tr><th>$ " + coin.symbol +
        "<tr><td>" + "Cryptocurrency: " + coin.name + "</td></tr>" +
        "<tr><td>" + "Value: " + "$" + coin.priceUsd + " USD" + "</td></tr>" +
        "<tr><td>" + "Market cap: " + "$" + coin.marketCapUsd + "</td></tr>" +
        "<tr><td>" + "Trade volume past 24 hours: " + "$" + coin.volumeUsd24Hr + "</td></tr>" +
        "</td></tr><tr><td>" + "Supply: " + coin.supply +
        "</td></tr></table>" +
        "<div id='close-modal' onclick='removeModal()'>x</div>" +
        "<div id='full-graph' style='width: 80%; margin: 0 auto;'><canvas id='cryptoChart'></canvas></div>";

        document.getElementById('loading-screen').style.display = "none";

        // Extract timestamps and prices from the data
        const timestamps = data.data.map(entry => new Date(entry.time).toLocaleDateString());
        const prices = data.data.map(entry => parseFloat(entry.priceUsd));

        // Create a line chart using Chart.js
        const ctx = document.getElementById('cryptoChart').getContext('2d');
        const chart = new Chart(ctx, {
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
    })
}   catch (error)
{
    console.error('Error:', error);
}


    // // Catch errors beforehand to prevent crashing of the web application
    // .catch((error) => {
    //     console.error('There was a problem with the fetch operation:', error);
    // });

    document.getElementById('modal-wrapper').style.display = "block";
}
createLineChart();
}

function removeModal()
{
    document.getElementById('modal-wrapper').style.display = "none";
}