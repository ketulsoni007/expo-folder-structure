import { ComponentProps } from 'react';
import { Button as PaperButton } from 'react-native-paper';

interface AppButtonProps extends ComponentProps<typeof PaperButton> {
  children: React.ReactNode;
}

export default function AppButton({
  children,
  style,
  ...props
}: AppButtonProps) {
  return (
    <PaperButton
      {...props}
      style={[
        {
          borderRadius: 8,
        },
        style,
      ]}
    >
      {children}
    </PaperButton>
  );
}