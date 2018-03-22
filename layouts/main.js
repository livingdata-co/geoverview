import React from 'react'
import PropTypes from 'prop-types'

import Meta from '../components/meta'
import Header from '../components/header'
import MainStyle from '../components/main-style'
import Footer from '../components/footer'

class Layout extends React.Component {
  render() {
    const {title, description, children} = this.props

    return (
      <div className='container'>
        <Meta title={title} description={description} />
        <MainStyle />
        <Header />
        <main>
          {children}
        </main>
        <Footer />
        <script src='https://cdn.polyfill.io/v2/polyfill.min.js?features=Array.prototype.includes,modernizr:es6string,Promise,fetch' />
        <style jsx>{`
            .container {
              display: flex;
              flex-direction: column;
              min-height: 100vh;
              background-color: #fff;
            }

            main {
              flex: 1;
            }
            `}</style>
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string
}

Layout.defaultProps = {
  children: null,
  title: null,
  description: null
}

export default Layout
