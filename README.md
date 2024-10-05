# IdeaNest

**IdeaNest** is a simple and efficient application designed to help you organize and manage your ideas and links in one place. Whether you're gathering inspiration or storing important resources, IdeaNest provides a clean and structured environment to keep everything organized and accessible.

## Features

- **Link Preview**: Automatically fetches and displays a preview of your saved links, including the title and description.
- **Organize with Folders**: Store your links and ideas in categorized folders for easy navigation and structure.

## Getting Started

### Prerequisites

Before getting started, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (Node package manager)

### To run the application locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/Chavda2772/IdeaNest.git
    ```

2. Navigate to the project directory:
    ```bash
    cd ideanest
    ```

3. Database setup:
    - Create MySql Database
    - Execute SQL Script into Database from below location
    ```bash
    resources/Database/database_create_script.sql
    ```
    - Rename backend/.env_Sample to .env
    - Update necessary details in .env file and remove comments.

4. Install the necessary frontend dependencies:
    ```bash
    cd frontend
    npm install
    ```

5. Install the necessary backend dependencies:
    ```bash
    cd .. 
    cd backend
    npm install
    ```

This will start the development server. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### DEMO
[Demo](https://ideanest.chavdamahesh.com/)

### Building for Production

To create a production-ready build:
```bash
build.bat
```

The optimized production build will be available in the `build` directory at repository level, ready for production.

## Usage

1. **Create Folders**: Start by creating folders to organize your ideas and links based on your projects or categories.
2. **Add Links**: Save links along with their titles and descriptions, and the app will automatically fetch a preview for better context.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch-name`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch-name`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, feel free to reach out:

- **Email**: Chavdamahesh2772@gmail.com
- **GitHub**: [Chavda2772](https://github.com/Chavda2772)
