import { message, Upload } from 'antd'
import { IModalData } from 'interfaces'
import { DragFileHeading, DragDescription, DragImage } from 'styles/views/signin'

const { Dragger } = Upload

export interface IModalProps {
  dragData: IModalData
  Upload?: any
  name: string
}

const DragFile = ({ Upload, dragData, name }: IModalProps) => {
  const handleBeforeUpload = (file: File) => {
    // Check file format
    const allowedFormats = ['image/jpeg', 'application/pdf', 'image/jpg']
    if (!allowedFormats.includes(file.type)) {
      if (name === 'uploadImage') {
        message.error('Invalid file format. Please upload a JPEG, JPG')
      } else {
        message.error('Invalid file format. Please upload a JPEG, JPG or PDF file.')
      }

      return false // Prevent file upload
    }

    // Check file size
    const maxSize = 2 * 1024 * 1024 // 10MB

    if (name !== 'uploadImage' && file.size > maxSize) {
      message.error('File size exceeds the allowed limit of 2MB.')
      return false // Prevent file upload
    }

    return true // Proceed with file upload
  }

  return (
    <Dragger
      beforeUpload={handleBeforeUpload}
      customRequest={(e) => Upload(name, e)}
      showUploadList={false}
      multiple={false}
    >
      <DragImage>{dragData.icon}</DragImage>
      <DragFileHeading>
        {dragData.heading} <span> {dragData.span} </span>
      </DragFileHeading>
      <DragDescription className="ant-upload-hint">{dragData.detail}</DragDescription>
    </Dragger>
  )
}

export default DragFile
