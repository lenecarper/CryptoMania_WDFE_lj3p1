// API key and URL to call
const cryptocurrencyId = 'bitcoin'; // Replace this dynamically in an on-click??
const apiKey = '829151b9-2424-46c2-9acb-7bf82aec9f3b';
const apiUrl = 'https://api.coincap.io/v2';

// Endpoint, currently assets
const endpoint = `/assets`;
// const endpoint = `/assets/${cryptocurrencyId}`;

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

    for (const value of coin)
    {
        console.log(value);
        for (let i = 0; i < value.length; i++)
        {
            document.getElementById('crypto-wrapper').innerHTML +=
            "<table>" +
            "<tr><th>$ " + value[i].symbol + "</th></tr>" +
            "<tr><td>" + value[i].name + "</td></tr>" +
            "<tr><td>" + "Current value: <br>" + "$" + value[i].priceUsd + " USD" + "</td></tr>" +
            "<tr><td>" + "Market cap: " + "$" + value[i].marketCapUsd + "</td></tr>" +
            "<tr><td>" + "Trade volume past 24 hours: " + "$" + value[i].volumeUsd24Hr + "</td></tr>" +
            "<tr><td onclick='loadModal(" + '"' + value[i].id + '"' + ")'>Learn more about " + value[i].name + "</td></tr>" +
            "</table>";
            // document.getElementById('history-modal').innerHTML = "<table><tr><th>$ " + value[i].symbol + "</th></tr><tr><td>" + value[i].name + "</td></tr><tr><td>" + value[i].priceUsd + "</td></tr></table>";
        }
        document.getElementById('loading-screen').style.display = "none";
    }
})

// Catch errors beforehand to prevent crashing of the web application
.catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
});

function loadModal(id, i)
{
    // API key and URL to call
    console.log(id);
    const cryptocurrencyId = id; // Replace this dynamically in an on-click??
    const apiKey = '829151b9-2424-46c2-9acb-7bf82aec9f3b';
    const apiUrl = 'https://api.coincap.io/v2';

    // Endpoint, currently assets
    // const endpoint = `/assets`;
    const endpoint = `/assets/${cryptocurrencyId}`;

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
        document.getElementById('crypto-wrapper').innerHTML +=
        "<table>" +
        "<tr><th>$ " + coin.symbol + "</th></tr>" +
        "<tr><td>" + coin.name + "</td></tr>" +
        "<tr><td>" + coin.priceUsd + "</td></tr>" +
        "</table>";
        document.getElementById('history-modal').innerHTML = 
        "<table><tr><th>$ " + coin.symbol +
        "</th></tr><tr><td>" + coin.name +
        "</th></tr><tr><td>" + coin.name +
        "</th></tr><tr><td>" + coin.name +
        "</td></tr><tr><td>" + coin.priceUsd +
        "</td></tr></table>";
        document.getElementById('loading-screen').style.display = "none";
    })

    // Catch errors beforehand to prevent crashing of the web application
    .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
    });

    document.getElementById('modal-wrapper').style.display = "block";
}

function removeModal()
{
    document.getElementById('modal-wrapper').style.display = "none";
}