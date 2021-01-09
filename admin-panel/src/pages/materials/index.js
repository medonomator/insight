import React, { useEffect, useState } from 'react'
import { Link, Route } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CustomTable from '../../components/common/CustomTable'
import PopUp from './popUp'
import { getMaterialTags, getMaterials } from '../../fetch'
import { changeMaterial, deleteMaterial } from '../../redux/actions/material'
import { Button } from 'semantic-ui-react'

const Materials = (props) => {
  const [material, setMaterial] = useState({})
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

  const changeMaterial = (material) => props.changeMaterial(material)
  const deleteMaterial = (id) => props.deleteMaterial(id)

  useEffect(() => {
    setLoader(true)
    props.getMaterials()
    props.getMaterialTags()
  }, [])

  return (
    <div>
      <h1>Materials</h1>

      <Button primary as={Link} to={`${props.match.path}/add`}>
        Add
      </Button>

      <CustomTable
        isLoaded={isLoaded}
        items={props.materials}
        headerCells={[
          'Name',
          'Tags',
          'Audiobook',
          'Books',
          'WebSite',
          'Youtube',
          '',
          '',
        ]}
        orderFields={[
          'name',
          'tags',
          'audiobooks',
          'books',
          'websiteUrl',
          'youtubeUrl',
        ]}
        openModal={openModal}
        deleteMaterial={deleteMaterial}
      />

      <PopUp
        defaultTags={defaultTags}
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        material={material}
        setMaterial={setMaterial}
        changeMaterial={changeMaterial}
        materialTags={props.materialTags}
      />
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
      getMaterials,
      changeMaterial,
      deleteMaterial,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Materials)
