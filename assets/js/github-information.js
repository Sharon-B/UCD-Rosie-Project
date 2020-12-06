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

function repoInformationHTML(repos) { //As the object returned from our github api will be as an array so we can 
    //use the standard .length array method to see if it's equal to zero. If it is our array is empty and there are no repos for that user.
    if(repos.length == 0) {
        return `<div class="clearfix repo-list">No repos!</div>`
    }
    // if there is data in the returned array we want to iterate through it, to do this we create a variable listItemsHTML 
    //which will take the results of the map() method which will be run against our repos array. The map() behaves like a forEach but returns an array
    // with the results of this function
    let listItemsHTML = repos.map(function(repo) {
        return `<li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </li>`;
    });

    return `<div class="clearfix repo-list">
                <p>
                    <strong>Repo List:</strong>
                </p>
                <ul>
                    ${listItemsHTML.join("\n")}   
                </ul>
            </div>`;

            /*As map() returns an array we can use the join() method on that array and join everything with a new line "\n"
            This stops us from having to iterate through the new array once again. */
}

function fetchGitHubInformation(event) {
    $("#gh-user-data").html(""); //]Setting the html to an empty string for these divs has the effect of emptying these divs each time
    $("#gh-repo-data").html("");

    let username = $("#gh-username").val();
    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
        /*This h2 is displayed if input field is empty ie not username*/
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
        $.getJSON(`https://api.github.com/users/${username}`), //.when takes a function as it's first argument, so we use the getJSON function to retrieve the data from the github api
        $.getJSON(`https://api.github.com/users/${username}/repos`) // add a second getJSON to retrieve the users repo data so it ca be displayed
    ).then( // then we want to display it in our gh-user-data & gh-repo-data divs:
        function(firstResponse, secondResponse) { // so we use a function to pass in the respose and declare a userData variable to store it
            let userData = firstResponse[0]; //Now that we have 2 getJSON calls we will have  responses come back
            let repoData = secondResponse[0]; // Now we will also have 2 variables one for each response. The when method will return these as arrays so we need to target the first item in each array using the index
            $("#gh-user-data").html(userInformationHTML(userData)); //set the html of the div to the results of the userInformationHTML function which is yet to be written and set the userData as the argument
            $("#gh-repo-data").html(repoInformationHTML(repoData)); //set the html of the div to the results of the repoInformationHTML function  and set the repoData as the argument
        }, function(errorResponse) { //error function if it doesn't work
            if (errorResponse.status === 404) { // if not found
                $("#gh-user-data").html( // set html to error message
                        `<h2>No info found for user ${username}</h2>`);
            } else if (errorResponse.status === 403) {
                let resetTime = new Date(errorResponse.getResponseHeader('X-rateLimit-Reset')*1000);
                $("#gh-user-data").html(`<h4>Too many requests, please wait until ${resetTime.toLocaleTimeString()}</h4>`);
                
            } else { // if it's another error we will console.log out the error
                console.log(errorResponse);
                $("#gh-user-data").html( // and set our gh-user-data div to the JSON response error that we got.
                    `<h2.>Error: ${errorResponse.responseJSON.message}</h2.>`);
            }
        });
}

$(document).ready(fetchGitHubInformation);