function checkIfEnrolled() {
    console.log("Requested tag check")
    let headers = new Headers();
    headers.append('Authorization', 'Basic ', btoa(`{GITHUB_API_USERNAME}:{GITHUB_API_TOKEN}`))

    const targetItems = document.querySelector("[data-tab-item='code-tab']").attributes['href'].value.split("/")
    const user = targetItems[1]
    const repo = targetItems[2]
    console.log(targetItems);
    console.log(`Test user: ${user}, ${repo}`)
    console.log("TEST");

    fetch("https://api.github.com/repos/" + user + "/" + repo + "/labels", {
        method: 'GET',
        headers: headers
    })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            labelNames = json.map(i => i.name)
            const isHacktoberfestRepo = "hacktoberfest" in labelNames || "hacktoberfest-accepted" in labelNames
            document.body.style.border = isHacktoberfestRepo ? "5px solid green" : "5px solid blue";
            console.log(isHacktoberfestRepo ? "Hacktoberfest Tag Detector - Opted-in repository" : "Hacktoberfest Tag Detector - Not opted-in repository")
        })
        .catch(e => console.log(e))

}

let isGithubProjectPage = false;
try {
    isGithubProjectPage = document.querySelector(".application-main").children[0].attributes["itemtype"].value === "http://schema.org/SoftwareSourceCode"
} catch (e) {
    isGitHubProjectPage = false;
}

if (isGithubProjectPage) {
    console.log("Hacktoberfest Tag Detector - GitHub Project detected");
    document.addEventListener("keyup", function (e) {
        var key = e.key || e.keyCode;
        if (key === 'h' || key === 'KeyH' || key === 72) {
            checkIfEnrolled()
        }
    });
} else {
    console.log("Hacktoberfest Tag Detector - GitHub Project not detected");
}
