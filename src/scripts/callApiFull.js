const url = 'https://www.omdbapi.com/?i=';
const apiKey = '&apikey=4095ed63'
const full = ''

function callApiFull(imdbID) {
    fetch(url + imdbID + apiKey)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(`Error while fetching: ${response.statusText}`);
        })
}
