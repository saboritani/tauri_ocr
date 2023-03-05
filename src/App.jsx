import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [ocrText, setOcrText] =useState();

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  async function tauri_ocr() {
    console.log("tauri_ocr_button_pushed");
    await invoke("tauri_ocr");
  }

  return (
    <div className="container">
      <h1>Welcome to Tauri_OCR!</h1>
      {/*
      <div className="row">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            greet();
          }}
        >
          <input
            id="greet-input"
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Enter a name..."
          />
          <button type="submit">Greet</button>
        </form>
      </div>
      <p>{greetMsg}</p>
      */}
      <div className="row">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            tauri_ocr();
          }}
        >
             <button type="submit">Select file to OCR</button> 
        </form>
      </div>
    </div>
  );
}

export default App;
