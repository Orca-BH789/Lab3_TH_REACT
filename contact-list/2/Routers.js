import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { createStackNavigator } from '@react-navigation/stack';
import Contacts from '../../screens/Contacts';
import Profile from '../../screens/Profile';
import colors from '../../utility/colors';
import Favorites from '../../screens/Favorites';
import User from '../../screens/User';
import Options from '../../screens/Options';
import{ MaterialIcons} from '@expo/vector-icons';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const getDrawerItemIcon = icon => ({ color }) => (
  <MaterialIcons name={icon} size={22} style={{ color }} />
);
const getTabBarIcon = icon =>({color})=>(<MaterialIcons name= {icon} size={26} style={{ color}} />);
const Stack = createStackNavigator();

const ContactsScreens = () => {
  return (
    <Stack.Navigator
      initialRouteName="Contacts"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen 
        name='Contacts' 
        component={Contacts}
        options={{ 
          title: "Contacts",
          headerShown: false, 
        }}
      />
      <Stack.Screen
        name='Profile'
        component={Profile}
        options={({ route }) => {
          const { contact } = route.params;
          const { name } = contact;
          return {
            title: name.split(' ')[0],
            headerShown: true,
            headerTintColor: 'black',
            headerStatusBarHeight: 0 ,
            headerStyle: {
              backgroundColor: '#e1e2e3',
            }
          };
        }}
      />
    </Stack.Navigator>  
  );
};


const FavoritesScreens = () => {
  return (
    <Stack.Navigator
      initialRouteName="Favorites"     
    >
      <Stack.Screen 
        name='Favorites' 
        component={Favorites}
        options={{ 
          title: "Favorites",
          headerShown: false, 
        }}
      />
      <Stack.Screen
        name='Profile'
        component={Profile}
        options={{
          title: "Profile",
          headerShown: true, 
          headerStatusBarHeight: 0 ,
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: '#e1e2e3',
          }
        }}
      />
    </Stack.Navigator>  
  );
};

  const UserScreens = ({ navigation }) => {
    return (
      <Stack.Navigator initialRouteName="User">
        <Stack.Screen
          name="User"
          component={User}          
          options={{
            headerShown: true,
            headerStatusBarHeight: 0 ,
            headerTitle: "Personal Information",
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: colors.blue,
            },
            headerRight: () => (
              <MaterialIcons
                name="settings"
                size={24}
                style={{ color: 'white', marginRight: 10 }}
                onPress={() => navigation.navigate('Options')}
              />
            ),
          }}
        />
        <Stack.Screen
          name="Options"
          component={Options}
          options={{ title: "Options" }}
        />
      </Stack.Navigator>
    );
  };
  
  // const Drawer = createDrawerNavigator();
  // const DrawerNavigator= ()=> {
  //    return ( 
  
  //      <Drawer.Navigator initialRouteName= 'ContactsScreens'>
  //        <Drawer.Screen name="ContactsScreens" component={ContactsScreens}
  //         options={{ 
  //           drawerIcon: getDrawerItemIcon('list'), 
  //           }} />
  //        <Drawer.Screen name="FavoritesScreens" component={FavoritesScreens}
  //         options={{
  //            drawerIcon: getDrawerItemIcon('star'), 
  //            }}/>
  //        < Drawer.Screen name="UserScreens" component={UserScreens} 
  //          options= {{ drawerIcon: getDrawerItemIcon('person'), }}  /> 
  //          </Drawer.Navigator>   
  //           ); 
  //         }   
  
const Tab = createMaterialBottomTabNavigator();
    const TabNavigator = () => {
      return (       
          <Tab.Navigator
            initialRouteName="ContactsScreens"
            barStyle={{ backgroundColor: '#4379F2' }}
            labeled={false}           
            activeTintColor={'#fffffe'}            
            inactiveColor={'#5f6c7b'}
          >
            <Tab.Screen
              name="ContactsScreens"
              component={ContactsScreens}
              options={{
                tabBarIcon: getTabBarIcon('contacts'),
              }}
            />
            <Tab.Screen
              name="FavoritesScreens"
              component={FavoritesScreens}
              options={{
                tabBarIcon: getTabBarIcon('favorite'),
              }}
            />
            <Tab.Screen
              name="UserScreens"
              component={UserScreens}
              options={{
                tabBarIcon: getTabBarIcon('person'),
              }}
            />
          </Tab.Navigator>     
      );
    };
export default TabNavigator;   
