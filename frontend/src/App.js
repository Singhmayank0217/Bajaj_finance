"use client";

import { useState } from "react";
import axios from "axios";
import ResponseDisplay from "./components/ResponseDisplay";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResponse(null);

    try {
      // Validate JSON format
      const parsedInput = JSON.parse(input);

      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        throw new Error('Invalid format! Expected JSON: {"data": [...]}');
      }

      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000/bfhl";
      const res = await axios.post(apiUrl, parsedInput);

      setResponse(res.data);
    } catch (err) {
      setError(err.message || "An error occurred");
    }
  };

  return (
    <div className="container">
      <h1>BFHL Challenge</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="jsonInput">Enter JSON Input:</label>
          <textarea
            id="jsonInput"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"data": ["A", "1", "B", "2", "C", "3"]}'
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Submit</button>
      </form>

      {response && <ResponseDisplay response={response} />}
    </div>
  );
};

export default App;