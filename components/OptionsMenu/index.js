import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

import theme from '../../styles/theme'

import SwitchInput from '../switch-input'
import OptionsButton from './options-button'
import Option from './option'

const OptionsButtonStyle = {
  margin: '1em',
  right: 0,
  position: 'absolute'
}

class OptionsMenu extends React.Component {
  constructor(props) {
    super(props)

    this.handleCluster = this.handleCluster.bind(this)
    this.handleBuffer = this.handleBuffer.bind(this)
    this.handleTolerance = this.handleTolerance.bind(this)
    this.handleClusterRadius = this.handleClusterRadius.bind(this)
    this.handleClusterMaxZoom = this.handleClusterMaxZoom.bind(this)
  }

  handleCluster() {
    const {options, onChange} = this.props
    onChange('cluster', !options.cluster)
  }

  handleBuffer(event) {
    const {onChange} = this.props
    onChange('buffer', parseInt(event.target.value, 10))
  }

  handleTolerance(event) {
    const {onChange} = this.props
    onChange('tolerance', parseInt(event.target.value, 10) / 1000)
  }

  handleClusterRadius(event) {
    const {onChange} = this.props
    onChange('clusterRadius', parseInt(event.target.value, 10))
  }

  handleClusterMaxZoom(event) {
    const {onChange} = this.props
    onChange('clusterMaxZoom', parseInt(event.target.value, 10))
  }

  render() {
    const {options, onClose} = this.props

    return (
      <div className='container'>
        <OptionsButton
          style={OptionsButtonStyle}
          onClick={onClose}
          isOpen />
        <div className='options'>
          <div>
            <SwitchInput label='cluster' isChecked={options.cluster} onChange={this.handleCluster} />

            {options.cluster && (
              <Fragment>
                <Option
                  input={<input type='range' min={0} max={14} step={1} value={options.clusterMaxZoom} onChange={this.handleClusterMaxZoom} />}
                  description='Zoom maximal sur lequel grouper des points si le clustering est activé. La valeur par défaut est un zoom inférieur à maxzoom (de sorte que les dernières fonctions de zoom ne sont pas regroupées).'
                  label='clusterMaxZoom'
                  value={options.clusterMaxZoom} />

                <Option
                  input={<input type='range' min={1} max={50} step={1} value={options.clusterRadius} onChange={this.handleClusterRadius} />}
                  description='Rayon de chaque cluster si le clustering est activé. Une valeur de 512 indique un rayon égal à la largeur d’une mosaïque.'
                  label='clusterRadius'
                  value={options.clusterRadius} />
              </Fragment>
              )}
          </div>

          <Option
            input={<input type='range' min={0} max={512} step={2} value={options.buffer} onChange={this.handleBuffer} />}
            description='Taille du buffer de tuile de chaque côté. Une valeur de 0 ne produit aucun buffer. Une valeur de 512 produit un buffer aussi large que la mosaïque elle-même. Les valeurs plus élevées produisent moins d’artefacts de rendu à proximité des bords de la mosaïque et des performances plus lentes.'
            label='Buffer'
            value={options.buffer} />

          <Option
            input={<input type='range' min={0} max={1000} step={1} value={options.tolerance * 1000} onChange={this.handleTolerance} />}
            description='La tolérance de simplification de Douglas-Peucker (plus élevée signifie des géométries plus simples et des performances plus rapides).'
            label='Tolerance'
            value={options.tolerance} />
        </div>
        <style jsx>{`
          .container {
            position: absolute;
            box-shadow: 0 1px 10px ${theme.boxShadow};
            top: 0;
            background-color: white;
            z-index: 5;
            width: 20%;
            height: 100%;
          }

          input[type=range] {
            padding: 1em 0;
          }

          .options {
            display: flex;
            flex-direction: column;
            padding: 1em;
          }
          `}</style>
      </div>
    )
  }
}

OptionsMenu.propTypes = {
  options: PropTypes.shape({
    cluster: PropTypes.bool
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
}

export default OptionsMenu
