import React, { useContext } from 'react';

import AddressContext from '../context/address/addressContext';

import Ilceler from '../components/Address/Ilceler';
import Mahalleler from '../components/Address/Mahalleler';
import Sokaklar from '../components/Address/Sokaklar';
import Kapilar from '../components/Address/Kapilar';

const AddressWidget = () => {
  const addressContext = useContext(AddressContext);
  
  const { ilceSelected, mahalleSelected, sokaklarSelected } = addressContext;

  return (
    <React.Fragment>
      <Ilceler />
      {ilceSelected ? <Mahalleler /> : null}
      {mahalleSelected ? <Sokaklar /> : null}
      {sokaklarSelected ? <Kapilar /> : null}
    </React.Fragment>
  );
};

export default AddressWidget;
