document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://api.coincap.io/v2/exchanges';

    async function fetchExchangeData() {
        try {
            const response = await fetch(apiUrl);
            if (response.ok) {
                const data = await response.json();
                const exchanges = data.data;
                console.log(exchanges);

                // Get the template from the HTML
                const exchangeTemplate = document.getElementById('exchange-template').innerHTML;
                
                // Render the template with Mustache.js
                const renderedExchanges = Mustache.render(exchangeTemplate, { exchanges });

                // Append the rendered data to the exchange-list element
                document.getElementById('exchange-list').innerHTML = renderedExchanges;
            } else {
                throw new Error('Error fetching exchange data from CoinCap API');
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    // Call the function to fetch and display exchange data
    fetchExchangeData();
});
