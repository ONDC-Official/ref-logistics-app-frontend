import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import usePost from 'hooks/usePost'
// import APIS from 'constants/api'
import { DashboardRoute } from 'constants/routes'
import { AppContext } from 'context/payloadContext'
import TextInput from 'components/TextInput'
import Button from 'components/Button'
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
  const { userInfo } = useContext(AppContext)
  const { mutateAsync } = usePost()

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
      packingCharges: '',
      rtoCharges: '',
      qcCharges: '',
      igst: '',
      cgst: '',
    },
  })

  useEffect(() => {
    setValue('packingCharges', userInfo?.settings?.pricePerDistance?.unit)
    setValue('rtoCharges', userInfo?.settings?.pricePerDistance?.value)
    setValue('igst', userInfo?.settings?.pricePerDistance?.value)
    setValue('cgst', userInfo?.settings?.pricePerDistance?.value)
  }, [userInfo])

  const submitData = async (data: any) => {
    const payload = {
      hyper_local: {
        delivery_type: {
          immediate_delivery: {
            lesEq_1: data?.lesEq_1,
            lesEq_3: data?.lesEq_3,
            lesEq_5: data?.lesEq_5,
            lesEq_7: data?.lesEq_7,
            lesEq_10: data?.lesEq_10,
            gtr_10: data?.gtr_10,
          },
          same_day_delivery: {
            lesEq_1: data?.lesEq_1,
            lesEq_3: data?.lesEq_3,
            lesEq_5: data?.lesEq_5,
            lesEq_7: data?.lesEq_7,
            lesEq_10: data?.lesEq_10,
            gtr_10: data?.gtr_10,
          },
          next_day_delivery: {
            lesEq_1: data?.lesEq_1,
            lesEq_3: data?.lesEq_3,
            lesEq_5: data?.lesEq_5,
            lesEq_7: data?.lesEq_7,
            lesEq_10: data?.lesEq_10,
            gtr_10: data?.gtr_10,
          },
        },
        packing_charges: data?.packing_charges,
        rto_charges: data?.rto_charges,
        reverse_qc_charges: data?.reverse_qa_charges,
        igst: data?.igst,
      },
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

  return (
    <MainWrapper>
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
            <ChargesInputWrapper error={errors.packingCharges}>
              <ChargeLabel>Packing Charges*</ChargeLabel>
              <TextInput
                type="number"
                placeholder="Enter Packing Charges"
                control={control}
                name="packingCharges"
                error={errors.packingCharges}
                className="price"
              />

              <ErrorMessage>{errors?.packingCharges?.message}</ErrorMessage>
            </ChargesInputWrapper>
            <ChargesInputWrapper error={errors.rtoCharges}>
              <ChargeLabel>RTO Charges(%)*</ChargeLabel>
              <TextInput
                type="number"
                placeholder="Enter RTO Charges"
                control={control}
                name="rtoCharges"
                error={errors.rtoCharges}
                className="price"
              />
              <ErrorMessage>{errors?.rtoCharges?.message}</ErrorMessage>
            </ChargesInputWrapper>
            <ChargesInputWrapper error={errors.qcCharges}>
              <ChargeLabel>Reverse QC Charge(%)*</ChargeLabel>
              <TextInput
                type="number"
                placeholder="Enter Reverse QC Charge"
                control={control}
                name="qcCharges"
                error={errors.qcCharges}
                className="price"
              />
              <ErrorMessage>{errors?.qcCharges?.message}</ErrorMessage>
            </ChargesInputWrapper>

            <ChargesInputWrapper error={errors.igst}>
              <ChargeLabel>IGST(%)*</ChargeLabel>
              <TextInput
                type="number"
                placeholder="Enter IGST"
                control={control}
                name="igst"
                error={errors.igst}
                className="price"
              />
              <ErrorMessage>{errors?.igst?.message}</ErrorMessage>
            </ChargesInputWrapper>
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
