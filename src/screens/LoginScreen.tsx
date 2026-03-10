import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import ScreenContainer from '../components/ScreenContainer';
import AppTextInput from '../components/AppTextInput';
import PrimaryButton from '../components/PrimaryButton';
import ErrorText from '../components/ErrorText';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import {useAuth} from '../context/AuthContext';
import {AuthStackParamList} from '../navigation/RootNavigator';
import {validateLogin, LoginErrors} from '../utils/validation';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({navigation}: Props) {
  const {login, authError} = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async () => {
    const validationErrors = validateLogin(email, password);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setSubmitting(true);
      await login(email, password);
    } finally {
      setSubmitting(false);
    }
  };

  const PasswordToggle = () => (
    <TouchableOpacity onPress={() => setPasswordVisible(prev => !prev)}>
      <Text style={styles.toggleText}>
        {passwordVisible ? 'Hide' : 'Show'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>
          Log in to continue to your account.
        </Text>
      </View>

      <View style={styles.form}>
        <AppTextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          errorMessage={errors.email}
          containerStyle={styles.field}
          placeholder="you@example.com"
        />

        <AppTextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisible}
          autoCapitalize="none"
          errorMessage={errors.password}
          containerStyle={styles.field}
          placeholder="••••••••"
          RightAccessory={PasswordToggle}
        />

        <ErrorText message={authError} />

        <PrimaryButton
          label="Login"
          onPress={handleSubmit}
          loading={submitting}
          style={styles.primaryButton}
        />

        <View style={styles.switchRow}>
          <Text style={styles.switchText}>Don&apos;t have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Signup');
            }}>
            <Text style={styles.switchLink}>Go to Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: spacing.xxl,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
  },
  form: {
    flex: 1,
  },
  field: {
    marginBottom: spacing.lg,
  },
  primaryButton: {
    marginTop: spacing.lg,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  switchText: {
    fontSize: 14,
    color: colors.textMuted,
  },
  switchLink: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: spacing.xs,
  },
  toggleText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
});

