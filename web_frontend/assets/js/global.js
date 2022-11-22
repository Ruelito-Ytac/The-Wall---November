/**
 * DOCU: This will validate all the input required data. <br />
 * Last Updated Date: November 20, 2022
 * @param selected_input - get the selected input data.
 * @author: Ruelito
 */
const validateInput = (selected_input) => {
    selected_input.forEach((required_item) => {
        (!required_item.value) ? required_item.classList.add("input_error") : required_item.classList.remove("input_error");
    });
}