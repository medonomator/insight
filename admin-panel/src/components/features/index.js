import React, { useState, useRef, useEffect, useCallback } from 'react'
import styles from './features.module.sass'

const Features = (props) => {
  const [clientX, setClientX] = useState(0)
  const [clientY, setClientY] = useState(0)
  const [pageX, setPageX] = useState(0)
  const [pageY, setPageY] = useState(0)

  useEffect(() => {
    document.addEventListener('mousemove', (e) => {
      setClientX(e.clientX)
      setClientY(e.clientY)
      setPageX(e.pageX)
      setPageY(e.pageY)
    })

    document.addEventListener('contextmenu', (e) => {})

    window.addEventListener('scroll', function () {})
  }, [])

  const measuredRef = useCallback((node) => {
    // console.log(node.getBoundingClientRect());
    if (node !== null) {
      // setHeight(node.getBoundingClientRect().height);
    }
  }, [])

  return (
    <div className={styles.features}>
      <h1 ref={measuredRef}>Features</h1>
      <div className={styles.mouseCoords}>
        <p>
          clientX: <strong>{clientX}</strong>
        </p>
        <p>
          clientY: <strong>{clientY}</strong>
        </p>
        <p>
          pageX: <strong>{pageX}</strong>
        </p>
        <p>
          pageY: <strong>{pageY}</strong>
        </p>
      </div>
    </div>
  )
}

export default Features
