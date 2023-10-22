// netlify/functions/query-openai.js

const OpenAI = require('openai');

const openai = new OpenAI(process.env.OPENAI_API_KEY);

exports.handler = async function (event, context) {
    const { aiInputText } = JSON.parse(event.body);

    try {
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

        return {
            statusCode: 200,
            body: JSON.stringify(response.choices[0].message.content)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
