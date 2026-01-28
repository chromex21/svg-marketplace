# SVG Local Marketplace

A modern, mobile-first marketplace platform tailored for Saint Vincent and the Grenadines.

## 🎯 Features

### Core Screens
1. **Browse** - Main marketplace with all listings
2. **My Listings** - Manage your active/inactive listings
3. **Messages** - Communicate with buyers/sellers
4. **Notifications** - Alerts for expiring listings, new messages, milestones
5. **Profile** - User settings and preferences
6. **Create Listing** - 3-step form for new listings

### Smart Features

#### Location-Specific
- **Parishes**: Saint George, Saint Andrew, Saint David, Saint Patrick, Charlotte, Grenadines
- **Towns**: Kingstown, Calliaqua, Georgetown, Barrouallie, Chateaubelair, Layou
- **Islands**: Bequia, Mustique, Canouan, Union Island, Mayreau, Palm Island, Petit St. Vincent

#### Categories
- **Mobile Phones**: Dedicated sections for iPhones, Samsung, Google Pixel, LG, Other
- **Electronics**: Tablets, Laptops, TVs & Audio, Gaming, Accessories
- **Vehicles**: Cars, Motorcycles, Boats, Parts
- **Home & Garden**: Furniture, Appliances, Tools
- **Fashion**: Clothing, Shoes, Accessories, Jewelry
- **Food & Wholesale**: Fresh Produce, Packaged Foods, Wholesale Items
- **Other**: Sports, Baby & Kids, Business Services

#### Listing Types
1. **Regular** - Single items for sale
2. **Business/Store** - Shop listings with business hours
3. **Wholesale** - Bulk items with contact-for-pricing

#### Smart Price Alerts
- Automatic value estimation based on condition
- "Overpriced" warnings (prevents $900 scratched iPhone situations!)
- "Great Deal" badges for underpriced items
- Fair market value indicators

#### Time-Based Features
- **30-day listing expiration** from posting date
- **Expiring soon warnings** when 7 days or less remain
- **Easy renewal** to extend listings
- **Auto-archiving** suggestions for old listings
- Posted date and "days left" tracking

### Required Seller Information
To prevent ghost listings and ensure accountability:
- Full name (or business name for stores)
- WhatsApp number (required)
- Phone number (required)
- Location/Town (dropdown)
- Parish (dropdown)
- Business hours (for business/wholesale listings)

### Product Details
- Comprehensive description field
- Custom specifications (Battery Health, Storage, Color, etc.)
- Condition selector (Brand New, Like New, Good, Fair, For Parts)
- Multiple image support with gallery
- Video support indicators

### Search & Filters
- Full-text search (title + description)
- Category filter
- Location filter (town-based)
- Parish filter
- Condition filter
- Price range filter (min/max in EC$)

### Notifications System
- **Expiring Listing Alerts** - 7 days before expiration
- **New Message Notifications** - When buyers contact you
- **View Milestone Alerts** - When listings hit view thresholds
- **Badge system** - Unread count on mobile nav

### Mobile-First Design
- Bottom navigation for easy thumb access
- Responsive grid layouts (1-4 columns based on screen)
- Touch-friendly buttons and controls
- Equal experience on mobile and desktop

## 🚀 Getting Started

### Installation
```bash
npm install
npm run dev
```

### Tech Stack
- React + TypeScript
- Tailwind CSS
- Lucide React Icons
- Date formatting utilities

## 📱 Screens Breakdown

### 1. Browse Screen
- Product grid with filters
- Search bar
- Category/location/price filtering
- Product cards with key info

### 2. Product Detail
- Image gallery with navigation
- Full specifications
- Price alert system
- Seller information card
- Direct WhatsApp/Call buttons

### 3. My Listings
- All your active/inactive listings
- Quick stats (views, saves, days left)
- Management actions (Edit, Renew, Mark Sold, Delete)
- Expiring soon warnings

### 4. Create Listing (3 Steps)
**Step 1: Basic Info**
- Listing type selector
- Title, Price, Condition, Category
- Description

**Step 2: Specifications**
- Add custom specs (key-value pairs)
- Edit/remove specs

**Step 3: Contact Info**
- Name/Business name
- WhatsApp & Phone (required)
- Location & Parish dropdowns
- Business hours (for businesses)

### 5. Messages
- Inbox with buyer/seller conversations
- Unread indicators
- Product context for each message

### 6. Notifications
- Time-sorted alerts
- Color-coded by type
- Read/unread status

## 🎨 Design Principles

1. **Prevent Bad Pricing** - Smart alerts discourage unrealistic prices
2. **Force Accountability** - All contact info required, no ghost listings
3. **Local Focus** - Every location in SVG represented
4. **Business-Friendly** - Support for stores and wholesale
5. **Time-Conscious** - Automatic expiration keeps marketplace fresh
6. **Mobile-Equal** - Same great experience on all devices

## 🔮 Future Enhancements
- Image upload functionality
- Video upload support
- Real-time messaging system
- User verification badges
- Seller ratings and reviews
- Advanced search (saved searches, alerts)
- Payment integration
- Delivery tracking
- Dispute resolution system

## 📄 License
MIT

---

Built for the people of Saint Vincent and the Grenadines 🇻🇨
