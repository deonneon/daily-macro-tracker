import React, { useState } from 'react';

const AIQueryComponent = ({ onDataReceived, hideResponse }) => {
    const [showAIInput, setShowAIInput] = useState(false);
    const [aiInputText, setAIInputText] = useState('');
    const [aiResponse, setAiResponse] = useState('');

    const handleAIInputChange = (e) => {
        setAIInputText(e.target.value);
    };

    const handleSubmitToAI = async () => {
        setAiResponse('Fetching data...');
        try {
            const response = await fetch('/.netlify/functions/query-openai', {
                method: 'POST',
                body: JSON.stringify({ aiInputText }),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                const aiOutput = await response.json();
                setAiResponse(aiOutput);
                onDataReceived(aiOutput);  // assuming aiOutput is in the expected format
            } else {
                console.error("Error fetching data from OpenAI:", response.statusText);
                setAiResponse("Error fetching data from OpenAI.");
            }
        } catch (error) {
            console.error("Error with OpenAI:", error);
            setAiResponse("Error with OpenAI.");
        } finally {
            // Clear the input text and hide the AI input field
            setAIInputText('');
            setShowAIInput(false);
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
