/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import CartScreen from './src/screens/CartScreen';
import ProductScreen from './src/screens/ProductScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';

import colors from './src/utils/colors';
import { color } from 'react-native-reanimated';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const tabColor = (focused) => {
  return focused ? colors.primary : colors.inactiveTab;
}
    
const ProductNavigator = () => {
  return (
    <Stack.Navigator 
      initialRouteName='Product'
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen 
        name="Product" 
        component={ProductScreen}
        options={{
          title: 'Products',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: colors.primary,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen} 
        options={({ route }) => ({
          title: route.params.name,
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
        />
    </Stack.Navigator>
  );
}

const CartNavigator = () => {
  return (
    <Stack.Navigator 
      initialRouteName='Cart'
      screenOptions={{
        headerShown: true
      }}
    >
      <Stack.Screen 
        name="Cart" 
        component={CartScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        />
    </Stack.Navigator>
  );
}


const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="ProductNavigator"
        activeColor={colors.primary}
        inactiveColor={colors.inactiveTab}
        barStyle={{ backgroundColor: colors.white }}
      >
        <Tab.Screen 
          name="ProductNavigator" 
          component={ProductNavigator} 
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialIcon style={[{ color: tabColor(focused) }]} size={25} name={'home'} />
            ),
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen 
          name="CartNavigator" 
          component={CartNavigator} 
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialIcon style={[{ color: tabColor(focused) }]} size={25} name={'cart'} />
            ),
            tabBarLabel: 'Cart',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
