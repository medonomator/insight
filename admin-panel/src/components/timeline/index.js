import React, { useState, useEffect } from 'react'
import { Table, Button } from 'semantic-ui-react'
import styles from './timeline.module.sass'

const Timeline = () => {
  const [mode, setMode] = useState('week')
  const [modeData, setModeData] = useState({})
  const [currentDay] = useState(new Date().getDay() + 1)
  const [numberDaysInCurrentMonth, setNumberDaysInCurrentMonth] = useState(null)

  const changeMode = (e) => {
    setMode(e.target.getAttribute('data-mode'))
  }

  useEffect(() => {
    if (mode === 'week') {
      setModeData({
        topRow: 1,
        columns: 7,
      })
    }
    if (mode === 'month') {
      setModeData({
        topRow: 0,
        columns: 4,
      })
    }
    if (mode === 'threeDays') {
      let localNumberDaysInCurrentMonth = null
      if (!numberDaysInCurrentMonth) {
        const currentYear = new Date().getFullYear()
        const currentMonth = new Date().getMonth()
        const currentDate = new Date(currentYear, currentMonth, 0)
        const nextMonthDate = new Date(currentYear, currentMonth + 1, 0)

        localNumberDaysInCurrentMonth = Math.round(
          (nextMonthDate - currentDate) / 1000 / 3600 / 24
        )
        setNumberDaysInCurrentMonth(localNumberDaysInCurrentMonth)
      }

      setModeData({
        topRow: 3,
        columns: numberDaysInCurrentMonth || localNumberDaysInCurrentMonth,
      })
    }
  }, [mode])

  return (
    <div>
      <h1>Timeline</h1>

      <Button.Group floated="left">
        <Button data-mode={'threeDays'} onClick={changeMode}>
          3 Days
        </Button>
        <Button
          data-mode={'week'}
          active={mode === 'week'}
          onClick={changeMode}>
          Week
        </Button>
        <Button data-mode={'month'} onClick={changeMode}>
          Month
        </Button>
      </Button.Group>

      <Table className={styles.timeline} fixed celled>
        <Table.Header >
          <Table.Row>
            {new Array(modeData.columns).fill('th').map((item, index) => {
              return (
                <Table.HeaderCell  key={index}>
                  {currentDay + index + item}
                </Table.HeaderCell>
              )
            })}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>John</Table.Cell>
            <Table.Cell>Approved</Table.Cell>
            <Table.Cell>
              John is an interesting boy but sometimes you don't really have
              enough room to describe everything you'd like
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Jamie</Table.Cell>
            <Table.Cell>Approved</Table.Cell>
            <Table.Cell>
              Jamie is a kind girl but sometimes you don't really have enough
              room to describe everything you'd like
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Jill</Table.Cell>
            <Table.Cell>Denied</Table.Cell>
            <Table.Cell>
              Jill is an alright girl but sometimes you don't really have enough
              room to describe everything you'd like
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      {/* <div
        ref={inputEl}
        className={styles.block}
        onMouseMove={mousemove}
        onMouseDown={mousedown}
        onMouseUp={mouseUp}
        // draggable
      ></div> */}
    </div>
  )
}

export default Timeline
