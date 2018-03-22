import React from 'react'
import PropTypes from 'prop-types'
import ReactMapboxGl, {ScaleControl} from 'react-mapbox-gl'
import {groupBy} from 'lodash'
import {center, bbox} from '@turf/turf'

import Loader from '../loader'

import Layers from './layers'
import PopUp from './pop-up'

const Mapbox = ReactMapboxGl({})

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      layer: null,
      layerCenter: null,
      loading: true,
      bounds: null,
      boundsCenter: null
    }

    this.onDrag = this.onDrag.bind(this)
    this.markerClick = this.markerClick.bind(this)
    this.renderPopUp = this.renderPopUp.bind(this)

    this.handleStyleLoad = this.handleStyleLoad.bind(this)
  }

  componentWillMount() {
    const {vectors} = this.props
    const extent = bbox(vectors)
    const boundsCenter = center(vectors).geometry.coordinates

    this.setState({
      bounds: [
        extent.splice(0, 2),
        extent.splice(0, 2)
      ],
      boundsCenter
    })
  }

  onDrag() {
    const {layer} = this.state
    if (layer) {
      this.setState({layer: null})
    }
  }

  markerClick(event) {
    const coordinates = [event.lngLat.lng, event.lngLat.lat]
    this.setState({
      layerCenter: coordinates,
      layer: event.features
    })
  }

  renderPopUp(features) {
    return (
      features.map((feature, key) => (
        <ul key={`feature-${key}`}>
          {Object.keys(feature.properties).map(key =>
            <li key={key}><b>{key} :</b> {feature.properties[key]}</li>
          )}
        </ul>
      ))
    )
  }

  handleStyleLoad() {
    this.setState({loading: false})
  }

  render() {
    const {layer, layerCenter, bounds, boundsCenter, loading} = this.state
    const {vectors, frozen} = this.props
    const featuresTypes = groupBy(vectors.features, feature => feature.geometry.type)

    return (
      <div className='container'>
        {loading &&
          <div className='loader'>
            <Loader />
          </div>}

        <Mapbox
          onStyleLoad={this.handleStyleLoad}
          center={layerCenter || boundsCenter}
          fitBounds={bounds}
          fitBoundsOptions={{padding: 20, linear: frozen}}
          onDrag={this.onDrag}
          style='https://free.tilehosting.com/styles/bright/style.json?key=bCzitV3Whud1dgslD9c4'
          flyToOptions={{speed: 0.8}}
          containerStyle={{
            height: '100%',
            width: '100%'
          }}>

          <ScaleControl measurement='km' position='top-right' />

          {layer &&
            <PopUp
              coordinates={layerCenter}
              features={layer}
              renderPopUp={this.renderPopUp} />
          }

          {Object.keys(featuresTypes).map(type => (
            <Layers
              key={type}
              data={{
                type: 'FeatureCollection',
                features: featuresTypes[type]
              }}
              cluster={type === 'Point'}
              markerClick={this.markerClick} />))
        }
        </Mapbox>

        <style jsx>{`
          .container {
            height: 100%;
          }

          .loader {
            z-index: 10;
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: auto;
            width: 100%;
            height: 100%;
          }
            `}</style>

      </div>
    )
  }
}

Map.propTypes = {
  vectors: PropTypes.object.isRequired,
  frozen: PropTypes.bool
}

Map.defaultProps = {
  frozen: false
}

export default Map
