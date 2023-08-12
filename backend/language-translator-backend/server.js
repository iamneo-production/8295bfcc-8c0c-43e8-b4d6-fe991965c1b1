const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const translate = require('google-translate-api'); // Import the translation library
const app = express();
const PORT = 8080;

app.use(cors({
  origin: 'http://localhost:8081', 
}));
app.use(bodyParser.json());

// Translation function using Google Translate API
async function translateText(text, targetLanguage) {
  try {
    const result = await translate(text, { to: targetLanguage });
    return result.text;
  } catch (error) {
    console.error('Translation Error:', error);
    throw error;
  }
}

app.post('/translate', async (req, res) => {
  const { sourceText, targetLanguage } = req.body;
  try {
    const translatedText = await translateText(sourceText, targetLanguage);
    res.json({ translatedText });
  } catch (error) {
    res.status(500).json({ error: 'Translation failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
