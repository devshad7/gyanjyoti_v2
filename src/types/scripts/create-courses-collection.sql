-- MongoDB Collection Schema for Courses
-- This is a reference schema - MongoDB is schemaless but this shows the expected structure

-- Collection: courses
{
  "_id": "ObjectId",
  "title": "String - Course title",
  "slug": "String - URL-friendly course identifier",
  "subject": "String - Course subject (e.g., Mathematics, Science)",
  "classLevel": "String - Class level (e.g., Class 10, Class 12)",
  "description": "String - Short course description",
  "aboutCourse": "String - Detailed about section",
  "detailedDescription": "String - Extended course description",
  "subtitle": "String - Course subtitle",
  "category": "String - Course category",
  "language": "String - Course language (Hindi, English, etc.)",
  "rating": "Number - Course rating (1-5)",
  "reviews": "Number - Number of reviews",
  "videoThumbnailUrl": "String - Cloudinary URL for course thumbnail",
  "videos": [
    {
      "title": "String - Video title",
      "url": "String - Cloudinary video URL",
      "duration": "String - Video duration (e.g., '45 mins')",
      "description": "String - Optional video description"
    }
  ],
  "courseDetails": {
    "level": "String - Difficulty level",
    "duration": "String - Total course duration",
    "totalVideos": "String - Number of videos",
    "access": "String - Access type",
    "compatibility": "String - Device compatibility",
    "guarantee": "String - Course guarantee"
  },
  "teacherInfo": {
    "name": "String - Teacher name",
    "profileUrl": "String - Teacher profile image URL",
    "bio": "String - Teacher biography"
  },
  "whatYouWillLearn": ["String - Learning outcome 1", "String - Learning outcome 2"],
  "createdAt": "Date - Creation timestamp",
  "updatedAt": "Date - Last update timestamp"
}

-- Indexes for better performance
-- db.courses.createIndex({ "slug": 1 }, { unique: true })
-- db.courses.createIndex({ "subject": 1 })
-- db.courses.createIndex({ "classLevel": 1 })
-- db.courses.createIndex({ "language": 1 })
-- db.courses.createIndex({ "rating": -1 })
