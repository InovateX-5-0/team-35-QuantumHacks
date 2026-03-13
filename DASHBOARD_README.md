# 🐾 PawCare Dashboard - Admin Panel

A comprehensive web-based admin dashboard for pet care service providers built with React, TypeScript, Tailwind CSS, and Recharts.

## ✨ Features

### Three Role-Based Modules:

#### 1. 🏥 Veterinary Clinic Management
- **Overview Dashboard**: Today's appointments, new patients, revenue summary, quick stats
- **Appointments**: Manage bookings with filtering by date/status
- **Patient Records**: Searchable database with full medical history
- **Staff Schedule**: Weekly calendar view of veterinarian availability
- **Analytics**: 
  - Daily appointment volume (Line Chart)
  - Appointment types breakdown (Donut Chart)
  - Top 5 most visited breeds (Horizontal Bar Chart)

#### 2. ❤️ Animal Shelter Management
- **Overview**: Total animals, adoptions this month, pending applications
- **Animal Listings**: Manage shelter animals with photos and status
- **Adoption Applications**: Track and manage adoption requests
- **Medical Records**: Per-animal health logs and vaccination records
- **Reports**: 
  - Monthly adoption rate trends
  - Species breakdown pie chart
  - Average shelter duration analysis

#### 3. 🛒 Pet Store Inventory Dashboard
- **Overview**: Total SKUs, low stock alerts, today's orders, revenue
- **Inventory Management**: Product tracking with low stock alerts (highlighted in red)
- **Orders**: Incoming order management with status tracking
- **Analytics**:
  - Top 10 selling products (Bar Chart)
  - Revenue by category (Area Chart, 6 months)
  - Stock depletion forecast (Line Chart)

### Shared Features:
- ✅ Role selection on first load
- ✅ Responsive sidebar navigation
- ✅ Notification bell with recent alerts
- ✅ Profile dropdown with role switching
- ✅ Clean, modern UI with teal accent (#0D9488)
- ✅ Card-based layout
- ✅ Status badges with color coding
- ✅ Mobile responsive design

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Modern web browser

### Installation

1. Install dependencies:
```bash
npm install --legacy-peer-deps
```

2. Run the dashboard:
```bash
npm run dashboard
```

3. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run dashboard:build
```

## 📁 Project Structure

```
src-dashboard/
├── components/
│   ├── Sidebar.tsx          # Navigation sidebar
│   ├── Header.tsx           # Top header with notifications
│   ├── RoleSelector.tsx     # Role selection screen
│   └── ui/
│       ├── Card.tsx         # Card components
│       └── StatusBadge.tsx  # Status badge component
├── pages/
│   └── veterinary/
│       └── Overview.tsx     # Vet clinic overview page
├── data/
│   └── mockData.ts          # All mock data
├── App.tsx                  # Main app component
├── main.tsx                 # Entry point
└── index.css                # Styles with Tailwind
```

## 🎨 Design System

### Colors
- Primary: Teal (#0D9488)
- Success: Green (#22C55E)
- Warning: Yellow (#F59E0B)
- Danger: Red (#EF4444)
- Info: Blue (#3B82F6)

### Typography
- Font Family: System fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI')
- Headings: Bold, larger sizes
- Body: Regular weight, readable sizes

## 📊 Charts & Analytics

All charts powered by [Recharts](https://recharts.org/):

- **Line Charts**: Trends over time (appointments, revenue, adoptions)
- **Bar Charts**: Comparisons (top breeds, product sales)
- **Pie/Donut Charts**: Proportions (appointment types, species breakdown)
- **Area Charts**: Cumulative data (revenue by category)

## 🔧 Customization

### Adding New Pages

1. Create new component in `src-dashboard/pages/[role]/`
2. Add route in `App.tsx` switch statement
3. Update menu in `Sidebar.tsx`

### Modifying Mock Data

Edit `src-dashboard/data/mockData.ts` with your real data.

### Changing Theme Colors

Update Tailwind config in `dashboard.html`:

```html
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          teal: {
            // Your custom colors
          },
        },
      },
    },
  }
</script>
```

## 🌟 Key Components

### StatCard
Display key metrics with icons and trend indicators.

### StatusBadge
Color-coded status indicators (confirmed=pending=cancelled).

### DataTables
Sortable, filterable tables with pagination support.

## 📱 Responsive Design

- Desktop: Full sidebar + all features
- Tablet: Collapsed sidebar + essential features
- Mobile: Hamburger menu + streamlined UI

## 🔔 Notifications

Real-time notification system for:
- New appointments
- Low stock alerts
- Adoption applications
- Emergency notifications

## 👤 User Roles

Switch between roles via profile dropdown:
1. Click profile avatar
2. Select "Change Role"
3. Choose new role
4. Dashboard reloads with new context

## 🎯 Future Enhancements

- [ ] Complete all shelter module pages
- [ ] Complete all store module pages
- [ ] Add authentication
- [ ] Connect to real backend API
- [ ] Export reports to PDF
- [ ] Email notifications
- [ ] Dark mode support
- [ ] Multi-language support

## 📄 License

MIT License - feel free to use in your projects!

## 🤝 Support

For questions or issues, please contact the development team.

---

**Built with ❤️ for pet care professionals**
