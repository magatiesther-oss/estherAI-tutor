# EstherAI - Chemistry & Biology Tutor

EstherAI is an intelligent tutoring application that uses OpenAI's GPT to provide personalized explanations and guidance for Chemistry and Biology students.

## Features

- **AI-Powered Tutoring** - Real-time responses from OpenAI's GPT model
- **Subject Focus** - Specialized explanations for Chemistry and Biology
- **Interactive Learning** - Ask questions and get instant explanations
- **Daily Quizzes** - Test your knowledge with practice questions
- **Premium Features** - Advanced revision tools (coming soon)

## Prerequisites

- Node.js v14 or higher
- npm or yarn
- An OpenAI API key from https://platform.openai.com/api-keys

## Installation

```bash
git clone https://github.com/magatiesther-oss/estherAI-tutor.git
cd estherAI-tutor
npm install
cp .env.example .env
```

Edit `.env` and add your API key:

```env
OPENAI_API_KEY=your_actual_api_key_here
PORT=3000
```

Never commit `.env` or expose the API key in frontend code.

## Running the application

```bash
npm start
```

Open http://localhost:3000 in your browser.

For development with automatic reload:

```bash
npm run dev
```

## API

### `POST /api/ask`

Request:

```json
{
  "subject": "Chemistry",
  "question": "What is a covalent bond?"
}
```

Response:

```json
{
  "response": "A covalent bond is..."
}
```

The backend keeps the OpenAI key private and forwards validated questions to OpenAI.

## Project structure

```text
estherAI-tutor/
├── index.html
├── app.js
├── style.css
├── server.js
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## Security

- Keep API keys in environment variables.
- Do not place API keys in `index.html` or `app.js`.
- Add authentication, rate limiting, input limits, and usage monitoring before public production deployment.
