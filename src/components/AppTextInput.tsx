import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';
import ErrorText from './ErrorText';

type AppTextInputProps = TextInputProps & {
  label: string;
  errorMessage?: string | null;
  containerStyle?: ViewStyle;
  RightAccessory?: React.ComponentType;
};

export default function AppTextInput({
  label,
  errorMessage,
  containerStyle,
  RightAccessory,
  ...inputProps
}: AppTextInputProps) {
  const [focused, setFocused] = React.useState(false);

  return (
    <View style={containerStyle}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputWrapper,
          focused && styles.inputWrapperFocused,
          !!errorMessage && styles.inputWrapperError,
        ]}>
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.textMuted}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...inputProps}
        />
        {RightAccessory ? (
          <View style={styles.accessory}>
            <RightAccessory />
          </View>
        ) : null}
      </View>
      <ErrorText message={errorMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: '#FFFFFF',
  },
  inputWrapperFocused: {
    borderColor: colors.primary,
  },
  inputWrapperError: {
    borderColor: colors.error,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    paddingVertical: 0,
  },
  accessory: {
    marginLeft: spacing.sm,
  },
});

