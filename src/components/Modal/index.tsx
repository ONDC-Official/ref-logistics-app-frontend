import ReactModal from 'react-modal'
import { IModalProps } from 'interfaces'

const Modal = ({ isOpen, children, className }: IModalProps) => (
  <ReactModal isOpen={isOpen} className={className} shouldCloseOnOverlayClick ariaHideApp={false}>
    {children}
  </ReactModal>
)

export default Modal
