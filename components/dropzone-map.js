import React from 'react'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'

import Holder from './holder'
import LoadingContent from './loading-content'

const Map = dynamic(import('./map'), {
  ssr: false,
  loading: () => <LoadingContent loading>Chargement…</LoadingContent>
})

class DropzoneMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {dragOver: false}
    this.handleOnDragEnter = this.handleOnDragEnter.bind(this)
    this.handleOnDrop = this.handleOnDrop.bind(this)
  }

  handleOnDragEnter() {
    this.setState({dragOver: true})
  }

  handleOnDrop(files) {
    const {onFileDrop} = this.props
    this.setState({dragOver: false})
    onFileDrop(files)
  }

  render() {
    const {dragOver} = this.state
    const {file, vectors} = this.props
    const displayHolder = dragOver

    return (
      <div className='dropzone' onDragEnter={this.handleOnDragEnter}>
        <Holder
          file={file}
          placeholder={`Glissez un fichier .geojson ou .json ici ou cliquez pour choisir`}
          onDrop={this.handleOnDrop}
          hide={displayHolder} />

        {vectors &&
          <div className='map-container'>
            <Map vectors={vectors} />
          </div>
        }

        <style jsx>{`
          .dropzone {
            z-index: 0;
            width: 100%;
            height: 71vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .background {
            z-index: -2;
            background-color: white;
            width: 100%;
            height: 100%;
          }

          .map-container {
            z-index: ${displayHolder ? -1 : 1};
            position: absolute;
            width: 100%;
            height: 71vh;
            top: 81px;
          }
            `}</style>
      </div>
    )
  }
}

DropzoneMap.propTypes = {
  file: PropTypes.object,
  vectors: PropTypes.object,
  onFileDrop: PropTypes.func.isRequired
}

DropzoneMap.defaultProps = {
  file: null,
  vectors: null
}

export default DropzoneMap
