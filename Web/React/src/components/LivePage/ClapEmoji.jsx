import React, { useState, useEffect } from "react";
import "../../css/ClapEmoji.css";
// import clap2 from "../../assets/clap/clap2.wav";

const ClapEmoji = ({ id, left }) => {
  const [visible, setVisible] = useState(true);

  // 박수 소리를 넣으면, 버튼 연타 시에 audio가 쌓여서 터져서 임시 중지

  // const [audio] = useState(new Audio(clap2));

  // useEffect(() => {
  //   if (visible) {
  //     audio.play();
  //   }

  //   return () => {
  //     audio.pause();
  //     audio.currentTime = 0;
  //   };
  // }, [visible, audio]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 900);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    visible && (
      <span
        className="clap-shadow"
        style={{
          fontSize: "40px",
          left: `${left}%`,
        }}
      >
        👏
      </span>
    )
  );
};

export default ClapEmoji;
