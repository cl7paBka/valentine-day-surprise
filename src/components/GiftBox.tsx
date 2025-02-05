import React, { useState } from "react";
import { motion, useMotionValue, useAnimation } from "framer-motion";

interface GiftBoxProps {
  isLocked: boolean;
  onOpen: () => void;
}

export const GiftBox: React.FC<GiftBoxProps> = ({ isLocked, onOpen }) => {
  const [opened, setOpened] = useState(false);
  const ribbonControls = useAnimation();
  const lidControls = useAnimation();
  const ribbonX = useMotionValue(0);

  // Порог, при котором распаковка считается завершённой
  const RIBBON_THRESHOLD = 100;

  const handleDragEnd = () => {
    if (ribbonX.get() > RIBBON_THRESHOLD) {
      // Анимируем ленточку: она уходит вправо и исчезает
      ribbonControls.start({
        x: 300,
        opacity: 0,
        transition: { duration: 0.5 },
      });
      // Анимируем крышку коробки: она плавно открывается (вращается с нижней осью)
      lidControls.start({
        rotateX: -120,
        transition: { duration: 0.8 },
      });
      // После открытия запускаем состояние, показывающее содержимое подарка
      setTimeout(() => {
        setOpened(true);
        onOpen();
      }, 800);
    } else {
      // Если ленточку не потянули достаточно, возвращаем её в исходное положение
      ribbonControls.start({ x: 0, transition: { duration: 0.5 } });
    }
  };

  return (
    <div className="relative w-80 h-80">
      {/* Контейнер с 3D-перспективой для создания эффекта раскрытия крышки */}
      <motion.div
        className="relative w-full h-full"
        style={{ perspective: 1000 }}
      >
        {/* Основание коробки */}
        <motion.div
          className="absolute bottom-0 w-full h-2/3 bg-gradient-to-b from-red-200 to-pink-200 rounded-b-3xl shadow-xl"
          style={{ zIndex: 1 }}
        />
        {/* Крышка коробки, которая будет открываться */}
        <motion.div
          className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-pink-400 to-red-400 rounded-t-3xl shadow-2xl origin-bottom"
          animate={lidControls}
          initial={{ rotateX: 0 }}
          style={{ zIndex: 2 }}
        />
        {/* Ленточка, которую можно потянуть (отображается только если коробка не открыта) */}
        {!opened && (
          <motion.div
            className="absolute top-1/2 left-0 w-full h-10 flex items-center justify-center cursor-grab"
            style={{ zIndex: 3, x: ribbonX }}
            drag="x"
            dragConstraints={{ left: 0, right: 300 }}
            onDragEnd={handleDragEnd}
            animate={ribbonControls}
          >
            <span className="text-white font-bold text-xl">
              Потяни ленточку
            </span>
          </motion.div>
        )}
        {/* Дополнительная декоративная линия (имитация разделительной ленточки) */}
        <div
          className="absolute top-1/2 left-0 w-full h-1 border-t-4 border-white"
          style={{ zIndex: 4 }}
        />
      </motion.div>

      {/* Содержимое подарка, которое появляется после открытия */}
      {opened && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{ zIndex: 5 }}
        >
          <p className="text-3xl font-bold text-pink-700">
            С Днём Святого Валентина!
          </p>
        </motion.div>
      )}
    </div>
  );
};