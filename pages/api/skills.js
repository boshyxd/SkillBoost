import { db, auth } from '../../lib/firebase-admin';

const defaultSkills = [
  {
    title: 'Web Development',
    description: 'Learn the fundamentals of web development',
    icon: '🌐',
    difficulty: 'Beginner',
  },
  {
    title: 'Data Science',
    description: 'Explore the world of data analysis and machine learning',
    icon: '📊',
    difficulty: 'Intermediate',
  },
  {
    title: 'Mobile App Development',
    description: 'Create apps for iOS and Android devices',
    icon: '📱',
    difficulty: 'Intermediate',
  },
  {
    title: 'Cybersecurity',
    description: 'Learn to protect systems and networks from digital attacks',
    icon: '🔒',
    difficulty: 'Advanced',
  },
];

const defaultLessonContent = {
  'Web Development': `
    Welcome to Web Development! In this introductory lesson, we'll cover the basics of HTML, CSS, and JavaScript.

    1. HTML (HyperText Markup Language):
       - Structure of a web page
       - Basic tags: <html>, <head>, <body>, <div>, <p>, <a>, <img>
    
    2. CSS (Cascading Style Sheets):
       - Styling HTML elements
       - Selectors, properties, and values
       - Box model: margin, border, padding, content
    
    3. JavaScript:
       - Adding interactivity to web pages
       - Variables, data types, and basic operations
       - DOM manipulation

    By the end of this lesson, you'll be able to create a simple web page with styled elements and basic interactivity.
  `,
  'Data Science': `
    Welcome to Data Science! This introductory lesson will cover the fundamental concepts and tools used in data science.

    1. What is Data Science?
       - Definition and importance
       - The data science process: collect, clean, analyze, visualize, interpret
    
    2. Key Tools and Languages:
       - Python: The most popular language for data science
       - Jupyter Notebooks: Interactive development environment
       - Libraries: NumPy, Pandas, Matplotlib, Scikit-learn
    
    3. Basic Data Analysis:
       - Loading and exploring datasets
       - Descriptive statistics
       - Simple data visualization

    By the end of this lesson, you'll understand the basics of data science and be ready to start your journey into this exciting field.
  `,
  'Mobile App Development': `
    Welcome to Mobile App Development! In this introductory lesson, we'll explore the basics of creating mobile applications.

    1. Mobile Development Platforms:
       - iOS (Swift) vs Android (Kotlin/Java)
       - Cross-platform solutions: React Native, Flutter
    
    2. Key Concepts:
       - User Interface (UI) design for mobile
       - App lifecycle and components
       - Data storage and API integration
    
    3. Building Your First App:
       - Setting up the development environment
       - Creating a simple "Hello World" app
       - Basic UI elements and user interaction

    By the end of this lesson, you'll have an understanding of mobile app development basics and be ready to start building your own apps.
  `,
  'Machine Learning': `
    Welcome to Machine Learning! This introductory lesson will cover the fundamental concepts of ML and its applications.

    1. What is Machine Learning?
       - Definition and types: supervised, unsupervised, reinforcement learning
       - Applications in real-world scenarios
    
    2. Key Concepts:
       - Features and labels
       - Training and testing data
       - Model evaluation metrics
    
    3. Simple Machine Learning Models:
       - Linear Regression
       - K-Nearest Neighbors (KNN)
       - Decision Trees

    By the end of this lesson, you'll understand the basics of machine learning and be ready to explore more advanced topics in this field.
  `,
  'Cybersecurity': `
    Welcome to Cybersecurity! This introductory lesson will cover the fundamental concepts and importance of cybersecurity.

    1. Introduction to Cybersecurity:
       - Definition and importance in the digital age
       - Common types of cyber threats: malware, phishing, DDoS attacks
    
    2. Key Concepts:
       - CIA Triad: Confidentiality, Integrity, Availability
       - Authentication and Authorization
       - Encryption and cryptography basics
    
    3. Basic Security Practices:
       - Strong password policies
       - Two-factor authentication
       - Regular software updates and patch management

    By the end of this lesson, you'll understand the importance of cybersecurity and know some basic practices to protect digital assets.
  `
};

async function createDefaultSkillsAndLessons() {
  const skillsSnapshot = await db.collection('skills').get();
  if (skillsSnapshot.empty) {
    console.log('Creating default skills and lessons...');
    for (const skill of defaultSkills) {
      const skillRef = await db.collection('skills').add(skill);
      const defaultLesson = {
        title: `Introduction to ${skill.title}`,
        description: `Learn the basics of ${skill.title}.`,
        content: defaultLessonContent[skill.title] || `This is an introductory lesson for ${skill.title}.`,
        order: 1,
        skillId: skillRef.id,
      };
      await db.collection('lessons').add(defaultLesson);
    }
    console.log('Default skills and lessons created successfully.');
  }
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      try {
        if (!db) {
          console.error('Firestore is not initialized');
          throw new Error('Firestore is not initialized');
        }

        // Verify the Firebase ID token
        const { authorization } = req.headers;
        if (!authorization || !authorization.startsWith('Bearer ')) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
        const idToken = authorization.split('Bearer ')[1];
        await auth.verifyIdToken(idToken);

        await createDefaultSkillsAndLessons();

        console.log('Fetching skills from Firestore...');
        const skillsSnapshot = await db.collection('skills').get();
        console.log('Skills snapshot received:', skillsSnapshot.size, 'documents');
        
        const skills = await Promise.all(skillsSnapshot.docs.map(async (doc) => {
          const skillData = doc.data();
          const lessonsSnapshot = await db.collection('lessons')
            .where('skillId', '==', doc.id)
            .get();
          
          let lessons = lessonsSnapshot.docs.map(lessonDoc => ({
            id: lessonDoc.id,
            ...lessonDoc.data()
          }));

          // Sort lessons by order field in JavaScript
          lessons.sort((a, b) => a.order - b.order);

          return { 
            id: doc.id, 
            ...skillData,
            lessons,
          };
        }));

        console.log('Processed skills:', skills.length);
        res.status(200).json(skills);
      } catch (error) {
        console.error('Error fetching skills:', error);
        res.status(500).json({ error: 'Error fetching skills', details: error.message });
      }
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error in /api/skills:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
}