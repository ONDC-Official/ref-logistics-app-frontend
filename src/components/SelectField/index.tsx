import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { Select } from 'antd'
import { SelectFieldProps } from 'interfaces'
import { SelectWrapper } from 'styles/components/SelectField'

const SelectField = ({
  options,
  defaultValue,
  control,
  name,
  onFocus,
  props,
  mode,
  loading,
  onSearch,
  placeholder,
  handleValue,
  error,
  suffixIcon,
  disabled,
  showSearch,
}: SelectFieldProps) => {
  const [selectOptions, setSelectOptions] = useState(options)

  useEffect(() => {
    setSelectOptions(options)
  }, [options])

  return (
    <SelectWrapper error={error}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Select
            defaultValue={defaultValue}
            {...props}
            loading={loading}
            onChange={(e) => {
              onChange(e)
              handleValue && handleValue(e)
            }}
            mode={mode}
            value={value || undefined}
            options={selectOptions}
            onFocus={onFocus}
            onSearch={onSearch}
            placeholder={placeholder}
            allowClear
            suffixIcon={suffixIcon}
            disabled={disabled}
            showSearch={showSearch}
          />
        )}
      />
    </SelectWrapper>
  )
}

export default SelectField
