import { compress } from "./encodeURL.js";

const USER_PROMPT = document.querySelector("#userprompt");
const SEND_BUTTON = document.querySelector("#sendbtn");
const DIAGRAM = document.querySelector("#diagram img");
const CHAT = document.querySelector("#chat p")

const plantUMLCode = '@startuml\nBob -> Alice : hello\n@enduml';

SEND_BUTTON.addEventListener("click", processInput);

function processInput() {
    let userInput = USER_PROMPT.value;
    CHAT.innerHTML = userInput;


    console.dir(DIAGRAM);
    let src = compress(userInput);
    console.dir(src);
    DIAGRAM.src = src;
}





