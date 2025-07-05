import React, { useState, useEffect } from "react";

const messages = [
  "コンピューターだって起動に時間かかる日もあるよ。",
  "えらいよ。君。 🥺",
  "ミスっても直せばいいしさ。",
  "昨日休んだからって、今日休んじゃいけない理由にはならないからね。",
  "布団の中は安全地帯。寝よう！（って言って寝れれば悩みなんかねえよな笑）",
  "思いつめなくても何とかなるよ。",
];

export default function HumanOS() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentMsgIndex, setCurrentMsgIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (loadingProgress >= 100) {
      setDone(true);
      return;
    }
    const timeout = setTimeout(() => {
      setLoadingProgress((prev) => prev + 1);
    }, 100);
    return () => clearTimeout(timeout);
  }, [loadingProgress]);

  useEffect(() => {
    if (!done) return;
    const interval = setInterval(() => {
      setCurrentMsgIndex((i) => (i + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [done]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fce4ec, #e0f7fa)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          borderRadius: "16px",
          padding: "30px 20px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          textAlign: "center",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          color: "#333",
        }}
      >
        {!done ? (
          <>
            <div
              style={{
                width: "100%",
                height: 30,
                borderRadius: 15,
                border: "2px solid #a0c4ff",
                overflow: "hidden",
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  width: `${loadingProgress}%`,
                  height: "100%",
                  backgroundColor: "#6699ff",
                  transition: "width 0.1s linear",
                }}
              />
            </div>
            <p style={{ fontSize: 18 }}>起動中... ゆっくりでいいよ。</p>
          </>
        ) : (
          <>
            <p style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
              {messages[currentMsgIndex]}
            </p>
            <small style={{ color: "#666" }}>by 制作主 😎</small>
          </>
        )}
      </div>
    </div>
  );
}
