import React from 'react'
import PropTypes from 'prop-types'
import {Cluster, Marker} from 'react-mapbox-gl'

const styles = {
  clusterMarker: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    backgroundColor: '#51D5A0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    border: '2px solid #56C498',
    cursor: 'pointer'
  },
  marker: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    backgroundColor: '#E0E0E0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid #C9C9C9'
  }
}

class ClusterLayers extends React.Component {
  clusterMarker(coordinates, pointCount) {
    return (
      <Marker
        key={coordinates.toString()}
        coordinates={coordinates}
        style={styles.clusterMarker}>
        <div>{pointCount}</div>
      </Marker>
    )
  }

  render() {
    const {features, options} = this.props
    console.log(options);
    return (
      <Cluster ClusterMarkerFactory={this.clusterMarker} nodeSize={128} {...options}>
        {features.map(feature => (
          <Marker
            key={feature.geometry.coordinates}
            style={styles.marker}
            coordinates={feature.geometry.coordinates}
            data-feature={feature} />
        ))}
      </Cluster>
    )
  }
}

ClusterLayers.propTypes = {
  features: PropTypes.array.isRequired,
  options: PropTypes.object.isRequired
}

export default ClusterLayers
