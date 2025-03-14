# SuperCar Virtual Sales Assistant

This is a Next.js application that provides an interactive chat interface for a car dealership, allowing users to communicate with an AI assistant to get information about scheduling appointments, dealers addresses, check weather, and more.

## Overview

The SuperCar Virtual Sales Assistant is designed to help customers interact with a car dealership through a conversational interface. The application connects to a backend API that simulates an AI assistant capable of providing information and performing various tasks.

## Features

- **Interactive Chat Interface**: Real-time conversation with an AI assistant
- **Session Management**: Support for multiple user sessions
- **Tool Integration**: The assistant can use various tools to:
  - Get weather information
  - Find dealership addresses
  - Check appointment availability
  - Schedule appointments
- **Responsive Design**: Works on both mobile and desktop devices
- **Real-time Data Streaming**: Implements server-sent events for real-time responses

## Technical Architecture

- **Frontend**: Next.js with React
- **State Management**: React hooks for local state management
- **API Communication**: Server-sent events (SSE) for real-time streaming
- **Styling**: Tailwind CSS for responsive design
- **Deployment**: Ready for deployment on Vercel

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or pnpm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd supercar-assistant
```

2. Install dependencies:

```bash
npm install
# or
pnpm install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with:

```
NEXT_PUBLIC_API_URL=http://localhost:8000/query
```

### Running the Backend

The application requires a backend API that simulates the AI assistant. Set up the backend using Docker:

```bash
docker pull <backend-image>
docker run -p 8000:8000 <backend-image>
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the application.

## Application Structure

- `src/app/page.tsx`: Main application component
- `src/app/api/chat/route.ts`: API route for chat communication by SSE with the backend
- `src/app/hooks/`: Custom hooks for state management and API communication
- `src/components/`: UI components including chat interface and specialized displays
- `src/models/`: TypeScript interfaces and types
- `src/helpers/`: Utility functions

## Key Components

### Chat Interface

The chat interface allows users to send messages to the AI assistant and view responses in real-time. It supports:

- Text messages
- Tool usage visualization
- Interactive components for appointment scheduling

### Session Management

Users can create multiple sessions and switch between them, through the header dropdown menu. Each session maintains its own conversation history.

### Specialized Display Components

The application includes specialized components for displaying:

- Weather information
- Dealership addresses
- Appointment availability
- Appointment confirmations

## Development

### Adding New Tools

To add a new tool for the AI assistant:

1. Update the `ChatSteps` interface in `src/app/models/index.ts`
2. Create a new stepper component in `src/components/stepps/`
3. Add the component to the `STEP_COMPONENTS` object in `src/components/stepper.tsx`

### Modifying the Chat Interface

The chat interface is implemented in `src/components/chat-history.tsx`. To modify it:

1. Update the component to handle new message types or display formats
2. Ensure that the `useChatHistory` hook in `src/app/hooks/use-chat-history.ts` is updated to handle new data

## Deployment

The easiest way to deploy the application is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

For other deployment options, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

Currently, it is deployed by Railway, since docker file. [link](https://frontend-production-842f.up.railway.app/)

## Evaluation Criteria

This project demonstrates:

- Real-time data streaming implementation
- Dynamic UI component creation
- Conversation state management
- Error handling and user feedback
- Responsive design for different device sizes
- Code organization and quality

## License

[MIT](LICENSE)
