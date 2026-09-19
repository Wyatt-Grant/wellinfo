import { Fragment, useContext } from 'react';
import { RigUWIContext } from './contexts/RigUWIContext';
import html2pdf from 'html2pdf.js/dist/html2pdf.min.js';
import Button from '@mui/material/Button';
import Download from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { WELL_CLASS_FIELDS } from './Forms/WellClassForm';
import { topDriveSetPoint, torqueBuffer, requiredIntCasingTest, cumulativeLostTime } from './calculations';

const YELLOW = '#ffff00';

export default function SaveButton() {
    const { formData, formData3, formData4, formData5, formData7 } = useContext(RigUWIContext);

    const handleSavePDF = () => {
        const wrapper = makeTable();
        // Convert and save as PDF
        html2pdf().set({
            margin: 4,
            filename: '5am-5pm.pdf',
            // PNG, not the default JPEG: chroma subsampling smears thin black text on white.
            image: { type: 'png', quality: 1 },
            html2canvas: {
                // ~385 DPI on a letter page. Keeps 1px table borders uniform instead of
                // anti-aliased away, and text crisp when zoomed. Drop to 3 (~290 DPI) if
                // the file gets too big.
                scale: 4,
                letterRendering: true,
                backgroundColor: '#ffffff',
                useCORS: true,
            },
            // deflate the (large) PNG so the higher scale doesn't balloon the file
            jsPDF: { unit: 'mm', format: 'letter', orientation: 'portrait', compress: true },
        }).from(wrapper).save();
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

    // Section titles are rotated into the narrow first column; '\n' marks the line breaks.
    // Keep them to three short lines so the block stays inside the column.
    // Row shape: { label, mid, right, labelRed, midRed, midYellow, rightYellow, rightRed }
    //   mid   -> middle (value) column, right -> right (description / note) column
    //   The label column is always yellow. midYellow / rightYellow mark the value and
    //   note cells that are yellow on the source spreadsheet; everything else is white.
    const buildSections = () => {
        const str = (v) => (v === undefined || v === null) ? '' : String(v);
        const mudNote = 'Invert/KCL/Silicate/Lateral mud';

        const general = {
            title: 'General\nWell\nInfo',
            rows: [
                { label: 'Rig & UWI', mid: '', right: formData.rigUWI, midYellow: true },
                { label: 'Well on pad + Supervisors', mid: '', right: formData.wellOnPad, midYellow: true },
                { label: 'Anticipated move date & type', mid: '', right: formData.moveDateType, midYellow: true },
                { label: 'Current Operation', mid: '', right: formData.currentOperation, midYellow: true },
                { label: 'DP cumulative meters since last inspection (m)', mid: '', right: formData.dpCumulativeMeters, midYellow: true },
                { label: 'Sim-ops within 25m (Y/N)', mid: formData.simOps, right: formData.simOps2 },
                { label: 'STARS site (perm/temp/none)', mid: formData.starsSite, right: formData.starsSite2 },
            ],
        };

        const basic = {
            title: 'Basic\nWell\ndesign',
            rows: [
                { label: 'Vertical', mid: formData3.Vertical, right: formData3.Vertical2, midYellow: true },
                { label: 'Monobore', mid: formData3.Monobore, right: formData3.Monobore2, midYellow: true },
                { label: 'Intermediate - Sleeves & packers (type#1)', mid: formData3.IntermediateSleevesPackers, right: formData3.IntermediateSleevesPackers2, midYellow: true },
                { label: 'Intermediate - Cemented Liner (type #2)', mid: formData3.IntermediateCementedLiner, right: formData3.IntermediateCementedLiner2, midYellow: true },
                { label: 'PROP', mid: formData3.PROP, right: formData3.PROP2, midYellow: true },
            ],
        };

        const wellClass = {
            title: 'Well Class,\nMud Weight,\nPressure Testing',
            rows: WELL_CLASS_FIELDS.map(({ label, name, help, computed }) => ({
                label,
                mid: computed ? requiredIntCasingTest(formData7) : formData7[name],
                right: help,
                midYellow: computed,
                midRed: computed,
                rightYellow: true,
            })),
        };

        const requirementOBE = '"OBE Corporate" Requirement';
        const requirementDrilling = '"Drilling Dept" Requirement';
        const last12 = {
            title: 'Last\n12\nHours',
            titleRed: true,
            rows: [
                { label: 'Meters drilled (m)', mid: formData4.metersDrilled2, right: '', rightYellow: true },
                { label: 'Off bottom torque (ftlbs) in good hole', mid: formData4.offBottomTorque2, right: '<--- measured off bottom w/ stationary pipe in good hole conditions & smooth torque (tourly)', rightYellow: true },
                { label: '80% of weakest BHA connection', mid: formData4.weakestBHAConnection2, right: '<--- verify with directional hand (tourly)', rightYellow: true, rightRed: true },
                { label: 'Top Drive Set Point (ftlbs)', mid: topDriveSetPoint(formData4), right: '<--- Top drive set to stall at', midYellow: true, rightYellow: true },
                { label: 'Actual Peak Drilling torque (ftlbs)', mid: formData4.actualPeakTorque2, right: '<--- measured on bottom drilling (on-going)', rightYellow: true },
                { label: 'Set vs. Actual Torque Buffer (ftlbs)', mid: torqueBuffer(formData4), right: '<--- Top Drive Set Point - Actual Peak drilling Torque (Negative number here is BAD!!!)', midYellow: true, midRed: true, rightYellow: true, rightRed: true },
                { label: 'RCD Element (In/Out)', mid: formData4.rcdElement2, right: '', rightYellow: true },
                { label: 'Mud Type (Invert/water/other)', mid: formData4.mudType2, right: '', rightYellow: true },
                { label: 'Mud weight (kg/m3)', mid: formData4.mudWeight2, right: '', rightYellow: true },
                { label: 'Mud Losses (m3)', mid: formData4.mudLosses2, right: mudNote, rightYellow: true },
                { label: '# of red task procedures followed (minimum 1/shift)', mid: formData4.redTaskProcedures2, right: requirementOBE, rightYellow: true, rightRed: true },
                { label: 'LIR (minimum 1/shift)', mid: formData4.lir2, right: requirementOBE, rightYellow: true, rightRed: true },
                { label: 'Monthly Safety Package (When sent to rigs)', mid: formData4.monthlySafetyPackage2, right: requirementOBE, rightYellow: true, rightRed: true },
                { label: 'ABC Picture (minimum 1/shift)', mid: formData4.abcPicture2, right: requirementDrilling, rightYellow: true, rightRed: true },
                { label: 'BHA/Bit/Feeler Guage Picture (per bha)', mid: formData4.bhaBitFeelerGaugePicture2, right: requirementDrilling, rightYellow: true, rightRed: true },
                { label: 'Safety Incidents (describe)', mid: formData4.safetyIncidents2, right: formData4.safetyIncidents, midYellow: true },
                { label: 'Downhole BHA/Mud Problems (describe)', mid: formData4.bhaMudProblems2, right: formData4.bhaMudProblems, midYellow: true },
                { label: 'Downhole Reservoir/Placement Problems (describe)', mid: formData4.reservoirPlacementProblems2, right: formData4.reservoirPlacementProblems, midYellow: true },
                { label: 'Surface Problems (describe)', mid: formData4.surfaceProblems2, right: formData4.surfaceProblems, midYellow: true },
                { label: 'Performance limiters (describe)', mid: formData4.performanceLimiters2, right: formData4.performanceLimiters, midYellow: true },
            ],
        };

        const cumulative = {
            title: 'Cumulative\n(this\nwell)',
            titleRed: true,
            rows: [
                { label: 'Mud Losses (m3)', mid: formData5.mudLosses, right: mudNote, rightYellow: true },
                { label: 'Mud Losses (m3/100m)', mid: formData5.mudLossesPer100m, right: mudNote, rightYellow: true },
                { label: 'Cumulative Lost time (hrs)', mid: cumulativeLostTime(formData5), right: '<--- This is the sum of lost time entries below', labelRed: true, midYellow: true, midRed: true, rightYellow: true, rightRed: true },
                { label: 'Misc. Lost time', mid: formData5.miscLostTime, right: formData5.miscLostTime2, rightYellow: true },
                { label: 'Wait on Cementers (Lost time)', mid: formData5.waitOnCementers, right: formData5.waitOnCementers2, rightYellow: true },
                { label: 'Directional - MWD Failure (Lost time)', mid: formData5.directionalMWDFailure, right: formData5.directionalMWDFailure2, rightYellow: true },
                { label: 'Directional- Rotor/Stator Failure (Lost time)', mid: formData5.directionalRotorStatorFailure, right: formData5.directionalRotorStatorFailure2, rightYellow: true },
                { label: 'Directional - Drive Shaft Failure (Lost Time)', mid: formData5.directionalDriveShaftFailure, right: formData5.directionalDriveShaftFailure2, rightYellow: true },
                ...(formData5.lostTimes || []).map((v, i) => ({
                    label: 'Lost Time',
                    mid: v,
                    right: (formData5.lostTimes2 || [])[i],
                    rightYellow: true,
                })),
            ],
        };

        return [general, basic, wellClass, last12, cumulative].map((section) => ({
            ...section,
            rows: section.rows.map((row) => ({ ...row, mid: str(row.mid), right: str(row.right) })),
        }));
    };

    const makeTable = () => {
        const sections = buildSections();

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

        sections.forEach((section) => {
            section.rows.forEach((rowDef, rowIndex) => {
                const isFirst = rowIndex === 0;
                const isLast = rowIndex === section.rows.length - 1;
                const row = table.insertRow();

                // Column 0: rotated section title (drawn on the last row of the section).
                // The column reads as one merged cell per section, so it only gets
                // horizontal borders at section boundaries.
                const titleCell = row.insertCell();
                titleCell.style.fontSize = '10px';
                titleCell.style.background = YELLOW;
                titleCell.style.borderLeft = '1px solid black';
                titleCell.style.borderRight = '1px solid black';
                if (isFirst) {
                    titleCell.style.borderTop = '1px solid black';
                }
                if (isLast) {
                    titleCell.style.borderBottom = '1px solid black';
                    const rotatedDiv = document.createElement('div');
                    rotatedDiv.innerHTML = section.title.split('\n').join('<br>');
                    rotatedDiv.style.position = 'absolute';
                    rotatedDiv.style.whiteSpace = 'nowrap';
                    rotatedDiv.style.lineHeight = '11px';
                    rotatedDiv.style.transform = 'rotate(-90deg)';
                    rotatedDiv.style.transformOrigin = 'left top';
                    if (section.titleRed) {
                        rotatedDiv.style.color = 'red';
                        rotatedDiv.style.textDecoration = 'underline';
                    }
                    titleCell.appendChild(rotatedDiv);
                }

                // Column 1: row label
                const labelCell = row.insertCell();
                labelCell.style.fontSize = '10px';
                labelCell.style.background = YELLOW;
                labelCell.textContent = rowDef.label;
                if (rowDef.labelRed) {
                    labelCell.style.color = 'red';
                }

                // Column 2: value
                const midCell = row.insertCell();
                midCell.style.fontSize = '10px';
                midCell.style.background = rowDef.midYellow ? YELLOW : 'inherit';
                midCell.textContent = rowDef.mid;
                if (rowDef.midRed) {
                    midCell.style.color = 'red';
                }

                // Column 3: description / note
                const rightCell = row.insertCell();
                rightCell.style.fontSize = '10px';
                rightCell.style.background = rowDef.rightYellow ? YELLOW : 'inherit';
                rightCell.textContent = rowDef.right;
                if (rowDef.rightRed) {
                    rightCell.style.color = 'red';
                }

                // Full grid on every content cell so html2canvas draws the same line everywhere
                [labelCell, midCell, rightCell].forEach((cell) => {
                    cell.style.border = '1px solid black';
                });
            });
        });

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
        const symbolDiv = document.createElement('span');
        symbolDiv.textContent = "🝮"
        symbolDiv.style.userSelect = 'none';
        symbolDiv.style.position = 'absolute';
        symbolDiv.style.top = '22px';
        symbolDiv.style.left = '-1px';
        title.appendChild(symbolDiv);

        wrapper.appendChild(title);
        wrapper.appendChild(table);

       return wrapper;
    };


    return (
        <Fragment>
            <Button
            size="large"
            aria-label="download PDF"
            onClick={handleSavePDF}
            color="inherit"
            >
                <Download fontSize="large" />
                &nbsp;Download
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button
            size="large"
            aria-label="preview PDF"
            onClick={handlePreviewPDF}
            color="inherit"
            >
                <VisibilityIcon fontSize="large" />
                &nbsp;&nbsp;Preview
            </Button>
        </Fragment>
    );
}
