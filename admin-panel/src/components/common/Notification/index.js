import React, { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { closeNotification } from '../../../redux/actions/notification'
import styles from './notification.module.sass'

function Notification(props) {
  useEffect(() => {
    if (props.isOpen) {
      setTimeout(() => {
        props.closeNotification()
      }, 2000)
    }
  })

  const COLORS = {
    ERROR: '#9b0000',
    SUCCESS: '#269900',
  }

  const MESSAGES = {
    ERROR: 'Error',
    SUCCESS: 'Success',
  }

  return (
    <div
      style={{ backgroundColor: COLORS[props.data.type] }}
      hidden={!props.isOpen}
      className={props.isOpen ? styles.main : {}}>
      <p className={styles.headerText}>{MESSAGES[props.data.type]}</p>
      <p className={styles.mainText}>{props.data.message}</p>
      <p className={styles.line}></p>
    </div>
  )
}

const mapStateToProps = (state) => ({
  ...state.notification,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      closeNotification,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
