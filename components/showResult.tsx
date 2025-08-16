import { ResultType } from "@/type";
import { motion } from "framer-motion";
type Props = {
  results: ResultType[],
  isEnd: boolean,
}

const ShowResult = ({ results, isEnd }: Props) => {

  return (
    <motion.div className="absolute top-1/4 bottom-1/4 left-8 right-8 z-[1000] bg-white rounded-2xl overflow-y-auto
     shadow-2xl grid grid-rows-10 px-2"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isEnd ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.1, ease: "easeInOut" }}>

      <motion.p className=" font-bold row-span-2 text-center my-auto text-4xl "
        initial={{ x: "-100%" }}
        animate={isEnd ? { x: 0 } : { x: "-100%" }}
        transition={{ duration: 0.1, delay: 2 }}>Results</motion.p>
      {results.map((result, index) => {
        return (
          <motion.div key={index} className=" row-span-2 grid grid-cols-10 px-4 py-2 border-b items-end overflow-hidden"
            animate={isEnd ? { x: 0 } : { x: "-100%" }}
            initial={{ x: "-100%" }}
            transition={{ duration: 0.1, delay: 2.5 + index * 0.5 }}>
            <p className="text-lg overflow-scroll whitespace-nowrap col-span-6">{result.name}</p>
            <p className="col-span-1"></p>
            <p className="text-lg overflow-scroll whitespace-nowrap col-span-3">{(result.distance < 1000) ? result.distance.toFixed(2) + " km" : "--km"} </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default ShowResult;