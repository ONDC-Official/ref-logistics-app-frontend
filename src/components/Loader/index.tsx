import loader from 'assets/loader/loader.gif'
import { Loader } from 'styles/components/Loader'

const Spinner = () => (
  <div
    style={{
      display: 'flex',
      position: 'fixed',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 99999,
      backdropFilter: 'blur(0.4px)',
      background: 'rgba(240, 248, 255, 0.81)',
    }}
  >
    <Loader src={loader} alt="loader" />
  </div>
)

Spinner.defaultProps = {
  fullScreen: false,
}

export default Spinner
