function fetchGitHubInformation(event) {
    let username = $("#gh-username").val();
    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
        /*This h2 is didplayed if input field is empty ie not username*/
        return; //We need to return out of this statement and not fetch data from github api if the input field is empty, so this returns us out of the function.
    }
  
    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading..." />
         </div>`);
 // If text is entered into input field we will display the loading gif.

/* 
JQuery promises:
$.when (
    something has finished happening
).then (
    do something else
) 
*/

$.when(
    $.getJSON('https://api.github.com.users/${username}') //.when takes a function as it's first argument, so we use the getJSON function to retrieve the data from the github api
).then(
    function(response) {
        let userData = response;
        $("#gh-user-data").html(userInformationHTML(userData));
    }, function(errorResponse) {
        if (errorResponse.status === 404) {
            $("#gh-user-data").html(
                    `<h2>No info found for user ${username}</h2>`);
        } else {
            console.log(errorResponse);
            $("#gh-user-data").html(
                `<h2.>Error: ${errorResponse.responseJSON.message}</h2.>`);
        }
    });
}