import React from 'react'
import PropTypes from 'prop-types'

import MdClose from 'react-icons/lib/md/close'
import MdMenu from 'react-icons/lib/md/menu'

const OptionsButton = ({isOpen, style, onClick}) => (
  <div style={style}>
    <button onClick={onClick}>
      {isOpen ? <MdClose /> : <MdMenu />}
    </button>
    <style jsx>{`
      button {
        width: 40px;
        font-size: 1.5em;
        border: none;
      }
      `}</style>
  </div>
)

OptionsButton.propTypes = {
  isOpen: PropTypes.bool,
  style: PropTypes.object,
  onClick: PropTypes.func.isRequired
}

OptionsButton.defaultProps = {
  isOpen: false,
  style: {}
}

export default OptionsButton
