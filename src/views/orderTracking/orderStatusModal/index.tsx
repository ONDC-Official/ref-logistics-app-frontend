import { OrderHeadingWrapper, Heading, OrderImageWrapper } from 'styles/views/orderTracking'
import { IImageData } from 'interfaces/views'

const OrderStatusModal = ({ title, imgSrc }: IImageData) => (
  <OrderHeadingWrapper>
    <Heading>{title}</Heading>

    {imgSrc === undefined ? null : (
      <OrderImageWrapper>
        <img src={imgSrc} alt="product-image" />
      </OrderImageWrapper>
    )}
  </OrderHeadingWrapper>
)

export default OrderStatusModal
