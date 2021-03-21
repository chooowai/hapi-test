const fetch = require("node-fetch");


module.exports = {
    // Fetch repositiories from Github relating to nodejs with pagination limit 10
    async fetchRepos(pageNumber) {
        return fetch('https://api.github.com/search/repositories?q=nodejs&per_page=10&page=' + pageNumber)
            .then(response => response.json())
            .then(data => data)
            .catch(err => console.log(err));
    }
}