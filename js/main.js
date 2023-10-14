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

    // Log events in chat
        // create a new div element
        const newDiv = document.createElement("div");
      
        // and give it some content
        const newContent = document.createTextNode(userInput);
      
        // add the text node to the newly created div
        newDiv.appendChild(newContent);
      
        // add the newly created element and its content into the DOM
        CHAT.appendChild(newDiv);
    

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
        console.log(apiResponse)
        let src = compress(apiResponse)
        DIAGRAM.src = src;
    }).catch(error => {
        console.error('Error:', error);
    });
}


