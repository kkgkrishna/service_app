# Arya Service Admin Dashboard

A modern admin dashboard built with Next.js, TypeScript, and Tailwind CSS. This application provides a comprehensive interface for managing service inquiries, engineers, and collections.

## Features

- 🌓 Light/Dark mode support
- 📱 Responsive design
- 🔐 Authentication system
- 📊 Dashboard analytics
- 📝 Inquiry management
- 👥 Engineer management
- 💰 Collection tracking
- 🎨 Modern UI with glass morphism effects

## Tech Stack

- [Next.js 14](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Static type checking
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library
- [React Hot Toast](https://react-hot-toast.com/) - Toast notifications
- [clsx](https://github.com/lukeed/clsx) - Conditional class names
- [Tailwind Merge](https://github.com/dcastil/tailwind-merge) - Merge Tailwind CSS classes

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/kkgkrishna/service_app.git
   ```

2. Install dependencies:

   ```bash
   cd service_app
   npm install
   ```

3. Create a `.env` file:

   ```env
   DATABASE_URL="your_database_url"
   JWT_SECRET="your_jwt_secret"
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── context/         # React context providers
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── services/        # API services
│   ├── styles/          # Global styles
│   └── types/           # TypeScript types
├── public/              # Static assets
├── prisma/             # Database schema
└── tailwind.config.js  # Tailwind CSS configuration
```

## Key Features

### Authentication

- Login/Signup system
- JWT-based authentication
- Protected routes

### Dashboard

- Overview statistics
- Recent activities
- Quick actions

### Inquiry Management

- Create new inquiries
- Track inquiry status
- Filter and search functionality

### Engineer Management

- Assign engineers to inquiries
- Track engineer performance
- Manage engineer profiles

### Collection Tracking

- Track payments
- Generate reports
- Monitor outstanding amounts

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Krishna Kumar Gautam - [@kkgkrishna](https://github.com/kkgkrishna)

Project Link: [https://github.com/kkgkrishna/service_app](https://github.com/kkgkrishna/service_app)
