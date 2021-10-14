function isGithubProject() {
    return [...document.querySelectorAll(".BorderGrid-cell>h2")].length > 0
}

function isHacktoberfestEnabled() {
    return [...document.querySelectorAll("a.topic-tag")].map(tag => tag.href).some(url => url.endsWith("/topics/hacktoberfest"))
}

function enableLabel() {
    document.body.style.border = "5px solid green"
}

function disableLabel() {
    document.body.style.border = "0px"
}

function getProject() {
    const projectElements = document.querySelectorAll("#repository-container-header [itemprop=name] a")
    if (len(projectElements) === 0) {
        return ""
    } else {
        return projectElements[0].href
    }
}

function checkIfHacktoberfestIsEnabled() {
    console.log("[hacktoberfest-optin-checker] running check")
    if (isGithubProject()) {
        if (isHacktoberfestEnabled()) {
        console.log("[hacktoberfest-optin-checker] project has opted in")
        enableLabel()
        } else {
            disableLabel()
        }
    } else {
            disableLabel()
    }
}

checkIfHacktoberfestIsEnabled()


// Attempt to watch for page title changes
const mutationObserver = new MutationObserver(function(mutations, _) {
    checkIfHacktoberfestIsEnabled()
})

mutationObserver.observe(document.querySelector("title"), {childList: true, subtree: false});
