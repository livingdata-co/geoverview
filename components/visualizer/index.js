import React from 'react'

import Notification from '../notification'
import LoadingContent from '../loading-content'
import DropzoneMap from '../dropzone-map'

import getFileExtension from '../../lib/file'

const allowedTypes = [
  'application/json',
  'application/geo+json'
]

const allowedExtensions = [
  'geojson',
  'json'
]

class Visualizer extends React.Component {
  constructor() {
    super()
    this.state = {
      file: null,
      vectors: null,
      error: null
    }

    this.handleFileDrop = this.handleFileDrop.bind(this)
    this.readAsJSON = this.readAsJSON.bind(this)
    this.parseFile = this.parseFile.bind(this)
  }

  resetState() {
    this.setState({vectors: null, file: null, loading: false})
  }

  async parseFile(file) {
    const json = await this.readAsJSON(file)
    this.setState({vectors: json, loading: false})
  }

  readAsJSON(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = e => {
        try {
          const {result} = e.target
          resolve(JSON.parse(result))
        } catch (err) {
          reject(err)
        }
      }
      reader.onerror = reject
      reader.readAsText(file)
    })
  }

  async handleFileDrop(fileList) {
    const file = fileList[0]
    const fileExtension = getFileExtension(file.name)

    this.setState({
      vectors: null,
      step: 'Chargement du fichier',
      loading: true
    })

    if (file.type && !allowedTypes.includes(file.type)) {
      this.setState({
        error: `Ce type de fichier n’est pas supporté : ${file.type}.`,
        loading: false
      }, this.resetState())
    } else if (fileExtension && !allowedExtensions.includes(fileExtension)) {
      this.setState({
        error: `Cette extension de fichier n’est pas supportée : ${fileExtension}.`,
        loading: false
      }, this.resetState())
    } else {
      this.setState({
        file,
        error: null,
        step: 'Analyse du fichier',
        loading: false
      }, await this.parseFile(file))
    }
  }

  render() {
    const {file, vectors, step, loading, error} = this.state

    return (
      <div>
        {error &&
          <Notification style={{width: '80%', margin: '2em auto -2em'}} message={error} type='error' />
        }

        <LoadingContent msg={step} loading={loading}>
          <DropzoneMap file={file} vectors={vectors} onFileDrop={this.handleFileDrop} />
        </LoadingContent>
      </div>
    )
  }
}

export default Visualizer
