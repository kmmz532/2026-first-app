import { useEffect, useState, type ReactNode } from 'react';
import './App.css';
import { Icon } from "@iconify/react";
import TypingText from './TypingText';

function App() {
  const [omikuji, setOmikuji] = useState<ReactNode | null>(null);

  const [msg, setMsg] = useState<ReactNode | null>();
  const [isSuccess, setSuccess] = useState<boolean>(false);

  const omikujiData = [
    { text: "大吉", color: "red" },
    { text: "中吉", color: "orange" },
    { text: "小吉", color: "green" },
    { text: "吉", color: "blue" },
    { text: "末吉", color: "skyblue" },
    { text: "凶", color: "blue" },
    { text: "大凶", color: "purple" },
  ];

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const saved = localStorage.getItem("omikuji");

    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.date === today) {
        setOmikujiData(parsed.result);
        return;
      }
    } else {
      const omikuji = omikujiData[Math.floor(Math.random() * omikujiData.length)];
      localStorage.setItem("omikuji", JSON.stringify({ date: today, result: omikuji }));
      setOmikujiData(omikuji);
    }
  }, []);

  const setOmikujiData = (r: typeof omikujiData[0]) => {
    setOmikuji(
      <span className="msg-inline" style={{ color: r.color, fontSize: 35 }}>
        {r.text}
      </span>
    );
  };

  return (
    <>
      <h1>Happy New Year! 2026</h1>

      <div className="card">
        <TypingText speed={50} text="Q. 2026 を16進数にした数値を選択せよ." />

        <button onClick={() => {
          setMsg(<>
            <Icon icon="mdi:close" color="blue" width="24px" height="24px" />
            不正解. 011111101010 は2進数にした数値です.
          </>);
          
        }}>
          ア. 0111 | 1110 | 1010
        </button>

        <button onClick={() => {
          setMsg(<>
            <Icon icon="mdi:circle-outline" color="red" width="24px" height="24px" />
            正解です！あけましておめでとうございます！
          </>);
          setSuccess(true);
        }}>
          イ. 7EA
        </button>

        <button onClick={() => {
          setMsg(<>
            <Icon icon="mdi:close" color="blue" width="24px" height="24px" />
            不正解. 3752 は8進数にした数値です.
          </>);
        }}>
          ウ. 3752
        </button>

        <button onClick={() => {
          setMsg(<>
            <Icon icon="mdi:close" color="blue" width="24px" height="24px" />
            不正解. 1KA は36進数にした数値です.
          </>);
        }}>
          エ. 1KA
        </button>

        {msg && <div><span className="msg">{msg}</span></div>}

      </div>

      {isSuccess && <>
        {<div className="card fade-in" key={Date.now()}>
          {omikuji && <>あなたは<br /> {omikuji} <br /> です。</>}
        </div>}

        <button onClick={
          () => {
            const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
            const omikuji = omikujiData[Math.floor(Math.random() * omikujiData.length)];
            localStorage.setItem("omikuji", JSON.stringify({ date: today, result: omikuji }));
            setOmikujiData(omikuji);
          }
        }>
          リセマラする
        </button>
      </>}

      <div className="footer">
        Copyright © 2026 <a href="https://github.com/kmmz532">@kmmz532</a>
      </div>
    </>
  )
}

export default App
