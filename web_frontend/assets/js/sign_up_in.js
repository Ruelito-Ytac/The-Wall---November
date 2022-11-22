document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("sign_in_form").addEventListener("submit", submitSignIn); /* This will submit the sign in form. */
    document.getElementById("sign_up_form").addEventListener("submit", submitSignUp); /* This will submit the sign up form. */
    document.addEventListener("click", toggleSignUpIn);                               /* This will toggle show sign in up block. */
});

/**
 * DOCU: This will submit the sign in form. <br />
 * Last Updated Date: November 20, 2022
 * @param event - The event object is automatically passed to the event handler by the browser.
 * @author: Ruelito
 */
const submitSignIn = (event) => {
    event.preventDefault();

    validateInput(document.querySelectorAll("#sign_in_form .required_input"));

    if(!document.querySelectorAll("#sign_in_form .input_error").length){
        window.location.href = `${ window.location.origin }/web_frontend/views/timeline.html`;
    }
}

/**
 * DOCU: This will submit the sign up form. <br />
 * Last Updated Date: November 20, 2022
 * @param event - The event object is automatically passed to the event handler by the browser.
 * @author: Ruelito
 */
const submitSignUp = (event) => {
    event.preventDefault();

    validateInput(document.querySelectorAll("#sign_up_form .required_input"));

    if(!document.querySelectorAll("#sign_up_form .input_error").length){
        document.getElementById("sign_up_form").reset();
        toggleShowSignPage(event);
    }
}

/**
 * DOCU: This will toggle the sign up in block. <br />
 * Last Updated Date: November 20, 2022
 * @param event - The event object is automatically passed to the event handler by the browser.
 * @author: Ruelito
 */
const toggleSignUpIn = (event) => {
    if(event.target.classList[ITEMS.first_item] === "sign_up_in_btn"){
        toggleShowSignPage(event);
    }
}

/**
 * DOCU: This will toggle show the sign up in block. <br />
 * Last Updated Date: November 20, 2022
 * @param event - The event object is automatically passed to the event handler by the browser.
 * @author: Ruelito
 */
const toggleShowSignPage = (event) => {
    document.getElementById("form_wrapper").querySelectorAll(".hidden")[ITEMS.first_item].classList.remove("hidden");
    event.target.closest(".sign_up_in_form_wrapper").classList.add("hidden");
}