import React from 'react';
import {StyleSheet, Text, View, ToastAndroid} from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import PrimaryButton from '../components/PrimaryButton';
import {useAuth} from '../context/AuthContext';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';

export default function HomeScreen() {
  const {user, logout} = useAuth();

  const handleLogout = React.useCallback(async () => {
    await logout();
    ToastAndroid.show('Logged out successfully', ToastAndroid.SHORT);
  }, [logout]);

  const initial = React.useMemo(() => {
    if (user?.name && user.name.trim().length > 0) {
      return user.name.trim().charAt(0).toUpperCase();
    }
    if (user?.email && user.email.trim().length > 0) {
      return user.email.trim().charAt(0).toUpperCase();
    }
    return '?';
  }, [user]);

  const greeting = user?.name && user.name.trim().length > 0 ? 'Hi' : 'Hi there';
  const displayName =
    user?.name && user.name.trim().length > 0 ? user.name.trim() : 'Welcome';

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initial}</Text>
            </View>
            <View style={styles.headerTextContainer}>
              <Text style={styles.greeting}>
                {greeting},{' '}
                <Text style={styles.greetingHighlight}>{displayName}</Text>
              </Text>
              {user?.email ? (
                <Text style={styles.emailText}>{user.email}</Text>
              ) : null}
            </View>
          </View>

          <Text style={styles.description}>
            You&apos;re signed in to your account. This is your home screen
            where you can see your profile details and manage your session.
          </Text>

          <PrimaryButton
            label="Logout"
            onPress={handleLogout}
            style={styles.button}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: spacing.xl,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerTextContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  greetingHighlight: {
    color: colors.primary,
  },
  emailText: {
    fontSize: 16,
    color: colors.textMuted,
    marginBottom: spacing.xl,
  },
  description: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: spacing.xl,
  },
  button: {
    alignSelf: 'stretch',
  },
});

