import React from 'react'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'

import Holder from './holder'
import LoadingContent from './loading-content'

import OptionsMenu from './OptionsMenu'
import OptionsButton from './OptionsMenu/options-button'

const Map = dynamic(import('./map'), {
  ssr: false,
  loading: () => (
    <LoadingContent msg='Chargement de la carte' loading>
      <div />
    </LoadingContent>
  )
})

const OptionsButtonStyle = {
  position: 'absolute',
  zIndex: 5,
  top: '1em',
  left: '1em'
}

class DropzoneMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dragOver: false,
      optionsMenu: false,
      mapOptions: {
        cluster: true,
        tolerance: 0.5,
        clusterRadius: 50,
        clusterMaxZoom: 14,
        buffer: 60
      }
    }

    this.handleOnDragEnter = this.handleOnDragEnter.bind(this)
    this.handleOnDrop = this.handleOnDrop.bind(this)
    this.handleOptions = this.handleOptions.bind(this)
    this.handleOptionsMenu = this.handleOptionsMenu.bind(this)
  }

  handleOnDragEnter() {
    this.setState({dragOver: true})
  }

  handleOnDrop(files) {
    const {onFileDrop} = this.props
    this.setState({dragOver: false})
    onFileDrop(files)
  }

  handleOptionsMenu() {
    this.setState(prevState => {
      return {optionsMenu: !prevState.optionsMenu}
    })
  }

  handleOptions(option, value) {
    const options = {...this.state.mapOptions}
    options[option] = value
    this.setState({mapOptions: options})
  }

  render() {
    const {dragOver, optionsMenu, mapOptions} = this.state
    const {file, vectors} = this.props
    const displayHolder = dragOver || !file

    return (
      <div className='dropzone' onDragEnter={this.handleOnDragEnter}>
        <Holder
          file={file}
          placeholder={`Glissez un fichier .geojson ou .json ici ou cliquez pour choisir`}
          onDrop={this.handleOnDrop}
          hide={!displayHolder} />

        {vectors &&
          <div className='map-container'>
            <Map vectors={vectors} options={mapOptions} />
            {optionsMenu ?
              <OptionsMenu
                options={mapOptions}
                onClose={this.handleOptionsMenu}
                onChange={this.handleOptions} /> :
              <OptionsButton
                style={OptionsButtonStyle}
                onClick={this.handleOptionsMenu} />
            }
          </div>
        }

        <style jsx>{`
          .dropzone {
            z-index: 0;
            width: 100%;
            height: 100%;
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
            height: 100%;
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
