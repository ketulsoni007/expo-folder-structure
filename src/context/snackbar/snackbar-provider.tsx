import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createContext, useContext, useState } from 'react';
import { Portal, Snackbar } from 'react-native-paper';

type SnackbarPosition = 'top' | 'bottom';

type SnackbarIcon = React.ComponentProps<
  typeof MaterialCommunityIcons
>['name'];

interface SnackbarOptions {
  message: string;

  icon?: SnackbarIcon;

  onIconPress?: () => void;

  action?: {
    label: string;
    onPress: () => void;
  };

  duration?: number;

  position?: SnackbarPosition;
}

interface SnackbarContextValue {
  showSnackbar: (options: SnackbarOptions) => void;
  hideSnackbar: () => void;
}

const SnackbarContext = createContext<
  SnackbarContextValue | undefined
>(undefined);

export function SnackbarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<SnackbarOptions | null>(
    null,
  );

  const showSnackbar = (options: SnackbarOptions) => {
    setOptions(options);
    setVisible(true);
  };

  const hideSnackbar = () => {
    setVisible(false);
  };

  return (
    <SnackbarContext.Provider
      value={{
        showSnackbar,
        hideSnackbar,
      }}
    >
      {children}

      <Portal>
        {options && (
          <Snackbar
            visible={visible}
            onDismiss={hideSnackbar}
            duration={options.duration ?? 3000}
            icon={options.icon}
            onIconPress={options.onIconPress}
            action={options.action}
            wrapperStyle={{
              position: 'absolute',
              top: options.position === 'bottom' ? undefined : 40,
              bottom:
                options.position === 'bottom' ? 0 : undefined,
              left: 0,
              right: 0,
            }}
          >
            {options.message}
          </Snackbar>
        )}
      </Portal>
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error(
      'useSnackbar must be used inside SnackbarProvider',
    );
  }

  return context;
}