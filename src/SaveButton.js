import { Fragment, useContext } from 'react';
import { RigUWIContext } from './contexts/RigUWIContext';
import html2pdf from 'html2pdf.js/dist/html2pdf.min.js';
import moment from 'moment';
import Button from '@mui/material/Button';
import Download from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function SaveButton() {
    const { formData, formData2, formData3, formData4, formData5, formData6 } = useContext(RigUWIContext);

    const sectionTitles = ['General Well Info','Monthly Safety Stand Down','Basic Well design','Last 12\nHours','Cumulative (this\nwell)','Cumulative (Project)'];
    const titles = [
        'Rig & UWI',
        'Well on pad',
        'Anticipated move date & type',
        'Current Operation',
        'Sim-ops within 25m (Y/N)',
        'STARS site (perm/temp/none)',
        'Crew#1 & Services (Date)',
        'Crew#2 & Services (Date)',
        'Crew#3 & Services (Date)',
        'Last OBE recordable (Date)',
        'Vertical',
        'Monobore',
        'Intermediate - Sleeves & packers (type#1)',
        'Intermediate - Cemented Liner (type #2)',
        'PROP',
        'Meters drilled (m)',
        'Formation/Cycle/Facies Drilled',
        'Off bottom torque (ftlbs) in good hole',
        '80% of weakest BHA connection',
        'Top Drive Set Point (ftlbs)',
        'Actual Peak Drilling torque (ftlbs)',
        'Operational Torque Buffer (ftlbs)',
        'Avg. slide ROP (m/hr)',
        'Avg. rotary ROP (m/hr)',
        'Mud Type (Invert/water/other)',
        'Mud weight (kg/m3)',
        'Mud Losses (m3)',
        '# of red task procedures followed (minimum 1/shift)',
        'Safety Incidents (describe)',
        'Downhole BHA/Mud Problems (describe)',
        'Downhole Reservoir/Placement Problems (describe)',
        'Surface Problems (describe)',
        'Performance limiters (describe)',
        'Mud Losses (m3)',
        'Mud Losses (m3/100m)',
        'Water hauled… Water base drilling only (m3)',
        'Cumulative Lost time (hrs)',
        'Lost time #1',
        'Lost time #2',
        'Lost time #3',
        'Lost time #4',
        'Lost time #5',
        'Lost time #6',
        'Lost time #7',
        'Lost time #8',
        'Lost time #9',
        'Wait on Cementers (Lost time #10)',
        'Directional - MWD Failure (Lost time #11)',
        'Directional- Rotor/Stator Failure (Lost time #12)',
        'Directional - Drive Shaft Failure (Lost time #13)',
        'DP cumulative meters since last inspection (m)',
        'Wait on Cementers  (hrs)',
        'Directional - MWD Failure  (hrs)',
        'Directional- Rotor/Stator Failure  (hrs)',
        'Directional - Drive Shaft Failure  (hrs)',
    ];

    const handleSavePDF = () => {
        const wrapper = makeTable();
        // Convert and save as PDF
        html2pdf().from(wrapper).save();
    }

    const handlePreviewPDF = () => {
        const wrapper = makeTable();
        const htmlContent = typeof wrapper === 'string' ? wrapper : wrapper.outerHTML;
        
        const newWindow = window.open('', '_blank');
        newWindow.document.write(`
            <html>
            <head>
                <title>Preview PDF</title>
            </head>
            <body style="width: 216mm;">
                ${htmlContent}
            </body>
            </html>
        `);
        newWindow.document.close();
    }

    const makeTable = () => {
        // Create a new table element
        const table = document.createElement('table');
        table.style.borderCollapse = 'collapse';
        table.style.width = '100%';

        // Create colgroup to set column widths
        const colGroup = document.createElement('colgroup');
        const widths = ['8%', '25%', '12%', '55%'];
        widths.forEach(width => {
            const col = document.createElement('col');
            col.style.width = width;
            colGroup.appendChild(col);
        });
        table.appendChild(colGroup);

        // Populate table with 56 rows × 3 columns
        let sectionCounter = 0;
        let value = 0;
        for (let i = 0; i < 56; i++) {
            const row = table.insertRow();
            for (let j = 0; j < 4; j++) {
                const cell = row.insertCell();
                cell.style.fontSize = '10px';
                cell.style.backgroundColor = 'inherit';
                if (i >= 0 && i <= 5) {
                    cell.style.background = '#eeeeee';
                }
                if (i >=  10 && i <= 14) {
                    cell.style.background = '#eeeeee';
                }
                if (i >= 33 && i <= 50) {
                    cell.style.background = '#eeeeee';
                }
                if (j > 0 || i == 5 || i == 9 || i == 14 || i == 32 || i == 50 || i == 54) {
                    if (j == 0) {
                        const rotatedDiv = document.createElement('div');

                        rotatedDiv.textContent = sectionTitles[sectionCounter];
                        rotatedDiv.innerHTML = sectionTitles[sectionCounter].replace(/ /g, '<br>');
                        sectionCounter += 1;
                        rotatedDiv.style.position = 'absolute';
                        rotatedDiv.style.transform = 'rotate(-90deg)';
                        rotatedDiv.style.transformOrigin = 'left top';
                        cell.appendChild(rotatedDiv);
                    } else {
                        if (j == 1) {
                            cell.textContent = titles[i];
                        }
                        if (j == 2) {
                            switch (i) {
                                case 4:
                                    cell.textContent = formData['simOps'];
                                    break;
                                case 5:
                                    cell.textContent = formData['starsSite'];
                                    break;

                                case 6:
                                    cell.textContent = formData2['Crew1AndServicesDate'] ? moment(formData2['Crew1AndServicesDate']).format('MMMM Do, YYYY') : '';
                                    break;
                                case 7:
                                    cell.textContent = formData2['Crew2AndServicesDate'] ? moment(formData2['Crew2AndServicesDate']).format('MMMM Do, YYYY') : '';
                                    break;
                                case 8:
                                    cell.textContent = formData2['Crew3AndServicesDate'] ? moment(formData2['Crew3AndServicesDate']).format('MMMM Do, YYYY') : '';
                                    break;
                                case 9:
                                    cell.textContent = formData2['LastOBErecordableDate'] ? moment(formData2['LastOBErecordableDate']).format('MMMM Do, YYYY') : '';
                                    break;
                                    
                                case 10:
                                    cell.textContent = formData3['Vertical'];
                                    break;
                                case 11:
                                    cell.textContent = formData3['Monobore'];
                                    break;
                                case 12:
                                    cell.textContent = formData3['IntermediateSleevesPackers'];
                                    break;
                                case 13:
                                    cell.textContent = formData3['IntermediateCementedLiner'];
                                    break;
                                case 14:
                                    cell.textContent = formData3['PROP'];
                                    break;

                                case 15:
                                    cell.textContent = formData4['metersDrilled2'];
                                    break;
                                case 16:
                                    cell.textContent = formData4['formationDrilled2'];
                                    break;
                                case 17:
                                    cell.textContent = formData4['offBottomTorque2'];
                                    break;
                                case 18:
                                    cell.textContent = formData4['weakestBHAConnection2'];
                                    break;
                                case 19:
                                    value = parseFloat(formData4['offBottomTorque2'] == '' ? 0 : formData4['offBottomTorque2'])
                                        + parseFloat(formData4['weakestBHAConnection2'] == '' ? 0 : formData4['weakestBHAConnection2']);

                                    cell.textContent = value;
                                    break;
                                case 20:
                                    cell.textContent = formData4['actualPeakTorque2'];
                                    break;
                                case 21:
                                    value = parseFloat(formData4['offBottomTorque2'] == '' ? 0 : formData4['offBottomTorque2'])
                                            + parseFloat(formData4['weakestBHAConnection2'] == '' ? 0 : formData4['weakestBHAConnection2']);

                                    value -= parseFloat(formData4['actualPeakTorque2'] == '' ? 0 : formData4['actualPeakTorque2']);

                                    cell.textContent = value;
                                    break;
                                case 22:
                                    cell.textContent = formData4['avgSlideROP2'];
                                    break;
                                case 23:
                                    cell.textContent = formData4['avgRotaryROP2'];
                                    break;
                                case 24:
                                    cell.textContent = formData4['mudType2'];
                                    break;
                                case 25:
                                    cell.textContent = formData4['mudWeight2'];
                                    break;
                                case 26:
                                    cell.textContent = formData4['mudLosses2'];
                                    break;
                                case 27:
                                    cell.textContent = formData4['redTaskProcedures2'];
                                    break;
                                case 28:
                                    cell.textContent = formData4['safetyIncidents2'];
                                    break;
                                case 29:
                                    cell.textContent = formData4['bhaMudProblems2'];
                                    break;
                                case 30:
                                    cell.textContent = formData4['reservoirPlacementProblems2'];
                                    break;
                                case 31:
                                    cell.textContent = formData4['surfaceProblems2'];
                                    break;
                                case 32:
                                    cell.textContent = formData4['performanceLimiters2'];
                                    break;

                                case 33:
                                    cell.textContent = formData5['mudLosses'];
                                    break;
                                case 34:
                                    cell.textContent = formData5['mudLossesPer100m'];
                                    break;
                                case 35:
                                    cell.textContent = formData5['waterHauled'];
                                    break;
                                case 36:
                                    cell.textContent = formData5['cumulativeLostTime'];
                                    break;
                                case 37:
                                    cell.textContent = formData5['lostTime1'];
                                    break;
                                case 38:
                                    cell.textContent = formData5['lostTime2'];
                                    break;
                                case 39:
                                    cell.textContent = formData5['lostTime3'];
                                    break;
                                case 40:
                                    cell.textContent = formData5['lostTime4'];
                                    break;
                                case 41:
                                    cell.textContent = formData5['lostTime5'];
                                    break;
                                case 42:
                                    cell.textContent = formData5['lostTime6'];
                                    break;
                                case 43:
                                    cell.textContent = formData5['lostTime7'];
                                    break;
                                case 44:
                                    cell.textContent = formData5['lostTime8'];
                                    break;
                                case 45:
                                    cell.textContent = formData5['lostTime9'];
                                    break;
                                case 46:
                                    cell.textContent = formData5['waitOnCementers'];
                                    break;
                                case 47:
                                    cell.textContent = formData5['directionalMWDFailure'];
                                    break;
                                case 48:
                                    cell.textContent = formData5['directionalRotorStatorFailure'];
                                    break;
                                case 49:
                                    cell.textContent = formData5['directionalDriveShaftFailure'];
                                    break;

                                case 50:
                                    cell.textContent = formData6['dpCumulativeMeters2'];
                                    break;
                                case 51:
                                    cell.textContent = formData6['waitOnCementersHrs2'];
                                    break;
                                case 52:
                                    cell.textContent = formData6['directionalMWDFailureHrs2'];
                                    break;
                                case 53:
                                    cell.textContent = formData6['directionalRotorStatorFailureHrs2'];
                                    break;
                                case 54:
                                    cell.textContent = formData6['directionalDriveShaftFailureHrs2'];
                                    break;
                                default:
                                    break;
                            }
                        }
                        if (j == 3) {
                            switch (i) {
                                case 0:
                                    cell.textContent = formData['rigUWI'];
                                    break;
                                case 1:
                                    cell.textContent = formData['wellOnPad'];
                                    break;
                                case 2:
                                    cell.textContent = formData['moveDateType'];
                                    break;
                                case 3:
                                    cell.textContent = formData['currentOperation'];
                                    break;
                                case 4:
                                    cell.textContent = formData['simOps2'];
                                    break;
                                case 5:
                                    cell.textContent = formData['starsSite2'];
                                    break;

                                case 6:
                                    cell.textContent = formData2['Crew1AndServices'];
                                    break;
                                case 7:
                                    cell.textContent = formData2['Crew2AndServices'];
                                    break;
                                case 8:
                                    cell.textContent = formData2['Crew3AndServices'];
                                    break;
                                case 9:
                                    cell.textContent = formData2['LastOBErecordable'];
                                    break;
                                
                                case 10:
                                    cell.textContent = formData3['Vertical2'];
                                    break;
                                case 11:
                                    cell.textContent = formData3['Monobore2'];
                                    break;
                                case 12:
                                    cell.textContent = formData3['IntermediateSleevesPackers2'];
                                    break;
                                case 13:
                                    cell.textContent = formData3['IntermediateCementedLiner2'];
                                    break;
                                case 14:
                                    cell.textContent = formData3['PROP2'];
                                    break;

                                case 15:
                                    cell.textContent = formData4['metersDrilled'];
                                    break;
                                case 16:
                                    cell.textContent = formData4['formationDrilled'];
                                    break;
                                case 17:
                                    cell.textContent = formData4['offBottomTorque'];
                                    break;
                                case 18:
                                    cell.textContent = formData4['weakestBHAConnection'];
                                    break;
                                case 19:
                                    cell.textContent = formData4['topDriveSetPoint'];
                                    break;
                                case 20:
                                    cell.textContent = formData4['actualPeakTorque'];
                                    break;
                                case 21:
                                    cell.textContent = formData4['operationalTorqueBuffer'];
                                    break;
                                case 22:
                                    cell.textContent = formData4['avgSlideROP'];
                                    break;
                                case 23:
                                    cell.textContent = formData4['avgRotaryROP'];
                                    break;
                                case 24:
                                    cell.textContent = formData4['mudType'];
                                    break;
                                case 25:
                                    cell.textContent = formData4['mudWeight'];
                                    break;
                                case 26:
                                    cell.textContent = formData4['mudLosses'];
                                    break;
                                case 27:
                                    cell.textContent = formData4['redTaskProcedures'];
                                    break;
                                case 28:
                                    cell.textContent = formData4['safetyIncidents'];
                                    break;
                                case 29:
                                    cell.textContent = formData4['bhaMudProblems'];
                                    break;
                                case 30:
                                    cell.textContent = formData4['reservoirPlacementProblems'];
                                    break;
                                case 31:
                                    cell.textContent = formData4['surfaceProblems'];
                                    break;
                                case 32:
                                    cell.textContent = formData4['performanceLimiters'];
                                    break;

                                case 33:
                                    cell.textContent = formData5['mudLosses2'];
                                    break;
                                case 34:
                                    cell.textContent = formData5['mudLossesPer100m2'];
                                    break;
                                case 35:
                                    cell.textContent = formData5['waterHauled2'];
                                    break;
                                case 36:
                                    cell.textContent = formData5['cumulativeLostTime2'];
                                    break;
                                case 37:
                                    cell.textContent = formData5['lostTime12'];
                                    break;
                                case 38:
                                    cell.textContent = formData5['lostTime22'];
                                    break;
                                case 39:
                                    cell.textContent = formData5['lostTime32'];
                                    break;
                                case 40:
                                    cell.textContent = formData5['lostTime42'];
                                    break;
                                case 41:
                                    cell.textContent = formData5['lostTime52'];
                                    break;
                                case 42:
                                    cell.textContent = formData5['lostTime62'];
                                    break;
                                case 43:
                                    cell.textContent = formData5['lostTime72'];
                                    break;
                                case 44:
                                    cell.textContent = formData5['lostTime82'];
                                    break;
                                case 45:
                                    cell.textContent = formData5['lostTime92'];
                                    break;
                                case 46:
                                    cell.textContent = formData5['waitOnCementers2'];
                                    break;
                                case 47:
                                    cell.textContent = formData5['directionalMWDFailure2'];
                                    break;
                                case 48:
                                    cell.textContent = formData5['directionalRotorStatorFailure2'];
                                    break;
                                case 49:
                                    cell.textContent = formData5['directionalDriveShaftFailure2'];
                                    break;

                                case 50:
                                    cell.textContent = formData6['dpCumulativeMeters'];
                                    break;
                                case 51:
                                    cell.textContent = formData6['waitOnCementersHrs'];
                                    break;
                                case 52:
                                    cell.textContent = formData6['directionalMWDFailureHrs'];
                                    break;
                                case 53:
                                    cell.textContent = formData6['directionalRotorStatorFailureHrs'];
                                    break;
                                case 54:
                                    cell.textContent = formData6['directionalDriveShaftFailureHrs'];
                                    break;
                                default:
                                    break;
                            }
                        }
                        cell.style.borderTop = '1px solid black';
                        cell.style.borderRight = '1px solid black';
                    }
                }
                
                if (j > 0 || i == 6 || i == 10 || i == 15 || i == 33 || i == 51 || i == 55) {
                    if (j == 0) {
                        cell.style.borderTop = '1px solid black';
                    }
                    if (j == 1) {
                        cell.style.borderLeft = '1px solid black';
                    }
                }
            }
        }

        // Create a wrapper div to hold the table
        const wrapper = document.createElement('div');
        const title = document.createElement('h3');
        title.style.display = 'flex';
        title.style.justifyContent = 'space-between';
        title.style.width = 'calc(100% - 10px)';
        title.style.margin = '5px';
        const nameDiv = document.createElement('span');
        nameDiv.textContent = "5am & 5pm"
        title.appendChild(nameDiv);

        wrapper.appendChild(title);
        wrapper.appendChild(table);

       return wrapper;
    };


    return (
        <Fragment>
            <Button
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleSavePDF}
            color="inherit"
            >
                <Download fontSize="large" />
                &nbsp;Download
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handlePreviewPDF}
            color="inherit"
            >
                <VisibilityIcon fontSize="large" />
                &nbsp;&nbsp;Preview
            </Button>
        </Fragment>
    );
}