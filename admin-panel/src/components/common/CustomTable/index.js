import React from 'react'
import { Table, Loader } from 'semantic-ui-react'
import { Helpers } from '../../../helpers'
import styles from './customTable.module.sass'

const CustomTable = (props) => {
  const STANDART_HEIGHT = 20

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          {props.headerCells.map((item, index) => {
            return <Table.HeaderCell key={index}>{item}</Table.HeaderCell>
          })}
        </Table.Row>
      </Table.Header>

      {!props.isLoaded && (
        <Table.Header>
          <Table.Row>
            <Table.Cell>
              <Loader active inline />
            </Table.Cell>
          </Table.Row>
        </Table.Header>
      )}

      <Table.Body>
        {props.items.map((item) => {
          return (
            <Table.Row key={item.id}>
              <Table.Cell>{item[props.orderFields[0]]}</Table.Cell>
              <Table.Cell>
                {item[props.orderFields[1]] &&
                  item[props.orderFields[1]].length &&
                  item[props.orderFields[1]]
                    .map((item) => item.name)
                    .join(', ')}
              </Table.Cell>
              <Table.Cell>{item[props.orderFields[2]]}</Table.Cell>
              <Table.Cell title={item[props.orderFields[3]]}>
                {Helpers.trimText(item[props.orderFields[3]], STANDART_HEIGHT)}
              </Table.Cell>
              <Table.Cell title={item[props.orderFields[4]]}>
                {Helpers.trimText(item[props.orderFields[4]], STANDART_HEIGHT)}
              </Table.Cell>
              <Table.Cell title={item[props.orderFields[5]]}>
                {Helpers.trimText(item[props.orderFields[5]], STANDART_HEIGHT)}
              </Table.Cell>
              <Table.Cell className={styles.change}>
                <i
                  onClick={() => props.openModal(item)}
                  aria-hidden="true"
                  className="pencil alternate big icon"></i>
              </Table.Cell>
              <Table.Cell
                onClick={() => props.deleteMaterial(item.id)}
                className={styles.delete}>
                <i aria-hidden="true" className="delete big icon"></i>
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}

export default CustomTable
