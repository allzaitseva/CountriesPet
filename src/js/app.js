// Main JavaScript file for the Country Search application

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('country-input');
    const findButton = document.getElementById('find-button');
    const resultsContainer = document.getElementById('results');
    const errorMessage = document.getElementById('error-message');

    findButton.addEventListener('click', () => {
        const countryName = searchInput.value.trim();
        if (countryName) {
            fetchCountryData(countryName);
        } else {
            showError('Please enter a country name.');
        }
    });

    searchInput.addEventListener('input', () => {
        const countryName = searchInput.value.trim();
        if (countryName) {
            fetchCountryData(countryName);
        } else {
            clearResults();
        }
    });

    async function fetchCountryData(countryName) {
        clearResults();
        errorMessage.textContent = '';

        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,flags,region,area`);
            if (!response.ok) {
                throw new Error('Country not found');
            }

            const countries = await response.json();
            renderCountries(countries); // Reuse the renderCountries function to display the search result
        } catch (error) {
            showError('Country not found. Please try again.');
        }
    }

    function renderCountries(countries) {
        resultsContainer.innerHTML = ''; // Clear previous results

        countries.forEach(country => {
            const countryCard = document.createElement('div');
            countryCard.classList.add('country-card');

            countryCard.innerHTML = `
                <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" class="country-flag">
                <h2 class="country-name">${country.name.common}</h2>
                <p class="country-capital"><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                <p class="country-region"><strong>Region:</strong> ${country.region}</p>
                <p class="country-area"><strong>Area:</strong> ${country.area.toLocaleString()} km²</p>
            `;

            resultsContainer.appendChild(countryCard);
        });
    }

    function clearResults() {
        resultsContainer.innerHTML = '';
        errorMessage.textContent = '';
    }

    function showError(message) {
        errorMessage.textContent = message;
    }

    fetchAndDisplayCountries();
});

let countriesData = []; // Store fetched countries data

// Fetch and display countries
async function fetchAndDisplayCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,flags,region,area');
        const countries = await response.json();

        // Store the data globally
        countriesData = countries;

        // Render countries sorted alphabetically by default (A-Z)
        renderCountries(countriesData.sort((a, b) => a.name.common.localeCompare(b.name.common)));
    } catch (error) {
        console.error('Error fetching countries:', error);
        document.getElementById('error-message').textContent = 'Failed to load countries. Please try again later.';
    }
}

// Render countries to the DOM
function renderCountries(countries) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results

    countries.forEach(country => {
        const countryCard = document.createElement('div');
        countryCard.classList.add('country-card');

        countryCard.innerHTML = `
            <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" class="country-flag">
            <h2 class="country-name">${country.name.common}</h2>
            <p class="country-capital"><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
            <p class="country-region"><strong>Region:</strong> ${country.region}</p>
            <p class="country-area"><strong>Area:</strong> ${country.area.toLocaleString()} km²</p>
        `;

        resultsContainer.appendChild(countryCard);
    });
}

// Handle sorting and filtering
function handleSortAndFilter() {
    const region = document.getElementById('region-filter').value;
    const sortOption = document.getElementById('sort-filter-options').value;

    let filteredCountries = [...countriesData];

    // Filter by region
    if (region) {
        filteredCountries = filteredCountries.filter(country => country.region === region);
    }

    // Sort the filtered countries
    switch (sortOption) {
        case 'az':
            filteredCountries.sort((a, b) => a.name.common.localeCompare(b.name.common));
            break;
        case 'za':
            filteredCountries.sort((a, b) => b.name.common.localeCompare(a.name.common));
            break;
        case 'area-asc':
            filteredCountries.sort((a, b) => a.area - b.area);
            break;
        case 'area-desc':
            filteredCountries.sort((a, b) => b.area - a.area);
            break;
    }

    // Render the filtered and sorted countries
    renderCountries(filteredCountries);
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayCountries();

    // Add event listeners for sorting and filtering
    document.getElementById('region-filter').addEventListener('change', handleSortAndFilter);
    document.getElementById('sort-filter-options').addEventListener('change', handleSortAndFilter);
});