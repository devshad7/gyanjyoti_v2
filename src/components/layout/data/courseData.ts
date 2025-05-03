// Course data types
export interface CourseData {
    id: string
    subject: string
    classLevel: string
    title: string
    description: string
    lessons: number
    hours: string
    language: string 
    price: number
    originalPrice: number | null
    rating: number
    reviews: number
    imageSrc: string
    category: string
  }
  
  // Course data
  export const coursesData: CourseData[] = [
  {
    id: "Science-class-10",
    subject: "SCIENCE",
    classLevel: "Class 10",
    title: "Science & Technology for Class 10",
    description: "Comprehensive videos for Class 10 Science based on the Curriculum Development Centre, Nepal (Revised 2081 BS).",
    lessons: 5,
    hours: "2+",
    language: "English",
    price: 9999,
    originalPrice: null,
    rating: 5,
    reviews: 1,
    imageSrc: "/assets/subject/science10.png?height=150&width=150",
    category: "Class 10",
  },
  {
    id: "account-class-11",
    subject: "ACCOUNT",
    classLevel: "Class 11",
    title: "Accountancy Essentials for Class 11",
    description: "Detailed videos for Class 11 Account based on the National Examinations Board (NEB) Syllabus, Nepal.",
    lessons: 51,
    hours: "16+",
    language: "Nepali",
    price: 999,
    originalPrice: 1999,
    rating: 5,
    reviews: 2,
    imageSrc: "/assets/subject/science10.png?height=100&width=150",
    category: "Class 11",
  },
  {
    id: "account-class-12",
    subject: "ACCOUNT",
    classLevel: "Class 12",
    title: "Advanced Accountancy for Class 12",
    description: "Complete knowledge of Class 12 Account with in-depth explanations and examples.",
    lessons: 137,
    hours: "20+",
    language: "English",
    price: 999,
    originalPrice: 1999,
    rating: 5,
    reviews: 1,
    imageSrc: "/placeholder.svg?height=150&width=150",
    category: "Class 12",
  },
  {
    id: "account-class-8",
    subject: "ACCOUNT",
    classLevel: "Class 8",
    title: "Foundations of Accountancy for Class 8",
    description: "Class 8 Account videos based on the Curriculum Development Centre, Nepal (Revised 2080 BS).",
    lessons: 65,
    hours: "8+",
    language: "Nepali",
    price: 9999,
    originalPrice: null,
    rating: 0,
    reviews: 0,
    imageSrc: "/placeholder.svg?height=150&width=150",
    category: "Class 8",
  },
  {
    id: "account-class-9",
    subject: "ACCOUNT",
    classLevel: "Class 9",
    title: "Accountancy Basics for Class 9",
    description: "Class 9 Account videos based on the Curriculum Development Centre, Nepal (Revised 2080 BS).",
    lessons: 181,
    hours: "26+",
    language: "Nepali",
    price: 9999,
    originalPrice: null,
    rating: 0,
    reviews: 0,
    imageSrc: "/placeholder.svg?height=150&width=150",
    category: "Class 9",
  },
  {
    id: "adobe-after-effects-1",
    subject: "ADOBE AFTER EFFECTS",
    classLevel: "",
    title: "Adobe After Effects: Beginner's Guide",
    description: "A complete beginner's course on Adobe After Effects.",
    lessons: 42,
    hours: "4+",
    language: "Nepali",
    price: 499,
    originalPrice: 999,
    rating: 5,
    reviews: 6,
    imageSrc: "/placeholder.svg?height=150&width=150",
    category: "Design and Creative Skills",
  },
  {
    id: "adobe-after-effects-2",
    subject: "ADOBE AFTER EFFECTS",
    classLevel: "",
    title: "Adobe After Effects: Intermediate Techniques",
    description: "Learn intermediate techniques in Adobe After Effects to enhance your creative skills.",
    lessons: 42,
    hours: "4+",
    language: "Nepali",
    price: 699,
    originalPrice: 1299,
    rating: 4.5,
    reviews: 8,
    imageSrc: "/placeholder.svg?height=150&width=150",
    category: "Design and Creative Skills",
  },
  {
    id: "adobe-after-effects-3",
    subject: "ADOBE AFTER EFFECTS",
    classLevel: "",
    title: "Adobe After Effects: Advanced Motion Graphics",
    description: "Master advanced motion graphics and animation techniques in Adobe After Effects.",
    lessons: 50,
    hours: "6+",
    language: "English",
    price: 899,
    originalPrice: 1499,
    rating: 4.8,
    reviews: 10,
    imageSrc: "/placeholder.svg?height=150&width=150",
    category: "Design and Creative Skills",
  },
  {
    id: "adobe-after-effects-4",
    subject: "ADOBE AFTER EFFECTS",
    classLevel: "",
    title: "Adobe After Effects: Creative Projects",
    description: "Work on creative projects to apply your Adobe After Effects skills.",
    lessons: 35,
    hours: "5+",
    language: "English",
    price: 599,
    originalPrice: 1099,
    rating: 4.7,
    reviews: 5,
    imageSrc: "/placeholder.svg?height=150&width=150",
    category: "Design and Creative Skills",
  },
  {
    id: "adobe-after-effects-5",
    subject: "ADOBE AFTER EFFECTS",
    classLevel: "",
    title: "Adobe After Effects: Visual Effects Mastery",
    description: "Learn to create stunning visual effects using Adobe After Effects.",
    lessons: 60,
    hours: "8+",
    language: "English",
    price: 999,
    originalPrice: 1999,
    rating: 5,
    reviews: 12,
    imageSrc: "/placeholder.svg?height=150&width=150",
    category: "Design and Creative Skills",
  },
];
  
  // Categories for filter
  export const categories = [
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
  ]
  
  // Levels for filter
  export const levels = ["All", "Beginner", "Intermediate", "Advanced"]
  
  // Languages for filter
  export const languages = ["All", "English", "Nepali"]
