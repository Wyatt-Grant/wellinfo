import React, { createContext, useState, useEffect } from 'react';

export const RigUWIContext = createContext();

// General Well Info
const DEFAULT_FORM_DATA = {
  rigUWI: '',
  wellOnPad: '',
  moveDateType: '',
  currentOperation: '',
  simOps: '',
  simOps2: '',
  starsSite: '',
  starsSite2: '',
  dpCumulativeMeters: '',
};

// Basic Well design
const DEFAULT_FORM_DATA3 = {
  Vertical: '',
  Vertical2: '',
  Monobore: '',
  Monobore2: '',
  IntermediateSleevesPackers: '',
  IntermediateSleevesPackers2: '',
  IntermediateCementedLiner: '',
  IntermediateCementedLiner2: '',
  PROP: '',
  PROP2: '',
};

// Last 12 Hours: `xxx2` holds the number (middle column), `xxx` the description (right column)
const DEFAULT_FORM_DATA4 = {
  safetyIncidents: '',
  bhaMudProblems: '',
  reservoirPlacementProblems: '',
  surfaceProblems: '',
  performanceLimiters: '',

  metersDrilled2: '',
  offBottomTorque2: '',
  weakestBHAConnection2: '',
  topDriveSetPoint2: '',
  actualPeakTorque2: '',
  rcdElement2: '',
  mudType2: '',
  mudWeight2: '',
  mudLosses2: '',
  redTaskProcedures2: '',
  lir2: '',
  monthlySafetyPackage2: '',
  abcPicture2: '',
  bhaBitFeelerGaugePicture2: '',
  safetyIncidents2: '',
  bhaMudProblems2: '',
  reservoirPlacementProblems2: '',
  surfaceProblems2: '',
  performanceLimiters2: '',
};

// Cumulative (this well): `xxx` holds the number (middle column), `xxx2` the description (right column)
const DEFAULT_FORM_DATA5 = {
  mudLosses: '',
  mudLossesPer100m: '',
  miscLostTime: '',
  waitOnCementers: '',
  directionalMWDFailure: '',
  directionalRotorStatorFailure: '',
  directionalDriveShaftFailure: '',
  lostTimes: [''],

  miscLostTime2: '',
  waitOnCementers2: '',
  directionalMWDFailure2: '',
  directionalRotorStatorFailure2: '',
  directionalDriveShaftFailure2: '',
  lostTimes2: [''],
};

// Well Class, Mud Weight, Pressure Testing
const DEFAULT_FORM_DATA7 = {
  wellClassPressure: '',
  highestMudWeight: '',
  requiredPressureTest: '',
  bhp67: '',
  cementUTube: '',
  intCasingBurst80: '',
};

// Merge a saved blob over the defaults so fields added after the blob was
// written come back as '' instead of undefined.
const loadSaved = (key, defaults) => {
  const saved = localStorage.getItem(key);
  if (!saved) {
    return { ...defaults };
  }
  try {
    return { ...defaults, ...JSON.parse(saved) };
  } catch (e) {
    return { ...defaults };
  }
};

export function RigUWIProvider({ children }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [formData3, setFormData3] = useState(DEFAULT_FORM_DATA3);
  const [formData4, setFormData4] = useState(DEFAULT_FORM_DATA4);
  const [formData5, setFormData5] = useState(DEFAULT_FORM_DATA5);
  const [formData7, setFormData7] = useState(DEFAULT_FORM_DATA7);

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
      const rig = formData.rigUWI;

      const loaded = loadSaved(`wellForm-${rig}-savedata`, DEFAULT_FORM_DATA);
      setFormData({ ...loaded, rigUWI: rig });
      setFormData3(loadSaved(`wellForm-${rig}-savedata3`, DEFAULT_FORM_DATA3));
      setFormData4(loadSaved(`wellForm-${rig}-savedata4`, DEFAULT_FORM_DATA4));

      const loaded5 = loadSaved(`wellForm-${rig}-savedata5`, DEFAULT_FORM_DATA5);
      if (!Array.isArray(loaded5.lostTimes)) loaded5.lostTimes = [];
      if (!Array.isArray(loaded5.lostTimes2)) loaded5.lostTimes2 = [];
      setFormData5(loaded5);

      setFormData7(loadSaved(`wellForm-${rig}-savedata7`, DEFAULT_FORM_DATA7));
    }
  }, [formData.rigUWI]);

  // Save all form data (including rigUWI) to rig-specific localStorage
  useEffect(() => {
    if (formData.rigUWI) {
      localStorage.setItem(`wellForm-${formData.rigUWI}-savedata`, JSON.stringify(formData));
    }
  }, [formData]);
  useEffect(() => {
    if (formData.rigUWI) {
      localStorage.setItem(`wellForm-${formData.rigUWI}-savedata3`, JSON.stringify(formData3));
    }
  }, [formData3]);
  useEffect(() => {
    if (formData.rigUWI) {
      localStorage.setItem(`wellForm-${formData.rigUWI}-savedata4`, JSON.stringify(formData4));
    }
  }, [formData4]);
  useEffect(() => {
    if (formData.rigUWI) {
      localStorage.setItem(`wellForm-${formData.rigUWI}-savedata5`, JSON.stringify(formData5));
    }
  }, [formData5]);
  useEffect(() => {
    if (formData.rigUWI) {
      localStorage.setItem(`wellForm-${formData.rigUWI}-savedata7`, JSON.stringify(formData7));
    }
  }, [formData7]);

  return (
    <RigUWIContext.Provider value={{
      formData, setFormData,
      formData3, setFormData3,
      formData4, setFormData4,
      formData5, setFormData5,
      formData7, setFormData7,
      }}>
      {children}
    </RigUWIContext.Provider>
  );
}
