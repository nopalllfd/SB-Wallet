# E-Wallet

E-Wallet is a modern digital wallet web application designed to simplify personal financial management through a fast, intuitive, and user-friendly experience.

Built with a modern frontend architecture, E-Wallet provides essential e-wallet functionalities such as money transfers, balance management, top-up, and transaction tracking, wrapped in a clean and responsive user interface.

---

## ✨ Key Features

### 🔐 Secure Authentication

- User registration and login system
- PIN verification
- Forgot password feature
- Protected routes and session management
- JWT-based authentication support

### 💰 Wallet Management

- View current wallet balance
- Top-up balance via various payment methods
- Monitor account activity with charts
- Easy access to financial information

### 🔄 Money Transfer

- Send funds between users
- Transfer validation and confirmation
- Transaction status tracking

### 📜 Transaction Records

- Detailed transaction history
- Incoming and outgoing transaction logs
- User-friendly transaction overview

### 👤 Profile Management

- Update profile information
- Change password and PIN
- Profile picture management

### 📱 Responsive Interface

- Mobile-first design approach
- Optimized for desktop, tablet, and smartphone devices
- Consistent user experience across screen sizes

### ⚡ High Performance

- Fast page rendering with Vite
- Efficient state management with Redux Toolkit and Redux Persist
- Smooth navigation and interactions

---

## 🛠 Technology Stack

| Technology          | Purpose                         |
| ------------------- | ------------------------------- |
| React.js            | Frontend Framework              |
| Redux Toolkit       | Global State Management         |
| Redux Persist      | State Persistence               |
| React Router       | Routing Management              |
| React Hook Form    | Form Handling                   |
| Chart.js           | Data Visualization              |
| Tailwind CSS       | UI Styling                      |
| Sonner             | Toast Notifications           |
| Vite               | Build Tool & Development Server |

---

## 📦 Getting Started

### Clone Repository

```bash
git clone https://github.com/nopalllfd/SB-Wallet.git
```

### Enter Project Directory

```bash
cd E-Wallet
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

---

## 📁 Project Structure

```text
public/
├── assets/

src/
├── Fragments/
│   ├── Auth/
│   │   ├── EnterPin/
│   │   ├── ForgotPassword/
│   │   ├── Login/
│   │   └── Register/
│   ├── Dashboard/
│   ├── History/
│   ├── Home/
│   ├── Profile/
│   ├── TopUp/
│   └── Transfer/
├── Layouts/
├── Pages/
│   ├── Auth/
│   ├── DashboardPage.jsx
│   ├── HistoryPage.jsx
│   ├── HomePage.jsx
│   ├── ProfilePage.jsx
│   ├── TopUpPage.jsx
│   └── TransferPage.jsx
├── components/
│   ├── Button/
│   ├── Card/
│   ├── Input/
│   ├── Modal/
│   ├── NavMenuItems/
│   ├── Pagination/
│   ├── Toast/
│   └── application/
├── hooks/
├── redux/
│   └── slice/
├── utils/
├── App.css
├── AppRouter.jsx
└── main.jsx
```

---

## 🎨 Design Principles

E-Wallet is built around several core principles:

- Simplicity and ease of use
- Clear financial visibility
- Fast and responsive interactions
- Scalable frontend architecture
- Modern fintech-inspired interface design

The goal is to provide users with a seamless digital wallet experience while maintaining a clean and professional appearance.

---

## 🚀 Planned Enhancements

- QR Code Payments
- Dark Mode Support
- Multi-Wallet Accounts
- Budget Planning Tools
- Financial Analytics Dashboard
- Push Notifications
- Progressive Web App (PWA)
- Biometric Authentication
- Real-Time Transaction Updates

---

## 📄 License

This project is developed for educational, portfolio, and learning purposes.

---

## 👨‍💻 Author

Developed using modern React technologies with a focus on scalable architecture, maintainable code, and excellent user experience.
