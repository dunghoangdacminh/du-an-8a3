import Link from "next/link";
import { Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 bg-blue-50 dark:bg-slate-800">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              © {currentYear} Lớp 8A3 - Trường THCS Nguyễn Đăng Đạo
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Trang Chủ
            </Link>
            <Link
              href="/timeline"
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Timeline
            </Link>
            <Link
              href="/gallery"
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Thư Viện
            </Link>
            <Link
              href="/memory-board"
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Lưu Bút
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center justify-center">
            Được tạo với <Heart className="h-4 w-4 mx-1 text-red-500" /> bởi lớp
            8A3
          </p>
        </div>
      </div>
    </footer>
  );
}
