import { db, auth } from '../../lib/firebase-admin';

const defaultLessons = [
  // Web Development
  {
    title: 'Introduction to HTML',
    description: 'Learn the basics of HTML structure and tags.',
    content: `
      Welcome to the Introduction to HTML! In this lesson, we'll cover:
      
      1. What is HTML?
      2. Basic structure of an HTML document
      3. Common HTML tags and their uses
      4. Creating a simple webpage
      
      By the end of this lesson, you'll be able to create a basic HTML webpage.
    `,
    order: 1,
    skillId: 'webdev',
  },
  {
    title: 'CSS Fundamentals',
    description: 'Explore the basics of styling web pages with CSS.',
    content: `
      Welcome to CSS Fundamentals! In this lesson, we'll cover:
      
      1. What is CSS and why is it important?
      2. CSS selectors and properties
      3. The box model
      4. Styling text and backgrounds
      
      By the end of this lesson, you'll be able to add basic styles to your HTML pages.
    `,
    order: 2,
    skillId: 'webdev',
  },
  {
    title: 'JavaScript Basics',
    description: 'Get started with JavaScript programming for the web.',
    content: `
      Welcome to JavaScript Basics! In this lesson, we'll cover:
      
      1. Introduction to JavaScript
      2. Variables and data types
      3. Basic operators and control structures
      4. Functions and events
      
      By the end of this lesson, you'll be able to add simple interactivity to your web pages.
    `,
    order: 3,
    skillId: 'webdev',
  },
  // Data Science
  {
    title: 'Introduction to Python for Data Science',
    description: 'Learn the basics of Python programming for data analysis.',
    content: `
      Welcome to Python for Data Science! In this lesson, we'll cover:
      
      1. Python basics: variables, data types, and operations
      2. Control structures and functions
      3. Working with lists and dictionaries
      4. Introduction to NumPy and Pandas libraries
      
      By the end of this lesson, you'll have a solid foundation in Python for data science tasks.
    `,
    order: 1,
    skillId: 'datascience',
  },
  {
    title: 'Data Visualization with Matplotlib',
    description: 'Explore data visualization techniques using Matplotlib.',
    content: `
      Welcome to Data Visualization with Matplotlib! In this lesson, we'll cover:
      
      1. Introduction to Matplotlib
      2. Creating basic plots: line, scatter, and bar charts
      3. Customizing plot appearance
      4. Creating subplots and multiple figures
      
      By the end of this lesson, you'll be able to create informative visualizations of your data.
    `,
    order: 2,
    skillId: 'datascience',
  },
  {
    title: 'Introduction to Machine Learning',
    description: 'Get started with basic machine learning concepts and algorithms.',
    content: `
      Welcome to Introduction to Machine Learning! In this lesson, we'll cover:
      
      1. What is machine learning?
      2. Supervised vs. unsupervised learning
      3. Basic algorithms: linear regression and k-nearest neighbors
      4. Model evaluation and validation
      
      By the end of this lesson, you'll understand the fundamentals of machine learning.
    `,
    order: 3,
    skillId: 'datascience',
  },
  // Mobile App Development
  {
    title: 'Introduction to Mobile App Development',
    description: 'Learn the basics of mobile app development and platforms.',
    content: `
      Welcome to Mobile App Development! In this lesson, we'll cover:
      
      1. Overview of mobile platforms (iOS and Android)
      2. Native vs. cross-platform development
      3. Basic app components and architecture
      4. Setting up your development environment
      
      By the end of this lesson, you'll understand the landscape of mobile app development.
    `,
    order: 1,
    skillId: 'mobiledev',
  },
  {
    title: 'UI Design for Mobile Apps',
    description: 'Explore user interface design principles for mobile applications.',
    content: `
      Welcome to UI Design for Mobile Apps! In this lesson, we'll cover:
      
      1. Mobile UI design principles
      2. Layouts and responsive design
      3. Common UI components and patterns
      4. Prototyping and wireframing tools
      
      By the end of this lesson, you'll be able to design user-friendly mobile app interfaces.
    `,
    order: 2,
    skillId: 'mobiledev',
  },
  {
    title: 'Building Your First Mobile App',
    description: 'Create a simple mobile app using a cross-platform framework.',
    content: `
      Welcome to Building Your First Mobile App! In this lesson, we'll cover:
      
      1. Introduction to React Native
      2. Setting up a new React Native project
      3. Creating a basic UI with components
      4. Adding interactivity and navigation
      
      By the end of this lesson, you'll have built a simple mobile app using React Native.
    `,
    order: 3,
    skillId: 'mobiledev',
  },
  // Cybersecurity
  {
    title: 'Introduction to Cybersecurity',
    description: 'Learn the fundamentals of cybersecurity and common threats.',
    content: `
      Welcome to Introduction to Cybersecurity! In this lesson, we'll cover:
      
      1. What is cybersecurity?
      2. Common cyber threats and attack vectors
      3. Basic security principles (CIA triad)
      4. Introduction to cryptography
      
      By the end of this lesson, you'll understand the basics of cybersecurity and its importance.
    `,
    order: 1,
    skillId: 'cybersecurity',
  },
  {
    title: 'Network Security Fundamentals',
    description: 'Explore the basics of securing computer networks.',
    content: `
      Welcome to Network Security Fundamentals! In this lesson, we'll cover:
      
      1. Network protocols and vulnerabilities
      2. Firewalls and intrusion detection systems
      3. Virtual Private Networks (VPNs)
      4. Wireless network security
      
      By the end of this lesson, you'll understand how to secure computer networks.
    `,
    order: 2,
    skillId: 'cybersecurity',
  },
  {
    title: 'Web Application Security',
    description: 'Learn about common web application vulnerabilities and how to prevent them.',
    content: `
      Welcome to Web Application Security! In this lesson, we'll cover:
      
      1. OWASP Top 10 vulnerabilities
      2. Cross-Site Scripting (XSS) and SQL Injection
      3. Authentication and session management
      4. Secure coding practices
      
      By the end of this lesson, you'll be able to identify and mitigate common web app security issues.
    `,
    order: 3,
    skillId: 'cybersecurity',
  },
];

async function createDefaultLessons() {
  const lessonsSnapshot = await db.collection('lessons').get();
  if (lessonsSnapshot.empty) {
    console.log('Creating default lessons...');
    for (const lesson of defaultLessons) {
      await db.collection('lessons').add(lesson);
    }
    console.log('Default lessons created successfully.');
  }
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Verify the Firebase ID token
      const { authorization } = req.headers;
      if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const idToken = authorization.split('Bearer ')[1];
      await auth.verifyIdToken(idToken);

      await createDefaultLessons();

      const lessonsSnapshot = await db.collection('lessons').get();
      const lessons = lessonsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Group lessons by skillId
      const groupedLessons = lessons.reduce((acc, lesson) => {
        if (!acc[lesson.skillId]) {
          acc[lesson.skillId] = [];
        }
        acc[lesson.skillId].push(lesson);
        return acc;
      }, {});

      // Sort lessons within each skill by order
      for (const skillId in groupedLessons) {
        groupedLessons[skillId].sort((a, b) => a.order - b.order);
      }

      res.status(200).json(groupedLessons);
    } catch (error) {
      console.error('Error fetching lessons:', error);
      res.status(500).json({ error: 'Error fetching lessons', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}