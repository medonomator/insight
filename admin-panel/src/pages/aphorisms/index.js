import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CustomTable from '../../components/common/CustomTable'
import { getAphorisms } from '../../redux/reducers/aphorisms'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Aphorisms = (props) => {
  const [material, setMaterial] = useState({})
  const [defaultTags, setDefaultTags] = useState([])
  const [isLoaded, setLoader] = useState(false)

  const custom = [
    {
      id: 1,
      name: 'name',
      desc: 'desc',
    },
    {
      id: 2,
      name: 'name',
      desc: 'desc',
    },
    {
      id: 3,
      name: 'name',
      desc: 'desc',
    },
  ]

  useEffect(() => {
    setLoader(true)
    props.getAphorisms()
  }, [])

  return (
    <div>
      <h1>Aphorisms</h1>
      <Button primary as={Link} to={`${props.match.path}/add`}>
        Add
      </Button>
      {/* 
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
      /> */}
    </div>
  )
}

const mapStateToProps = (state) => ({
  ...state.materials,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAphorisms,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Aphorisms)
