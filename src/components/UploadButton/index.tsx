import React from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Upload } from 'antd'
import { UploadButtonProps } from 'interfaces'

const UploadButton: React.FC<UploadButtonProps> = ({ customRequest, onRemove, onPreview }) => (
  <Upload customRequest={customRequest} onRemove={onRemove} onPreview={onPreview} showUploadList={false}>
    <Button icon={<UploadOutlined rev={undefined} />}>Upload</Button>
  </Upload>
)

export default UploadButton
