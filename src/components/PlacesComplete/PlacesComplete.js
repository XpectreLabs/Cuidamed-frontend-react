import React, { useEffect } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

import { CustomInput } from '../inputsCustom/CustomInput';

const PlacesComplete = React.memo(
  ({ labelPlaceholder, setValue, valuePlace }) => {
    const [address, setAddress] = React.useState(valuePlace);
    /*const [coordinates, setCoordinates] = React.useState({
      lat: null,
      lng: null,
    });*/
    useEffect(() => {
      setAddress(valuePlace);
    }, [valuePlace]);
    const handleSelect = async (value) => {
      //const results = await geocodeByAddress(value);
      //const latLng = await getLatLng(results[0]);

      setAddress(value);
     // setCoordinates(latLng);
      setValue(value);
    };

    return (
      <div>
        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}>
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              {/* <p>Latitude: {coordinates.lat}</p>
                            <p>Longitude: {coordinates.lng}</p> */}
              <CustomInput
                placeholder={labelPlaceholder}
                functionPlaces={{ ...getInputProps({}) }}
                value={valuePlace}
              />
              <div className="places-complete">
                {loading ? <div>...loading</div> : null}

                {suggestions.map((suggestion) => {
                  const style = suggestion.active
                    ? {
                        backgroundColor: '#2c2e81',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }
                    : {
                        backgroundColor: '#ffffff',
                        cursor: 'pointer',
                        textAlign: 'left',
                      };
                  return (
                    <div
                      key={suggestion.placeId}
                      {...getSuggestionItemProps(suggestion, { style })}>
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>

              {/* <div className="container-place-autocomplete">
                                <div className="labelText" id={labelName} >
                                    <label htmlFor={inputName} className="ui label" >
                                        {labelPlaceholder}
                                    </label>
                                </div>
                                <div className="ui input">
                                    <input
                                        id={inputName}
                                        type="text"
                                        list={'options' + inputName}
                                        {...getInputProps({})}
                                        onKeyUp={handlePlaceAutocomplete} />
                                </div>
                                <datalist className="places-complete" id={'options' + inputName} >

                                    {loading ? <div>...loading</div> : null}

                                    {suggestions.map(suggestion => {
                                        const style = suggestion.active
                                            ? { backgroundColor: '#2c2e81', cursor: 'pointer' }
                                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                        return <option key={suggestion.placeId}
                                            {...getSuggestionItemProps(suggestion, { style })}>{suggestion.description}</option>
                                    })}
                                </datalist>
                            </div> */}
            </div>
          )}
        </PlacesAutocomplete>
      </div>
    );
  }
);
export default PlacesComplete;
