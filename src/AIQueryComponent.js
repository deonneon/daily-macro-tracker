import React, { useState } from 'react';
import OpenAI from "openai";


const AIQueryComponent = ({ onDataReceived, hideResponse }) => {
    const [showAIInput, setShowAIInput] = useState(false);
    const [aiInputText, setAIInputText] = useState('');
    const [aiResponse, setAiResponse] = useState('');

    const handleAIInputChange = (e) => {
        setAIInputText(e.target.value);
    };

    const handleSubmitToAI = async () => {
        try {
            setAiResponse('Fetching data...');
            const openai = new OpenAI({
                apiKey: process.env.REACT_APP_OPENAI_API_KEY,
                dangerouslyAllowBrowser: true,
            });

            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        "role": "system",
                        "content": "You are a food nutritionist who knows the protein and calorie specifications of all food."
                    },
                    {
                        "role": "user",
                        "content": `What are the macros of a ${aiInputText}? Write a json dictionary with four keys and their values: food_name, protein, calories, and measurement.`
                    }
                ],
                temperature: 1,
                max_tokens: 256,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            });

            if (response && response.choices && response.choices[0]) {
                const aiOutput = response.choices[0].message.content;
                let data;
                try {
                    data = JSON.parse(aiOutput);
                } catch (error) {
                    console.error("Failed to parse AI response:", aiOutput);
                    setAiResponse("Error parsing data from OpenAI.");
                }
                if (data) {
                    setAiResponse(aiOutput);
                    onDataReceived(data); // This will send the data up to FoodInput
                }
            } else {
                console.error("Unexpected response format:", response);
                setAiResponse("Error fetching data from OpenAI.");
            }


            // Clear the input text and hide the AI input field
            setAIInputText('');
            setShowAIInput(false);

        } catch (error) {
            console.error("Error with OpenAI:", error);
        }
    };

    const handleKeyDownAI = (e) => {
        if (e.key === 'Enter' && aiInputText.trim()) {
            handleSubmitToAI();
        }
    };

    return (
        <>
            <button className="askAIButton" onClick={() => setShowAIInput(!showAIInput)}>Ask AI</button>

            {showAIInput && (
                <div className='foodDescriptionForAI'>
                    <input
                        value={aiInputText}
                        onChange={handleAIInputChange}
                        onKeyDown={handleKeyDownAI}
                        placeholder="Please describe the food as detailed as possible."
                    />
                    <button onClick={handleSubmitToAI} disabled={!aiInputText.trim()}>Submit</button>
                </div>
            )}

            {!hideResponse && (
                <div className="ai-response">
                    {aiResponse}
                </div>
            )}
        </>
    );
};

export default AIQueryComponent;
