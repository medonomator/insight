import { useEffect } from 'react'
import React, { useEfect } from 'react'

const CheckCursor = (props) => {
  useEffect(() => {
    const aside = document.getElementsByTagName('aside')[0]
    const PADDING = 15

    document.addEventListener('mouseover', function (e) {
      const { width } = aside.getBoundingClientRect()

      if (e.clientX + PADDING > width && e.clientX - PADDING < width) {
        aside.style.cursor = 'col-resize'
      } else {
        aside.style.cursor = 'default'
      }
    })

    aside.onmousedown = function (e) {
      const { width } = aside.getBoundingClientRect()

      const onMouseMove = (e) => {
        aside.style.width = e.clientX + 'px'
      }

      if (e.clientX + PADDING > width && e.clientX - PADDING < width) {
        document.addEventListener('mousemove', onMouseMove)

        aside.mouseup = function () {
          document.removeEventListener('mousemove', onMouseMove)
          aside.onmouseup = null
        }
      } else {
      }
    }
  }, [])
  return <></>
}

export default CheckCursor
