import { useState } from "react";
import axios from "axios";

const BfhlForm = ({ setResponse }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Remove any non-printable or special characters
      const sanitizedInput = (input || "").replace(/\u00A0/g, " ").trim();
      const parsedInput = JSON.parse(sanitizedInput);

      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        throw new Error('Invalid input format. Expected {"data": [...]}');
      }

      const response = await axios.post(process.env.REACT_APP_API_URL, parsedInput);
      setResponse(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
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
  );
};

export default BfhlForm;
