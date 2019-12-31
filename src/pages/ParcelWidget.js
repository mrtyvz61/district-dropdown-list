import React, { useContext } from 'react'

import { Col, FormGroup, ControlLabel, Form, Button } from 'react-bootstrap'

import ParcelContext from '../context/parcel/parcelContext'

import Ilceler from '../components/Address/Ilceler'
import Mahalleler from '../components/Address/Mahalleler'
import Pafta from '../components/Parcel/Pafta'
import Ada from '../components/Parcel/Ada'
import Parsel from '../components/Parcel/Parsel'

const ParcelWidget = () => {
  const parcelContext = useContext(ParcelContext)

  const {
    ilceSelected,
    formSubmitHandler,
    renderParselResult,
    parselResult
  } = parcelContext

  if (parselResult != null) {
    return (
      <React.Fragment>
        <Form className='container' onSubmit={formSubmitHandler}>
          <Ilceler />
          {ilceSelected ? <Mahalleler /> : null}
          <Pafta />
          <Ada />
          <Parsel />
          <FormGroup className='row'>
            <Col componentClass={ControlLabel} sm={2} />
            <Col sm={10}>
              <Button type='submit' bsStyle='primary'>
                Sorgula
              </Button>
            </Col>
          </FormGroup>
        </Form>
        <table striped bordered condensed hover>
          <thead>
            <tr>
              <th />
              <th>İLÇE UAVT</th>
              <th>MAHALLE</th>
              <th>MAHALLE UAVT</th>
              <th>ADA</th>
              <th>PAFTA</th>
              <th>PARSEL</th>
            </tr>
          </thead>
          <tbody>{renderParselResult}</tbody>
        </table>
        ;
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <Form onSubmit={formSubmitHandler}>
          <Ilceler />
          <Mahalleler />
          <Pafta />
          <Ada />
          <Parsel />
          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type='submit' bsStyle='primary'>
                Sorgula
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </React.Fragment>
    )
  }
}

export default ParcelWidget
