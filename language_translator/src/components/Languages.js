import React, { useEffect, useState } from "react";

export default function Languages() {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://libretranslate.de/languages`);
        const data = await response.json();
        setJsonData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {jsonData ? (
        <pre>{JSON.stringify(jsonData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
