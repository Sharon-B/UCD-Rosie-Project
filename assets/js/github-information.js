function userInformationHTML(user) {
    return `
        <h2>${user.name}
            <span class="small-name">
                (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
            </span>
        </h2>
        <div class="gh-content">
            <div class="gh-avatar">
                <a href="${user.html_url}" target="_blank">
                    <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}">
                </a>
            </div>
            <p>Followers: ${user.followers} - Following: ${user.following} 
            <br> Repos: ${user.public_repos}</p>
        </div>`;
}

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
    $.getJSON(`https://api.github.com/users/${username}`) //.when takes a function as it's first argument, so we use the getJSON function to retrieve the data from the github api
).then( // then we want to display it in our gh-user-data div:
    function(response) { // so we use a function to pass in the respose and declare a userData variable to store it
        let userData = response;
        $("#gh-user-data").html(userInformationHTML(userData)); //set the html of the div to the results of the userInformationHTML function which is yet to be written and set the userData as the argument
    }, function(errorResponse) { //error function if it doesn't work
        if (errorResponse.status === 404) { // if not found
            $("#gh-user-data").html( // set html to error message
                    `<h2>No info found for user ${username}</h2>`);
        } else { // if it's another error we will console.log out the error
            console.log(errorResponse);
            $("#gh-user-data").html( // and set our gh-user-data div to the JSON response error that we got.
                `<h2.>Error: ${errorResponse.responseJSON.message}</h2.>`);
        }
    });

}