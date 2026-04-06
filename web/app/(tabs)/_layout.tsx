import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

import Colors from '@/constants/Colors';
import { WebMaxWidth } from '@/components/WebMaxWidth';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -2 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const isWeb = Platform.OS === 'web';

  return (
    <WebMaxWidth
      style={{
        backgroundColor: Colors[colorScheme ?? 'light'].background,
      }}>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarStyle: {
          paddingTop: 6,
          paddingBottom: useClientOnlyValue(8, isWeb ? 10 : 12),
          maxWidth: isWeb ? 960 : undefined,
          alignSelf: isWeb ? 'center' : undefined,
          width: isWeb ? '100%' : undefined,
          borderTopWidth: isWeb ? 1 : undefined,
          borderTopColor: isWeb ? 'rgba(148,163,184,0.35)' : undefined,
        },
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="occupation"
        options={{
          title: 'Occupation',
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: 'Contact',
          tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
    </WebMaxWidth>
  );
}
