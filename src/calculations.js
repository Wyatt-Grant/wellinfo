// Single source of truth for every derived value shown in the forms and the report.

// parseFloat that ignores thousands separators (e.g. "10,126") and treats
// '', undefined, null and non-numeric input as 0.
export const num = (v) => {
  const n = parseFloat(String(v ?? '').replace(/,/g, ''));
  return Number.isFinite(n) ? n : 0;
};

// Last 12 Hours: Set vs. Actual Torque Buffer = Top Drive Set Point - Actual Peak Drilling torque
export const torqueBuffer = (formData4) =>
  num(formData4.topDriveSetPoint2) - num(formData4.actualPeakTorque2);

// Well Class: Required Intermediate Casing Pressure Test = 67% of BHP + Cement U-tube differential
export const requiredIntCasingTest = (formData7) =>
  num(formData7.bhp67) + num(formData7.cementUTube);

// Cumulative (this well): sum of every lost time entry
export const cumulativeLostTime = (formData5) =>
  num(formData5.miscLostTime)
  + num(formData5.waitOnCementers)
  + num(formData5.directionalMWDFailure)
  + num(formData5.directionalRotorStatorFailure)
  + num(formData5.directionalDriveShaftFailure)
  + (formData5.lostTimes || []).reduce((sum, v) => sum + num(v), 0);
