# AI Live Matching Platform Dashboard

A comprehensive real-time dashboard for an AI-powered live matching platform built with Next.js, Tailwind CSS, and Supabase.

## 🚀 Features

- **Real-time KPI Dashboard** - Live metrics and performance indicators
- **Activity Analytics** - Interactive charts showing participant activity over time
- **Participant Management** - Top performers and meeting anticipation lists
- **Real-time Insights** - Actionable notifications and alerts
- **Responsive Design** - Mobile-first approach with seamless responsive behavior
- **Live Data Updates** - Real-time subscriptions via Supabase

## 🛠 Tech Stack

- **Frontend**: Next.js 13, React, TypeScript
- **Styling**: Tailwind CSS, Radix UI Components
- **Backend**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Real-time**: Supabase Realtime

## 📋 Database Schema

The application uses the following PostgreSQL tables:

- `participants` - User profiles and matching scores
- `meetings` - Scheduled and completed meetings
- `matches` - Participant matches with satisfaction ratings
- `activity_logs` - Comprehensive activity tracking
- `insights` - Real-time alerts and notifications

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- A Supabase account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Supabase:
   - Create a new Supabase project
   - Copy your project URL and anon key
   - Click "Connect to Supabase" in the dashboard or manually add to `.env.local`:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_project_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
     ```

4. Run database migrations:
   - Navigate to your Supabase SQL Editor
   - Run the migrations in `supabase/migrations/` folder in order

5. Start the development server:
   ```bash
   npm run dev
   ```

## 📱 Responsive Design

The dashboard is fully responsive with breakpoints for:

- **Mobile**: < 768px - Stacked layout with mobile navigation
- **Tablet**: 768px - 1024px - Optimized grid layouts
- **Desktop**: > 1024px - Full dashboard with sidebar navigation

## 🔄 Real-time Features

- Live KPI updates as data changes
- Real-time activity chart updates
- Instant insight notifications
- Automatic participant list refreshes

## 🎨 Design System

- **Colors**: Blue primary, purple accent, semantic status colors
- **Typography**: Inter font with proper hierarchy
- **Spacing**: 8px grid system
- **Components**: Consistent card-based design with subtle shadows
- **Animations**: Smooth transitions and micro-interactions

## 🏗 Architecture

The application follows modern React patterns:

- **Component-based architecture** with clear separation of concerns
- **TypeScript** for type safety and better development experience
- **Custom hooks** for data fetching and state management
- **Responsive utilities** for consistent cross-device experience

## 📊 Key Metrics Tracked

- Total participants and identification rates
- Real-time matching statistics
- Meeting completion rates
- Satisfaction scores and trends
- Peak activity analysis

## 🔐 Security

- Row Level Security (RLS) enabled on all tables
- Authenticated and anonymous access policies
- Secure real-time subscriptions
- Environment variable protection

## 🚀 Deployment
<img width="1710" alt="image" src="https://github.com/user-attachments/assets/6fc18cf0-277e-4c1d-ac12-63bf2264b0d6" />
<img width="215" alt="image" src="https://github.com/user-attachments/assets/a45aed45-b216-49c6-a161-5c613e9722df" />


The application is configured for easy deployment:

```bash
npm run build
```

Deploy to Vercel, Netlify, or any static hosting provider that supports Next.js.


