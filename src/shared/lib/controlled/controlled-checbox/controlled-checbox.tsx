import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { CheckBox, CheckboxProps } from '../../../ui/checkbox'

export type ControlledCheckboxProps<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>
  control: Control<TFieldValues>
} & Omit<CheckboxProps, 'onChange' | 'value' | 'id'>

export const ControlledCheckbox = <TFieldValues extends FieldValues>(
  props: ControlledCheckboxProps<TFieldValues>
) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name: props.name,
    control: props.control,
  })

  return (
    <CheckBox
      {...{
        onChange,
        checked: value,
        errorMessage: error,
        error: Boolean(error),
        id: props.name,
        ...props,
      }}
    />
  )
}
