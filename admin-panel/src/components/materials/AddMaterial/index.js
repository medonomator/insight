import React, { useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button, Form } from 'semantic-ui-react'
import { addMaterial } from '../../../redux/actions/material'
import Select from 'react-select'

const AddMaterial = (props) => {
  const [material, setMaterial] = useState({})
  return (
    <div>
      <h1>Add Material</h1>

      <Form>
        <Form.Field>
          <label>Name</label>
          <input
            value={material.name}
            onChange={(event) =>
              setMaterial({ ...material, name: event.target.value })
            }
            placeholder="Name"
          />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <input
            value={material.description}
            onChange={(event) =>
              setMaterial({ ...material, description: event.target.value })
            }
            placeholder="Description"
          />
        </Form.Field>
        {/* <Select
          // defaultValue={selectedOption}
          // onChange={setSelectedOption}
          options={props.materialTags.map((item) => ({
            label: item,
            value: item,
          }))}
          isMulti
          defaultValue={props.defaultTags}
        /> */}
        <Form.Field>
          <label>Audiobook</label>
          <input
            value={material.audiobooks}
            onChange={(event) =>
              setMaterial({ ...material, audiobooks: event.target.value })
            }
            placeholder="Audiobook"
          />
        </Form.Field>
        <Form.Field>
          <label>Books</label>
          <input
            value={material.books}
            onChange={(event) =>
              setMaterial({ ...material, books: event.target.value })
            }
            placeholder="Books"
          />
        </Form.Field>
        <Form.Field>
          <label>WebsiteUrl</label>
          <input
            value={material.websiteUrl}
            onChange={(event) =>
              setMaterial({ ...material, websiteUrl: event.target.value })
            }
            placeholder="WebsiteUrl"
          />
        </Form.Field>
        <Form.Field>
          <label>YoutubeUrl</label>
          <input
            value={material.youtubeUrl}
            onChange={(event) =>
              setMaterial({ ...material, youtubeUrl: event.target.value })
            }
            placeholder="YoutubeUrl"
          />
        </Form.Field>
      </Form>

      <br />

      <Button
        primary
        onClick={() => props.addMaterial(material, props.history)}>
        Add
      </Button>
    </div>
  )
}

const mapStateToProps = (state) => ({
  ...state,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addMaterial,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(AddMaterial)
