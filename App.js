import { NavigationContainer } from "@react-navigation/native";
import StudentRoute from "./Routes/Studentroute";
import { ToastProvider } from "react-native-toast-notifications";
import { SplashScreen } from "expo-router";

SplashScreen.preventAutoHideAsync();

const App = () => {
  return (
    <ToastProvider>
      <NavigationContainer>
        <StudentRoute />
      </NavigationContainer>
    </ToastProvider>
  );
};

export default App;
