import { Controller } from 'react-hook-form'
import { InputNumber } from 'antd'
import { INumberInputContainer } from 'interfaces'
import { InputWrapper } from 'styles/components/TextInput'

const NumberInput = ({ placeholder, control, error, maxLength, formatter, name }: INumberInputContainer) => (
  <InputWrapper error={error}>
    <Controller
      name={name}
      control={control}
      render={({ field }: any) => (
        <InputNumber
          {...field}
          placeholder={placeholder}
          type="number"
          control={control}
          maxLength={maxLength}
          formatter={formatter}
          controls={false}
        />
      )}
    />
  </InputWrapper>
)
export default NumberInput
