import React from 'react'
import PropTypes from 'prop-types'

import FaQuestionCircle from 'react-icons/lib/fa/question-circle'

class Options extends React.Component {
  constructor(props) {
    super(props)
    this.state = {show: false}

    this.handlePopup = this.handlePopup.bind(this)
  }

  handlePopup() {
    this.setState(state => {
      return {show: !state.show}
    })
  }

  render() {
    const {show} = this.state
    const {input, label, value, description} = this.props

    return (
      <div className='option'>
        <div className='content'>
          <label>{label}: <b>{value}</b></label>
          <div className='popup' onMouseEnter={this.handlePopup} onMouseLeave={this.handlePopup}>
            <FaQuestionCircle />
            <span className={`popuptext ${show ? 'show' : ''}`}>
              <b>{label}</b><br />
              {description}
            </span>
          </div>
        </div>
        {input}
        <style jsx>{`
          .option {
            background-color: #efefef;
            padding: 1em;
            border-radius: 4px;
            margin-top: 0.5em;
          }

          .content {
            display: flex;
            justify-content: space-between;
          }

          .content img:hover {
            cursor: pointer;
          }

          .popup {
            position: relative;
            display: inline-block;
            cursor: pointer;
          }

          .popup .popuptext {
            visibility: hidden;
            width: 200px;
            background-color: #555;
            color: #fff;
            text-align: center;
            border-radius: 4px;
            padding: 0.5em 1em;
            position: absolute;
            z-index: 1;
            top: -15px;
            margin-left: 3em;
          }

          .popup .show {
            visibility: visible;
            -webkit-animation: fadeIn 1s;
            animation: fadeIn 1s
          }

          @-webkit-keyframes fadeIn {
            from {opacity: 0;}
            to {opacity: 1;}
          }

          @keyframes fadeIn {
            from {opacity: 0;}
            to {opacity:1 ;}
          }
          `}</style>
      </div>
    )
  }
}

Options.propTypes = {
  input: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  description: PropTypes.string.isRequired
}

export default Options
