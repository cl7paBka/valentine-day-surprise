import React, { useEffect, useMemo } from "react";
import { gsap } from "gsap";

// Вы можете настроить цвета и эмодзи на свой вкус.
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
  // Генерируем исходные параметры сердечек.
  const heartsData = useMemo(() => {
    const width = typeof window !== "undefined" ? window.innerWidth : 800;
    return Array.from({ length: 150 }).map((_, index) => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const fontSize = `${Math.random() * 0.5 + 1.5}rem`;
      const x = Math.random() * width;
      return {
        key: index,
        color,
        fontSize,
        emoji: emojis[0],
        x,
      };
    });
  }, []);

  useEffect(() => {
    const hearts = gsap.utils.toArray(".heart") as HTMLElement[];

    hearts.forEach((heart) => {
      const animateHeart = () => {
        // Сразу переносим сердечко далеко за нижнюю границу, чтобы не было видно «спавна»
        gsap.set(heart, {
          y: window.innerHeight + 200,
          opacity: 0,
        });

        // Запускаем «покачивание» по горизонтали
        const waveTween = gsap.to(heart, {
          x: `+=${gsap.utils.random(20, 40)}`,
          duration: gsap.utils.random(2, 4),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        // Лёгкая ротация для «живости»
        const rotateTween = gsap.to(heart, {
          rotation: gsap.utils.random(-20, 20),
          duration: gsap.utils.random(1.5, 3),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        // Основная анимация полёта снизу вверх
        gsap.to(heart, {
          y: -150, // чуть выше верхнего края экрана
          opacity: 0.8,
          duration: gsap.utils.random(5, 8), // скорость полёта
          delay: gsap.utils.random(0, 2),    // чтобы сердца появлялись «волной»
          ease: "linear",
          onComplete: () => {
            // Как только сердечко достигло верхней границы, «убиваем» твины
            waveTween.kill();
            rotateTween.kill();
            // И сразу запускаем анимацию заново (heart мгновенно вернётся вниз и полетит снова)
            animateHeart();
          },
        });
      };

      // Запускаем анимацию для каждого сердечка
      animateHeart();
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {heartsData.map((heart) => (
        <div
          key={heart.key}
          className="heart absolute select-none"
          style={{
            color: heart.color,
            fontSize: heart.fontSize,
            transform: `translateX(${heart.x}px)`,
            willChange: "transform, opacity",
          }}
        >
          {heart.emoji}
        </div>
      ))}
    </div>
  );
};
