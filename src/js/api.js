function fetchCountryData(countryName) {
    const apiUrl = `https://restcountries.com/v3.1/name/${countryName}`;

    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Country not found');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error fetching country data:', error);
            throw error;
        });
}

export { fetchCountryData };