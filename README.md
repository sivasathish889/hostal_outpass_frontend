# Hostel Outpass Mobile Application 🏠

A React Native mobile application built with Expo for managing hostel outpass requests at Anna University. The app provides a digital solution for students to request outpasses and for wardens/security to manage and approve them.

## 📱 Features

### For Students
- **Registration & Login** - Secure account creation and authentication
- **Outpass Requests** - Create new outpass requests with date/time
- **Request Management** - View, edit, and delete pending requests
- **Pass History** - Track all previous outpass requests
- **Real-time Notifications** - Get updates on pass status

### For Wardens
- **Pass Review** - View and manage pending outpass requests
- **Approval System** - Accept or reject student requests
- **Pass History** - View all approved/rejected passes
- **Secure Login** - OTP-based authentication

### For Security
- **Pass Verification** - Check and validate active outpasses
- **Time Tracking** - Update out-time and in-time for students
- **Pass Management** - Mark passes as completed
- **Real-time Updates** - Live pass status monitoring

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hostal_outpass_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Add your `google-services.json` file to the project root
   - Update Firebase configuration in the app

4. **Start the development server**
   ```bash
   npx expo start
   ```

5. **Run on device/emulator**
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Scan QR code with Expo Go app

## 🏗️ Project Structure

```
hostal_outpass_frontend/
├── app/                    # Main app screens (file-based routing)
│   ├── (security)/        # Security guard screens
│   ├── (student)/         # Student screens
│   ├── (warden)/          # Warden screens
│   ├── index.jsx          # App entry point
│   └── welcome.jsx        # Role selection screen
├── assets/                # Images and static assets
├── components/            # Reusable UI components
├── constants/             # App constants and themes
├── helpers/               # Utility functions
├── utils/                 # Firebase and notification utilities
└── android/               # Android-specific files
```

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router (file-based routing)
- **State Management**: React Hooks
- **Backend Communication**: Axios
- **Push Notifications**: Firebase Cloud Messaging
- **Location Services**: Expo Location
- **Authentication**: AsyncStorage + OTP verification
- **UI Components**: React Native Elements

## 📦 Key Dependencies

```json
{
  "expo": "53.0.22",
  "react-native": "0.79.5",
  "expo-router": "~5.1.5",
  "@react-native-firebase/app": "^22.4.0",
  "@react-native-firebase/messaging": "^22.4.0",
  "axios": "^1.7.9",
  "expo-location": "~18.1.6",
  "expo-notifications": "~0.31.4"
}
```

## 🔧 Configuration

### Environment Setup
Update the backend URL in `constants/urls.jsx`:
```javascript
export default env = {
    CLIENT_URL: "YOUR_BACKEND_URL",
    // ... other endpoints
}
```

### Firebase Configuration
1. Create a Firebase project
2. Add Android/iOS apps to your project
3. Download `google-services.json` and place in project root
4. Enable Firebase Cloud Messaging

## 📱 Build & Deploy

### Development Build
```bash
eas build --profile development --platform android
```

### Preview Build
```bash
eas build --profile preview --platform android
```

### Production Build
```bash
eas build --profile production --platform all
```

## 🔐 Security Features

- **Location-based Verification** - GPS tracking for pass validation
- **OTP Authentication** - Secure login for all user types
- **Role-based Access** - Separate interfaces for students, wardens, and security
- **Real-time Monitoring** - Live tracking of outpass status

## 📋 User Roles

1. **Student** - Request and manage outpasses
2. **Warden** - Approve/reject outpass requests
3. **Security** - Verify and track active outpasses

## 🔄 App Flow

1. **Welcome Screen** - User selects their role
2. **Authentication** - Login/register based on role
3. **Dashboard** - Role-specific home screen
4. **Pass Management** - Create, view, or manage passes
5. **Notifications** - Real-time updates on pass status

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and queries, please contact the development team.

---

**Built with ❤️ for Anna University Hostel Management**