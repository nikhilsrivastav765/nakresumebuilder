const functions = require('firebase-functions');
const axios = require('axios');
const admin = require('firebase-admin');
admin.initializeApp();

// Simple test endpoint
exports.myFunction = functions.https.onRequest((req, res) => {
  res.send("Hello from Firebase!");
});

// Professional Title → AI Skill Suggestions
exports.getAISuggestions = functions.https.onRequest(async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { professionalTitle } = req.body;

  if (!professionalTitle || professionalTitle.trim() === '') {
    return res.status(400).send('No professional title provided');
  }

  const prompt = `
  Suggest a list of professional skills that are highly relevant for someone working as a "${professionalTitle}".
  Only list skills separated by commas without extra text.
  Example: HTML, CSS, JavaScript, ReactJS, Responsive Design
  `;

  try {
    fetch("https://api.ai21.com/studio/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "9de06376-d189-4793-a648-6f79d91903f3",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "model": "jamba-large-1.6",
        "messages": [],
        "documents":[],
        "tools":[],
        "n": 1,
        "max_tokens": 2048,
        "temperature": 0.4,
        "top_p": 1,
        "stop": [],
        "response_format":{"type": "text"},
      }),
    });

    const rawText = response.data.completions[0].data.text || response.data.completions[0].text;
    const skills = rawText
      .trim()
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0);

    res.status(200).json({ skills });
  } catch (error) {
    console.error('Error fetching AI suggestions:', error.response?.data || error.message);
    res.status(500).send('Error fetching AI suggestions');
  }
});
