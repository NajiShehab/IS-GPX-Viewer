$(document).ready(function() {
    $('#username').focus();

    $('#submit').click(function() {

    event.preventDefault(); // prevent PageReLoad

    var ValidEmail = $('#username').val() === 'admin'; // User validate
    var ValidPassword = $('#password').val() === 'admin'; // Password validate

    if (ValidEmail === true && ValidPassword === true) { // if ValidEmail & ValidPassword
        $('.valid').css('display', 'block');
        window.location = "index.html"; // go to index.html
    }
    else {
        $('.error').css('display', 'block'); // show error msg
    }


    });
});