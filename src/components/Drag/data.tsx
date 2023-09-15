import { IModalData } from 'interfaces'
import Camera from 'assets/svg/Camera'

export const dragData: {
  documentUpload: IModalData
  photoUpload: IModalData
} = {
  documentUpload: {
    icon: null,
    heading: 'Drop files to attach or',
    span: 'Browse',
    detail: 'Drag and drop files here to attach them.',
  },
  photoUpload: {
    icon: <Camera />,
    heading: '',
    span: 'Browse  Gallery',
    detail: 'Upload image from gallery',
  },
}
