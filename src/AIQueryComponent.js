import React, { useState } from 'react';

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
            const response = await fetch('/.netlify/functions/openai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ aiInputText }),
            });
            const data = await response.json();
            if (response.ok) {
                setAiResponse(data);
                onDataReceived(JSON.parse(data));  // Assumes that data is a JSON string.
            } else {
                console.error("Error fetching data from OpenAI:", data.error);
                setAiResponse("Error fetching data from OpenAI.");
            }

            setAIInputText('');
            setShowAIInput(false);

        } catch (error) {
            console.error("Error:", error);
        }


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
