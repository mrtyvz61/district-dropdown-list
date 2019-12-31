import React, { useReducer, useEffect, useState } from 'react';
import axios from 'axios';
import AddressContext from './addressContext';
import AddressReducer from './addressReducer';
import { GET_ILCE, GET_MAHALLE, GET_SOKAK, GET_KAPI } from '../../types';

const AddressState = (props) => {
	const initialState = {
		ilceler: [],
		mahalleler: [],
		sokaklar: [],
		kapilar: [],
		ilceSelected: false,
		ilceSelectedID: null,
		mahalleSelected: false,
		mahalleSelectedID: null,
		sokaklarSelected: false,
		sokaklarSelectedID: null,
		kapilarSelected: false,
		kapilarSelectedID: null
	};

	const [ state, dispatch ] = useReducer(AddressReducer, initialState);

	let [ fetchedData, setFetchedData ] = useState(false);

	const getAdres = async (url) => {
		let response = await fetch(url);
		let data = await response.json();
		let list = [];
		data.AdresList.Adresler.Adres.forEach((item) => {
			console.info(item);
			list.push({
				label: item.ADI,
				value: item.ID
			});
		});
		return list;
	};

	useEffect(() => {
		const ilceUrl = 'http://cbsproxy.ibb.gov.tr/?SehirHaritasiIlceListele151&';
		!fetchedData &&
			axios.get(ilceUrl).then((response) => response.data).then((ilceList) => {
				setFetchedData(true);
				let ilceler = [];
				ilceList.AdresList.Adresler.Adres.forEach((ilce) => {
					ilceler.push({
						label: ilce.ADI,
						value: ilce.ID
					});
				});
				dispatch({
					type: GET_ILCE,
					payload: ilceler
				});
			});
	});

	const handleIlceChange = async (e) => {
		let mahalleler = await getAdres(`http://cbsproxy.ibb.gov.tr/?SehirHaritasiMahalleListele151&&ID=${e.value}`);

		dispatch({
			type: GET_MAHALLE,
			payload: mahalleler,
			ilceSelected: true,
			ilceSelectedID: e.value,
			mahalleSelected: false,
			sokaklarSelected: false,
			kapilarSelected: false
		});
	};

	const handleMahalleChange = async (e) => {
		let sokaklar = await getAdres(
			`http://cbsproxy.ibb.gov.tr/?SehirHaritasiYolListele151&&ilceID=${state.ilceSelectedID}&mahalleID=${e.value}&yolAdi=`
		);

		dispatch({
			type: GET_SOKAK,
			payload: sokaklar,
			ilceSelected: true,
			mahalleSelected: true,
			mahalleSelectedID: e.value,
			sokaklarSelected: false,
			kapilarSelected: false
		});
	};

	const handleSokakChange = async (e) => {
		let kapilar = await getAdres(
			`https://cbsproxy.ibb.gov.tr/?SehirHaritasiKapiListele151&&ilceID=${state.ilceSelectedID}&mahalleID=${state.mahalleSelectedID}&yolAdi=&kapiNo=&yolid=${e.value}`
		);

		dispatch({
			type: GET_KAPI,
			payload: kapilar,
			ilceSelected: true,
			mahalleSelected: true,
			sokaklarSelected: true,
			sokaklarSelectedID: e.value,
			kapilarSelected: false
		});
	};

	const handleKapiChange = (e) => {
		console.log('handleKapiChange', e.value);
	};

	return (
		<AddressContext.Provider
			value={{
				ilceSelected: state.ilceSelected,
				ilceSelectedID: state.ilceSelectedID,
				ilceler: state.ilceler,
				mahalleSelected: state.mahalleSelected,
				mahalleSelectedID: state.mahalleSelectedID,
				mahalleler: state.mahalleler,
				sokaklarSelected: state.sokaklarSelected,
				sokaklarSelectedID: state.sokaklarSelectedID,
				sokaklar: state.sokaklar,
				kapilarSelected: state.kapilarSelected,
				kapilarSelectedID: state.kapilarSelectedID,
				kapilar: state.kapilar,
				handleIlceChange,
				handleMahalleChange,
				handleSokakChange,
				handleKapiChange
			}}
		>
			{props.children}
		</AddressContext.Provider>
	);
};

export default AddressState;
