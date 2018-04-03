import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {GeoJSONLayer} from 'react-mapbox-gl'

import ClusterLayers from './cluster-layers'

const lineLayout = {
  'line-cap': 'round',
  'line-join': 'round'
}

const linePaint = {
  'line-color': '#4790E5',
  'line-width': 4
}

const fillPaint = {
  'fill-color': '#3099df',
  'fill-opacity': 0.2
}

const polygonPaint = {
  'fill-color': '#3099df',
  'fill-outline-color': 'blue',
  'fill-opacity': 0.3
}

class Layers extends React.Component {
  constructor(props) {
    super(props)

    this.markerClick = this.markerClick.bind(this)
    this.getCirclePaint = this.getCirclePaint.bind(this)
  }

  markerClick(event) {
    const {markerClick} = this.props
    markerClick(event)
  }

  getCirclePaint() {
    return {
      'circle-radius': 5,
      'circle-color': '#3099df',
      'circle-opacity': 0.6
    }
  }

  render() {
    const {data, id, isPoint, options, onToggleHover} = this.props
    options.cluster = options.cluster && isPoint
    const clusterOptions = {
      maxZoom: options.clusterMaxZoom,
      radius: options.clusterRadius
    }
    console.log(`CREATE ${id}`)

    return (
      <Fragment>
        {options.cluster ?
          <ClusterLayers features={data.features} options={clusterOptions} /> :
          <GeoJSONLayer
            id={id}
            sourceOptions={options}
            data={data}
            lineLayout={lineLayout}
            linePaint={linePaint}
            fillPaint={fillPaint}
            polygonPaint={polygonPaint}
            circlePaint={this.getCirclePaint()}
            circleOnMouseDown={this.markerClick}
            circleOnMouseEnter={onToggleHover}
            circleOnMouseLeave={onToggleHover} />}
      </Fragment>
    )
  }
}

Layers.propTypes = {
  data: PropTypes.object.isRequired,
  id: PropTypes.string,
  isPoint: PropTypes.bool,
  options: PropTypes.object,
  markerClick: PropTypes.func,
  onToggleHover: PropTypes.func
}

Layers.defaultProps = {
  id: 'source_id',
  isPoint: false,
  options: {
    cluster: true,
    clusterMaxZoom: 14,
    clusterRadius: 50,
    tolerance: 0.5,
    buffer: 60
  },
  markerClick: () => {},
  onToggleHover: () => {}
}

export default Layers
