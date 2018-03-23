import {Fragment} from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import asset from 'next/asset'

const SITE_NAME = ''

const Meta = ({title, description}) => {
  return (
    <Fragment>
      <Head>
        <meta charSet='utf-8' />
        <meta httpEquiv='x-ua-compatible' content='ie=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />

        {title ? <title>{title} | {SITE_NAME}</title> : <title>{SITE_NAME}</title>}

        <link rel='icon' href={asset('/favicon.ico')} />

        {/* Search Engine */}
        <meta name='description' content={description} />
        <meta name='image' content='' />

        {/* Schema.org for Google */}
        <meta itemProp='name' content={title} />
        <meta itemProp='description' content={description} />
        <meta itemProp='image' content='' />

        {/* Twitter */}
        <meta name='twitter:image' content='' />

        <meta name='twitter:card' content='summary' />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content={description} />
        <meta name='twitter:site' content='' />
        <meta name='twitter:image:src' content='' />

        {/* Open Graph general (Facebook, Pinterest & Google+) */}
        <meta name='og:title' content={title} />
        <meta name='og:description' content={description} />
        <meta name='og:image' content='' />
        <meta name='og:url' content='' />
        <meta name='og:site_name' content='' />
        <meta name='og:locale' content='fr_FR' />
        <meta name='og:type' content='website' />
      </Head>
    </Fragment>
  )
}

Meta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
}

Meta.defaultProps = {
  title: '',
  description: ''
}

export default Meta
