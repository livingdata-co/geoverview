import PropTypes from 'prop-types'

import Loader from './loader'
import Notification from './notification'

const LoadingContent = ({loading, msg, error, style, children}) => {
  if (loading) {
    return (
      <div style={style} className='loader'>
        <div className='content'>
          <Loader />
          {msg && <p>{msg}</p>}
        </div>
        <style jsx>{`
          .loader {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          .content {
            display: flex;
            flex-direction: column;
            text-align: center;
            align-items: center;
          }
        `}</style>
      </div>
    )
  } else if (error) {
    return (
      <div style={style} className='error'>
        <Notification message={error.message} type='error' />
        <style jsx>{`
          .error {
            margin: 1em;
          }
        `}</style>
      </div>
    )
  }

  return children
}

LoadingContent.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.object,
  msg: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node.isRequired
}

LoadingContent.defaultProps = {
  loading: false,
  msg: null,
  style: null,
  error: null
}

export default LoadingContent
