# EventHub - Modern Event Management Platform

A comprehensive event management web application built with React, TypeScript, and Tailwind CSS. EventHub allows users to create, manage, and RSVP to events with a beautiful, responsive interface.

## 🌟 Features

### Core Functionality
- **Event Creation & Management** - Create detailed events with title, description, date, time, location, and categories
- **RSVP System** - Three-status RSVP system (Yes, No, Maybe) with optional notes
- **User Authentication** - Role-based authentication for organizers and attendees
- **Organizer Dashboard** - Comprehensive dashboard for managing events and tracking attendees
- **Event Discovery** - Browse upcoming events with search and category filtering
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

### User Roles
- **Attendees** - Browse and RSVP to events
- **Organizers** - Create, manage, and track events with detailed analytics

### Advanced Features
- **Real-time RSVP Tracking** - Live attendee counts and status updates
- **Event Categories** - Organized by Technology, Marketing, Networking, Business, etc.
- **Image Gallery** - Professional event images from Pexels
- **Search & Filter** - Find events by title, description, location, or category
- **Attendee Management** - View and manage RSVPs with detailed participant information

## 🚀 Live Demo

Visit the live application: [https://inspiring-lollipop-497080.netlify.app](https://inspiring-lollipop-497080.netlify.app)

### Demo Accounts
- **Organizer**: sarah@example.com (password: any)
- **Organizer**: emily@example.com (password: any)
- **Attendee**: mike@example.com (password: any)

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icon library
- **Vite** - Fast build tool and development server

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx      # Navigation bar with authentication
│   ├── EventCard.tsx   # Event display card
│   └── RSVPForm.tsx    # RSVP submission form
├── contexts/           # React Context providers
│   ├── AuthContext.tsx # Authentication state management
│   └── EventContext.tsx # Event data management
├── pages/              # Application pages
│   ├── HomePage.tsx    # Landing page with featured events
│   ├── EventsPage.tsx  # Event listing with filters
│   ├── EventDetailPage.tsx # Individual event details
│   ├── CreateEventPage.tsx # Event creation form
│   ├── DashboardPage.tsx   # Organizer dashboard
│   ├── LoginPage.tsx   # User authentication
│   └── RegisterPage.tsx # User registration
├── types/              # TypeScript type definitions
│   └── index.ts        # Application interfaces
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6) - Navigation, buttons, links
- **Secondary**: Emerald (#10B981) - Success states, positive actions
- **Accent**: Orange (#F97316) - Highlights, featured content
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Headings**: Bold, clear hierarchy
- **Body**: Readable line spacing (150%)
- **UI Elements**: Medium weight for buttons and labels

### Components
- **Cards**: Elevated with subtle shadows and hover effects
- **Forms**: Clean inputs with focus states
- **Buttons**: Consistent styling with hover animations
- **Navigation**: Responsive with mobile-friendly design

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd event-management-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Usage Guide

### For Attendees
1. **Browse Events** - Visit the Events page to see upcoming events
2. **View Details** - Click on any event to see full details
3. **RSVP** - Submit your attendance status with optional notes
4. **Track RSVPs** - View your RSVP history and status

### For Organizers
1. **Create Account** - Register as an organizer
2. **Create Events** - Use the event creation form with all details
3. **Manage Events** - Access your dashboard to view and edit events
4. **Track Attendees** - Monitor RSVPs and attendee lists
5. **Event Analytics** - View attendance statistics and trends

## 🔧 Configuration

### Environment Variables
For production deployment, you may want to configure:
- API endpoints
- Authentication providers
- Email/SMS services
- Database connections

### Customization
- **Themes**: Modify Tailwind config for custom colors
- **Components**: Extend existing components or create new ones
- **Features**: Add new functionality through the context providers

## 🚀 Deployment

### Netlify (Recommended)
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on git push

### Other Platforms
- **Vercel**: Zero-config deployment
- **GitHub Pages**: Static site hosting
- **AWS S3**: Static website hosting

## 🔮 Future Enhancements

### Backend Integration
- **Database**: MongoDB or PostgreSQL for data persistence
- **Authentication**: JWT-based auth with refresh tokens
- **API**: RESTful API with Express.js or Fastify
- **Real-time**: WebSocket connections for live updates

### Advanced Features
- **Email Notifications**: Automated reminders and confirmations
- **SMS Alerts**: Text message notifications
- **Calendar Integration**: Export to Google Calendar, Outlook
- **QR Codes**: Check-in system with QR code generation
- **Payment Processing**: Ticketing with Stripe integration
- **Analytics**: Detailed event and user analytics
- **Social Sharing**: Share events on social media platforms

### Mobile App
- **React Native**: Cross-platform mobile application
- **Push Notifications**: Mobile event reminders
- **Offline Support**: Cached event data for offline viewing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write descriptive commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Pexels** - High-quality event images
- **Lucide** - Beautiful icon library
- **Tailwind CSS** - Utility-first CSS framework
- **React Community** - Excellent documentation and resources

## 📞 Support

For support, questions, or feature requests:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

---

**EventHub** - Bringing communities together through amazing events! 🎉
