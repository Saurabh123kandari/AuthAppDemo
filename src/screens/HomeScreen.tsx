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
            <View style={styles.avatarWrap}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{initial}</Text>
              </View>
            </View>
            <View style={styles.headerTextContainer}>
              <Text style={styles.welcomeLabel}>Welcome back</Text>
              <Text style={styles.greeting}>
                {greeting},{' '}
                <Text style={styles.greetingHighlight}>{displayName}</Text>
              </Text>
              {user?.email ? (
                <View style={styles.emailChip}>
                  <Text style={styles.emailText} numberOfLines={1}>
                    {user.email}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.description}>
              You&apos;re signed in to your account. View your profile details
              and manage your session here.
            </Text>
          </View>

          <PrimaryButton
            label="Log out"
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
    paddingHorizontal: 0,
    paddingTop: spacing.sm,
  },
  screenTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: spacing.xl,
    marginHorizontal: 0,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  avatarWrap: {
    marginRight: spacing.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.primaryLight,
  },
  avatarText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerTextContainer: {
    flex: 1,
    minWidth: 0,
  },
  welcomeLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  greetingHighlight: {
    color: colors.primary,
  },
  emailChip: {
    alignSelf: 'flex-start',
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 8,
    maxWidth: '100%',
  },
  emailText: {
    fontSize: 13,
    color: colors.textMuted,
  },
  infoBox: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.xl,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textMuted,
  },
  button: {
    alignSelf: 'stretch',
  },
});

