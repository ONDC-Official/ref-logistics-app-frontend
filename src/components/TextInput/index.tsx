import { Controller, FieldError } from 'react-hook-form'
import { Input } from 'antd'
import { InputWrapper } from 'styles/components/TextInput'
interface ITeaxtinputContainer {
  placeholder: string
  required?: boolean
  value?: string
  onChange?: (e: any) => void
  onFocus?: any
  type?: string
  onWheel?: (e: any) => void
  control: any
  name: string
  disabled?: boolean
  prefix?: any
  error?: FieldError
  className?: string
  handleInputChange?: any
  maxLength?: number
  onKeyDown?: any
  inputRef?: any
  onKeyUp?: any
  autocomplete?: string
}

const TextInput = ({
  placeholder,
  required,
  type,
  onFocus,
  onWheel,
  name,
  control,
  prefix,
  disabled,
  error,
  className,
  handleInputChange,
  maxLength,
  onKeyDown,
  onKeyUp,
  inputRef,
  autocomplete,
}: ITeaxtinputContainer) => (
  <InputWrapper error={error}>
    <Controller
      render={({ field: { value, onChange } }) => (
        <Input
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
            handleInputChange(e) // Call the custom handleInputChange function
          }}
          onFocus={onFocus}
          onWheel={onWheel}
          prefix={prefix}
          disabled={disabled}
          className={className}
          maxLength={maxLength}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          ref={inputRef}
          autoComplete={autocomplete}
        />
      )}
      control={control}
      name={name}
    />
  </InputWrapper>
)
export default TextInput
