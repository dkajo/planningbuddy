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

    console.log("Processing input")

    // Retrieves user input
    let userApiKey = USER_API_KEY.value;
    let userInput = USER_PROMPT.value; 

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

    callOpenai(messageArr, userApiKey).then(data => {
        let apiResponse = data.choices[0].message.content
        console.log(apiResponse)
        let src = compress(apiResponse)
        DIAGRAM.src = src;
    }).catch(error => {
        console.error('Error:', error);
    });
}


/* Sample UML Code
Alice -> Bob: Hello Bob, how are you?
Bob --> Alice: I'm good thanks, Alice!
Alice -> Bob: Great to hear!
*/


