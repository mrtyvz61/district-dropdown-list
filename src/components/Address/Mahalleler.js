import React, { useContext } from 'react';
import Select from 'react-select';

import AddressContext from '../../context/address/addressContext';

const Mahalleler = () => {

  const addressContext = useContext(AddressContext);
  
  return (
    <React.Fragment>
      <Select
        name='adresSelect'
        options={addressContext.mahalleler}
        onChange={addressContext.handleMahalleChange}
        placeholder='Mahalle Seçiniz...'
      />
    </React.Fragment>
  );
};

export default Mahalleler;
