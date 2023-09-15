import ReactModal from 'react-modal'

interface IModalProps {
  isOpen: boolean
  children?: JSX.Element
  className?: string
}

const Modal = ({ isOpen, children, className }: IModalProps) => (
  <ReactModal isOpen={isOpen} className={className} shouldCloseOnOverlayClick ariaHideApp={false}>
    {children}
  </ReactModal>
)

export default Modal
