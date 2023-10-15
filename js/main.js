import { compress } from "./plantuml/encodeURL.js";
import { callOpenai } from "./apicalls/api.js";

const USER_PROMPT = document.querySelector("#userprompt");
const USER_INPUT_FORM = document.querySelector("#userinput")
const DIAGRAM = document.querySelector("#diagram img");
const CHAT = document.querySelector("#chat p")
const USER_API_KEY = document.querySelector("#apikey");

USER_INPUT_FORM.addEventListener("submit", () => processInput(event));

function processInput(event) {
    event.preventDefault();

    // Retrieves user input
    let userApiKey = USER_API_KEY.value;
    let userInput = USER_PROMPT.value; 

    updateChat(userInput);
    updateChat("System: Processing")
    

    let messageArr = [
        {
            role: 'system',
            content: 'Only answer with PlantUML code, no additional comments or descriptions. Only PlantUML code'
        },
        {
            role: 'user',
            content: `${userInput}`
        }
    ];

    // Calling OpenAI's api
    callOpenai(messageArr, userApiKey).then(data => {
        let apiResponse = data.choices[0].message.content
        updateChat("System: " + apiResponse);
        let src = compress(apiResponse)
        DIAGRAM.src = src;
    }).catch(error => {
        console.error('Error:', error);
        updateChat("Something went wrong")
    });
}

// Logs all the events in the chat.
function updateChat (message) {
    const newDiv = document.createElement("div");
    const newContent = document.createTextNode(message);
    newDiv.appendChild(newContent);
    CHAT.appendChild(newDiv);
}
