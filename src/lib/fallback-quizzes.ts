// Fallback quizzes when AI is unavailable
export const fallbackQuizzes = {
  mathematics: {
    beginner: {
      title: "Basic Mathematics Quiz",
      description: "Test your fundamental math skills",
      questions: [
        {
          question: "What is 5 + 7?",
          options: ["10", "11", "12", "13"],
          correctAnswer: "12",
          explanation: "5 + 7 = 12. This is basic addition."
        },
        {
          question: "What is 8 × 3?",
          options: ["21", "24", "27", "30"],
          correctAnswer: "24",
          explanation: "8 × 3 = 24. This is basic multiplication."
        },
        {
          question: "What is 15 ÷ 3?",
          options: ["3", "4", "5", "6"],
          correctAnswer: "5",
          explanation: "15 ÷ 3 = 5. This is basic division."
        },
        {
          question: "Which number is larger: 0.5 or 0.25?",
          options: ["0.5", "0.25", "They are equal", "Cannot determine"],
          correctAnswer: "0.5",
          explanation: "0.5 is equal to 1/2, while 0.25 is equal to 1/4. Since 1/2 > 1/4, we have 0.5 > 0.25."
        },
        {
          question: "What is the perimeter of a square with side length 4?",
          options: ["12", "14", "16", "18"],
          correctAnswer: "16",
          explanation: "Perimeter of a square = 4 × side length = 4 × 4 = 16."
        }
      ]
    },
    intermediate: {
      title: "Intermediate Mathematics Quiz",
      description: "Challenge your mathematical understanding",
      questions: [
        {
          question: "What is the value of π (pi) to two decimal places?",
          options: ["3.14", "3.16", "3.12", "3.18"],
          correctAnswer: "3.14",
          explanation: "Pi (π) is approximately equal to 3.14159..., which rounds to 3.14 when expressed to two decimal places."
        },
        {
          question: "If x + y = 10 and x - y = 4, what is the value of x?",
          options: ["5", "6", "7", "8"],
          correctAnswer: "7",
          explanation: "From the equations, we can add them: 2x = 14, so x = 7."
        },
        {
          question: "What is the area of a circle with radius 5 units?",
          options: ["25π square units", "10π square units", "5π square units", "15π square units"],
          correctAnswer: "25π square units",
          explanation: "The area of a circle is πr², where r is the radius. So, area = π × 5² = 25π square units."
        },
        {
          question: "What is the square root of 144?",
          options: ["12", "14", "10", "16"],
          correctAnswer: "12",
          explanation: "The square root of 144 is 12 because 12 × 12 = 144."
        },
        {
          question: "Solve for x: 2x + 8 = 20",
          options: ["4", "6", "8", "10"],
          correctAnswer: "6",
          explanation: "2x + 8 = 20, so 2x = 12, therefore x = 6."
        }
      ]
    }
  },
  science: {
    beginner: {
      title: "Basic Science Quiz",
      description: "Explore fundamental scientific concepts",
      questions: [
        {
          question: "What do plants need to make their food?",
          options: ["Sunlight and water", "Only water", "Only soil", "Only air"],
          correctAnswer: "Sunlight and water",
          explanation: "Plants need sunlight, water, and carbon dioxide for photosynthesis to make their food."
        },
        {
          question: "How many legs does a spider have?",
          options: ["6", "8", "10", "12"],
          correctAnswer: "8",
          explanation: "Spiders are arachnids and have 8 legs, unlike insects which have 6 legs."
        },
        {
          question: "What is the largest planet in our solar system?",
          options: ["Earth", "Mars", "Jupiter", "Saturn"],
          correctAnswer: "Jupiter",
          explanation: "Jupiter is the largest planet in our solar system, much larger than Earth."
        },
        {
          question: "What do we call baby frogs?",
          options: ["Tadpoles", "Puppies", "Kittens", "Chicks"],
          correctAnswer: "Tadpoles",
          explanation: "Baby frogs are called tadpoles. They live in water and have tails before developing into adult frogs."
        },
        {
          question: "Which organ pumps blood in the human body?",
          options: ["Brain", "Heart", "Lungs", "Stomach"],
          correctAnswer: "Heart",
          explanation: "The heart is the organ that pumps blood throughout the human body."
        }
      ]
    },
    intermediate: {
      title: "Science Quiz",
      description: "Test your scientific knowledge",
      questions: [
        {
          question: "What is the chemical symbol for gold?",
          options: ["Go", "Gd", "Au", "Ag"],
          correctAnswer: "Au",
          explanation: "The chemical symbol for gold is Au, which comes from the Latin word 'aurum'."
        },
        {
          question: "Which planet is known as the Red Planet?",
          options: ["Venus", "Mars", "Jupiter", "Saturn"],
          correctAnswer: "Mars",
          explanation: "Mars is known as the Red Planet due to its reddish appearance, which is caused by iron oxide (rust) on its surface."
        },
        {
          question: "What is the largest organ in the human body?",
          options: ["Heart", "Liver", "Skin", "Brain"],
          correctAnswer: "Skin",
          explanation: "The skin is the largest organ in the human body, covering an area of about 2 square meters in adults."
        },
        {
          question: "What is the process by which plants make their own food using sunlight?",
          options: ["Respiration", "Photosynthesis", "Transpiration", "Germination"],
          correctAnswer: "Photosynthesis",
          explanation: "Photosynthesis is the process by which green plants use sunlight to synthesize foods with carbon dioxide and water."
        },
        {
          question: "What gas do humans exhale when they breathe out?",
          options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
          correctAnswer: "Carbon dioxide",
          explanation: "Humans exhale carbon dioxide (CO2) as a waste product of cellular respiration."
        }
      ]
    }
  },
  "general-knowledge": {
    beginner: {
      title: "Basic General Knowledge Quiz",
      description: "Test your general awareness",
      questions: [
        {
          question: "How many days are there in a week?",
          options: ["5", "6", "7", "8"],
          correctAnswer: "7",
          explanation: "There are 7 days in a week: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, and Sunday."
        },
        {
          question: "Which country is known as the Land of the Rising Sun?",
          options: ["China", "Thailand", "South Korea", "Japan"],
          correctAnswer: "Japan",
          explanation: "Japan is known as the Land of the Rising Sun because from China, Japan appears to be in the direction where the sun rises."
        },
        {
          question: "What is the capital of France?",
          options: ["London", "Berlin", "Paris", "Rome"],
          correctAnswer: "Paris",
          explanation: "Paris is the capital and largest city of France."
        },
        {
          question: "How many colors are there in a rainbow?",
          options: ["5", "6", "7", "8"],
          correctAnswer: "7",
          explanation: "A rainbow has 7 colors: Red, Orange, Yellow, Green, Blue, Indigo, and Violet (ROYGBIV)."
        },
        {
          question: "Which ocean is the largest?",
          options: ["Atlantic", "Indian", "Arctic", "Pacific"],
          correctAnswer: "Pacific",
          explanation: "The Pacific Ocean is the largest ocean on Earth, covering about one-third of the planet's surface."
        }
      ]
    },
    intermediate: {
      title: "General Knowledge Quiz",
      description: "Test your general knowledge",
      questions: [
        {
          question: "Who painted the Mona Lisa?",
          options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
          correctAnswer: "Leonardo da Vinci",
          explanation: "The Mona Lisa was painted by Italian artist Leonardo da Vinci between 1503 and 1519."
        },
        {
          question: "What is the smallest prime number?",
          options: ["0", "1", "2", "3"],
          correctAnswer: "2",
          explanation: "The smallest prime number is 2. A prime number is a natural number greater than 1 that is not a product of two smaller natural numbers."
        },
        {
          question: "Which country has the most time zones?",
          options: ["USA", "Russia", "China", "Canada"],
          correctAnswer: "Russia",
          explanation: "Russia has 11 time zones, making it the country with the most time zones in the world."
        },
        {
          question: "What is the chemical symbol for water?",
          options: ["H2O", "CO2", "O2", "N2"],
          correctAnswer: "H2O",
          explanation: "The chemical formula for water is H2O, which represents two hydrogen atoms and one oxygen atom bonded together."
        },
        {
          question: "In which year did World War II end?",
          options: ["1943", "1944", "1945", "1946"],
          correctAnswer: "1945",
          explanation: "World War II ended in 1945 with the surrender of Germany in May and Japan in September."
        }
      ]
    }
  }
};

// Add more subjects as needed
export const getSubjectFallback = (subject: string) => {
  return fallbackQuizzes[subject as keyof typeof fallbackQuizzes] || null;
};
