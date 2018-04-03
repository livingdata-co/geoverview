import React from 'react'
import PropTypes from 'prop-types'
import ReactMapboxGl, {ScaleControl} from 'react-mapbox-gl'
import {groupBy} from 'lodash'
import {center, bbox} from '@turf/turf'

import LoadingContent from '../loading-content'

import Layers from './layers'
import PopUp from './pop-up'

const Mapbox = ReactMapboxGl({})

function genId(type, idx, options) {
  const {cluster, buffer, clusterRadius, clusterMaxZoom, tolerance} = options
  return `${type}-${idx}-c${cluster ? 'true' : 'false'}-b${buffer}-cR${clusterRadius}-cMZ${clusterMaxZoom}-t${tolerance}`
}

function removeLayers(map, sourceName) {
  const layers = [
    'symbol',
    'line',
    'fill',
    'fill-extrusion',
    'circle'
  ]

  layers.map(name => {
    const layerName = `${sourceName}-${name}`
    if (map.getLayer(layerName)) {
      map.removeLayer(layerName)
    }
  })
}

function removeClusterLayers(map) {
  map.removeLayer('cluster_layer')
  map.removeLayer('unclustered_layer')
  map.removeLayer('cluster-count')
}

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      map: null,
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

  componentWillReceiveProps(props) {
    const {map} = this.state
    const {options, vectors} = this.props

    if (props.options !== options) {
      const featuresTypes = groupBy(vectors.features, feature => feature.geometry.type)
      Object.keys(featuresTypes).map((type, idx) => {
        const name = genId(type, idx, options)

        removeLayers(map, name)

        if (map.getSource(name)) {
          map.removeSource(name)
        }
        console.log(`REMOVE ${name}`)
      })
    }
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

  handleStyleLoad(map) {
    this.setState({map, loading: false})
  }

  render() {
    const {vectors, options, frozen} = this.props
    const {layer, layerCenter, bounds, boundsCenter, loading} = this.state
    const featuresTypes = groupBy(vectors.features, feature => feature.geometry.type)

    const randColor = `#${Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111}`

    return (
      <div className='container'>
        {loading &&
          <LoadingContent style={{padding: '2em', backgroundColor: '#fff', zIndex: 3}} msg='Chargement des données' loading>
            <div />
          </LoadingContent>
        }
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

          {Object.keys(featuresTypes).map((type, idx) => (
            <Layers
              key={type}
              id={genId(type, idx, options)}
              data={Object.assign({}, {
                type: 'FeatureCollection',
                features: featuresTypes[type],
                color: randColor
              })}
              isPoint={type === 'Point'}
              options={options}
              markerClick={this.markerClick} />))
        }
        </Mapbox>

        <style jsx>{`
          .container {
            height: 100%;
          }
            `}</style>

      </div>
    )
  }
}

Map.propTypes = {
  vectors: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  frozen: PropTypes.bool
}

Map.defaultProps = {
  frozen: false
}

export default Map
