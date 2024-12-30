const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

admin.initializeApp();
const app = express();

// Enable CORS for all routes
app.use(cors({ origin: true }));

// Progress endpoint
app.get('/progress', async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const progressRef = admin.firestore().collection('progress').doc(userId);
    const doc = await progressRef.get();

    if (!doc.exists) {
      return res.json({ progress: [] });
    }

    return res.json({ progress: doc.data() });
  } catch (error) {
    console.error('Error fetching progress:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Skills endpoint
app.get('/skills', async (req, res) => {
  try {
    const skillsSnapshot = await admin.firestore().collection('skills').get();
    const skills = [];
    skillsSnapshot.forEach(doc => {
      skills.push({ id: doc.id, ...doc.data() });
    });
    return res.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// User skills endpoint
app.get('/user-skills', async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const userSkillsRef = admin.firestore().collection('userSkills').doc(userId);
    const doc = await userSkillsRef.get();

    if (!doc.exists) {
      return res.json({ skills: [] });
    }

    return res.json({ skills: doc.data().skills || [] });
  } catch (error) {
    console.error('Error fetching user skills:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Export the Express app as a Firebase Function
exports.api = functions.https.onRequest(app); 