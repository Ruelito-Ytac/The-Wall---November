document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("post_form").addEventListener("submit", submitPostForm);                    /* This will submit post form item. */
    document.getElementById("logout_btn").addEventListener("click", function(){                         /* This will logout. */
        window.location.href = `${ window.location.origin }/web_frontend/views/sign_up_in.html`;
    });
    document.addEventListener("click", clickSelectedElement);                                           /* Trigger the selected click element. */
});

/**
 * DOCU: This will submit post form item. <br />
 * Last Updated Date: November 20, 2022
 * @param event - The event object is automatically passed to the event handler by the browser.
 * @author: Ruelito
 */
const submitPostForm = (event) => {
    event.preventDefault();

    let post_form = document.getElementById("post_form");
    let post_item = document.getElementById("post_item");
    let post_item_value = post_item.value;
    let post_item_clone = document.getElementById("clone_block").querySelector(".post_item").cloneNode(true);

    (!post_item_value) ? post_form.classList.add("input_error") : post_form.classList.remove("input_error");

    if(post_item_value){
        renderPostReplyData(post_item_clone, post_item, post_form, post_item_value);
        document.getElementById("post_list").prepend(post_item_clone);
        post_form.reset();
        document.getElementById("no_result").classList.add("hidden");
        post_item_clone.querySelector(".delete_item .yes_btn").addEventListener("click", deleteSelectedItem);
    }
}

/**
 * DOCU: This will remove the selected textarea placeholder. <br />
 * Last Updated Date: November 20, 2022
 * @param selected_input - get the selected input data.
 * @author: Ruelito
 */
const removePlaceHolder = (selected_input) => {
    setTimeout(() => {
        (!selected_input.value) ? selected_input.classList.remove("has_value") : selected_input.classList.add("has_value");
    }, TIMEOUT_SPEED.fastest);
}

/**
 * DOCU: Trigger the selected click element. <br />
 * Last Updated Date: November 20, 2022
 * @param event - The event object is automatically passed to the event handler by the browser.
 * @author: Ruelito
 */
const clickSelectedElement = (event) => {
    if(event.target.parentNode.classList){
        /* This will remove the selected item. */
        if(event.target.parentNode.classList[ITEMS.first_item] === "delete_item"){
            deleteSelectedItem(event);
        }
    
        /* This will show the textarea of selected item to updated. */
        if(event.target.parentNode.classList[ITEMS.first_item] === "update_item"){
            showSelectedUpdateItem(event);
        }

        /* This will submit the selected item to update. */
        if(event.target.className === "update_changes"){
            submitUpdateSelectedItem(event);
        }

        /* This will submit the reply data. */
        if(event.target.className === "submit_reply_btn"){
            submitReplyItem(event);
        }

        /* This will remove the selected textarea placeholder. */
        if(event.target.nodeName === "TEXTAREA"){
            removeSelectedPlaceHolder(event);
        }
    }
}

/**
 * DOCU: This will remove the selected item. <br />
 * Last Updated Date: November 20, 2022
 * @param event - The event object is automatically passed to the event handler by the browser.
 * @author: Ruelito
 */
const deleteSelectedItem = (event) => {
    event.target.closest("li").remove();

    /* This will check the theres no post_item left. */
    if(document.querySelectorAll(".post_item").length === ITEMS.one_data){
        document.getElementById("no_result").classList.remove("hidden");
    }
}

/**
 * DOCU: This will show the textarea of selected item to updated. <br />
 * Last Updated Date: November 20, 2022
 * @param event - The event object is automatically passed to the event handler by the browser.
 * @author: Ruelito
 */
const showSelectedUpdateItem = (event) => {
    let selected_item = event.target.closest("li");
    let hide_element_data = [".post_details", ".post_message"];

    hide_element_data.map(selected_item_data => {
        selected_item.querySelector(selected_item_data).classList.add("hidden");
    });
    
    selected_item.querySelector(".update_post_form").classList.remove("hidden");
}

/**
 * DOCU: This will submit the selected item to update. <br />
 * Last Updated Date: November 20, 2022
 * @param event - The event object is automatically passed to the event handler by the browser.
 * @author: Ruelito
 */
const submitUpdateSelectedItem = (event) => {
    let selected_item = event.target.closest("li");
    let hide_element_data = [".post_details", ".post_message"];
    let update_input_item = selected_item.querySelector(".update_input_item");
    let update_form = update_input_item.closest(".update_post_form");

    (!update_input_item.value) ? update_form.classList.add("input_error") : update_form.classList.remove("input_error");

    /* This will update the post message. */
    if(update_input_item.value){
        selected_item.querySelector(".post_message").textContent = update_input_item.value;
        selected_item.querySelector(".update_post_form").classList.add("hidden");

        hide_element_data.map(selected_item_data => {
            selected_item.querySelector(selected_item_data).classList.remove("hidden");
        });
    }
}

/**
 * DOCU: This will submit the reply data. <br />
 * Last Updated Date: November 20, 2022
 * @param event - The event object is automatically passed to the event handler by the browser.
 * @author: Ruelito
 */
const submitReplyItem = (event) => {
    let selected_item = event.target.closest("li");
    let reply_item_clone = document.getElementById("clone_block").querySelector(".reply_data_item").cloneNode(true);
    let reply_item = selected_item.querySelector(".reply_item");
    let reply_item_value = reply_item.value;
    let reply_form = event.target.closest(".post_item").querySelector(".reply_form");

    (!reply_item_value) ? reply_form.classList.add("input_error") : reply_form.classList.remove("input_error");

    /* This will render the reply item data */
    if(reply_item_value){
        renderPostReplyData(reply_item_clone, selected_item, reply_form, reply_item_value);
        selected_item.querySelector(".reply_list").prepend(reply_item_clone);
        reply_form.reset();
    }
}

/**
 * DOCU: This will remove the selected textarea placeholder. <br />
 * Last Updated Date: November 20, 2022
 * @param event - The event object is automatically passed to the event handler by the browser.
 * @author: Ruelito
 */
const removeSelectedPlaceHolder = () => {
    document.querySelectorAll("textarea").forEach(textarea_item => {
        textarea_item.addEventListener("blur", function(){
            removePlaceHolder(textarea_item);
        })
    });
}

/**
 * DOCU: Trigger the selected click element. <br />
 * Last Updated Date: November 20, 2022
 * @param element_clone - This will get the element clone data.
 * @param selected_item - This will get the selected_item data.
 * @param selected_form - This will get the selected_form data.
 * @param item_value - This will get the item value.
 * @author: Ruelito
 */
const renderPostReplyData = (element_clone, selected_item, selected_form, item_value) => {
    element_clone.querySelector(".post_message").textContent = item_value;
    element_clone.querySelector(".update_post_form .update_input_item").value = item_value;
    selected_item.classList.remove("has_value");
    selected_form.reset();
}

/**
 * DOCU: Prevent all form data. <br />
 * Last Updated Date: November 20, 2022
 * @param event - The event object is automatically passed to the event handler by the browser.
 * @author: Ruelito
 */
const preventSubmit = (event) => {
    event.preventDefault();
}