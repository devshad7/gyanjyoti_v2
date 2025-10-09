import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

export type CourseCardProps = {
  slug: string;
  subject?: string;
  classLevel?: string;
  title: string;
  description?: string;
  lessons?: number | string;
  hours?: string;
  language?: string;
  rating?: number;
  reviews?: number;
  imageSrc?: string;
  price?: number | null;
};

export default function CourseCard({
  slug,
  subject,
  classLevel,
  title,
  description,
  lessons,
  hours,
  language,
  rating,
  reviews,
  imageSrc,
}: CourseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer h-full flex flex-col">
      <div className="relative h-[160px]">
        {subject && (
          <div className="absolute top-0 left-0 right-0 h-10 bg-blue-600 flex items-center justify-center z-10">
            <span className="text-white font-bold">{subject}</span>
          </div>
        )}
        {classLevel && (
          <div className="absolute top-0 right-0 z-10">
            <div className="relative">
              <div className="w-0 h-0 border-t-[25px] border-t-transparent border-r-[25px] border-r-white"></div>
              <div className="absolute top-0 right-0 bg-white text-xs px-2 py-1 text-blue-600">{classLevel}</div>
            </div>
          </div>
        )}

        <div className="h-54 w-auto bg-blue-100">
          <Link href={`/course/${slug}`} className="block h-full w-full pt-4">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={title}
                width={500}
                height={100}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className="w-full h-full bg-gray-100" />
            )}
          </Link>
        </div>
      </div>

      <div className="p-3 mt-13 flex-1 flex flex-col">
        <div className="flex-1">
          <Link href={`/course/${slug}`}>
            <h3 className="text-lg font-bold text-red-900 mb-1 line-clamp-1">{title}</h3>
          </Link>
          {description && <p className="text-sm text-gray-700 mb-3 line-clamp-2">{description}</p>}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3">
            {lessons !== undefined && <CourseDetail label={`${lessons} Lessons`} />}
            {hours && <CourseDetail label={`${hours} Hours`} />}
            {language && <CourseDetail label={language} />}
          </div>
        </div>

        <div className="flex justify-end items-center mt-auto">
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-3 w-3 ${i < (rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
              ))}
            </div>
            <span className="ml-1 text-xs text-gray-600">
              {reviews ?? 0} {reviews === 1 ? "Review" : "Reviews"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CourseDetail({ label }: { label: string }) {
  return (
    <div className="flex items-center">
      <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center mr-1">
        <span className="text-xs">•</span>
      </div>
      <span className="text-xs">{label}</span>
    </div>
  );
}
