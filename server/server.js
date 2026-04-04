const express = require('express');
const app = express();
const cors = require("cors")
app.use(cors());
app.use(express.json());

const Groq = require('groq-sdk');
require('dotenv').config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });



// const authRoutes = require('./routes/authRoutes');
// const aiRoutes = require('./routes/aiRoutes');

const PORT = process.env.PORT || 5000;
// app.use('/api/auth',authRoutes);
// app.use('/api/ai',aiRoutes);


app.post('/generate-email', async (req, res) => {
  const { topic } = req.body;

  try {
    if (!topic) {
      return res.status(400).json({ error: "Topic is missing!" });
    }

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are an expert cold email writer. Return 3 professional email drafts.' },
        { role: 'user', content: `Topic: ${topic}` }
      ],
      model: 'llama-3.3-70b-versatile', // এই লাইনটি আপডেট করুন
    });

    res.json({ result: completion.choices[0].message.content });
  } catch (error) {
    console.error("Groq API Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Server is running 1111")
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})