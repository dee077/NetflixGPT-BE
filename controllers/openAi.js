const { OpenAI } = require('openai');

// Set up OpenAI configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
// Controller to handle the chat request
module.exports = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    // Make a request to OpenAI's chat API
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // You can adjust the model based on your needs
      messages: [{ role: "user", content: prompt }],
    });

    res.json({
      prompt: prompt,
      response: response,
    });
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    res.status(500).json({ error: "Something went wrong with the OpenAI API" });
  }
};
