import React from 'react';
import './App.css';

import AddressState from './context/address/AddressState';
import AdresWidget from './pages/AddressWidget';

/*For the parcel widget its not working somehow need to fix it*/
// import ParcelState from './context/parcel/ParcelState'
// import ParcelWidget from './pages/ParcelWidget'

function App() {
	return (
		<React.Fragment>
			<div className='container mTop'>
				<div className='row mTop'>
					<div className='col-md-6 offset-md-3'>
						<AddressState>
							<AdresWidget />
						</AddressState>
					</div>
				</div>
				{/* <div className='row mTop'>
          <div class='col-md-6 offset-md-3'>
            <p>Parcel Widget comes here.</p>
            <ParcelState>
              <ParcelWidget />
            </ParcelState>
          </div>
        </div> */}
			</div>
		</React.Fragment>
	);
}

export default App;
