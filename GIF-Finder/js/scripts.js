// 1
window.onload = (e) => { document.querySelector("#search").onclick = searchButtonClicked };

// 2
let displayTerm = "";

// 3
function searchButtonClicked() {
    console.log("searchButtonClicked() called");

    const GIPHY_URL = "https://api.giphy.com/v1/gifs/search?";

    let GIPHY_KEY = "5PuWjWVnwpHUQPZK866vd7wQ2qeCeqg7";

    let url = GIPHY_URL;
    url += "api_key=" + GIPHY_KEY;

    let term = document.querySelector("#searchterm").value;
    displayTerm = term;

    term = term.trim();

    term = encodeURIComponent(term);

    if (term.length < 1) return;

    url += "&q=" + term;

    let limit = document.querySelector("#limit").value;
     url += "&limit=" + limit;

    document.querySelector("#status").innerHTML = "<b>Searching for'" + displayTerm + "'</b>";

    console.log(url);

    // 12 Request data!
    getData(url);
}
//4
function getData(url) {
    let xhr = new XMLHttpRequest();

    xhr.onload = dataLoaded;
    xhr.onerror = dataError;
    xhr.open("GET", url);
    xhr.send();
}
//5
function dataLoaded(e) {
    let xhr = e.target;

    console.log(xhr.responseText);

    //7
    let obj = JSON.parse(xhr.responseText);
    //8
    if (!obj.data || obj.data.length == 0) {
        document.querySelector("#status").innerHTML = "<b>No results found for'" + displayTerm + "'</b>";
        return;
    }
    //9
    let results = obj.data
    console.log("results.length = " + results.length);
    let bigString = "";

    //10
    for (let i = 0; i < results.length; i++) {
        let result = results[i];
        //11
        let smallURL = result.images.fixed_width_downsampled.url;
        if (!smallURL) smallURL = "images/no-image-found.png"

        //12 get the url to the giphy page
        let url = result.url;
        let rating = (result.rating? result.rating :"NA").toUpperCase();
        //13 
        let line = `<div class = 'result'>`;
        line += `<img src ='${smallURL}' title = '$(result.id}'/>`;
        line += `<span><a target = '_blank' href = '${url}'> View on Giphy</a>`;
        line += `<p>Rating: ${rating}</span>`
        line += `</div>`;
        //14 another way to do it
        //15
        bigString += line;
    }
    document.querySelector("#content").innerHTML = bigString;

    document.querySelector("#status").innerHTML = "<b>Success!</b><p><i>Here are " + results.length + "results for'" + displayTerm + "'</i></p>";
}
//6
function dataError(e) {
    console.log("An error occurred");
}
