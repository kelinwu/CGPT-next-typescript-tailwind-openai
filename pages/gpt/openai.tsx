// import { GetServerSideProps } from "next";
import { SetStateAction, useEffect, useState } from "react";

interface PropsI {
  data: {
    index: number;
    logprobs: any;
    finish_reason: string;
    text: string;
  };
}

// export default async function GptPage({ _data }: PropsI) {
export default function GptPage() {
  const [prompt, setPrompt] = useState<PropsI["data"] | undefined>();

  const [message, setMessage] = useState<string>("openai");

  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);

  const handleInputChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    if (inputValue === "") {
      setError(true);
    } else {
      setMessage(inputValue);
      setError(false);
      // Do something with the input value here
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/gpt/${message}`);
      const jsonData = (await res.json()) as PropsI["data"][];
      console.log(jsonData);
      return jsonData;
    };
    fetchData()
      .then((r) => {
        setPrompt(r[0]);
      })
      .catch(console.error);
  }, [message]);

  return (
    <div className="p-10">
      <h1 className="text-red-700 p-20 text-6xl justify-center">
        Chat<span className="text-blue-500">GPT</span> <div className="text-sm">Next.ts</div>
      </h1>
      <div className="pb-20">

      {prompt && prompt.text}
      </div>

      <div className="flex flex-col">
        <input
          className={`border rounded py-6 px-3 ${
            error ? "border-red-500" : ""
          }`}
          placeholder="text this app by keyin 1 keyword, ie: chatgpt or openai or nextjs or tailwind ..."
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        />
        {error && <p className="text-red-500 text-xs">Please enter a value</p>}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   // const res = await fetch("http://localhost:3002/api/gpt/react");
//   // const data = await res.json();
//   // console.log(data);
//   // pass data to the page via props
//   return {
//     props: {
//       _data: []
//     },
//   };
// };
