function sendMail(contactForm) {
    //first argument is our Service Id the second argument is our Template Id, 
    // third argument is the Template that contains our parameters:
    emailjs.send("service_neix638", "template_5qd7pir", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "project_request": contactForm.projectsummary.value
        // wires in our template emailJS parameters to the values from our contactForm input fields 
    }) 
    .then(
        function(response) {
            console.log("SUCCESS", response);
        },
        function(error) {
            console.log("FAILED", error);
        });
    return false;  // To block from loading a new page
}