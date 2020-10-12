function saveOptions(e) {
    e.preventDefault();
    browser.storage.sync.set({
        username: document.querySelector("#username").value,
        token: document.querySelector("#token").value
    });
}

function restoreOptions() {

    function setCurrentChoiceUsername(result) {
        document.querySelector("#username").value = result.username || "";
    }

    function setCurrentChoiceToken(result) {
        document.querySelector("#token").value = result.token || "";
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    let gettingUsername = browser.storage.sync.get("username");
    gettingUsername.then(setCurrentChoiceUsername, onError);

    let gettingToken = browser.storage.sync.get("token");
    gettingToken.then(setCurrentChoiceToken, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
