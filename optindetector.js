function isGithubProject() {
    return [...document.querySelectorAll(".BorderGrid-cell>h2")].length > 0
}

function isHacktoberfestEnabled() {
    return [...document.querySelectorAll("a.topic-tag")].map(tag => tag.href).some(url => url.endsWith("/topics/hacktoberfest"))
}

function enableLabel() {
    if (!document.querySelector("#hacktoberfest-optin-label")) {
        var labelElement = document.createElement("div")
        labelElement.id = "hacktoberfest-optin-label"
        labelElement.innerHTML = '<h5 class="mb-1"><img style="vertical-align:middle" src="https://avatars.githubusercontent.com/u/35706162?s=35"> &nbsp;This repository has opted-in to the Hacktoberfest project!</h5>'
        labelElement.className = "flex-justify-between flex-column flex-md-row flex-md-items-center flash flash-success mb-3 d-flex"
        if (document.querySelector("#repo-content-pjax-container .gutter-condensed div")) {
            // User is logged off
            document.querySelector("#repo-content-pjax-container .gutter-condensed div").prepend(labelElement)
        } else {
            // User is logged on
            document.querySelector(".Layout-main").prepend(labelElement)
        }
    }
}

function disableLabel() {
    document.body.style.border = "0px"
    let labelElement = document.querySelector("#hacktoberfest-optin-label")
    if (labelElement) {
        labelElement.parentElement.removeChild(labelElement)
    }
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
