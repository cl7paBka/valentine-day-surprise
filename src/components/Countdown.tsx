import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface CountdownProps {
  targetDate: Date;
  onTimerEnd?: () => void;
}

interface TimeBlockProps {
  value: string;
  label: string;
}

const TimeBlock: React.FC<TimeBlockProps> = ({ value, label }) => {
  return (
    <div className="flex flex-col items-center">
      {/* Обёртка с фиксированной шириной и высотой для предотвращения изменения размера */}
      <div className="w-16 h-12 flex items-center justify-center">
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={value}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="text-4xl font-bold text-gray-700 drop-shadow-sm"
          >
            {value}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="text-xs font-medium text-gray-600">{label}</div>
    </div>
  );
};

export const Countdown: React.FC<CountdownProps> = ({ targetDate, onTimerEnd }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [isLast10Minutes, setIsLast10Minutes] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        setIsLast10Minutes(false);
        if (onTimerEnd) onTimerEnd();
      } else {
        const totalSeconds = Math.floor(distance / 1000);
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({
          days: days < 10 ? "0" + days : days.toString(),
          hours: hours < 10 ? "0" + hours : hours.toString(),
          minutes: minutes < 10 ? "0" + minutes : minutes.toString(),
          seconds: seconds < 10 ? "0" + seconds : seconds.toString(),
        });
        setIsLast10Minutes(totalSeconds <= 600);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onTimerEnd]);

  // Выбираем градиент в зависимости от оставшегося времени
  const containerGradient = isLast10Minutes
    ? "bg-gradient-to-r from-pink-300 to-red-300"
    : "bg-gradient-to-r from-teal-100 to-cyan-100";

  // Пульсирующая анимация в последних 10 минутах – более плавная и медленная
  const pulseAnimation = isLast10Minutes
    ? {
        animate: { scale: [1, 1.03, 1] },
        transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
      }
    : {};

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className={`flex space-x-4 p-5 ${containerGradient} rounded-full shadow-xl`}
      {...pulseAnimation}
    >
      {timeLeft.days !== "00" && <TimeBlock value={timeLeft.days} label="Дни" />}
      {timeLeft.hours !== "00" && <TimeBlock value={timeLeft.hours} label="Часы" />}
      <TimeBlock value={timeLeft.minutes} label="Минуты" />
      <TimeBlock value={timeLeft.seconds} label="Секунды" />
    </motion.div>
  );
};
