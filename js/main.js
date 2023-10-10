import { compress } from "./plantuml/encodeURL.js";
import { callOpenai } from "./apicalls/api.js";

const USER_PROMPT = document.querySelector("#userprompt");
const SEND_BUTTON = document.querySelector("#sendbtn");
const DIAGRAM = document.querySelector("#diagram img");
const CHAT = document.querySelector("#chat p")

SEND_BUTTON.addEventListener("click", processInput);

function processInput() {
    let userInput = USER_PROMPT.value; // Retrieves user input
    let src = compress(userInput); // Takes the userInput and compresses it in to a png url
    DIAGRAM.src = src; // Updates the img tag with the new source

    callOpenai();
}





