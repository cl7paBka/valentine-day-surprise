import React, { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: Date;
  onTimerEnd?: () => void;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate, onTimerEnd }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft("00:00:00:00");
        if (onTimerEnd) onTimerEnd();
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft(`${days}д:${hours}ч:${minutes}м:${seconds}с`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onTimerEnd]);

  return (
    <div className="text-2xl sm:text-4xl font-bold text-center">
      {timeLeft}
    </div>
  );
};
