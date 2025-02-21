"use client";

import { useState } from "react";
import Select from "react-select";

const options = [
  { value: "alphabets", label: "Alphabets" },
  { value: "numbers", label: "Numbers" },
  { value: "highest_alphabet", label: "Highest Alphabet" },
];

const ResponseDisplay = ({ response }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  const filteredResponse = {
    ...(selectedOptions.some((opt) => opt.value === "alphabets") && { alphabets: response.alphabets }),
    ...(selectedOptions.some((opt) => opt.value === "numbers") && { numbers: response.numbers }),
    ...(selectedOptions.some((opt) => opt.value === "highest_alphabet") && { highest_alphabet: response.highest_alphabet }),
  };

  return (
    <div>
      <h2>Response</h2>
      <Select
        isMulti
        options={options}
        onChange={handleChange}
        value={selectedOptions}
        placeholder="Filter response..."
      />
      <pre className="response">{JSON.stringify(filteredResponse, null, 2)}</pre>
    </div>
  );
};

export default ResponseDisplay;