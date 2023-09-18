// API key and URL to call
const apiKey = '829151b9-2424-46c2-9acb-7bf82aec9f3b';
const apiUrl = 'https://api.coincap.io/v2';

// Endpoint, currently assets
const endpoint = '/assets';

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
    // console.log(data);
    const coin = Object.keys(data).map(function(key)
    {
        return data[key];
    });

    for (const value of coin)
    {
        for (let i = 0; i < 2; i++)
        {
            console.log(value);
            document.getElementById('crypto-wrapper').innerHTML =
            "<table><tr><th>" + value[i].id + "</th></tr><tr><td>Emil</td></tr><tr><td>16</td></tr></table>";
        }
    }
})

// Catch errors beforehand to prevent crashing of the web application
.catch((error) => {
    console.error('There was a problem with the fetch operation:', error);
});

// function displayDetails(data)
// {
//     if (data)
//     {
//         console.log('testajhdskbabmhad');
//     } 
// }

// document.getElementById('crypto-wrapper').innerHTML = data;