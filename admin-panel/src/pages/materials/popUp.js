import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import Modal from 'react-modal'
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

const PopUp = (props) => {
  const [selectedOption, setSelectedOption] = useState(null)

  const closeModal = () => props.setIsOpen(false)

  return (
    <Modal
      closeTimeoutMS={100}
      isOpen={props.modalIsOpen}
      onRequestClose={props.closeModal}
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
              value={props.material.name}
              onChange={(event) => props.setMaterial(event.target.value)}
              placeholder="Name"
            />
          </Form.Field>
          <Select
            // defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={props.materialTags.map((item) => ({
              label: item,
              value: item,
            }))}
            isMulti
            defaultValue={props.defaultTags}
          />
          <Form.Field>
            <label>Audiobook</label>
            <input
              className={styles.materialInput}
              value={props.material.audiobooks}
              onChange={(event) => props.setMaterial(event.target.value)}
              placeholder="Audiobook"
            />
          </Form.Field>
          <Form.Field>
            <label>Books</label>
            <input
              className={styles.materialInput}
              value={props.material.books}
              onChange={(event) => props.setMaterial(event.target.value)}
              placeholder="Books"
            />
          </Form.Field>
          <Form.Field>
            <label>WebsiteUrl</label>
            <input
              className={styles.materialInput}
              value={props.material.website_url}
              onChange={(event) => props.setMaterial(event.target.value)}
              placeholder="WebsiteUrl"
            />
          </Form.Field>
          <Form.Field>
            <label>YoutubeUrl</label>
            <input
              className={styles.materialInput}
              value={props.material.youtube_url}
              onChange={(event) => props.setMaterial(event.target.value)}
              placeholder="YoutubeUrl"
            />
          </Form.Field>
          <Button
            style={{ marginTop: '10px' }}
            onClick={props.changeMaterial}
            type="submit">
            Update
          </Button>
        </Form>
      }
    </Modal>
  )
}

export default PopUp
