// const githubService = require("../services/github.service");

githubService = undefined;
function GithubController(povidedGithubService) {
    githubService = povidedGithubService;
};
// fetch the results from GithubService used to API only
GithubController.prototype.fetch = (request) => {
    const pageNumber = request.query.page;
    return githubService.fetchRepos(pageNumber);
};

// render the table and buttons with the results from GithubService
GithubController.prototype.render = async(request, reply) => {
    let pageNumber = request.query.page;
    if(pageNumber == undefined) {
        pageNumber = 1;
    } else {
        pageNumber = parseInt(pageNumber);
    }
    return new Promise((resolve, reject) => {
        githubService.fetchRepos(pageNumber).then(res => {
            const total = res.total_count < 1000? res.totalcount : 1000; // Only up to 1000 results allowed by Github API
            const max = Math.round(total/10);
            resolve(reply.view('index', {
                title: 'Home Page',
                nextPage: pageNumber == max ? undefined : pageNumber + 1,
                previousPage: pageNumber === 1 ? undefined : pageNumber - 1,
                firstPage: 1,
                lastPage: max,
                result: res.items
            }));
        });
    });
};

module.exports = {
    GithubController: GithubController
}