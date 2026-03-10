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
import {SignupErrors, validateSignup} from '../utils/validation';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

export default function SignupScreen({navigation}: Props) {
  const {signup, authError} = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<SignupErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async () => {
    const validationErrors = validateSignup(name, email, password);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setSubmitting(true);
      await signup(name, email, password);
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
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>
          Sign up to get started with your new account.
        </Text>
      </View>

      <View style={styles.form}>
        <AppTextInput
          label="Name"
          value={name}
          onChangeText={setName}
          errorMessage={errors.name}
          containerStyle={styles.field}
          placeholder="John Doe"
        />

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
          placeholder="At least 6 characters"
          RightAccessory={PasswordToggle}
        />

        <ErrorText message={authError} />

        <PrimaryButton
          label="Signup"
          onPress={handleSubmit}
          loading={submitting}
          style={styles.primaryButton}
        />

        <View style={styles.switchRow}>
          <Text style={styles.switchText}>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={styles.switchLink}>Go to Login</Text>
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

