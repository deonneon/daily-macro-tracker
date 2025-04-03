import React, { useState } from "react";

// Get the appropriate API URL based on environment
const API_URL = process.env.NODE_ENV === 'development' 
    ? process.env.REACT_APP_API_URL 
    : process.env.REACT_APP_NETLIFY_URL;

const AIQueryComponent = ({ onDataReceived, hideResponse }) => {
    const [showAIInput, setShowAIInput] = useState(false);
    const [aiInputText, setAIInputText] = useState("");
    const [aiResponse, setAiResponse] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleAIInputChange = (e) => {
        setAIInputText(e.target.value);
    };

    const handleSubmitToAI = async () => {
        if (!aiInputText.trim()) return;
        
        try {
            setIsLoading(true);
            setAiResponse("Fetching data...");

            const endpoint = process.env.NODE_ENV === 'development'
                ? `${API_URL}/query-openai`
                : '/.netlify/functions/query-openai';

            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ aiInputText }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const aiOutput = await response.json();
            let data;
            try {
                data = JSON.parse(aiOutput);
            } catch (error) {
                console.error("Failed to parse AI response:", aiOutput);
                setAiResponse("Error parsing data from OpenAI.");
                return;
            }

            if (data) {
                setAiResponse(aiOutput);
                onDataReceived(data);
            }
        } catch (error) {
            console.error("Error with OpenAI:", error);
            setAiResponse("Error fetching data. Please try again later.");
        } finally {
            setIsLoading(false);
            setAIInputText("");
            setShowAIInput(false);
        }
    };

    const handleKeyDownAI = (e) => {
        if (e.key === "Enter" && aiInputText.trim() && !isLoading) {
            handleSubmitToAI();
        }
    };

    return (
        <>
            <button 
                className="askAIButton" 
                onClick={() => setShowAIInput(!showAIInput)}
                disabled={isLoading}
            >
                {isLoading ? "Processing..." : "Ask AI"}
            </button>

            {showAIInput && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="foodDescriptionForAI">
                            <input
                                value={aiInputText}
                                onChange={handleAIInputChange}
                                onKeyDown={handleKeyDownAI}
                                placeholder="Please describe the food as detailed as possible."
                                disabled={isLoading}
                            />
                            <button 
                                onClick={handleSubmitToAI} 
                                disabled={!aiInputText.trim() || isLoading}
                            >
                                {isLoading ? "Processing..." : "Submit"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {!hideResponse && <div className="ai-response">{aiResponse}</div>}
        </>
    );
};

export default AIQueryComponent;
