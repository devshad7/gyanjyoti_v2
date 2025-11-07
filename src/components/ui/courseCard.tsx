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
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full flex flex-col">
      {/* Top image section */}
      <div className="relative h-[160px] sm:h-[180px] md:h-[200px] lg:h-[220px]">
        {subject && (
          <div className="absolute top-0 left-0 right-0 h-8 sm:h-10 bg-blue-600 flex items-center justify-center z-10">
            <span className="text-white text-sm sm:text-base font-semibold">{subject}</span>
          </div>
        )}

        {classLevel && (
          <div className="absolute top-0 right-0 z-10">
            <div className="relative">
              <div className="w-0 h-0 border-t-[20px] sm:border-t-[25px] border-t-transparent border-r-[20px] sm:border-r-[25px] border-r-white"></div>
              <div className="absolute top-0 right-0 bg-white text-[10px] sm:text-xs px-1.5 py-0.5 text-blue-600 font-medium">
                {classLevel}
              </div>
            </div>
          </div>
        )}

        <div className="h-full w-full bg-blue-100">
          <Link href={`/course/${slug}`} className="block h-full w-full">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={title}
                width={500}
                height={250}
                className="w-full h-full object-cover object-center"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
          </Link>
        </div>
      </div>

      {/* Text content */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col">
        <div className="flex-1">
          <Link href={`/course/${slug}`}>
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-red-900 mb-1 line-clamp-1">
              {title}
            </h3>
          </Link>

          {description && (
            <p className="text-xs sm:text-sm text-gray-700 mb-2 sm:mb-3 line-clamp-2">
              {description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 sm:gap-x-4 sm:gap-y-2 mb-2 sm:mb-3">
            {lessons !== undefined && <CourseDetail label={`${lessons} Lessons`} />}
            {hours && <CourseDetail label={`${hours} Hours`} />}
            {language && <CourseDetail label={language} />}
          </div>
        </div>

        {/* Rating section */}
        <div className="flex justify-end items-center mt-auto">
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 sm:h-4 sm:w-4 ${
                    i < (rating || 0)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-1 text-[10px] sm:text-xs text-gray-600">
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
      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gray-200 flex items-center justify-center mr-1">
        <span className="text-[8px] sm:text-xs text-gray-600">•</span>
      </div>
      <span className="text-[10px] sm:text-xs text-gray-700">{label}</span>
    </div>
  );
}
