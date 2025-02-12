"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import Head from "next/head";
import { Countdown } from "@/components/Countdown";
import { GiftBox } from "@/components/GiftBox";
import { CelebrationEffects } from "@/components/CelebrationEffects";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
  const targetDate = new Date("2025-02-10T16:02:00");

  const [isLocked, setIsLocked] = useState(true);
  const [showSurprise, setShowSurprise] = useState(false);
  const [background, setBackground] = useState("bg-mint-gradient");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleTimerEnd = () => {
    setIsLocked(false);
  };

  const handleOpenGift = () => {
    setBackground("bg-romantic-gradient");
    setShowSurprise(true);
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsAudioPlaying(true))
        .catch((err) => console.warn("Автовоспроизведение не разрешено", err));
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isAudioPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current
        .play()
        .catch((err) => console.warn("Автовоспроизведение не разрешено", err));
    }
    setIsAudioPlaying(!isAudioPlaying);
  };

  const romanticPhrases = [
    "Скоро начнется волшебство!",
    "Осталось совсем немного до начала сказки!",
    "Время приближается к чуду!",
    "Секунды тают – вот-вот начнется любовь!",
    "Волшебство уже на пороге!",
    "Мгновение, полное нежности, уже близко!",
    "Скоро твой подарок раскроется!",
    "Любовь витает в воздухе – осталось чуть-чуть!",
  ];

  const [randomPhrase, setRandomPhrase] = useState("");

  useEffect(() => {
    setRandomPhrase(romanticPhrases[Math.floor(Math.random() * romanticPhrases.length)]);
  }, []);

  return (
    <>
      <Head>
        <title>Сюрприз ко Дню Святого Валентина</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main
        className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-700 ${background}`}
      >
        {/* Панель управления музыкой */}
        <div className="absolute top-4 right-4 flex items-center space-x-3 bg-white/80 p-2 rounded-full shadow-md">
          <button
            onClick={toggleMusic}
            className="text-red-500 hover:text-red-700 font-bold text-xl transition-colors duration-300"
          >
            {isAudioPlaying ? "🔈" : "🔇"}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-32 h-2 bg-white/50 rounded-full accent-red-500"
          />
        </div>

        {/* До открытия подарка */}
        {!showSurprise && (
          <div className="flex flex-col items-center">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-center">
              {randomPhrase}
            </h1>
            <Countdown targetDate={targetDate} onTimerEnd={handleTimerEnd} />
            <div className="mt-8">
              <GiftBox isLocked={isLocked} onOpen={handleOpenGift} />
            </div>
          </div>
        )}

        {/* После открытия подарка — красиво оформленный текст */}
        <AnimatePresence>
          {showSurprise && (
            <motion.div
              className="flex flex-col items-center text-center p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <CelebrationEffects />
              <h2
                className="text-4xl sm:text-5xl text-pink-700 font-bold mb-6"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                С Днём Святого Валентина!
              </h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-xl sm:text-2xl text-gray-800 max-w-2xl mb-4"
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
                }}
              >
                Милая, каждое мгновение с тобой — как волшебная сказка, которую я
                хочу переживать снова и снова.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="text-xl sm:text-2xl text-gray-800 max-w-2xl mb-4"
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
                }}
              >
                Ты наполняешь мою жизнь светом, теплом и бесконечной радостью.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="text-xl sm:text-2xl text-gray-800 max-w-2xl mb-4"
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
                }}
              >
                Спасибо за твою любовь, нежность и за каждый миг, проведённый
                вместе.
              </motion.p>
              {/* Подпись "от Максима" с красивым выделением и ссылкой на GitHub */}
              <motion.a
                href="https://github.com/cl7paBka"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 text-2xl font-semibold text-[#FF6F61] hover:text-pink-600"
                style={{ fontFamily: "'Dancing Script', cursive" }}
                initial={{ opacity: 0, x: 200 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                от Максима
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>

        <audio ref={audioRef} src="/valentine-music.mp3" loop />
      </main>
    </>
  );
}
