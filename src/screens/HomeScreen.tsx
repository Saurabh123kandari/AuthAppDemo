import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import PrimaryButton from '../components/PrimaryButton';
import {useAuth} from '../context/AuthContext';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';

export default function HomeScreen() {
  const {user, logout} = useAuth();

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <Text style={styles.greeting}>
          {user ? `Hi, ${user.name}` : 'Welcome'}
        </Text>
        <Text style={styles.emailText}>{user?.email}</Text>
        <Text style={styles.description}>
          You are now logged in. This is your home screen where you can see your
          profile details.
        </Text>

        <PrimaryButton label="Logout" onPress={logout} style={styles.button} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  emailText: {
    fontSize: 16,
    color: colors.textMuted,
    marginBottom: spacing.xl,
  },
  description: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: spacing.xxl,
  },
  button: {
    alignSelf: 'flex-start',
  },
});

