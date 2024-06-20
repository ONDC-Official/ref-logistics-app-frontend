import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import APIS from 'constants/api'
import useFormPost from 'hooks/useFormPost'
import { AppContext } from 'context/payloadContext'
import { agentDocumentsData } from 'views/inviteAgentScreen/agentKYCDocuments/data'
import { KYC_DOCUMENTS_SCHEMA } from 'validations/agentDetailsValidation'
import UploadButton from 'components/UploadButton'
import Button from 'components/Button'
import Modal from 'components/Modal'
import DocumentViewModal from 'views/documentViewModal'
import EyeIcon from 'assets/svg/EyeIcon'
import DeleteIcon from 'assets/svg/DeleteIcon'
import { IKYCDetailsProps } from 'interfaces/views'
import {
  AgentDetailWrapper,
  HeadingWrapper,
  MainHeading,
  SubHeading,
  FormWrapper,
  UploadDocumentsWrapper,
  DocumentTitle,
  DocumentDetail,
  DocumentsWrapper,
  UploadContainer,
  UploadButtonWrapper,
  OptionWrapper,
  ButtonContainer,
  ErrorMessageWrapper,
} from 'styles/views/inviteAgentScreen/agentDetailSection'
import { ErrorMessage } from 'styles/views/signin'

const KYCDocuments = ({ next }: IKYCDetailsProps) => {
  const [ispreview, setIsPreviewed] = useState<{ [key: string]: boolean }>({})
  const [viewModal, setViewModal] = useState(false)
  const [filePath, setFilePath] = useState('')
  const { mutateAsync } = useFormPost()
  const { payloadData, setPayloadData } = useContext(AppContext)
  const { urls, setUrls } = useContext(AppContext)

  const {
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
    getValues,
  } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(KYC_DOCUMENTS_SCHEMA),
  })
  const values = getValues()
  const submitData = (data: any) => {
    const payload = {
      ...payloadData,
      KYCDetails: {
        ...payloadData.KYCDetails,
        ...data,
      },
    }
    if (data) {
      setPayloadData(payload)
      next()
    }
  }

  const customRequest = async (evt: any, keyName: string) => {
    const urlKeyName = `${keyName}`

    if (values?.[urlKeyName]) {
      handleRemove(keyName)
    }

    const formData = new FormData()
    formData.append('image', evt?.file)

    const fileSizeInBytes = evt?.file?.size
    const fileSizeInMB = fileSizeInBytes / 1048576

    const supportedTypes = ['application/pdf', 'image/jpeg', 'image/jpg']
    const isFileTypeSupported = supportedTypes.includes(evt?.file?.type)

    if (isFileTypeSupported && fileSizeInMB <= 2) {
      try {
        evt.onProgress({ percent: 0 })
        const response = await mutateAsync({
          url: APIS.UPLOAD_FILE,
          payload: formData,
          formData: 'multipart/form-data',
        })

        evt.onProgress({ percent: 100 })
        setValue(keyName, response?.data?.data?.url)
        clearErrors(keyName)

        const newUrl = { [urlKeyName]: response?.data?.data?.url }

        setUrls([...urls, newUrl])
        setIsPreviewed((prevState) => ({
          ...prevState,
          [keyName]: true,
        }))
      } catch (err) {
        err
      }
    } else {
      toast.error(
        !isFileTypeSupported ? (
          <ErrorMessageWrapper className="capitalize-first-letter">{`${
            evt?.file?.type.split('/')[1]
          } format is not supported`}</ErrorMessageWrapper>
        ) : (
          'File size is too large'
        ),
      )
    }
  }

  useEffect(() => {
    setValue('addressProof', payloadData?.KYCDetails?.addressProof)
    setValue('IDproof', payloadData?.KYCDetails?.IDproof)
    setValue('PANcard', payloadData?.KYCDetails?.PANcard)
    if (
      (payloadData?.KYCDetails?.addressProof !== undefined && payloadData?.KYCDetails?.IDproof !== 'undefined') ||
      payloadData?.KYCDetails?.PANcard !== undefined
    ) {
      setIsPreviewed((prevState) => ({
        ...prevState,
        ['addressProof']: true,
        ['IDproof']: true,
        ['PANcard']: true,
      }))
    }
  }, [payloadData])

  const handlePreviewClose = () => {
    setViewModal(false)
    setFilePath('')
  }
  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      return
    }
  }

  const handlePreviewClick = (name: string) => {
    const file: any = {
      url: values?.[name],
    }
    setViewModal(true)
    setFilePath(file.url)
    handlePreview(file)
  }

  const handleRemove = (name: string) => {
    setValue(name, '')
    setIsPreviewed((prevState) => ({
      ...prevState,
      [name]: false,
    }))
  }

  return (
    <>
      <AgentDetailWrapper>
        <HeadingWrapper>
          <MainHeading>Add KYC Documents</MainHeading>
          <SubHeading>Upload essential KYC documents with ease for verification.</SubHeading>
        </HeadingWrapper>
        <FormWrapper onSubmit={handleSubmit(submitData)}>
          {agentDocumentsData.map((item, index) => {
            return (
              <>
                <UploadDocumentsWrapper key={index}>
                  <DocumentsWrapper>
                    <DocumentTitle>{item.title}*</DocumentTitle>
                    <DocumentDetail>{item.subTitle}</DocumentDetail>
                  </DocumentsWrapper>
                  <UploadContainer>
                    <UploadButtonWrapper>
                      <UploadButton
                        customRequest={(e: any) => customRequest(e, item?.name)}
                        onRemove={() => handleRemove(item?.name)}
                        onPreview={handlePreview}
                      />
                    </UploadButtonWrapper>

                    {ispreview[item?.name] ? (
                      <OptionWrapper>
                        <EyeIcon onClick={() => handlePreviewClick(item?.name)} />
                        <DeleteIcon onClick={() => handleRemove(item?.name)} />
                      </OptionWrapper>
                    ) : null}
                  </UploadContainer>
                </UploadDocumentsWrapper>
                {errors && errors[item.name] ? (
                  <ErrorMessage>{errors?.[item?.name]?.message}</ErrorMessage>
                ) : (
                  <ErrorMessage />
                )}
              </>
            )
          })}

          <ButtonContainer>
            <Button label="Continue" variant="contained" type="submit" />
          </ButtonContainer>
        </FormWrapper>
        <ToastContainer />
      </AgentDetailWrapper>
      <Modal isOpen={viewModal}>
        <DocumentViewModal filePath={filePath} handlePreviewClose={handlePreviewClose} />
      </Modal>
    </>
  )
}

export default KYCDocuments
