export interface CoursePage {
  slug: string;
  category: string;
  classLevel: string;
  subject: string;
  languauge: string;
  rating: number;
  price: number;
  reviews: number;
  title: string;
  subtitle: string;
  instructor: Instructor;
  videoThumbnailUrl: string;
  aboutCourse: string;
  detailedDescription: string;
  whatYouWillLearn: string[];
  courseDetails: CourseDetails;
  teacherInfo: Instructor;
}

export interface Instructor {
  name: string;
  title: string;
  bio: string;
  category: string;
  profileUrl: string;
}

export interface CourseDetails {
  level: "Basic" | "Intermediate" | "Advanced";
  duration: string;
  totalVideos: number;
  access: string;
  compatibility: string;
  guarantee: string;
}

export const course: CoursePage[] = [
  {
    slug: "introduction-to-lighting-on-illustration",
    category: "Illustration",
    classLevel: "Class 10",
    subject: "Science",
    languauge: "English",
    rating: 4,
    reviews: 1,
    price: 999,
    title: "Introduction to lighting on illustration",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    instructor: {
      name: "John Carter",
      title: "Illustration",
      bio: "Posuere quam vitae varius...",
      category: "Illustration",
      profileUrl: "/assets/mentors/mentor1.jpg",
    },
    videoThumbnailUrl: "/assets/course_preview.webp",
    aboutCourse: "Posuere quam vitae varius condimentum...",
    detailedDescription: "Lorem ipsum dolor sit amet...",
    whatYouWillLearn: [
      "Posuere quam vitae varius condimentum est augue ullamcorper",
      "Consectetur facilisis nunc neque pretium in in felis in ornare ut elementum diam",
      "Auctor nisl aenean turpis lacus morbi pretium hendrerit placerat dui dolor",
      "Ultrices nibh lacus netus sit tortor vestibulum duis egestas nulla amet dolor sociis",
    ],
    courseDetails: {
      level: "Basic",
      duration: "4hr 28m",
      totalVideos: 12,
      access: "Lifetime Access",
      compatibility: "Access From Any Computer, Tablet or Mobile",
      guarantee: "30 days money guarantee",
    },
    teacherInfo: {
      name: "John Carter",
      title: "Illustration",
      bio: "Posuere quam vitae varius...",
      category: "Illustration",
      profileUrl: "/assets/mentors/mentor1.jpg",
    },
  },
];

export const allClass = [
  "All category",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
  "Design and Creative Skills",
  "Engineering",
  "Engineering Design Courses",
  "Engineering Preparation",
];

// Levels for filter
export const levels = ["All", "Beginner", "Intermediate", "Advanced"];

// Languages for filter
export const languages = ["All", "English", "Nepali"];
