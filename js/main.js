
const USER_PROMPT = document.querySelector("#userprompt");
const DIAGRAM = document.querySelector("#diagram img");
const CHAT = document.querySelector("#chat p")

const plantUMLCode = '@startuml\nBob -> Alice : hello\n@enduml';

USER_PROMPT.addEventListener("change", processInput);

function processInput() {
    let  = USER_PROMPT.value;
    CHAT.innerHTML = url;

    console.dir(DIAGRAM);
    DIAGRAM.src = url;
}





