# Techeject

Techeject is a full-stack web application developed using Next.js and MongoDB, offering a comprehensive set of features for users. It provides functionalities such as user authentication, password management, email verification, and security measures to enhance user experience and safeguard user accounts.

## 🚀 Features

- **Login:** Secure user authentication using credentials.  
- **Signup:** New users can register and create accounts.  
- **Reset Password:** Users can reset forgotten passwords via email link.  
- **Email Verification:** Sends verification emails to confirm addresses.  
- **Brute-force Protection:** Blocks multiple failed login attempts.  
- **Admin Modules:** Admin dashboard for user and content management.  
- **Payment System:** Built-in payment processing for premium features.

## 🛠 Technologies Used

- **Next.js** – React framework for server-side rendering and static site generation.  
- **MongoDB** – NoSQL database for efficient data storage and retrieval.  
- **Node.js** – JavaScript runtime for backend server and API endpoints.  

## 📦 Getting Started

1. **Clone the repository**  
   ```bash
   git clone https://github.com/your-username/techeject.git
   cd techeject
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Configure environment variables**  
   Create a `.env.local` file in the root directory and add:
   ```dotenv
   MONGODB_URI=your_mongodb_connection_string
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   # Add any other env vars as needed (e.g., email service keys, payment API keys)
   ```

4. **Run the development server**  
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Fork the repository.  
- Create a new branch: `git checkout -b feature/YourFeature`.  
- Commit your changes: `git commit -m "Add some feature"`.  
- Push to the branch: `git push origin feature/YourFeature`.  
- Open a Pull Request.

## 📄 License

This project is licensed under the MIT License.
