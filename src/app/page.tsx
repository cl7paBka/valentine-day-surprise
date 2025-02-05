"use client";

import React, { useEffect, useState, useRef } from "react";
import Head from "next/head";
import { Countdown } from "@/components/Countdown";
import { GiftBox } from "@/components/GiftBox";
import { CelebrationEffects } from "@/components/CelebrationEffects";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
  // Целевая дата для обратного отсчёта, например, 14 февраля 2025 года
  const targetDate = new Date("2025-02-04T00:00:00");

  const [isLocked, setIsLocked] = useState(true);
  const [showSurprise, setShowSurprise] = useState(false);
  // Начальный фон — мятный, далее переключится на романтический
  const [background, setBackground] = useState("bg-mint-gradient");

  // Управление аудио
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const handleTimerEnd = () => {
    setIsLocked(false);
  };

  const handleOpenGift = () => {
    // Меняем фон на романтический и показываем поздравление
    setBackground("bg-romantic-gradient");
    setShowSurprise(true);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isAudioPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.warn("Автовоспроизведение не разрешено", err);
      });
    }
    setIsAudioPlaying(!isAudioPlaying);
  };

  return (
    <>
      <Head>
        <title>Сюрприз ко Дню Святого Валентина</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main
        className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-700 ${background}`}
      >
        {/* Скрытая кнопка для управления музыкой */}
        <button
          onClick={toggleMusic}
          className="absolute top-4 right-4 text-red-500 hover:text-red-700"
        >
          {isAudioPlaying ? "🔈 Выкл" : "🔇 Вкл"}
        </button>

        {/* До открытия подарка */}
        {!showSurprise && (
          <div className="flex flex-col items-center">
            <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-center">
              До 14 февраля осталось:
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
                Милая, каждое мгновение с тобой — как волшебная сказка, которую я хочу переживать снова и снова.
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
                Спасибо за твою любовь, нежность и за каждый миг, проведённый вместе.
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Аудиофайл (поместите valentine-music.mp3 в папку public) */}
        <audio ref={audioRef} src="/valentine-music.mp3" loop />
      </main>
    </>
  );
}
