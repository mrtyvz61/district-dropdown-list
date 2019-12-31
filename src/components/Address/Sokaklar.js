import React, { useContext } from 'react';
import Select from 'react-select';
import AddressContext from '../../context/address/addressContext';

const Sokaklar = () => {
  
  const addressContext = useContext(AddressContext);

  return (
    <React.Fragment>
      <Select
        name='adresSelect'
        options={addressContext.sokaklar}
        onChange={addressContext.handleSokakChange}
        placeholder='Sokak Seçiniz...'
      />
    </React.Fragment>
  );
};

export default Sokaklar;
