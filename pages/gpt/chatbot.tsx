import { Dispatch, SetStateAction, useState } from "react";

const systemMessage = { //  Explain things like you're talking to a software professional with 5 years of experience.
    "role": "system", "content": "Explain things like you're talking to a software professional with 5 years of experience."
}

type MessageT = {
    message: string;
    sentTime?: string;
    direction?: string;
    sender: string;
}[]

async function processMessageToChatGPT(chatMessages: ({
    message: string;
    sentTime?: string | undefined;
    direction?: string | undefined;
    sender: string;
} | {
    message: string;
    direction: string;
    sender: string;
})[], setMessages: Dispatch<SetStateAction<MessageT>>, setIsTyping: Dispatch<SetStateAction<boolean>>) { // messages is an array of messages

    let apiMessages = chatMessages.map((messageObject: {sender: string, message: string}) => {
        let role = "";
        if (messageObject.sender === "ChatGPT") {
            role = "assistant";
        } else {
            role = "user";
        }
        return { role: role, content: messageObject.message }
    });

    const apiRequestBody = {
        "model": "gpt-3.5-turbo",
        "messages": [
            systemMessage,  // The system message who you want to talk to
            ...apiMessages // The messages from chater
        ]
    }

    await fetch("https://api.openai.com/v1/chat/completions",
        {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + process.env.NEXT_PUBLIC_CHATGPT_API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        }).then((data) => {
            return data.json();
        }).then((data) => {
            console.log(data);
            setMessages([...chatMessages, {
                message: data.choices[0].message.content,
                sender: "ChatGPT"
            }]);
            setIsTyping(false);
        });
}

export default function GptPage() {
    const [messages, setMessages] = useState<MessageT>([
        {
            message: "Hello, I'm ChatGPT a 5 years experienced software professional! Ask me anything!",
            sentTime: "just now",
            sender: "ChatGPT"
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const handleSend = async (message: MessageT) => {
        const newMessage = {
            message: inputValue,
            direction: 'outgoing',
            sender: "user"
        };

        const newMessages = [...messages, newMessage];

        setMessages(newMessages as ({
            message: string;
            sentTime?: string | undefined;
            direction?: string | undefined;
            sender: string;
        } | {
            message: string;
            direction: string;
            sender: string;
        })[]);
        // reset the input value
        setInputValue("");
        // set the typing indicator
        setIsTyping(true);
        // send the message to the chatbot
        await processMessageToChatGPT(newMessages, setMessages, setIsTyping);
    };

    return (
        <div className="flex flex-col">
            <div className="flex w-full justify-center items-center flex-col">
                <div className="w-full bg-blue-500 p-2 text-white">ChatGPT API gpt-3.5-turbo model</div>
                {messages.map((message, index) => (
                    <div className={`flex md:w-3/5 sm:w-full p-4 gap-3 ${message.sender === 'user' ? "justify-end" : "justify-start"} border-green-300`} key={index}>
                        <div className={`${message.sender === 'user' ? "order-last" : "order-first"} p-1 h-auto`}>
                            {message.sender}
                        </div>
                        <div className={`${message.sender === 'user' ? "bg-green-100" : "bg-blue-100"} p-2 rounded-lg`}>
                            <div dangerouslySetInnerHTML={{ __html: message.message }} />
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center items-center h-20">
                {isTyping && <div className="flex justify-center items-center h-10">typing...</div>}
                <div className="pt-4 gap-5">
                    <input type="text" value={inputValue} className="bg-blue-100 w-80 p-2 border-1" onChange={(e) => setInputValue(e.target.value)} />
                    <button onClick={handleSend} className="px-6 py-2 bg-blue-400 hover:bg-blue-700 rounded">Submit Question</button>
                </div>
            </div>
        </div>

    );
}