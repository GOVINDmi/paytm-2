"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation"; // Correct import

export default function Home() {
  const router = useRouter(); // Router initialization for navigation

  return (
    <div className="w-full flex items-center justify-center bg-gray-100">
      <div className="p-4 w-full max-w-4xl bg-gray-100 pl-60 pb-60">
        {/* Banner */}
        <motion.div
          className="w-full max-w-md h-32 bg-orange-300 rounded-lg mb-8 flex items-center justify-center text-white text-xl font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Dashboard
        </motion.div>

        {/* Money Transfer Section */}
        <section className="mb-8 w-full max-w-md">
          <h2 className="text-lg font-semibold mb-4 text-center">Money Transfer</h2>
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              onClick={() => router.push("/p2p")} // Navigate to /p2p
              className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-2xl">📱</span>
              <p className="mt-2 text-sm font-medium text-center">To Mobile</p>
            </motion.div>
            <motion.div
              onClick={() => router.push("/transfer")} // Navigate to /transfer
              className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-2xl">🏦</span>
              <p className="mt-2 text-sm font-medium text-center">From Bank</p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-2xl">👤</span>
              <p className="mt-2 text-sm font-medium text-center">To Self</p>
            </motion.div>
            <motion.div
              onClick={() => router.push("/transactions")} // Navigate to /transaction
              className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-2xl">💰</span>
              <p className="mt-2 text-sm font-medium text-center">Balance & History</p>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
