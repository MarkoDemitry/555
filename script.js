/* =========================
CURRENT COORDINATES
========================= */

let currentLat = null;
let currentLon = null;

/* =========================
SURVEY POINTS
========================= */

let surveyPoints = [];

/* =========================
ELEMENTS
========================= */

const conversionType =
document.getElementById('conversionType');

const decimalSection =
document.getElementById('decimalSection');

const dmsSection =
document.getElementById('dmsSection');

const dmsResults =
document.getElementById('dmsResults');

const decimalResults =
document.getElementById('decimalResults');

const pointInputType =
document.getElementById('pointInputType');

const pointDecimalSection =
document.getElementById('pointDecimalSection');

const pointDMSSection =
document.getElementById('pointDMSSection');

/* =========================
SWITCH CONVERSION MODE
========================= */

conversionType.addEventListener(
'change',
switchMode
);

function switchMode(){

clearAllFields();

if(
conversionType.value ===
'decimalToDMS'
){

decimalSection.style.display =
'block';

dmsSection.style.display =
'none';

dmsResults.style.display =
'block';

decimalResults.style.display =
'none';

}

else{

decimalSection.style.display =
'none';

dmsSection.style.display =
'block';

dmsResults.style.display =
'none';

decimalResults.style.display =
'block';

}

}

/* =========================
POINT INPUT TYPE
========================= */

pointInputType.addEventListener(
'change',
switchPointInput
);

function switchPointInput(){

if(
pointInputType.value ===
'decimal'
){

pointDecimalSection.style.display =
'block';

pointDMSSection.style.display =
'none';

}

else{

pointDecimalSection.style.display =
'none';

pointDMSSection.style.display =
'block';

}

}

/* =========================
DECIMAL TO DMS
========================= */

function decimalToDMS(decimal){

const absolute =
Math.abs(decimal);

const degrees =
Math.floor(absolute);

const minutesNotTruncated =
(absolute - degrees) * 60;

const minutes =
Math.floor(minutesNotTruncated);

const seconds =
(
(minutesNotTruncated - minutes) * 60
).toFixed(2);

return{

degrees,
minutes,
seconds

};

}

/* =========================
DMS TO DECIMAL
========================= */

function dmsToDecimal(
deg,
min,
sec,
dir
){

let decimal =

parseFloat(deg || 0) +

parseFloat(min || 0) / 60 +

parseFloat(sec || 0) / 3600;

if(
dir === 'S' ||
dir === 'W'
){

decimal *= -1;

}

return decimal;

}

/* =========================
CONVERT DECIMAL TO DMS
========================= */

function convertDecimalToDMS(){

const lat =
parseFloat(
document.getElementById('decimalLat').value
);

const lon =
parseFloat(
document.getElementById('decimalLon').value
);

if(
isNaN(lat) ||
isNaN(lon)
){

return;

}

currentLat = lat;
currentLon = lon;

/* LAT */

const latDMS =
decimalToDMS(lat);

document.getElementById('latDeg')
.value =
latDMS.degrees;

document.getElementById('latMin')
.value =
latDMS.minutes;

document.getElementById('latSec')
.value =
latDMS.seconds;

document.getElementById('latDir')
.value =
lat >= 0 ? 'N' : 'S';

/* LON */

const lonDMS =
decimalToDMS(lon);

document.getElementById('lonDeg')
.value =
lonDMS.degrees;

document.getElementById('lonMin')
.value =
lonDMS.minutes;

document.getElementById('lonSec')
.value =
lonDMS.seconds;

document.getElementById('lonDir')
.value =
lon >= 0 ? 'E' : 'W';

}

/* =========================
CONVERT DMS TO DECIMAL
========================= */

function convertDMSToDecimal(){

const latitude =

dmsToDecimal(

document.getElementById('inputLatDeg').value,

document.getElementById('inputLatMin').value,

document.getElementById('inputLatSec').value,

document.getElementById('inputLatDir').value

);

const longitude =

dmsToDecimal(

document.getElementById('inputLonDeg').value,

document.getElementById('inputLonMin').value,

document.getElementById('inputLonSec').value,

document.getElementById('inputLonDir').value

);

currentLat = latitude;
currentLon = longitude;

document.getElementById('resultLat')
.innerText =
latitude.toFixed(8);

document.getElementById('resultLon')
.innerText =
longitude.toFixed(8);

}

/* =========================
LIVE CONVERT
========================= */

document
.getElementById('decimalLat')
.addEventListener(
'input',
convertDecimalToDMS
);

document
.getElementById('decimalLon')
.addEventListener(
'input',
convertDecimalToDMS
);

const dmsInputs = [

'inputLatDeg',
'inputLatMin',
'inputLatSec',
'inputLatDir',

'inputLonDeg',
'inputLonMin',
'inputLonSec',
'inputLonDir'

];

dmsInputs.forEach(id=>{

document
.getElementById(id)

.addEventListener(
'input',
convertDMSToDecimal
);

});

/* =========================
COPY RESULTS
========================= */

function copyResults(){

let text = '';

if(
conversionType.value ===
'decimalToDMS'
){

text = `

Latitude DMS:
${document.getElementById('latDeg').value}°
${document.getElementById('latMin').value}'
${document.getElementById('latSec').value}"
${document.getElementById('latDir').value}

Longitude DMS:
${document.getElementById('lonDeg').value}°
${document.getElementById('lonMin').value}'
${document.getElementById('lonSec').value}"
${document.getElementById('lonDir').value}

`;

}

else{

text = `

Latitude:
${document.getElementById('resultLat').innerText}

Longitude:
${document.getElementById('resultLon').innerText}

`;

}

navigator.clipboard
.writeText(text);

alert('Results Copied');

}

/* =========================
CLEAR
========================= */

function clearAllFields(){

const inputs =
document.querySelectorAll('input');

inputs.forEach(input=>{

if(
!input.closest('#pointDecimalSection') &&
!input.closest('#pointDMSSection')
){

input.value = '';

}

});

document.getElementById('resultLat')
.innerText = '---';

document.getElementById('resultLon')
.innerText = '---';

currentLat = null;
currentLon = null;

}

/* =========================
OPEN MAP
========================= */

function openMap(){

if(
currentLat === null ||
currentLon === null
){

alert('No Coordinates Available');

return;

}

window.open(

`https://www.google.com/maps?q=${currentLat},${currentLon}`,

'_blank'

);

}

/* =========================
ADD POINT
========================= */

function addPoint(){

let lat;
let lon;

/* DECIMAL */

if(
pointInputType.value ===
'decimal'
){

lat =
parseFloat(
document.getElementById('pointLat').value
);

lon =
parseFloat(
document.getElementById('pointLon').value
);

}

/* DMS */

else{

lat = dmsToDecimal(

document.getElementById('pointLatDeg').value,

document.getElementById('pointLatMin').value,

document.getElementById('pointLatSec').value,

document.getElementById('pointLatDir').value

);

lon = dmsToDecimal(

document.getElementById('pointLonDeg').value,

document.getElementById('pointLonMin').value,

document.getElementById('pointLonSec').value,

document.getElementById('pointLonDir').value

);

}

if(
isNaN(lat) ||
isNaN(lon)
){

alert('Enter Valid Coordinates');

return;

}

/* SAVE */

surveyPoints.push({

lat,
lon

});

/* UPDATE */

updateSurvey();

/* CLEAR */

clearPointInputs();

}

/* =========================
CLEAR POINT INPUTS
========================= */

function clearPointInputs(){

const ids = [

'pointLat',
'pointLon',

'pointLatDeg',
'pointLatMin',
'pointLatSec',

'pointLonDeg',
'pointLonMin',
'pointLonSec'

];

ids.forEach(id=>{

document.getElementById(id)
.value='';

});

}

/* =========================
DELETE POINT
========================= */

function deletePoint(index){

surveyPoints.splice(index,1);

updateSurvey();

}

/* =========================
CLEAR SURVEY
========================= */

function clearSurvey(){

surveyPoints = [];

updateSurvey();

}

/* =========================
UPDATE SURVEY
========================= */

function updateSurvey(){

const pointsList =
document.getElementById('pointsList');

if(
surveyPoints.length === 0
){

pointsList.innerHTML =
'No Points Added';

}

else{

pointsList.innerHTML = '';

surveyPoints.forEach((point,index)=>{

const latDMS =
decimalToDMS(point.lat);

const lonDMS =
decimalToDMS(point.lon);

pointsList.innerHTML += `

<div class="point-card">

<b>
Point ${index + 1}
</b>

<br><br>

${latDMS.degrees}°
${latDMS.minutes}'
${latDMS.seconds}"
${point.lat >= 0 ? 'N' : 'S'}

<br>

${lonDMS.degrees}°
${lonDMS.minutes}'
${lonDMS.seconds}"
${point.lon >= 0 ? 'E' : 'W'}

<button
class="delete-btn"
onclick="deletePoint(${index})">

Delete

</button>

</div>

`;

});

}

/* TOTAL */

document.getElementById('totalPoints')
.innerText =
surveyPoints.length;

/* CALCULATE */

calculateArea();

}

/* =========================
CALCULATE AREA
========================= */

function calculateArea(){

if(
surveyPoints.length < 3
){

document.getElementById('areaMeters')
.innerText = '0';

document.getElementById('perimeter')
.innerText = '0';

return;

}

/* SIMPLE PROJECTION */

const points =
surveyPoints.map(p=>{

return{

x:
p.lon * 111320,

y:
p.lat * 110540

};

});

/* AREA */

let area = 0;

/* PERIMETER */

let perimeter = 0;

for(
let i=0;
i<points.length;
i++
){

const j =
(i + 1) %
points.length;

/* AREA */

area +=
points[i].x *
points[j].y;

area -=
points[j].x *
points[i].y;

/* PERIMETER */

const dx =
points[j].x -
points[i].x;

const dy =
points[j].y -
points[i].y;

perimeter +=
Math.sqrt(
(dx * dx) +
(dy * dy)
);

}

/* FINAL */

area =
Math.abs(area / 2);

/* RESULTS */

document.getElementById('areaMeters')
.innerText =
area.toFixed(2);

document.getElementById('perimeter')
.innerText =
perimeter.toFixed(2);

}

/* =========================
GPS
========================= */

function useCurrentGPS(){

if(
navigator.geolocation
){

navigator.geolocation
.getCurrentPosition(

(position)=>{

document.getElementById('pointLat')
.value =

position.coords.latitude
.toFixed(8);

document.getElementById('pointLon')
.value =

position.coords.longitude
.toFixed(8);

},

()=>{

alert(
'GPS Permission Denied'
);

}

);

}

else{

alert(
'GPS Not Supported'
);

}

}

/* =========================
START
========================= */

switchMode();

switchPointInput();