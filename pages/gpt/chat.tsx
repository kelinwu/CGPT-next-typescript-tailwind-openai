import { useEffect, useState } from "react";

interface PropsI {
  data: {
    index: number;
    logprobs: any;
    finish_reason: string;
    text: string;
  };
}

const GptPage = () => {
  const [prompt, setPrompt] = useState<PropsI["data"] | undefined>();
  const [message, setMessage] = useState<string>("openai");
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async (query: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/gpt/${query}`);
      const jsonData = (await res.json()) as PropsI["data"][];
      setPrompt(jsonData[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(message);
  }, [message]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    if (!inputValue) {
      setError(true);
    } else {
      setMessage(inputValue);
      setInputValue("");
      setError(false);
    }
  };

  return (
    <div className="flex w-full gap-2">
      <div className="flex w-full justify-center bg-slate-100 items-center">
        <div className="pb-20">{loading ? "Loading..." : prompt?.text}</div>

        <div className="flex-col w-1/2 items-center justify-center">
          <input
            className={`border rounded py-6 px-3 ${
              error ? "border-red-500" : ""
            }`}
            placeholder="Text this app by entering a keyword, e.g. chatgpt or openai or nextjs or tailwind..."
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
          {error && (
            <p className="text-red-500 text-xs">Please enter a value</p>
          )}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default GptPage;
