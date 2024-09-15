import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        justifySelf: 'center',
      }}
    ></Spinner>
  )
}
export default Loader
