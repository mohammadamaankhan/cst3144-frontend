# After-School Lessons App - Frontend

This is the frontend application for my CST3144 Full Stack Development coursework. It's a Vue 2 web app that allows parents and students to browse and book after-school lessons.

**Student**: Mohammad Amaan Khan (M00986493)  
**Email**: mk2310@live.mdx.ac.uk  
**Module**: CST3144 - Full Stack Development  
**Lecturer**: Dr. Chinnu Mary George  
**Academic Year**: 2025-26, Semester 1

## Technologies Used

- **Framework**: Vue 2
- **Build Tool**: Vite 4.5
- **Styling**: Tailwind CSS 3.4
- **Icons**: Font Awesome
- **HTTP Requests**: Fetch API
- **Deployment**: GitHub Pages

## Features

- ✅ Display lessons with subject, location, price, and availability
- ✅ Sort lessons by subject, location, price, or spaces (ascending/descending)
- ✅ Search lessons in real-time (search as you type)
- ✅ Add lessons to shopping cart
- ✅ Remove lessons from cart
- ✅ Checkout with name and phone validation
- ✅ Connect to Express.js backend API

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Environment Variables

Create a `.env` file with:
```
VITE_API_URL=http://localhost:3000
```

For production (GitHub Pages), update to your Render.com backend URL.

## Live Application

My app is deployed and fully functional on GitHub Pages!

**Live App**: https://mohammadamaankhan.github.io/cst3144-frontend/

The frontend connects to my backend API hosted on Render.com: https://cst3144-backend-f7yf.onrender.com

## Source Code

**GitHub Repository**: https://github.com/mohammadamaankhan/cst3144-frontend

The repository includes 10+ commits documenting my development process from initial setup through to final deployment.

## Project Structure

```
src/
├── App.vue              # Main component with state management
├── components/
│   ├── LessonCard.vue   # Display individual lesson
│   ├── CartItem.vue     # Display cart item
│   ├── SearchBar.vue    # Search functionality
│   └── SortControls.vue # Sort functionality
├── main.js              # Application entry point
└── style.css            # Tailwind CSS imports
```
