import React, { useEffect, useState } from 'react'
import { API } from '../../helpers/axios'
import { Table, Loader, Form, Button } from 'semantic-ui-react'
import styles from './materials.module.sass'
import Modal from 'react-modal'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

Modal.setAppElement('#root')

const Materials = () => {
  const [materials, setMaterials] = useState([])

  const [materialName, setMaterialName] = useState([])
  // const [materialName, setMaterialName] = useState([])

  const [material, setMaterial] = useState()
  const [isLoaded, setLoader] = useState(false)
  const [modalIsOpen, setIsOpen] = React.useState(false)

  const openModal = (material) => {
    setMaterial(material)
    setIsOpen(true)
  }

  const closeModal = () => setIsOpen(false)

  const changeMaterial = () => {
    alert('Change');
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await API('GET', 'v1/admin/materials')
      setLoader(true)
      setMaterials(result.data.data)
    }
    fetchData()
  }, [])

  return (
    <div>
      <h1>Materials</h1>

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Tags</Table.HeaderCell>
            <Table.HeaderCell>Audiobook</Table.HeaderCell>
            <Table.HeaderCell>Books</Table.HeaderCell>
            <Table.HeaderCell>WebSite</Table.HeaderCell>
            <Table.HeaderCell>Youtube</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        {!isLoaded && <Loader active inline />}

        <Table.Body>
          {materials.map((item) => {
            return (
              <Table.Row key={item.id}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>
                  {item.tags.length &&
                    item.tags.map((item) => item.name).join(', ')}
                </Table.Cell>
                  <Table.Cell>{item.audiobook}</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell className={styles.change}>
                  <i
                    onClick={() => openModal(item)}
                    aria-hidden="true"
                    class="pencil alternate big icon"></i>
                </Table.Cell>
                <Table.Cell className={styles.delete}>
                  <i aria-hidden="true" className="delete big icon"></i>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>

      <Modal
        closeTimeoutMS={100}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}>
        <div onClick={closeModal}>
          <i aria-hidden="true" className="delete big icon"></i>
        </div>
        {material && (
          <Form>
            <Form.Field>
              <label>Name</label>
              <input
                value={materialName}
                onChange={(event) => setMaterialName(event.target.value)}
                placeholder="Name"
              />
            </Form.Field>
             {/* here need multiSelect */}
            {/* <Form.Field>
              <label>Audiobook</label>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
              />
            </Form.Field> */}
            <Button onClick={changeMaterial} type="submit">
              Sign in
            </Button>
          </Form>
        )}
      </Modal>
    </div>
  )
}

export default Materials
