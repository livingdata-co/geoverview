import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import FaFile from 'react-icons/lib/fa/file'
import FaPlus from 'react-icons/lib/fa/plus'

import theme from '../styles/theme'

// Unable to pass the css by className, maybe a react-dropzone bug ¯\_(ツ)_/¯
const style = {
  width: '100%',
  height: '100%'
}

class Holder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {dropzoneActive: false}
    this.handleOnDragEnter = this.handleOnDragEnter.bind(this)
    this.handleOnDragLeave = this.handleOnDragLeave.bind(this)
    this.handleOnDrop = this.handleOnDrop.bind(this)
  }

  handleOnDragEnter() {
    this.setState({dropzoneActive: true})
  }

  handleOnDragLeave() {
    this.setState({dropzoneActive: false})
  }

  handleOnDrop(files) {
    const {onDrop} = this.props

    this.setState({dropzoneActive: false})
    onDrop(files)
  }

  render() {
    const {file, placeholder, hide} = this.props
    const {dropzoneActive} = this.state

    return (
      <Dropzone
        onDragEnter={this.handleOnDragEnter}
        onDragLeave={this.handleOnDragLeave}
        onDrop={this.handleOnDrop}
        style={style}
        multiple={false}>

        <div className='dropzone centered'>
          <div className={`test ${dropzoneActive ? 'dropzone-active' : ''}`}>
            <div className='centered container'>
              <div className='drop-icon'>{file && !dropzoneActive ? <FaFile /> : <FaPlus />}</div>
              <div>{file ? file.name : placeholder}</div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .dropzone {
            z-index: ${hide ? 1 : -1};
          }

          .test {
            height: 80%;
            width: 80%;
          }

          .centered {
            height: 100%;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
          }

          .centered .dropzone-active {
            background: ${theme.backgroundGrey}80;
          }

          .centered:hover {
            cursor: pointer;
          }

          .container {
            border: 5px dashed ${theme.colors.darkBlue};
            text-align: center;
            padding: 1em;
          }

          .container:hover {
            background: ${theme.colors.lighterGrey}80;
          }

          .drop-icon {
            font-size: 72px;
            margin: 0.3em;
          }
          `}</style>
      </Dropzone>
    )
  }
}

Holder.propTypes = {
  file: PropTypes.object,
  hide: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  onDrop: PropTypes.func.isRequired
}

Holder.defaultProps = {
  hide: false
}

export default Holder
