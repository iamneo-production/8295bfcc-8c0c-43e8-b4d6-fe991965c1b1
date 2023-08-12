import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [sourceText, setSourceText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const translateText = async () => {
    try {
      const response = await axios.post('http://localhost:8080/translate', {
        sourceText,
        targetLanguage,
      });
      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <h1>Language Translator</h1>
      <div>
        <input
          type="text"
          placeholder="Enter text to translate"
          value={sourceText}
          onChange={(e) => setSourceText(e.target.value)}
        />
        <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
          <option value="">Select target language</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          {/* Add more language options here */}
        </select>
        <button onClick={translateText}>Translate</button>
      </div>
      {translatedText && <p>Translated Text: {translatedText}</p>}
    </div>
  );
}

export default App;
