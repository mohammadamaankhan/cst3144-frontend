# After-School Lessons App - Frontend

Vue 3 application for browsing and booking after-school lessons.

## Tech Stack

- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Font Awesome
- **Components**: shadcn-vue
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

## Deployment

Deployed on GitHub Pages at: `[To be deployed]`

## GitHub Repository

Repository: https://github.com/mohammadamaankhan/cst3144-frontend

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
