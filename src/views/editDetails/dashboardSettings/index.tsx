import React, { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import usePost from 'hooks/usePost'
import { EditableRowProps, EditableCellProps, DataType } from 'interfaces'
import { DashboardRoute } from 'constants/routes'
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
import APIS from 'constants/api'
import useGet from 'hooks/useGet'

const EditableContext = React.createContext<FormInstance<any> | null>(null)

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

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>

const DashboardSettings = () => {
  const { mutateAsync } = usePost()

  const defaultValues = {
    inter_city: {
      delivery_type: {
        express_delivery: {
          lesEq_1: 0,
          lesEq_3: 0,
          lesEq_5: 0,
          lesEq_7: 0,
          lesEq_10: 0,
          gtr_10: 0,
        },
        next_day_delivery: {
          lesEq_1: 0,
          lesEq_3: 0,
          lesEq_5: 0,
          lesEq_7: 0,
          lesEq_10: 0,
          gtr_10: 0,
        },
      },
      packing_charges: '',
      rto_charges: '',
      reverse_qc_charges: '',
      igst: '',
    },
  }

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(PRICE_CALCULATION_SCHEMA),
    defaultValues: defaultValues,
  })

  const { refetch: fetchHyperLocalPrice, data: hyperLocalPrice } = useGet(
    'get-hyperLocalPrice',
    `${APIS.GET_PRICE_CALCULATION}`,
  )
  useEffect(() => {
    fetchHyperLocalPrice()
  }, [])
  const inter_city = hyperLocalPrice?.data[0]?.inter_city
  const hyperid = hyperLocalPrice?.data[0]?._id

  useEffect(() => {
    setValue('inter_city.packing_charges', inter_city?.packing_charges)
    setValue('inter_city.rto_charges', inter_city?.rto_charges)
    setValue('inter_city.reverse_qc_charges', inter_city?.reverse_qc_charges)
    setValue('inter_city.igst', inter_city?.igst)
    const types = ['express_delivery', 'next_day_delivery']
    types.map((item: string) => {
      Object.keys(inter_city?.delivery_type[item] || {}).map((type: string) => {
        if (type !== '_id') {
          const itemKey = (`inter_city.delivery_type.` + item + '.' + type) as keyof typeof defaultValues
          setValue(itemKey, inter_city?.delivery_type[item][type])
        }
      })
    })
  }, [hyperLocalPrice])

  const submitData = async (data: any) => {
    try {
      await mutateAsync({
        url: `${APIS.UPDATE_PRICE_CALCULATION}/${hyperid}`,
        payload: data,
      })
    } catch (err) {
      err
    }
  }

  const router = useHistory()

  const onHandleClick = () => {
    router.push(`${DashboardRoute.path}`)
  }

  const expressDelivery = inter_city?.delivery_type?.express_delivery
  const nextDayDelivery = inter_city?.delivery_type?.next_day_delivery

  const [dataSource] = useState<DataType[]>([
    {
      key: 'express_delivery',
      lesEq_1: expressDelivery?.lesEq_1 || 0, // Set a default value if it's undefined
      lesEq_3: expressDelivery?.lesEq_3 || 0,
      lesEq_5: expressDelivery?.lesEq_5 || 0,
      lesEq_7: expressDelivery?.lesEq_7 || 0,
      lesEq_10: expressDelivery?.lesEq_10 || 0,
      gtr_10: expressDelivery?.gtr_10 || 0,
    },
    {
      key: 'next_day_delivery',
      lesEq_1: nextDayDelivery?.lesEq_1 || 0,
      lesEq_3: nextDayDelivery?.lesEq_3 || 0,
      lesEq_5: nextDayDelivery?.lesEq_5 || 0,
      lesEq_7: nextDayDelivery?.lesEq_7 || 0,
      lesEq_10: nextDayDelivery?.lesEq_10 || 0,
      gtr_10: nextDayDelivery?.gtr_10 || 0,
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
      key: 'lesEq_1',
      dataIndex: 'lesEq_1',
      editable: true,
      width: 130,
    },
    {
      title: '<=3kg',
      key: 'lesEq_3',
      dataIndex: 'lesEq_3',
      editable: true,
      width: 130,
    },
    {
      title: '<=5kg',
      dataIndex: 'lesEq_5',
      key: 'lesEq_5',
      editable: true,
      width: 130,
    },
    {
      title: '<=7kg',
      key: 'lesEq_7',
      dataIndex: 'lesEq_7',
      editable: true,
      width: 130,
    },
    {
      title: '<=10kg',
      key: 'lesEq_10',
      dataIndex: 'lesEq_10',
      editable: true,
      width: 130,
    },
    {
      title: '>=10kg',
      key: 'gtr_10',
      dataIndex: 'gtr_10',
      editable: true,
      width: 130,
    },
  ]

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
      render: (key: any, record: any) => {
        const itemKey = (`inter_city.delivery_type.` + record.key + '.' + col.key) as keyof typeof defaultValues

        return (
          <Controller
            defaultValue={key}
            name={itemKey}
            control={control}
            render={({ field }) => (
              <TextInput placeholder={''} control={control} {...field} value={field.value.toString()} />
            )}
          />
        )
      },
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
          {dataSource && (
            <Table
              components={components}
              dataSource={dataSource}
              columns={columns as ColumnTypes}
              pagination={false}
            />
          )}

          <ChargesDetailsWrapper>
            <ChargesInputWrapper error={errors?.inter_city?.packing_charges}>
              <ChargeLabel>Packing Charges*</ChargeLabel>
              <TextInput
                type="number"
                placeholder="Enter Packing Charges"
                control={control}
                name="inter_city.packing_charges"
                error={errors?.inter_city?.packing_charges}
                className="price"
              />

              <ErrorMessage>{errors?.inter_city?.packing_charges?.message}</ErrorMessage>
            </ChargesInputWrapper>
            <ChargesInputWrapper error={errors?.inter_city?.rto_charges}>
              <ChargeLabel>RTO Charges(%)*</ChargeLabel>
              <TextInput
                type="number"
                placeholder="Enter RTO Charges(%)"
                control={control}
                name="inter_city.rto_charges"
                error={errors?.inter_city?.rto_charges}
                className="price"
              />
              <ErrorMessage>{errors?.inter_city?.rto_charges?.message}</ErrorMessage>
            </ChargesInputWrapper>
            <ChargesInputWrapper error={errors?.inter_city?.reverse_qc_charges}>
              <ChargeLabel>Reverse QC Charge(%)*</ChargeLabel>
              <TextInput
                type="number"
                placeholder="Enter Reverse QC Charge(%)"
                control={control}
                name="inter_city.reverse_qc_charges"
                error={errors?.inter_city?.reverse_qc_charges}
                className="price"
              />
              <ErrorMessage>{errors?.inter_city?.reverse_qc_charges?.message}</ErrorMessage>
            </ChargesInputWrapper>

            <ChargesInputWrapper error={errors?.inter_city?.igst}>
              <ChargeLabel>IGST(%)*</ChargeLabel>
              <TextInput
                type="number"
                placeholder="Enter IGST(%)"
                control={control}
                name="inter_city.igst"
                error={errors?.inter_city?.igst}
                className="price"
              />
              <ErrorMessage>{errors?.inter_city?.igst?.message}</ErrorMessage>
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
