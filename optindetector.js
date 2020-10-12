function checkIfEnrolled() {
    console.log("[Hacktoberfest Tag Detector] Check started")
    let GITHUB_API_USERNAME;
    let GITHUB_API_TOKEN;

    try {
        GITHUB_API_USERNAME = browser.storage.sync.get("username");
        GITHUB_API_TOKEN = browser.storage.sync.get("token");
    } catch {
        alert("[Hacktoberfest Tag Detector] Please enter username/token in the settings page!");
        browser.runtime.openSettingsPage();
        return;
    }

    if (GITHUB_API_USERNAME.length < 1 || GITHUB_API_TOKEN.length < 1) {
        alert("[Hacktoberfest Tag Detector] Please enter username/token in the settings page!");
        browser.runtime.openSettingsPage();
        return;
    }

    let headers = new Headers();
    headers.append('Authorization', 'Basic ', btoa(`{GITHUB_API_USERNAME}:{GITHUB_API_TOKEN}`));

    const targetItems = document.querySelector("[data-tab-item='code-tab']").attributes['href'].value.split("/")
    const user = targetItems[1]
    const repo = targetItems[2]

    fetch("https://api.github.com/repos/" + user + "/" + repo + "/labels", {
        method: 'GET',
        headers: headers
    })
        .then(response => response.json())
        .then(json => {
            const labelNames = json.map(i => i.name);
            const isHacktoberfestRepo = labelNames.includes("hacktoberfest") || labelNames.includes("hacktoberfest-accepted");
            document.body.style.border = isHacktoberfestRepo ? "5px solid green" : "5px solid blue";
            console.log(isHacktoberfestRepo ? "Hacktoberfest Tag Detector - Opted-in repository" : "Hacktoberfest Tag Detector - Not opted-in repository")
        })
        .catch(e => console.log(e))

}


function isGithubProject() {
    try {
        if (document.querySelector(".application-main").children[0].attributes.itemtype.value === "http://schema.org/SoftwareSourceCode")
            return true;
        else
            return false;
    } catch (e) {
        return false;
    }
}


if (isGithubProject()) {
    console.log("[Hacktoberfest Tag Detector] GitHub Project detected");
    document.addEventListener("keyup", function (e) {
        var key = e.key || e.keyCode;
        if (key === 'h' || key === 'KeyH' || key === 72) {
            checkIfEnrolled()
        }
    });
} else {
    console.log("[Hacktoberfest Tag Detector] GitHub Project not detected");
}
