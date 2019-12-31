import React, { useContext } from 'react'
import { Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

import ParcelContext from '../../context/parcel/parcelContext'

const Pafta = () => {
  const parcelContext = useContext(ParcelContext)

  return (
    <React.Fragment>
      <FormGroup className='row'>
        <Col componentClass={ControlLabel} sm={2}>
          Pafta
        </Col>
        <Col sm={10}>
          <FormControl
            type='text'
            onChange={parcelContext.handlePaftaChange}
            placeholder='Pafta Bilgisi...'
          />
        </Col>
      </FormGroup>
    </React.Fragment>
  )
}

export default Pafta
