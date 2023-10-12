import React, { useContext, useEffect, useRef, useState } from 'react'
// import { Switch } from 'antd'

import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import usePost from 'hooks/usePost'
// import APIS from 'constants/api'
import { DashboardRoute } from 'constants/routes'
import { AppContext } from 'context/payloadContext'
import TextInput from 'components/TextInput'
import Button from 'components/Button'
// import SelectField from 'components/SelectField'
import { PRICE_CALCULATION_SCHEMA } from 'validations/priceCalculationValidation'
import type { InputRef } from 'antd'
import { Form, Input, Table } from 'antd'
import type { FormInstance } from 'antd/es/form'
import {
  MainWrapper,
  HeadingWrapper,
  MainHeading,
  SubHeading,
  FormWrapper,
  SettingsWrapper,
  // DetailsWrapper,
  // InputWrapper,
  ChargesDetailsWrapper,
  ChargesInputWrapper,
} from 'styles/views/editDetails'
import { ErrorMessage, ChargeLabel } from 'styles/views/signin'
import { EditButtonWrapper } from 'styles/views/dashboard'
// import { SwitchStatusWrapper, SwitchWrapper } from 'styles/views/driverFlowHome'

const EditableContext = React.createContext<FormInstance<any> | null>(null)

interface Item {
  key: string
  name: string
  age: string
  address: string
}

interface EditableRowProps {
  index: number
}

const EditableRow: React.FC<EditableRowProps> = ({ ...props }) => {
  const [form] = Form.useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

interface EditableCellProps {
  title: React.ReactNode
  editable: boolean
  children: React.ReactNode
  dataIndex: keyof Item
  record: Item
  handleSave: (record: Item) => void
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false)
  const inputRef = useRef<InputRef>(null)

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const form = useContext(EditableContext)!

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
    }
  }, [editing])

  const toggleEdit = () => {
    setEditing(!editing)
    form.setFieldsValue({ [dataIndex]: record[dataIndex] })
  }

  const save = async () => {
    try {
      const values = await form.validateFields()

      toggleEdit()
      handleSave({ ...record, ...values })
    } catch (errInfo) {
      // console.log('Save failed:', errInfo)
    }
  }

  let childNode = children

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    )
  }

  return <td {...restProps}>{childNode}</td>
}

type EditableTableProps = Parameters<typeof Table>[0]

interface DataType {
  key: React.Key
  weight1: string
  weight2: string
  weight3: string
  weight4: string
  weight5: string
  weight6: string
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>

const DashboardSettings = () => {
  // const [isActive, setIsActive] = useState<boolean>(false)

  const { userInfo } = useContext(AppContext)
  const { mutateAsync } = usePost()
  // const distanceOptions = [{ value: 'km', label: 'per kilometer' }]

  // const weightOptions = [
  //   { value: 'volumetric_weight', label: 'volumetric weight' },
  //   { value: 'dead_weight', label: 'dead weight' },
  // ]

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(PRICE_CALCULATION_SCHEMA),
    defaultValues: {
      // basePrice: '',
      // kilometrePrice: '',
      // deliveryCharges: '',
      packingCharges: '',
      rtoCharges: '',
      qaCharges: '',
      igst: '',
      cgst: '',
      // weight: '',
      // kilogramPrice: '',
    },
  })

  useEffect(() => {
    setValue('packingCharges', userInfo?.settings?.pricePerDistance?.unit)
    setValue('rtoCharges', userInfo?.settings?.pricePerDistance?.value)
    setValue('igst', userInfo?.settings?.pricePerDistance?.value)
    setValue('cgst', userInfo?.settings?.pricePerDistance?.value)
    // setValue('weight', userInfo?.settings?.pricePerWeight?.type)
    // setValue('kilogramPrice', userInfo?.settings?.pricePerWeight?.value)
  }, [userInfo])

  const submitData = async (data: any) => {
    const payload = {
      pricePerDistance: {
        unit: data?.distance,
        value: Number(data?.kilometrePrice),
      },
      // pricePerWeight: {
      //   unit: 'kilogram',
      //   value: Number(data?.kilogramPrice),
      //   type: data?.weight,
      // },
    }

    try {
      await mutateAsync({
        // url: APIS.PRICE_CALCULATION,
        url: '',
        payload: payload,
      })
    } catch (err) {
      err
    }
  }
  const router = useHistory()

  const onHandleClick = () => {
    router.push(`${DashboardRoute.path}`)
  }
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: 'Immediate Delivery',
      weight1: '2',
      weight2: '42',
      weight3: '22',
      weight4: '3',
      weight5: '12',
      weight6: '72',
    },
    {
      key: 'Same Day Delivery',
      weight1: '32',
      weight2: '20',
      weight3: '62',
      weight4: '72',
      weight5: '22',
      weight6: '62',
    },
    {
      key: 'Next Day Delivery',
      weight1: '62',
      weight2: '92',
      weight3: '30',
      weight4: '40',
      weight5: '33',
      weight6: '38',
    },
  ])

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: 'Delivery Type/(Weight/Size)',
      width: '30%',
      dataIndex: 'key',
      rowScope: 'row',
    },
    {
      title: '<=1kg',
      dataIndex: 'weight1',
      editable: true,
      width: 130,
    },
    {
      title: '<=3kg',
      dataIndex: 'weight2',
      editable: true,
      width: 130,
    },
    {
      title: '<=5kg',
      dataIndex: 'weight3',
      editable: true,
      width: 130,
    },
    {
      title: '<=7kg',
      dataIndex: 'weight4',
      editable: true,
      width: 130,
    },
    {
      title: '<=10kg',
      dataIndex: 'weight5',
      editable: true,
      width: 130,
    },
    {
      title: '>=10kg',
      dataIndex: 'weight6',
      editable: true,
      width: 130,
    },
  ]

  const handleSave = (row: DataType) => {
    const newData = [...dataSource]
    const index = newData.findIndex((item) => row.key === item.key)
    const item = newData[index]
    newData.splice(index, 1, {
      ...item,
      ...row,
    })
    setDataSource(newData)
  }

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  }

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col
    }

    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    }
  })

  //need this---------

  // const handleChange = async (checked: any) => {
  //   setIsActive(checked)
  //   await mutateAsync({
  //     url: `${APIS.UPDATE_AGENT_TOGGLE_STATUS}`,
  //     payload: {
  //       isOnline: checked,
  //     },
  //   })
  // }

  // const handleChange = (checked: boolean) => {
  //   setIsActive(checked)
  //   // console.log(`switch to ${checked}`)
  // }

  return (
    <MainWrapper>
      {/* <SwitchStatusWrapper>
        <Label>Mark All Drivers</Label>
        <SwitchWrapper>
          <Switch checked={isActive} onChange={handleChange} />
          {isActive ? <span>Online</span> : <span>Offline</span>}
        </SwitchWrapper>
      </SwitchStatusWrapper> */}
      <HeadingWrapper>
        <MainHeading>Price Calculations</MainHeading>
        <SubHeading>Automated pricing computation for accurate cost estimation.</SubHeading>
      </HeadingWrapper>
      <FormWrapper onSubmit={handleSubmit(submitData)}>
        <SettingsWrapper>
          <Table
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={dataSource}
            columns={columns as ColumnTypes}
            pagination={false}
          />
          <ChargesDetailsWrapper>
            {/* <InputWrapper error={errors.basePrice}>
              <Label>Base Price*</Label>
              <TextInput
                type="number"
                placeholder="Enter Base Price"
                control={control}
                name="basePrice"
                error={errors.basePrice}
                maxLength={2}
                className="price"
              />

              <ErrorMessage>{errors?.basePrice?.message}</ErrorMessage>
            </InputWrapper>
            <InputWrapper error={errors.kilometrePrice}>
              <Label>Price per kilometer *</Label>
              <TextInput
                type="number"
                placeholder="Enter Price"
                control={control}
                name="kilometrePrice"
                error={errors.kilometrePrice}
                maxLength={2}
                className="price"
              />
              <ErrorMessage>{errors?.kilometrePrice?.message}</ErrorMessage>
            </InputWrapper> */}
            {/* <ChargesInputWrapper error={errors.deliveryCharges}>
              <ChargeLabel>Delivery Charges*</ChargeLabel>
              <TextInput
                type="number"
                placeholder="Enter Delivery Charge"
                control={control}
                name="deliveryCharges"
                error={errors.deliveryCharges}
                maxLength={2}
                className="price"
              />

              <ErrorMessage>{errors?.deliveryCharges?.message}</ErrorMessage>
            </ChargesInputWrapper> */}
            <ChargesInputWrapper error={errors.packingCharges}>
              <ChargeLabel>Packing Charges*</ChargeLabel>
              <TextInput
                type="number"
                placeholder="Enter Packing Charges"
                control={control}
                name="packingCharges"
                error={errors.packingCharges}
                maxLength={2}
                className="price"
              />

              <ErrorMessage>{errors?.packingCharges?.message}</ErrorMessage>
            </ChargesInputWrapper>
            <ChargesInputWrapper error={errors.rtoCharges}>
              <ChargeLabel>RTO Charges(%) *</ChargeLabel>
              <TextInput
                type="number"
                placeholder="Enter RTO Charges"
                control={control}
                name="rtoCharges"
                error={errors.rtoCharges}
                maxLength={2}
                className="price"
              />
              <ErrorMessage>{errors?.rtoCharges?.message}</ErrorMessage>
            </ChargesInputWrapper>
            <ChargesInputWrapper error={errors.qaCharges}>
              <ChargeLabel>Reverse QA Charge(%) *</ChargeLabel>
              <TextInput
                type="number"
                placeholder="Enter Reverse QA Charge"
                control={control}
                name="qaCharges"
                error={errors.qaCharges}
                maxLength={2}
                className="price"
              />
              <ErrorMessage>{errors?.qaCharges?.message}</ErrorMessage>
            </ChargesInputWrapper>

            <ChargesInputWrapper error={errors.igst}>
              <ChargeLabel>IGST*</ChargeLabel>
              <TextInput
                type="number"
                placeholder="Enter IGST"
                control={control}
                name="igst"
                error={errors.igst}
                maxLength={2}
                className="price"
              />
              <ErrorMessage>{errors?.igst?.message}</ErrorMessage>
            </ChargesInputWrapper>
            {/* <ChargesInputWrapper error={errors.cgst}>
              <ChargeLabel>CGST & SGST *</ChargeLabel>
              <TextInput
                type="number"
                placeholder="Enter CGST & SGST"
                control={control}
                name="cgst"
                error={errors.cgst}
                maxLength={2}
                className="price"
              />
              <ErrorMessage>{errors?.cgst?.message}</ErrorMessage>
            </ChargesInputWrapper> */}
          </ChargesDetailsWrapper>
        </SettingsWrapper>

        <EditButtonWrapper>
          <Button label="Cancel" variant="contained" className="cancel" onClick={onHandleClick} />
          <Button label="Save" type="submit" variant="contained" />
        </EditButtonWrapper>
      </FormWrapper>
    </MainWrapper>
  )
}

export default DashboardSettings
