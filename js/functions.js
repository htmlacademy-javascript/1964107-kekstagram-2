const compareStrLength = (stroke, maxSymbol) => stroke.length <= maxSymbol;
compareStrLength('ss', 2);

const isPalindrom = (stroke) => {
  const formattedStr = stroke.replaceAll(' ','').toLowerCase();
  let result = '';

  for (let i = formattedStr.length - 1; i >= 0 ; i--) {
    result += formattedStr[i];
  }

  return formattedStr === result;
};

isPalindrom('123');

const removeNumber = (stroke) => {
  const formattedStr = stroke.toString();
  let result = '';
  for (let i = 0; i <= formattedStr.length - 1 ; i++) {
    if (Number.isNaN(parseInt(formattedStr[i], 10)) === false){
      result += formattedStr[i];
    }
  }

  if (result === '') {
    return NaN;
  }

  return Number(result);
};

removeNumber('futyn');

const getTime = (startWorking, endWorking, startMeet, lengthMeet) => {

  function getTimeToMinutes(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    return (hours * 60) + minutes;
  }

  const workStartMin = getTimeToMinutes(startWorking);
  const workEndMin = getTimeToMinutes(endWorking);
  const meetStartMin = getTimeToMinutes(startMeet);
  const meetEndMin = meetStartMin + lengthMeet;

  return meetStartMin >= workStartMin && meetEndMin <= workEndMin;
};

console.log(getTime('08:00', '17:30', '14:00', 90));
