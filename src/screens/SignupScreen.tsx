import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
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
    <PasswordEyeToggle
      visible={passwordVisible}
      onToggle={() => setPasswordVisible(prev => !prev)}
    />
  );

  return (
    <ScreenContainer>
      <AuthCard
        title="Create account"
        subtitle="Sign up to get started with your new account.">
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

          <AuthSwitchRow
            text="Already have an account?"
            linkLabel="Go to Login"
            onPress={() => navigation.navigate('Login')}
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
  primaryButton: {
    marginTop: spacing.lg,
  },
});

