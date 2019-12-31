import React, { useContext } from 'react';
import Select from 'react-select';
import AddressContext from '../../context/address/addressContext';

const Kapilar = () => {
  
const addressContext = useContext(AddressContext);

return (
    <React.Fragment>
      <Select
        name='adresSelect'
        options={addressContext.kapilar}
        onChange={addressContext.handleKapiChange}
        placeholder='Kapı Seçiniz...'
      />
    </React.Fragment>
  );
};

export default Kapilar;
