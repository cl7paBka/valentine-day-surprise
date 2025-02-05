import React, { useEffect } from "react";
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
  useEffect(() => {
    const hearts = gsap.utils.toArray(".heart");
    hearts.forEach((heart) => {
      // Каждое сердечко стартует с небольшой случайной задержкой
      gsap.delayedCall(Math.random(), () =>
        animateHeart(heart as HTMLElement)
      );
    });
  }, []);

  const animateHeart = (heart: HTMLElement) => {
    // Случайное начальное положение по всему экрану
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    // Случайный масштаб (от 0.8 до 1.2) и небольшое начальное вращение (от -10° до +10°)
    const scale = 0.8 + Math.random() * 0.4;
    const rotation = -10 + Math.random() * 20;
    // Продолжительность анимации от 5 до 8 секунд
    const duration = 5 + Math.random() * 3;
    
    // Вычисляем горизонтальное смещение (dx) — если конечная позиция выйдет за край, "отбиваем"
    const dx = (Math.random() - 0.5) * 400;
    let endX = startX + dx;
    if (endX < 0 || endX > window.innerWidth) {
      endX = startX - dx;
    }
    // Вертикальное смещение: пусть сердечко движется вверх (dy отрицательное)
    const dy = - (Math.random() * (window.innerHeight / 2) + 100);
    const endY = startY + dy;
    // Изменение вращения – небольшой сдвиг от начального
    const endRotation = rotation + (Math.random() - 0.5) * 20;

    // Устанавливаем начальное состояние через GSAP
    gsap.set(heart, {
      x: startX,
      y: startY,
      scale,
      rotation,
      opacity: 1,
      willChange: "transform, opacity",
    });

    // Анимируем сердечко: горизонтальное движение с bounce-эффектом и вертикальное движение плавно вверх
    gsap.to(heart, {
      duration,
      x: endX,
      ease: "bounce.out",
    });
    gsap.to(heart, {
      duration,
      y: endY,
      ease: "power1.out",
    });
    gsap.to(heart, {
      duration,
      rotation: endRotation,
      ease: "power1.out",
      onComplete: () => {
        // После того, как анимация закончилась (сердечко "вылетело" или закончилось движение),
        // перезапускаем анимацию с новыми случайными параметрами
        animateHeart(heart);
      },
    });
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 30 }).map((_, i) => {
        // Увеличиваем количество сердечек до 100, чтобы экран был почти непрерывно заполнен
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        // Размер шрифта от 1.5rem до 2rem (немного компактнее)
        const fontSize = `${Math.random() * 0.5 + 1.5}rem`;
        // Инициализируем положение сердечка в случайном месте (чтобы не мелькали в углах)
        const initialX = Math.random() * window.innerWidth;
        const initialY = Math.random() * window.innerHeight;
        return (
          <div
            key={i}
            className="heart absolute select-none"
            style={{
              color: randomColor,
              fontSize,
              willChange: "transform, opacity",
              opacity: 1,
              transform: `translate(${initialX}px, ${initialY}px)`,
            }}
          >
            {randomEmoji}
          </div>
        );
      })}
    </div>
  );
};
