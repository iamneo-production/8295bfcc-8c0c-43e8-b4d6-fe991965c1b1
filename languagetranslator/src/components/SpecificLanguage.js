import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SpecificLanguage = () => {
  const [data, setData] = useState(null);
  const { langCode } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://libretranslate.de/languages`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  function getNameByCode(code) {
    const language = data?.find((item) => item.code === code);
    return language ? language.name : "";
  }

  const name = getNameByCode(langCode);
  let lan = null;
  if (name === "") {
    lan = "No language available with this code ";
  } else lan = name;

  // Conditional rendering when data is null
  if (data === null) {
    return <div>Loading...</div>;
  }

  return (
    <center>
      <div>
        <br></br>
        <p>Language Code: {langCode}</p>

        <p>Language: {lan}</p>
      </div>
    </center>
  );
};
export default SpecificLanguage;