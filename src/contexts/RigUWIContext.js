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

  const [formData3, setFormData3] = useState({
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
  });

  const [formData4, setFormData4] = useState({
    metersDrilled: '',
    formationDrilled: '',
    offBottomTorque: '',
    weakestBHAConnection: '',
    topDriveSetPoint: '',
    actualPeakTorque: '',
    operationalTorqueBuffer: '',
    avgSlideROP: '',
    avgRotaryROP: '',
    mudType: '',
    mudWeight: '',
    mudLosses: '',
    redTaskProcedures: '',
    safetyIncidents: '',
    bhaMudProblems: '',
    reservoirPlacementProblems: '',
    surfaceProblems: '',
    performanceLimiters: '',

    metersDrilled2: '',
    formationDrilled2: '',
    offBottomTorque2: '',
    weakestBHAConnection2: '',
    topDriveSetPoint2: '',
    actualPeakTorque2: '',
    operationalTorqueBuffer2: '',
    avgSlideROP2: '',
    avgRotaryROP2: '',
    mudType2: '',
    mudWeight2: '',
    mudLosses2: '',
    redTaskProcedures2: '',
    safetyIncidents2: '',
    bhaMudProblems2: '',
    reservoirPlacementProblems2: '',
    surfaceProblems2: '',
    performanceLimiters2: '',
  });

  const [formData5, setFormData5] = useState({
    mudLosses: '',
    mudLossesPer100m: '',
    waterHauled: '',
    cumulativeLostTime: '',
    lostTime1: '',
    lostTime2: '',
    lostTime3: '',
    lostTime4: '',
    lostTime5: '',
    lostTime6: '',
    lostTime7: '',
    lostTime8: '',
    lostTime9: '',
    waitOnCementers: '',
    directionalMWDFailure: '',
    directionalRotorStatorFailure: '',
    directionalDriveShaftFailure: '',

    mudLosses2: '',
    mudLossesPer100m2: '',
    waterHauled2: '',
    cumulativeLostTime2: '',
    lostTime12: '',
    lostTime22: '',
    lostTime32: '',
    lostTime42: '',
    lostTime52: '',
    lostTime62: '',
    lostTime72: '',
    lostTime82: '',
    lostTime92: '',
    waitOnCementers2: '',
    directionalMWDFailure2: '',
    directionalRotorStatorFailure2: '',
    directionalDriveShaftFailure2: '',
  });

  const [formData6, setFormData6] = useState({
    dpCumulativeMeters: '',
    waitOnCementersHrs: '',
    directionalMWDFailureHrs: '',
    directionalRotorStatorFailureHrs: '',
    directionalDriveShaftFailureHrs: '',

    dpCumulativeMeters2: '',
    waitOnCementersHrs2: '',
    directionalMWDFailureHrs2: '',
    directionalRotorStatorFailureHrs2: '',
    directionalDriveShaftFailureHrs2: '',
  });
  
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
      const savedData3 = localStorage.getItem(`wellForm-${formData.rigUWI}3`);
      const savedData4 = localStorage.getItem(`wellForm-${formData.rigUWI}4`);
      const savedData5 = localStorage.getItem(`wellForm-${formData.rigUWI}5`);
      const savedData6 = localStorage.getItem(`wellForm-${formData.rigUWI}6`);
      if (savedData) {
        setFormData(JSON.parse(savedData));
        setFormData2(JSON.parse(savedData2));
        setFormData3(JSON.parse(savedData3));
        setFormData4(JSON.parse(savedData4));
        setFormData5(JSON.parse(savedData5));
        setFormData6(JSON.parse(savedData6));
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
        setFormData3((prev) => ({
          ...prev,
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
        }));
        setFormData4((prev) => ({
          ...prev,
          metersDrilled: '',
          formationDrilled: '',
          offBottomTorque: '',
          weakestBHAConnection: '',
          topDriveSetPoint: '',
          actualPeakTorque: '',
          operationalTorqueBuffer: '',
          avgSlideROP: '',
          avgRotaryROP: '',
          mudType: '',
          mudWeight: '',
          mudLosses: '',
          redTaskProcedures: '',
          safetyIncidents: '',
          bhaMudProblems: '',
          reservoirPlacementProblems: '',
          surfaceProblems: '',
          performanceLimiters: '',

          metersDrilled2: '',
          formationDrilled2: '',
          offBottomTorque2: '',
          weakestBHAConnection2: '',
          topDriveSetPoint2: '',
          actualPeakTorque2: '',
          operationalTorqueBuffer2: '',
          avgSlideROP2: '',
          avgRotaryROP2: '',
          mudType2: '',
          mudWeight2: '',
          mudLosses2: '',
          redTaskProcedures2: '',
          safetyIncidents2: '',
          bhaMudProblems2: '',
          reservoirPlacementProblems2: '',
          surfaceProblems2: '',
          performanceLimiters2: '',
        }));
        setFormData5((prev) => ({
          ...prev,
          mudLosses: '',
          mudLossesPer100m: '',
          waterHauled: '',
          cumulativeLostTime: '',
          lostTime1: '',
          lostTime2: '',
          lostTime3: '',
          lostTime4: '',
          lostTime5: '',
          lostTime6: '',
          lostTime7: '',
          lostTime8: '',
          lostTime9: '',
          waitOnCementers: '',
          directionalMWDFailure: '',
          directionalRotorStatorFailure: '',
          directionalDriveShaftFailure: '',

          mudLosses2: '',
          mudLossesPer100m2: '',
          waterHauled2: '',
          cumulativeLostTime2: '',
          lostTime12: '',
          lostTime22: '',
          lostTime32: '',
          lostTime42: '',
          lostTime52: '',
          lostTime62: '',
          lostTime72: '',
          lostTime82: '',
          lostTime92: '',
          waitOnCementers2: '',
          directionalMWDFailure2: '',
          directionalRotorStatorFailure2: '',
          directionalDriveShaftFailure2: '',
        }));
        setFormData6((prev) => ({
          ...prev,
          dpCumulativeMeters: '',
          waitOnCementersHrs: '',
          directionalMWDFailureHrs: '',
          directionalRotorStatorFailureHrs: '',
          directionalDriveShaftFailureHrs: '',

          dpCumulativeMeters2: '',
          waitOnCementersHrs2: '',
          directionalMWDFailureHrs2: '',
          directionalRotorStatorFailureHrs2: '',
          directionalDriveShaftFailureHrs2: '',
        }));
      }
    }
  }, [formData.rigUWI]);
  
  // Save all form data (including rigUWI) to rig-specific localStorage
  useEffect(() => {
    if (formData.rigUWI) {
      localStorage.setItem(`wellForm-${formData.rigUWI}`, JSON.stringify(formData));
    }
  }, [formData]);
  useEffect(() => {
    if (formData.rigUWI) {
      localStorage.setItem(`wellForm-${formData.rigUWI}2`, JSON.stringify(formData2));
    }
  }, [formData2]);
  useEffect(() => {
    if (formData.rigUWI) {
      localStorage.setItem(`wellForm-${formData.rigUWI}3`, JSON.stringify(formData3));
    }
  }, [formData3]);
  useEffect(() => {
    if (formData.rigUWI) {
      localStorage.setItem(`wellForm-${formData.rigUWI}4`, JSON.stringify(formData4));
    }
  }, [formData4]);
  useEffect(() => {
    if (formData.rigUWI) {
      localStorage.setItem(`wellForm-${formData.rigUWI}5`, JSON.stringify(formData5));
    }
  }, [formData5]);
  useEffect(() => {
    if (formData.rigUWI) {
      localStorage.setItem(`wellForm-${formData.rigUWI}6`, JSON.stringify(formData6));
    }
  }, [formData6]);


  return (
    <RigUWIContext.Provider value={{
      formData, setFormData,
      formData2, setFormData2,
      formData3, setFormData3,
      formData4, setFormData4,
      formData5, setFormData5,
      formData6, setFormData6,
      }}>
      {children}
    </RigUWIContext.Provider>
  );
}
