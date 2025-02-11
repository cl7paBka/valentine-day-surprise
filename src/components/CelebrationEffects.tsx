import React, { useEffect, useMemo } from "react";
import { gsap } from "gsap";

const colors = [
  "#FFC0CB",
  "#FF69B4",
  "#FF1493",
  "#DB7093",
  "#FFB6C1",
  "#FF8C69",
  "#FF7F50",
];
const emojis = ["❤️"];

export const CelebrationEffects: React.FC = () => {
  // Генерируем данные для сердечек: увеличено количество до 70,
  // и для каждого задаём случайное горизонтальное положение.
  const heartsData = useMemo(() => {
    const innerWidth = typeof window !== "undefined" ? window.innerWidth : 800;
    return Array.from({ length: 90 }).map((_, i) => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomEmoji = emojis[0];
      const fontSize = `${Math.random() * 0.5 + 1.5}rem`;
      const x = Math.random() * innerWidth;
      return { key: i, randomColor, randomEmoji, fontSize, x };
    });
  }, []);

  useEffect(() => {
    const hearts = gsap.utils.toArray(".heart") as HTMLElement[];
    hearts.forEach((heart: HTMLElement) => {
      // Функция, которая запускает анимацию для одного сердечка
      const startAnimation = () => {
        // Случайная задержка для разнообразия старта
        const delay = Math.random() * 5;
        // Длительность анимации от 10 до 15 секунд
        const duration = 10 + Math.random() * 5;
        gsap.fromTo(
          heart,
          {
            // Сердечко появляется ниже экрана
            y: window.innerHeight + 50,
            opacity: 0.7,
          },
          {
            // Анимация подъёма: оно летит вверх до точки, когда уже почти заходит за экран
            y: -50,
            // Плавное исчезание: к концу анимации opacity падает до 0
            opacity: 0,
            ease: "linear",
            duration: duration,
            delay: delay,
            onComplete: () => {
              // После завершения анимации сразу сбрасываем положение (opacity уже 0)
              gsap.set(heart, { y: window.innerHeight + 50, opacity: 0 });
              startAnimation();
            },
          }
        );
      };
      startAnimation();
      // Горизонтальная осцилляция для естественного эффекта
      gsap.to(heart, {
        x: "+=10",
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {heartsData.map((heart) => (
        <div
          key={heart.key}
          className="heart absolute select-none"
          style={{
            color: heart.randomColor,
            fontSize: heart.fontSize,
            willChange: "transform, opacity",
            // Устанавливаем только горизонтальное положение – GSAP задаст y и opacity
            transform: `translateX(${heart.x}px)`,
            opacity: 0, // начальное значение; GSAP сразу задаст нужное opacity
          }}
        >
          {heart.randomEmoji}
        </div>
      ))}
    </div>
  );
};
