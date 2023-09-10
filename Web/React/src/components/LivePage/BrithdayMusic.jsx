import React, { useEffect } from "react";
import birthday1 from "../../assets/music/birthday1.mp3";
import birthday3 from "../../assets/music/birthday3.mp3";

function BrithdayMusic({ showBirthdayMusic, setShowBirthdayMusic }) {
  const birthdays = [birthday1, birthday3];
  const audio = new Audio();

  const getRandomMusic = () => {
    const randomIndex = Math.floor(Math.random() * birthdays.length);
    return birthdays[randomIndex];
  };
  const musicSource = getRandomMusic();
  audio.src = musicSource;
  audio.volume = 0.5;

  useEffect(() => {
    if (showBirthdayMusic) {
      const playAudio = async () => {
        await audio.play();
      };

      playAudio(); // 오디오 재생
    } else {
      audio.pause();
      audio.currentTime = 0;
      setShowBirthdayMusic(false);
    }
  }, [showBirthdayMusic, setShowBirthdayMusic]);

  useEffect(() => {
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return null;
}

export default BrithdayMusic;
