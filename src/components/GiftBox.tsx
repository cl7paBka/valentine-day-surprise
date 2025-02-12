import React, { useState } from "react";
import { motion, useMotionValue, useAnimation } from "framer-motion";

interface GiftBoxProps {
  isLocked: boolean;
  onOpen: () => void;
}

export const GiftBox: React.FC<GiftBoxProps> = ({ isLocked, onOpen }) => {
  const [opened, setOpened] = useState(false);
  const [showEarlyMessage, setShowEarlyMessage] = useState(false);
  const [earlyMessage, setEarlyMessage] = useState("");
  const ribbonControls = useAnimation();
  const lidControls = useAnimation();
  const ribbonX = useMotionValue(0);

  const RIBBON_THRESHOLD = 100;
  const cutePhrases = [
    "Подожди ещё чуть-чуть...",
    "Еще немного, пожалуйста...",
    "Секундочку...",
    "Скоро будет сюрприз!",
    "Еще чуть, и чудо случится!",
    "Момент волшебства уже близко!",
    "Не спеши, всё придёт вовремя!",
    "Почти готово к чуду!",
    "Волшебство на подходе!",
  ];

  const handleDragEnd = () => {
    if (ribbonX.get() > RIBBON_THRESHOLD) {
      if (!isLocked) {
        ribbonControls.start({
          x: 300,
          opacity: 0,
          transition: { duration: 0.8 },
        });
        lidControls.start({
          rotateX: -120,
          transition: { duration: 1.5, ease: "easeOut" },
        });
        setTimeout(() => {
          setOpened(true);
          onOpen();
        }, 1500);
      } else {
        ribbonControls.start({ x: 0, transition: { duration: 0.8 } });
        const phrase =
          cutePhrases[Math.floor(Math.random() * cutePhrases.length)];
        setEarlyMessage(phrase);
        setShowEarlyMessage(true);
        setTimeout(() => {
          setShowEarlyMessage(false);
        }, 2000);
      }
    } else {
      ribbonControls.start({ x: 0, transition: { duration: 0.8 } });
    }
  };

  return (
    <div className="relative w-80 h-80">
      <motion.div className="relative w-full h-full" style={{ perspective: 1000 }}>
        {/* Основание коробки */}
        <motion.div
          className="absolute bottom-0 w-full h-2/3 bg-gradient-to-b from-red-200 to-pink-200 rounded-b-3xl shadow-xl"
          style={{ zIndex: 1 }}
        />
        {/* Крышка коробки */}
        <motion.div
          className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-pink-400 to-red-400 rounded-t-3xl shadow-2xl origin-bottom"
          animate={lidControls}
          initial={{ rotateX: 0 }}
          style={{ zIndex: 2 }}
        />
        {/* Ленточка */}
        {!opened && (
          <motion.div
            className="absolute top-1/2 left-0 w-full h-10 flex items-center justify-center cursor-grab"
            style={{ zIndex: 3, x: ribbonX }}
            drag="x"
            dragConstraints={{ left: 0, right: 300 }}
            onDragEnd={handleDragEnd}
            animate={ribbonControls}
          >
            <span className="text-white font-bold text-xl drop-shadow">
              Потяни ленточку
            </span>
          </motion.div>
        )}
        {/* Декоративная линия на ленточке */}
        <div
          className="absolute top-1/2 left-0 w-full h-1 border-t-4 border-white"
          style={{ zIndex: 4 }}
        />
        {/* Сообщение при раннем открытии */}
        {showEarlyMessage && (
          <motion.div
            className="absolute bottom-4 w-full text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            style={{ zIndex: 5 }}
          >
            <span className="text-white text-lg font-semibold drop-shadow-md">
              {earlyMessage}
            </span>
          </motion.div>
        )}
      </motion.div>
      {/* Состояние открытого подарка */}
      {opened && (
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{ zIndex: 6 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 1 }}
            className="text-4xl font-bold text-[#FFB3C1] drop-shadow-lg"
          >
            Открывай
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default GiftBox;
