import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Table, Loader, Form, Button } from 'semantic-ui-react'

import { getMaterialTags } from '../../fetch'
import { Helpers } from '../../helpers'

import { API } from '../../helpers/axios'
import Select from 'react-select'
import styles from './materials.module.sass'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'visible',
  },
}

Modal.setAppElement('#root')

const Materials = (props) => {
  const [materials, setMaterials] = useState([])

  const [material, setMaterial] = useState({})

  const [selectedOption, setSelectedOption] = useState(null)
  const [defaultTags, setDefaultTags] = useState([])

  const [isLoaded, setLoader] = useState(false)
  const [modalIsOpen, setIsOpen] = React.useState(false)

  const openModal = (material) => {
    setMaterial(material)
    setDefaultTags(
      material.tags.map((item) => ({ label: item.name, value: item.name }))
    )
    setIsOpen(true)
  }

  const closeModal = () => setIsOpen(false)

  const changeMaterial = () => {
    alert('Change')
  }

  useEffect(() => {
    props.getMaterialTags()
    const fetchData = async () => {
      const result = await API('GET', 'v1/admin/materials')
      setLoader(true)
      setMaterials(result.data.data)
    }
    fetchData()
  }, [])

  const STANDART_HEIGHT = 20

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

        {!isLoaded && (
          <Table.Header>
            <Table.Row>
              <Table.Cell>
                <Loader active inline />
              </Table.Cell>
            </Table.Row>
          </Table.Header>
        )}

        <Table.Body>
          {materials.map((item) => {
            return (
              <Table.Row key={item.id}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>
                  {item.tags.length &&
                    item.tags.map((item) => item.name).join(', ')}
                </Table.Cell>
                <Table.Cell>{item.audiobooks}</Table.Cell>
                <Table.Cell title={item.books}>
                  {Helpers.trimText(item.books, STANDART_HEIGHT)}
                </Table.Cell>
                <Table.Cell title={item.website_url}>
                  {Helpers.trimText(item.website_url, STANDART_HEIGHT)}
                </Table.Cell>
                <Table.Cell title={item.youtube_url}>
                  {Helpers.trimText(item.youtube_url, STANDART_HEIGHT)}
                </Table.Cell>
                <Table.Cell className={styles.change}>
                  <i
                    onClick={() => openModal(item)}
                    aria-hidden="true"
                    className="pencil alternate big icon"></i>
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
        <div className={styles.deleteIcon} onClick={closeModal}>
          <i aria-hidden="true" className="delete big icon" />
        </div>
        {
          <Form>
            <Form.Field>
              <label>Name</label>
              <input
                className={styles.materialInput}
                value={material.name}
                onChange={(event) => setMaterial(event.target.value)}
                placeholder="Name"
              />
            </Form.Field>
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={props.materialTags.map((item) => ({
                label: item,
                value: item,
              }))}
              isMulti
              defaultValue={defaultTags}
            />
            <Form.Field>
              <label>Audiobook</label>
              <input
                className={styles.materialInput}
                value={material.audiobooks}
                onChange={(event) => setMaterial(event.target.value)}
                placeholder="Audiobook"
              />
            </Form.Field>
            <Form.Field>
              <label>Books</label>
              <input
                className={styles.materialInput}
                value={material.books}
                onChange={(event) => setMaterial(event.target.value)}
                placeholder="Books"
              />
            </Form.Field>
            <Form.Field>
              <label>WebsiteUrl</label>
              <input
                className={styles.materialInput}
                value={material.website_url}
                onChange={(event) => setMaterial(event.target.value)}
                placeholder="WebsiteUrl"
              />
            </Form.Field>
            <Form.Field>
              <label>YoutubeUrl</label>
              <input
                className={styles.materialInput}
                value={material.youtube_url}
                onChange={(event) => setMaterial(event.target.value)}
                placeholder="YoutubeUrl"
              />
            </Form.Field>
            <Button
              style={{ marginTop: '10px' }}
              onClick={changeMaterial}
              type="submit">
              Update
            </Button>
          </Form>
        }
      </Modal>
    </div>
  )
}

const mapStateToProps = (state) => ({
  ...state.materials,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMaterialTags,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Materials)
