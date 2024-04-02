import { StyleSheet, TouchableOpacity } from 'react-native';

// Глобальные стили для TouchableOpacity
const globalStyles = StyleSheet.create({
  defaultButton: {
    backgroundColor: '#20B25D', // Цвет кнопки по умолчанию
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
});

// Обертка для TouchableOpacity с глобальными стилями по умолчанию
const Button = ({ children, style, ...props }) => (
  <TouchableOpacity style={[globalStyles.defaultButton, style]} {...props}>
    {children}
  </TouchableOpacity>
);

export { Button };
