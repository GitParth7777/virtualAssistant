# Shifra – AI Virtual Voice Assistant

**Shifra** is a MERN stack-based AI-powered virtual voice assistant that interacts with users through voice commands and provides intelligent responses using the **Gemini API**.

---

## Features

- **Voice Interaction:** Listen to user commands and respond using AI-generated speech  
- **Intelligent Responses:** Powered by Gemini API for natural and contextual answers  
- **Web-based:** Accessible through a responsive web interface  
- **Task Execution:** Can perform tasks like opening websites, telling time, and answering questions  
- **User Profiles:** Maintain user preferences and history (optional)

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, Axios  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **AI Integration:** Gemini API  
- **Voice Recognition:** Web Speech API / Speech Recognition library  
- **Text-to-Speech:** Web Speech API or other TTS libraries

---

## Prerequisites

1. Node.js v16+  
2. MongoDB installed or MongoDB Atlas account  
3. Gemini API key for AI responses

---

## Backend Setup

## Backend Setup

1. **Install dependencies:**
   ```bash
      cd backend
      npm install
   
2. **Create a .env file in backend with:**

   ```ini
   PORT=your_port
   MONGO_URI=your_mongo_connection_string
   GEMINI_API_KEY=your_gemini_api_key


3. **Start the backend server:**

   ```bash
   npm run dev

## Frontend Setup

1. **Install dependencies:**
    ```bash
    cd ../frontend
    npm install

2. **Create a .env file in backend with:**

   ```ini
   VITE_API_URL=http://localhost:5000/api

3. **Start the backend server:**

   ```bash
   npm run dev

## Usage Flow

1. Open the Shifra web app in a browser.

2. Click the voice input button and speak your command.

3. Shifra will process your voice input via the Gemini API.

4. AI-generated responses will be spoken back to you.

5. Users can interact continuously with natural voice commands.

## API Endpoints (Summary)

### Voice Commands
1. `POST /api/voice` - Send voice data and receive AI response  

### User Management (Optional)
1. `POST /api/users/register` - Register a new user  
2. `POST /api/users/login` - Login user  
3. `GET /api/users/me` - Get current user profile


## Future Enhancements

1. Real-time chat interface alongside voice  
2. Multi-language voice support  
3. Personalized AI responses based on user history  
4. Integration with external APIs for calendar, reminders, etc.  
5. Mobile-friendly PWA support

---

## License

MIT

---

## Author

Parth Babariya

