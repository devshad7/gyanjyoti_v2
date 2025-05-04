import Image from "next/image";
import { Card } from "./card";
import { Users } from "lucide-react";
import { CourseCardProps } from "@/types/CourseTypeProps";
import Link from "next/link";

function CourseCard({ image, title, slug, category }: CourseCardProps) {
  return (
    <Card className="overflow-hidden border-none shadow-sm py-0 gap-0">
      <Link
        href={`/course/${slug}`}
        className="relative h-52 w-full overflow-hidden"
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover hover:scale-105 hover:duration-150 hover:ease-in-out"
        />
      </Link>
      <div className="p-4">
        <div className="text-xs text-gray-500 mb-1">{category}</div>
        <Link href={`/course/${slug}`}>
          <h3 className="font-medium mb-4 hover:text-indigo-600 hover:underline">
            {title}
          </h3>
        </Link>
      </div>
    </Card>
  );
}

export default CourseCard;
