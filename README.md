# Cloud Dashboard

A modern, dark-themed cloud infrastructure monitoring dashboard built with React, TypeScript, and Ant Design.

## Features

### 🎨 **Redesigned UI**
- **Dark Theme**: Modern dark color scheme matching professional monitoring tools
- **Responsive Layout**: Optimized for desktop and tablet viewing
- **Professional Design**: Clean, organized widget-based layout

### 🧭 **Navigation & Layout**
- **Top Navigation Bar**: Search functionality, time range controls, notifications, and user menu
- **Left Sidebar**: Quick access to Dashboard, Services, Monitoring, Cloud, Reports, and Infrastructure
- **Collapsible Sidebar**: Expandable navigation with tooltips

### 📊 **Dashboard Widgets**

#### Column 1: Quick Overview
- **Problems**: Real-time problem count with status indicators
- **Hosts**: Host status monitoring with warning badges
- **Web Checks**: Web service health status
- **Applications**: Application health monitoring
- **Services**: Service status with hexagonal grid visualization
- **Databases**: Database health indicators
- **Smartscape**: Process visualization with gradient graphics

#### Column 2: Cloud & Infrastructure
- **AWS Account**: EC2, RDS, and Load Balancer metrics
- **VMware vCenter**: Migration and guest statistics
- **Database**: Transaction rates and response times
- **Docker**: Container and image monitoring with progress bars

#### Column 3: Application Health
- **Action Duration**: Geographic performance visualization
- **Services**: Web, messaging, and RMI service metrics with bar charts

#### Column 4: User Experience
- **Apdex**: Application Performance Index with regional mapping
- **3rd Party Providers**: Stacked bar charts showing external service usage

### 📈 **Advanced Charts & Metrics**
- **Line Charts**: CPU, memory, and disk usage over time
- **Area Charts**: Regional performance metrics
- **Bar Charts**: Service activity and third-party provider usage
- **Pie Charts**: Apdex score distribution by region
- **Real-time Updates**: Live metric updates every 5 seconds

### 🔧 **Technical Features**
- **TypeScript**: Full type safety and IntelliSense support
- **Ant Design**: Professional UI components and theming
- **Recharts**: Interactive, responsive chart library
- **Mock Data**: Comprehensive sample data for demonstration
- **Responsive Design**: Works on various screen sizes

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── atoms/          # Basic components (MetricCard, StatusBadge)
│   ├── molecules/      # Composite components
│   └── organisms/      # Complex components
├── pages/              # Page components
├── types/              # TypeScript type definitions
├── data/               # Mock data and data generators
├── hooks/              # Custom React hooks
└── store/              # State management
```

## Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Ant Design** - Professional UI component library
- **Recharts** - Interactive chart library
- **Vite** - Fast build tool and dev server
- **CSS Modules** - Scoped styling

## Customization

### Theme Colors
The dashboard uses a dark theme with the following color palette:
- **Primary**: #1890ff (Blue)
- **Background**: #1a1a1a (Dark)
- **Surface**: #2a2a2a (Medium Dark)
- **Border**: #404040 (Medium)
- **Text**: #ffffff (White)
- **Secondary Text**: #666666 (Gray)

### Adding New Metrics
1. Extend the types in `src/types/`
2. Add mock data in `src/data/mockData.ts`
3. Create new chart components using Recharts
4. Integrate into the dashboard layout

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
