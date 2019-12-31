import React, { useContext } from 'react'
import { Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

import ParcelContext from '../../context/parcel/parcelContext'

const Parsel = (props) => {
  const parcelContext = useContext(ParcelContext)

  return (
    <React.Fragment>
      <FormGroup className='row'>
        <Col componentClass={ControlLabel} sm={2}>
          Parsel
        </Col>
        <Col sm={10}>
          <FormControl
            type='text'
            value={props.value}
            onChange={parcelContext.handleParselChange}
            placeholder='Parsel Bilgisi...'
          />
        </Col>
      </FormGroup>
    </React.Fragment>
  )
}

export default Parsel
