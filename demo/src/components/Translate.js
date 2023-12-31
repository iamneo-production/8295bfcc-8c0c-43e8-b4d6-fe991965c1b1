import React, { useState, useEffect } from "react";
import { Form, TextArea, Button, Icon } from "semantic-ui-react";
import axios from "axios";

export default function Translate() {
  const [inputText, setInputText] = useState("");
  const [resultText, setResultText] = useState("");
  const [selectedLanguageKey, setLanguageKey] = useState("");
  const [languagesList, setLanguagesList] = useState([]);
  const [detectLanguageKey, setdetectedLanguageKey] = useState("");

  const getLanguageSource = () => {
    axios
      .post(`https://libretranslate.de/detect`, {
        q: inputText,
      })

      .then((response) => {
        setdetectedLanguageKey(response.data[0].language);
      })
      .catch((error) => {
        // Handle error
        console.error("An error occurred:", error);
      });
  };

  const translateText = () => {
    try {
      setResultText(inputText);

      getLanguageSource();

      let data = {
        q: inputText,

        source: detectLanguageKey,

        target: selectedLanguageKey,
      };

      axios
        .post(`https://libretranslate.de/translate`, data)

        .then((response) => {
          setResultText(response.data.translatedText);
        })

        .catch((error) => {
          if (error.response) {
            // The request was made and the server responded with a status code
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
        });
    } catch (error) {
      console.error(error);

      setResultText("Error occured during translation");
    }
  };

  const languageKey = (selectedLanguage) => {
    setLanguageKey(selectedLanguage.target.value);
  };

  useEffect(() => {
    axios
      .get(`https://libretranslate.de/languages`)

      .then((response) => {
        setLanguagesList(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("An error occurred:", error);
      });

    getLanguageSource();
  }, [inputText]);

  return (
    <div>
      <div className="app-header">
        <h2 className="header">Translator</h2>
      </div>

      <div className="app-body">
        <div>
          <Form>
            <Form.Field
              control={TextArea}
              placeholder="Type Text to Translate.."
              onChange={(e) => setInputText(e.target.value)}
            />

            <select className="language-select" onChange={languageKey}>
              <option>Please Select Language..</option>

              {languagesList.map((language) => (
                <option value={language.code}>{language.name} </option>
              ))}
            </select>

            <Form.Field
              control={TextArea}
              placeholder="Your result translation"
              value={resultText}
            />

            <Button onClick={translateText}>
              <Icon name="translate" />
              Translate
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
