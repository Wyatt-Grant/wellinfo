import React, { createContext, useState, useEffect } from 'react';

export const RigUWIContext = createContext();

export function RigUWIProvider({ children }) {
  const [formData, setFormData] = useState({
    rigUWI: '',
    wellOnPad: '',
    moveDateType: '',
    currentOperation: '',
    simOps: '',
    simOps2: '',
    starsSite: '',
    starsSite2: '',
  });

  const [formData2, setFormData2] = useState({
    Crew1AndServicesDate: '',
    Crew1AndServices: '',
    Crew2AndServicesDate: '',
    Crew2AndServices: '',
    Crew3AndServicesDate: '',
    Crew3AndServices: '',
    LastOBErecordableDate: '',
    LastOBErecordable: '',
  });

  // const [formData3, setFormData3] = useState({
  //   Vertical: '',
  //   Vertical2: '',
  //   Monobore: '',
  //   Monobore2: '',
  //   IntermediateSleevesPackers: '',
  //   IntermediateSleevesPackers2: '',
  //   IntermediateCementedLiner: '',
  //   IntermediateCementedLiner2: '',
  //   PROP: '',
  //   PROP2: '',
  // });
  
  // Load rigUWI from localStorage on first load
  useEffect(() => {
    const savedRigUWI = localStorage.getItem('rigUWI');
    if (savedRigUWI) {
      setFormData((prev) => ({ ...prev, rigUWI: savedRigUWI }));
    }
  }, []);

  // Save rigUWI to localStorage when it changes
  useEffect(() => {
    if (formData.rigUWI) {
      localStorage.setItem('rigUWI', formData.rigUWI);
    }
  }, [formData.rigUWI]);
  
  // Load the rest of form data when rigUWI changes
  useEffect(() => {
    if (formData.rigUWI) {
      const savedData = localStorage.getItem(`wellForm-${formData.rigUWI}`);
      const savedData2 = localStorage.getItem(`wellForm-${formData.rigUWI}2`);
      if (savedData) {
        setFormData(JSON.parse(savedData));
        setFormData2(JSON.parse(savedData2));
      } else {
        setFormData((prev) => ({
          ...prev,
          wellOnPad: '',
          moveDateType: '',
          currentOperation: '',
          simOps: '',
          simOps2: '',
          starsSite: '',
          starsSite2: '',
        }));
        setFormData2((prev) => ({
          ...prev,
          Crew1AndServicesDate: '',
          Crew1AndServices: '',
          Crew2AndServicesDate: '',
          Crew2AndServices: '',
          Crew3AndServicesDate: '',
          Crew3AndServices: '',
          LastOBErecordableDate: '',
          LastOBErecordable: '',
        }));
      }
    }
  }, [formData.rigUWI]);
  
  // Save all form data (including rigUWI) to rig-specific localStorage
  useEffect(() => {
    if (formData.rigUWI) {
      localStorage.setItem(`wellForm-${formData.rigUWI}`, JSON.stringify(formData));
      localStorage.setItem(`wellForm-${formData.rigUWI}2`, JSON.stringify(formData2));
    }
  }, [formData, formData2]);


  return (
    <RigUWIContext.Provider value={{ formData, setFormData, formData2, setFormData2 }}>
      {children}
    </RigUWIContext.Provider>
  );
}
