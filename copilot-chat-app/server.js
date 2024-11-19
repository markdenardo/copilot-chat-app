const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from the public folder
app.use(express.static('public'));

// API endpoint for chatbot
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  try {
    const response = await axios.post(
      `${process.env.AZURE_ENDPOINT}/openai/deployments/${process.env.DEPLOYMENT_NAME}/chat/completions?api-version=2023-05-15`,
      {
        messages,
        max_tokens: 100,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.AZURE_API_KEY,
        },
      }
    );

    res.json(response.data.choices[0].message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to communicate with Copilot.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
