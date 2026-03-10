import React from 'react';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../theme/colors';

type PasswordEyeToggleProps = {
  visible: boolean;
  onToggle: () => void;
};

export default function PasswordEyeToggle({
  visible,
  onToggle,
}: PasswordEyeToggleProps) {
  const iconName = visible ? 'eye-off' : 'eye';

  return (
    <TouchableOpacity onPress={onToggle} hitSlop={8}>
      <Ionicons name={iconName} size={20} color={colors.primary} />
    </TouchableOpacity>
  );
}