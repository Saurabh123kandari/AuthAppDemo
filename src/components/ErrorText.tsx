import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';

type ErrorTextProps = {
  message?: string | null;
};

export default function ErrorText({message}: ErrorTextProps) {
  if (!message) {
    return null;
  }

  return <Text style={styles.text}>{message}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: colors.error,
    fontSize: 12,
    marginTop: spacing.xs,
  },
});

