import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import 'react-native-gesture-handler';

import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';
import Main from './pages/Main';
import {QueryClient, QueryClientProvider} from 'react-query';
import {UtilsContextProvider} from './contexts/userUtil';
import Footer from './components/footer';

const queryClient = new QueryClient();
const Stack = createStackNavigator();

const App = () => {
  return (
    <UtilsContextProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Main}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </UtilsContextProvider>
  );
};

export default App;
