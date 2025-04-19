import Image from "next/image";
import { Card } from "./card";
import { Users } from "lucide-react";
import { CourseCardProps } from "@/types/CourseTypeProps";
import Link from "next/link";

function CourseCard({
  image,
  title,
  category,
  students,
  rating,
  price,
}: CourseCardProps) {
  return (
    <Card className="overflow-hidden border-none shadow-sm py-0 gap-0">
      <Link href={"/course"} className="relative h-52 w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover hover:scale-105 hover:duration-150 hover:ease-in-out"
        />
      </Link>
      <div className="p-4">
        <div className="text-xs text-gray-500 mb-1">{category}</div>
        <Link href={""}>
          <h3 className="font-medium mb-4 hover:text-indigo-600 hover:underline">
            {title}
          </h3>
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-600">{students}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(Number(rating))
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-600">{rating}</span>
            </div>
          </div>
          <div className="text-sm font-medium text-indigo-600">{price}</div>
        </div>
      </div>
    </Card>
  );
}

export default CourseCard;
