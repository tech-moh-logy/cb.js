// Mohammed 
// Chatbot for Jasmine

const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
let userMessage = null; // Variable to store user's message
const inputInitHeight = chatInput.scrollHeight;
const API_KEY = "PASTE-YOUR-API-KEY"; // Paste your API key here

// Function to create a chat <li> element
const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}

// Function to generate GPT-based response
const generateResponseGPT = (chatElement) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = chatElement.querySelector("p");
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}],
        })
    }

    fetch(API_URL, requestOptions)
        .then(res => res.json())
        .then(data => {
            messageElement.textContent = data.choices[0].message.content.trim();
        })
        .catch(() => {
            messageElement.classList.add("error");
            messageElement.textContent = "We are currently experiencing a technical difficulty. Don't worry, our engineers are working hard to resolve it. In the meantime, would you like to try our rule-based bot for basic inquiries?";
        })
        .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

// Function to handle rule-based responses
// const handleRuleBasedResponse = (message) => {
    // Your rule-based logic here
    // let response = "This is a rule-based response to: " + message;
    // let response = "Hi, I am the rule-based chatbot.";
    // return response;
// }

// Function to handle rule-based responses
const handleRuleBasedResponse = (message) => {
    // Convert the user's message to lowercase for easier comparison
    const lowercaseMessage = message.toLowerCase();

    // Default response
    let response = "Hi, I am the rule-based chatbot. How can I assist you with Jasmine's Jewelries?";

    // Hi, I am the rule-based chatbot. How can I assist you with Jasmine's Jewelries?
    // Switch case to handle different user inputs
    switch (lowercaseMessage) {

        case 'shipping':
        case 'delivery':
        case "deliver":
        case "ship":
            response = "To ensure the safe arrival of your jewelry, we use a secure shipping method. This service has a minimum cost of $25."
            break;

        case 'hi':
        case 'hello':
        // case 'aye':
        // case 'whats up?':
        // case 'my dude':
            response = "I am doing well. Let me know if you need something.";
            break;
        
        case 'aye':
        case 'whats up?':
        case 'my dude':
            response = "Aye...my bro...whats poppin'";
            break;

        case 'who are you?':
        case 'who r u?':
        case 'who are you?':
        case 'who r you?':
        case 'who are u?':
        case "who are you?":
        case "who r u?":
        case "who are you":
        case "who r you":
        case "who are u?":
            response = "Hello! I'm Jasmine's Jewelries' AI assistant. I'm here to provide assistance with your jewelry inquiries while our advanced AI is unavailable. What can I help you with?";
            break;

        case 'special jewels':
        case 'special jewelries':
        case 'special':
        case 'royal':
        case 'royal boutique':
        case 'lux':
        case 'luxury items':
            // Response for special jewels or luxury items
            response = "Check out the 'Royal Boutique' section to view all of our expensive and rare items.";
            break;

        case 'least expensive':
        case 'least expensive items':
        case 'cheapest':
            // Response for least expensive items
            response = "Our least expensive item is a diamond ring; valued at $2,500.";
            break;

        case 'most expensive':
        case 'expensive':
        case 'most expensive items':
            // Response for most expensive items
            response = "Our most expensive item is the golden-platinum-diamond watch, priced at $10,900,000. For security purposes, proof of net worth exceeding $15,000,000 is required to view items in this price range.";
            break;

        case 'financing':
        case "budget":
        case "payment":
        case "payment option":
        case "payment options":
        case "finance":
            response = "We offer flexible financing options through Jasmine's Jewelies' bank to make your dream jewelry a reality.  A minimum down payment of 75% is required, and you can choose a payment plan that suits you best: 6, 12, 18, or 24 months, all with a low interest rate of 2.5%";
            break;

        default:
            // Default response if user input doesn't match any case
            break;
    }

    return response;
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);

        // Pass the original user message to handleRuleBasedResponse
        const ruleBasedResponse = handleRuleBasedResponse(userMessage);
        incomingChatLi.querySelector("p").textContent = ruleBasedResponse;

    }, 600);
}


// const handleChat = () => {
//     userMessage = chatInput.value.trim();
//     if (!userMessage) return;

//     chatInput.value = "";
//     chatInput.style.height = `${inputInitHeight}px`;

//     chatbox.appendChild(createChatLi(userMessage, "outgoing"));
//     chatbox.scrollTo(0, chatbox.scrollHeight);

//     setTimeout(() => {
//         const incomingChatLi = createChatLi("Thinking...", "incoming");
//         chatbox.appendChild(incomingChatLi);
//         chatbox.scrollTo(0, chatbox.scrollHeight);

//         // Check if user wants to use the rule-based bot
//         if (userMessage.toLowerCase() === 'yes') {
//             const ruleBasedResponse = handleRuleBasedResponse(userMessage);
//             incomingChatLi.querySelector("p").textContent = ruleBasedResponse;
//         } else if (userMessage.toLowerCase() === 'no') {
//             incomingChatLi.querySelector("p").textContent = "Thank you for your inquiry. If you would like to get back, say 'Hey JJ'.";
//         } else if (userMessage.toLowerCase() === 'hey jj') {
//             incomingChatLi.querySelector("p").textContent = "Hey there! How can I assist you today?";
//         } else {
//             generateResponseGPT(incomingChatLi);
//         }
//     }, 600);
// }



// Event listeners
chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));



document.addEventListener("DOMContentLoaded", function() {
    const chatbotToggler = document.querySelector('.chatbot-toggler');
    const chatbot = document.querySelector('.chatbot');
    const closeBtn = document.querySelector('.close-btn');
  
    chatbotToggler.addEventListener('click', function() {
      chatbot.classList.toggle('show-chatbot');
    });
  
    closeBtn.addEventListener('click', function() {
      chatbot.classList.remove('show-chatbot');
    });
  });
  
