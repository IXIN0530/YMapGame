"use client";
import { motion } from "framer-motion";
type Props = {
  text: string,
  isOpen: boolean,
}

const MyPopup = ({ text, isOpen }: Props) => {
  return (
    <motion.div className={`absolute top-0 left-1/2 -translate-x-1/2   bg-white p-4 rounded-lg shadow-lg  z-[1000] `}
      initial={{ y: -100 }}
      animate={{ y: isOpen ? 30 : -100 }}
      transition={{ duration: 0.5, type: "spring", damping: 20, stiffness: 300 }}
    >
      <p className="text-center">{text}</p>
    </motion.div>
  )
}

export default MyPopup;