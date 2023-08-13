// QAPage.js
import React from 'react';

function QAPage() {
    const qaList = [
        {
            question: "How do I track macros for my food?",
            answer: "You can start by inputting the food item in the Food Input section. Once entered, the macros will automatically be added to your daily log."
        },
        {
            question: "How accurate is the macro information?",
            answer: "While we strive to be accurate, it's always a good idea to cross-reference with other sources or labels if you're unsure."
        },
        {
            question: "Do organic and regular food have different food macros?",
            answer: "In general, the macronutrient profile (i.e., the proportions of carbohydrates, proteins, and fats) of an organic food is very similar to its conventional counterpart. For instance, an organic apple will have roughly the same amount of carbohydrates, proteins, and fats as a conventionally-grown apple."
        },
        // Add more Q&As as needed
    ];

    return (
        <div>
            <h2>Q&A about Food Macros</h2>
            <ul>
                {qaList.map((qa, index) => (
                    <li key={index}>
                        <p><strong>Q:</strong> {qa.question}</p>
                        <p><strong>A:</strong> {qa.answer}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default QAPage;
