import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { checkCode } from "./redux/authSlice";
import {
  useFonts,
  MontserratAlternates_300Light,
  MontserratAlternates_500Medium,
  MontserratAlternates_600SemiBold,
  MontserratAlternates_700Bold,
} from "@expo-google-fonts/montserrat-alternates";
import { NavigationContainer } from "@react-navigation/native";
import AuthScreen from "./pages/AuthScreen";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect } from "react";
import HomeScreen from "./pages/HomeScreen";

export default function App() {
  let [fontsLoaded] = useFonts({
    MontserratAlternates_300Light,
    MontserratAlternates_500Medium,
    MontserratAlternates_600SemiBold,
    MontserratAlternates_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const App = () => {
    const dispatch = useDispatch();

    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
      dispatch(checkCode());
    }, []);

    return (
      <NavigationContainer>
        <Stack.Navigator>
          {isAuthenticated ? (
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
            />
          ) : (
            <Stack.Screen
              name="Auth"
              component={AuthScreen}
              options={{
                headerShown: false,
              }}
            />
          )}
        </Stack.Navigator>

        <StatusBar style="light" />
      </NavigationContainer>
    );
  };

  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const styles = StyleSheet.create({});
