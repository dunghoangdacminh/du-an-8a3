"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Fireworks from "@/components/fireworks"
import MusicSelector from "@/components/music-selector"
import Link from "next/link"

// Danh sách nhạc
const musicTracks = [
  {
    id: "1",
    name: "See you again",
    url: "https://files.catbox.moe/nipbem.mp3",
  },
  {
    id: "2",
    name: "FE!N",
    url: "https://files.catbox.moe/qenuxd.mp3",
  },
]

// Tạo dữ liệu ngẫu nhiên nhưng cố định
const generateStars = () => {
  return Array.from({ length: 100 }).map((_, i) => ({
    id: `star-${i}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    opacity: Math.random() * 0.7 + 0.3,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 5,
  }))
}

const generateBalloons = () => {
  return Array.from({ length: 15 }).map((_, i) => ({
    id: `balloon-${i}`,
    x: Math.random() * 100,
    xOffset: Math.sin(i) * 50,
    color: ["#FF5252", "#FFEB3B", "#4CAF50", "#2196F3", "#E040FB", "#FF9800"][Math.floor(Math.random() * 6)],
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 10,
  }))
}

// Tạo dữ liệu trước khi component render
const stars = generateStars()
const balloons = generateBalloons()

export default function CelebrationPage() {
  const [showFireworks, setShowFireworks] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Đánh dấu khi code chạy ở client
  useEffect(() => {
    setIsClient(true)
  }, [])

  const launchFireworks = () => {
    setShowFireworks(true)
    setTimeout(() => setShowFireworks(false), 5000)
  }

  // Nếu đang ở server-side, render một phiên bản đơn giản hơn
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-900 via-purple-900 to-pink-900 flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            <span className="text-yellow-300">Chúc Mừng</span> Bế Giảng!
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-2xl">
            Hãy cùng nhau ăn mừng kết thúc một năm học tuyệt vời với những kỷ niệm đáng nhớ!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-purple-900 to-pink-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            initial={{
              x: `${star.x}%`,
              y: `${star.y}%`,
              scale: Math.random() * 0.5 + 0.1,
              opacity: star.opacity,
            }}
            animate={{
              opacity: [null, 0.2, 1, 0.2],
            }}
            transition={{
              duration: star.duration,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: star.delay,
            }}
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
          />
        ))}
      </div>

      {/* Conditional fireworks */}
      {showFireworks && <Fireworks autoPlay={false} />}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
          <span className="text-yellow-300">Chúc Mừng</span> Bế Giảng!
        </h1>
        <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-2xl">
          Hãy cùng nhau ăn mừng kết thúc một năm học tuyệt vời với những kỷ niệm đáng nhớ!
        </p>

        <div className="grid grid-cols-1 gap-8 mb-12 max-w-md mx-auto">
          {/* Music Selector */}
          <MusicSelector tracks={musicTracks} />
        </div>

        <Button
          size="lg"
          className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white text-lg px-8 py-6 h-auto"
          asChild
        >
          <Link href="/">Quay Về Trang Chủ</Link>
        </Button>
      </motion.div>

      {/* Floating balloons */}
      {balloons.map((balloon) => (
        <motion.div
          key={balloon.id}
          className="absolute rounded-full w-8 h-10 opacity-80"
          initial={{
            x: `${balloon.x}%`,
            y: "110%",
            backgroundColor: balloon.color,
          }}
          animate={{
            y: "-10%",
            x: `calc(${balloon.x}% + ${balloon.xOffset}px)`,
          }}
          transition={{
            duration: balloon.duration,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            delay: balloon.delay,
            ease: "linear",
          }}
          style={{
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          }}
        >
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0.5 h-10 bg-white/50" />
        </motion.div>
      ))}
    </div>
  )
}
