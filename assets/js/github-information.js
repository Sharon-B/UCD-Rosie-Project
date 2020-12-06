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
} // If text is entered into input field we will display the loading gif.

