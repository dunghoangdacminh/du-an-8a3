"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Class information
const classInfo = {
  name: "Lớp 8A3",
  school: "Trường THCS Nguyễn Đăng Đạo",
  year: "2024-2025",
  students: 46,
  teacher: "Cô Nguyễn Thị Huyền",
  achievements: [
    "Đạt giải cuốn sách em yêu",
    "Giải nhì cuộc thi thể thao",
    "Nhiều bạn có thành tích cao trong kì thi học sinh giỏi",
  ],
};

// Class representatives
const classReps = [
  {
    name: "Chu Minh Thảo",
    role: "Lớp trưởng",
    avatar: "/placeholder.svg?height=200&width=200&text=MA",
    description:
      "Năng động, nhiệt tình và có trách nhiệm. Luôn đi đầu trong các hoạt động của lớp.",
  },
  {
    name: "Nguyễn Ngọc Bích",
    role: "Lớp phó học tập",
    avatar: "/placeholder.svg?height=200&width=200&text=HN",
    description:
      "Học giỏi, chăm chỉ và sẵn sàng giúp đỡ các bạn trong lớp với bài tập khó.",
  },
  {
    name: "Hoàng Đắc Minh Dũng",
    role: "Lớp phó lao động",
    avatar: "/placeholder.svg?height=200&width=200&text=TH",
    description: "...",
  },
];

// FAQ items
const faqItems = [
  {
    question: "Lớp mình có bao nhiêu học sinh?",
    answer: `Lớp 8A3 có tổng cộng ${classInfo.students} học sinh, trong đó có x nữ và y nam.`,
  },
  {
    question: "Ai là giáo viên chủ nhiệm?",
    answer: `Giáo viên chủ nhiệm của lớp là ${classInfo.teacher}, giáo viên bộ môn Tiếng Anh.`,
  },
  {
    question: "Lớp mình đã đạt được những thành tích gì?",
    answer: `Trong năm học 2024 - 2025, lớp mình đã đạt được nhiều thành tích đáng tự hào như: ${classInfo.achievements.join(
      ", ",
    )}.`,
  },
  {
    question: "Các hoạt động nổi bật của lớp trong năm học?",
    answer:
      "Lớp mình đã tổ chức nhiều hoạt động như: văn nghệ chào mừng 20/11, dã ngoại cuối năm, hoạt động từ thiện vào dịp Tết, và tham gia tích cực các cuộc thi của trường.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen py-12">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-800 dark:text-blue-300">
            Chúng Mình Là Ai?
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Giới thiệu về lớp 8A3 và những thành viên đặc biệt
          </p>
        </motion.div>

        {/* Class Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-64 md:h-auto">
                <Image
                  src="/placeholder.svg?height=600&width=800&text=Lớp+8A3"
                  alt="Lớp 8A3"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-blue-800 dark:text-blue-300">
                  {classInfo.name}
                </h2>
                <div className="space-y-3 text-slate-700 dark:text-slate-300">
                  <p>
                    <span className="font-medium">Trường:</span>{" "}
                    {classInfo.school}
                  </p>
                  <p>
                    <span className="font-medium">Năm học:</span>{" "}
                    {classInfo.year}
                  </p>
                  <p>
                    <span className="font-medium">Sĩ số:</span>{" "}
                    {classInfo.students} học sinh
                  </p>
                  <p>
                    <span className="font-medium">Giáo viên chủ nhiệm:</span>{" "}
                    {classInfo.teacher}
                  </p>
                  <div>
                    <p className="font-medium mb-2">Thành tích:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      {classInfo.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </motion.div>

        {/* Class Representatives */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-800 dark:text-blue-300">
            Ban Cán Sự Lớp
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {classReps.map((rep, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
                      <Image
                        src={rep.avatar || "/placeholder.svg"}
                        alt={rep.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-1 text-slate-900 dark:text-white">
                      {rep.name}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                      {rep.role}
                    </p>
                    <p className="text-slate-600 dark:text-slate-300">
                      {rep.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-blue-800 dark:text-blue-300">
            Câu Hỏi Thường Gặp
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-slate-900 dark:text-white">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 dark:text-slate-300">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
