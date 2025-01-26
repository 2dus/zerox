import React, { useState } from "react";

const ZeroxAI = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateCode = async () => {
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();
      if (data.output) {
        setResponse(data.output);
      } else {
        setResponse("Error: Could not generate code.");
      }
    } catch {
      setResponse("An error occurred while generating the code."); // Removed 'err' as it's unused
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-purple-400 p-4">
      <h1 className="text-3xl font-bold mb-6">Zerox: Your AI Coding Assistant</h1>
      <textarea
        className="w-full max-w-md p-2 mb-4 bg-gray-800 text-white rounded-md"
        placeholder="Describe the tool you want Zerox to create..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
        onClick={handleGenerateCode}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Code"}
      </button>
      {response && (
        <pre className="w-full max-w-md mt-6 bg-gray-900 p-4 text-white rounded-md">
          {response}
        </pre>
      )}
    </div>
  );
};

export default ZeroxAI;
