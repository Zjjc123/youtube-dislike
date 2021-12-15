function getVideoId() {
    const url = new URL(window.location.href);
    return url.searchParams.get("v");
}

function getButtons() {
    return document.querySelectorAll(".ytd-toggle-button-renderer");
}

function setDislikes(dislikesCount) {
    console.log(getButtons());
    getButtons()[7].innerText = dislikesCount;
}

function updateUI() {
    if (!location.pathname.startsWith("/watch")) {
        return;
    }

    fetch(
        // uses return-youtube-dislike api
        // could be replaced with own server fetching from the YouTube Data API
        `https://returnyoutubedislikeapi.com/votes?videoId=${getVideoId()}`
    ).then((response) => {
        response.json().then((json) => {
            console.log(json);
            if (json) {
                const { dislikes } = json;
                console.log("Dislike Count: " + dislikes);
                setDislikes(dislikes);
            }
        });
    });
}

// YouTube site doesn't reload pages on navigation but only replaces the history state
// Content scripts aren't reinjected without a page being reloaded
// Adding event listener so script works during navigation

document.addEventListener("yt-navigate-finish", updateUI);
