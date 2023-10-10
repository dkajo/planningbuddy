import { compress } from "./plantuml/encodeURL.js";
import { callOpenai } from "./apicalls/api.js";

const USER_PROMPT = document.querySelector("#userprompt");
const SEND_BUTTON = document.querySelector("#sendbtn");
const DIAGRAM = document.querySelector("#diagram img");
const CHAT = document.querySelector("#chat p")

SEND_BUTTON.addEventListener("click", processInput);

function processInput() {
    let userInput = USER_PROMPT.value; // Retrieves user input
    //et src = compress(userInput); // Takes the userInput and compresses it in to a png url

    //DIAGRAM.src = src; // Updates the img tag with the new source

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

    callOpenai(messageArr).then(data => {
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


