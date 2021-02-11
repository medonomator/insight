import React, { useState } from 'react'
import { months } from './dictionary'
import styles from './datepicker.module.sass'

const DatePicker = () => {
  const dateNow = new Date()
  const [currentDay, setCurrentDay] = useState(dateNow.getDate())
  const [currentMonth, setCurrentMonth] = useState(dateNow.getMonth() + 1)
  const [currentYear, setCurrentYear] = useState(dateNow.getFullYear())

  const dateObject = []

  dateObject.push({
    type: 'currentDate',
    day: currentDay,
  })

  for (let i = currentDay - 1; i > 0; i--) {
    dateObject.unshift({
      type: 'usuallyDate',
      day: i,
    })
  }

  for (let i = currentDay + 1; i < months[currentMonth].value + 1; i++) {
    dateObject.push({
      type: 'usuallyDate',
      day: i,
    })
  }

  const prevMonth = (event) => {
    if (currentMonth === 1) {
      setCurrentMonth(12)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const nextMonth = (event) => {
    if (currentMonth === 12) {
      setCurrentMonth(1)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  return (
    <div class={styles.wrapper}>
      <div>Год: {currentYear}</div>
      <div>{months[currentMonth].type}</div>
      <ul className={styles.calendar}>
        <div className={styles.arrows}>
          <i
            onClick={prevMonth}
            className="fa fa-arrow-left"
            aria-hidden="true"></i>
          <i
            onClick={nextMonth}
            className="fa fa-arrow-right"
            aria-hidden="true"></i>
        </div>
        {dateObject.map((item) => {
          return (
            <li
              className={
                item.day === currentDay &&
                currentMonth === dateNow.getMonth() + 1 &&
                currentYear === dateNow.getFullYear() &&
                styles.currentDay
              }
              key={item.day}>
              {item.day}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default DatePicker
