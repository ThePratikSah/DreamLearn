# Dream Learn

Welcome to the Dream Learn repository! This project aims to provide an open-source platform where course creators can build and share courses, and students can learn from a diverse range of educational content. Our goal is to make learning accessible and engaging through a scalable and efficient tech stack.

## Tech Stack

The current tech stack for this project includes:

- **AWS S3**: For storing and serving course videos.
- **AWS Cloudfront**: For CDN
- **AWS SQS**: For handling video processing tasks and other background operations.
- **AWS ECR**: For storing Docker images used by our application.
- **AWS ECS**: For running Docker containers that process videos and handle other tasks.
- **AWS Lambda**: For serverless computing to handle various backend operations.

Upcoming additions to the tech stack:

- **MongoDB**: For storing and managing course data, user information, and more.
- **Redis**: For caching and improving performance.

## Getting Started

To get started with this project, follow these steps:

### Prerequisites

- Node.js (v20 or later)
- AWS CLI configured with appropriate credentials
- Docker (for local development with ECS)

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ThePratikSah/DreamLearn.git
   cd DreamLearn
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment variables:**
   ```bash
   AWS_TEMP_BUCKET=
   AWS_TEMP_QUEUE_URL=
   AWS_REGION=
   AWS_ACCESS_KEY=
   AWS_SECRET_ACCESS_KEY=
   ```
4. **Run the application locally:**
   ```bash
   npm run dev -w apps/queue-consumer
   ```

## Contributing
We welcome contributions from the community! If you'd like to contribute to the project:

- Fork the repository.
- Create a new branch for your feature or bug fix.
- Make your changes and test thoroughly.
- Submit a pull request with a clear description of your changes.

Contact
For any questions or issues, please reach out to us at pratiksah@hotmail.com