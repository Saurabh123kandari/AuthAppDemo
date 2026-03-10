import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../theme/colors';
import {spacing} from '../theme/spacing';

type AuthSwitchRowProps = {
  text: string;
  linkLabel: string;
  onPress: () => void;
};

export default function AuthSwitchRow({
  text,
  linkLabel,
  onPress,
}: AuthSwitchRowProps) {
  return (
    <View style={styles.switchRow}>
      <Text style={styles.switchText}>{text}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.switchLink}>{linkLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
});

