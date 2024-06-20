import { Controller } from 'react-hook-form'
import { Input } from 'antd'
import { ITeaxtinputContainer } from 'interfaces'
import { InputWrapper } from 'styles/components/TextInput'

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
