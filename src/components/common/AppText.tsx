import { ComponentProps } from 'react';
import {
    Text as PaperText,
    useTheme,
} from 'react-native-paper';

interface AppTextProps extends ComponentProps<typeof PaperText> {
  children: React.ReactNode;
}

export default function AppText({
  children,
  style,
  ...props
}: AppTextProps) {
  const theme = useTheme();

  return (
    <PaperText
      {...props}
      style={[
        {
          color: theme.colors.onSurface,
        },
        style,
      ]}
    >
      {children}
    </PaperText>
  );
}