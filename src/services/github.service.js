const fetch = require("node-fetch");
function GithubService() {
}
// Fetch repositiories from Github relating to nodejs with pagination limit 10
GithubService.prototype.fetchRepos = async (pageNumber) => {
    return fetch('https://api.github.com/search/repositories?q=nodejs&per_page=10&page=' + pageNumber)
        .then(response => response.json())
        .then(data => data)
        .catch(err => console.log(err));
}

module.exports = {
    GithubService: GithubService
}