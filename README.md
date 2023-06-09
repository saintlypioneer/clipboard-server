# Clipboard Server

Clipboard Server is the backend service for the Clip-Me application, which is a real-time clipboard sharing tool. It uses Socket.IO to handle real-time communication between clients, allowing users to share text data through the clipboard across different devices and browsers by joining a shared room.

## Related Links

- Frontend Repository: [Clip-Me Frontend Repo](https://github.com/yourusername/clip-me-frontend)
- Live Demo: [Clip-Me Live](https://clip-me.netlify.app/)

## Getting Started

These instructions will help you set up the Clipboard Server on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm (Node package manager)

### Installation

1. Clone the repository.

```sh
git clone https://github.com/saintlypioneer/clipboard-server.git
cd clipboard-server
```

2. Install the dependencies.

```sh
npm install
```

3. Run the server locally.

```sh
npm start
```

The server should be running at `http://localhost:3000`.

## Deployment

Clipboard Server is designed to be deployed on Google Cloud, but can be deployed on any cloud provider that supports Node.js applications.

### Deploying on Google Cloud

Follow the [Google Cloud Node.js deployment guide](https://cloud.google.com/appengine/docs/standard/nodejs/building-app) to deploy this application on Google Cloud Platform.

## Environment Variables

You may need to set environment variables for configuration depending on your deployment environment. For example, you may want to set a custom port.

```sh
PORT=8080
```

## Technology Stack

- Node.js for the server.
- Socket.IO for real-time communication.

## API Endpoints

The server uses Socket.IO, so there aren't traditional HTTP endpoints. Instead, it listens for specific events over websockets. The events it listens for include:

- `join` - Join a specific room.
- `copy` - Broadcast the copied text to all users in the room.
- `paste` - Listen for paste events and send them to the client.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.

## Acknowledgments

This project was made possible by the technologies and platforms mentioned above. Special thanks to Node.js, Socket.IO, and Google Cloud.
