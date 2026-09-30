import {
  Control,
  FieldValues,
  Path,
  useController,
} from 'react-hook-form';
import {
  HelperText,
  TextInput as PaperTextInput,
  TextInputProps as PaperTextInputProps,
} from 'react-native-paper';

interface FormInputProps<T extends FieldValues>
  extends Omit<
    PaperTextInputProps,
    'value' | 'onChangeText' | 'error' | 'left' | 'right'
  > {
  control: Control<T>;
  name: Path<T>;
  mode?: 'flat' | 'outlined';

  icon?: string;

  onIconPress?: () => void;

  iconPosition?: 'start' | 'end';
}

export default function FormInput<T extends FieldValues>({
  control,
  name,
  mode = 'outlined',
  icon,
  onIconPress,
  iconPosition = 'end',
  ...textInputProps
}: FormInputProps<T>) {
  const { field, fieldState } = useController({
    control,
    name,
  });

  const errorMessage = fieldState.error?.message;

  const iconElement = icon ? (
    <PaperTextInput.Icon
      icon={icon}
      onPress={onIconPress}
    />
  ) : undefined;

  return (
    <>
      <PaperTextInput
        {...textInputProps}
        value={field.value ?? ''}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        error={!!errorMessage}
        mode={mode}
        left={
          iconPosition === 'start'
            ? iconElement
            : undefined
        }
        right={
          iconPosition === 'end'
            ? iconElement
            : undefined
        }
      />

      {errorMessage && (
        <HelperText type="error" visible>
          {errorMessage}
        </HelperText>
      )}
    </>
  );
}