import { types } from '../types';

const initialState = {
  loading: false,
  createdUser: localStorage.getItem('email') ? true : false,
  emailRegistered: localStorage.getItem('email')
    ? localStorage.getItem('email')
    : null,
  imgProfile: null,
  emergencyContacts: [],
  medicalContacts: [],
  seguro: [],
  treatment:[]
};
export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.createUser:
      return {
        ...state,
        loading: false,
        createdUser: action.payload.created,
        emailRegistered: action.payload.email,
      };
    case types.setUserCreated:
      return { ...state, createdUser: false };
    case types.verifyUser:
      return {
        ...state,
        loading: false,
        createdUser: false,
        emailRegistered: null,
      };
    case types.updateInfoBasic:
      return { ...state, loading: false };
    case types.saveAndContinue:
      return { ...state, loading: false };
    case types.setEmergencyContacts:
      return {
        ...state,
        loading: false,
        emergencyContacts: [...state.emergencyContacts, action.payload],
      };
    case types.getEmergencyContacts:
      return { ...state, loading: false, emergencyContacts: action.payload };
    case types.deleteEmergencyContacts:
      return {
        ...state,
        loading: false,
        emergencyContacts: state.emergencyContacts.filter(
          (value) => value.id !== action.payload
        ),
      };
    case types.updateEmergencyContacts:
      return {
        ...state,
        loading: false,
        emergencyContacts: state.emergencyContacts.map((value) =>
          value.id === action.payload.id ? action.payload : value
        ),
      };
    case types.setMedical:
      return {
        ...state,
        loading: false,
        medicalContacts: [...state.medicalContacts, action.payload],
      };
    case types.getMedical:
      return { ...state, loading: false, medicalContacts: action.payload };
    case types.deleteMedical:
      return {
        ...state,
        loading: false,
        medicalContacts: state.medicalContacts.filter(
          (value) => value.id !== action.payload
        ),
      };
    case types.updateMedical:
      return {
        ...state,
        loading: false,
        medicalContacts: state.medicalContacts.map((value) =>
          value.id === action.payload.id ? action.payload : value
        ),
      };
    case types.setSeguro:
      return {
        ...state,
        loading: false,
        seguro: [...state.seguro, action.payload],
      };
    case types.getSeguro:
      return { ...state, loading: false, seguro: action.payload };
    case types.deleteSeguro:
      return {
        ...state,
        loading: false,
        seguro: state.seguro.filter((value) => value.id !== action.payload),
      };
    case types.updateSeguro:
      return {
        ...state,
        loading: false,
        seguro: state.seguro.map((value) =>
          value.id === action.payload.id ? action.payload : value
        ),
      };
    case types.uploadImgUser:
      return { ...state, imgProfile: action.payload };

    case types.getTreatment:
      return { ...state, treatment:action.payload };
    case types.setTreatment:
      return { ...state, treatment:[ ...state.treatment,action.payload ] };
    case types.updateTreatment:
      return { ...state, treatment:state.treatment.map((value) => value.id === action.payload.id ? action.payload:value) };
    case types.deleteTreatment:
      return { ...state, treatment:state.treatment.filter((value) => value.id !== action.payload)};
    default:
      return state;
  }
};
