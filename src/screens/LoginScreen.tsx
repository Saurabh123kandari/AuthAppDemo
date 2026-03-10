import React, {useState} from 'react';
import {StyleSheet, View, ToastAndroid} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import ScreenContainer from '../components/ScreenContainer';
import AppTextInput from '../components/AppTextInput';
import PrimaryButton from '../components/PrimaryButton';
import ErrorText from '../components/ErrorText';
import AuthCard from '../components/AuthCard';
import AuthSwitchRow from '../components/AuthSwitchRow';
import PasswordEyeToggle from '../components/PasswordEyeToggle';
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

  const handleEmailChange = (text: string) => {
    setEmail(text);
    const {email: emailError} = validateLogin(text, password);
    setErrors(prev => ({...prev, email: emailError}));
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    const {password: passwordError} = validateLogin(email, text);
    setErrors(prev => ({...prev, password: passwordError}));
  };

  const handleSubmit = async () => {
    const validationErrors = validateLogin(email, password);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      setSubmitting(true);
      const success = await login(email, password);
      if (success) {
        ToastAndroid.show('Login successful', ToastAndroid.SHORT);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const PasswordToggle = () => (
    <PasswordEyeToggle
      visible={passwordVisible}
      onToggle={() => setPasswordVisible(prev => !prev)}
    />
  );

  return (
    <ScreenContainer>
      <AuthCard
        title="Log in"
        subtitle="Use the email you signed up with.">
        <View style={styles.form}>
          <AppTextInput
            label="Email"
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            errorMessage={errors.email}
            containerStyle={styles.field}
            placeholder="your email address"
          />

          <AppTextInput
            label="Password"
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry={!passwordVisible}
            autoCapitalize="none"
            errorMessage={errors.password}
            containerStyle={styles.field}
            placeholder="••••••••"
            RightAccessory={PasswordToggle}
          />

          <View style={styles.errorBlock}>
            <ErrorText message={authError} />
          </View>

          <PrimaryButton
            label="Log in"
            onPress={handleSubmit}
            loading={submitting}
            style={styles.primaryButton}
          />

          <AuthSwitchRow
            text="Don't have an account?"
            linkLabel="Sign up"
            onPress={() => navigation.navigate('Signup')}
          />
        </View>
      </AuthCard>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
  },
  field: {
    marginBottom: spacing.lg,
  },
  errorBlock: {
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  primaryButton: {
    marginTop: 0,
  },
});

