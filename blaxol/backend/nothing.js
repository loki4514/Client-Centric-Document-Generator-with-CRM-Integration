const recent_record = 'BRLLP/2023-2024/071111/RFP';

const match = recent_record.split('/');
const imp = match[2].split('/');

const stored_year = match[1].split('-')[0];
const res_month = imp[0].substring(0, 2);
const prev_record = imp[0].substring(2);

const currentYear = new Date().getFullYear();
const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, '0');
// const currentYearLastTwoDigits = currentYear.toString().slice(-2);

let identifier;

if (currentMonth.toString() === res_month.toString() && stored_year.toString() === currentYear.toString()) {
  const incrementedRecord = (parseInt(prev_record, 10) + 1).toString().padStart(4, '0');
  identifier = `BRLLP/${currentYear}-${currentYear + 1}/${res_month}${incrementedRecord}/RFP`;
} else {
  identifier = `BRLLP/${currentYear}-${currentYear + 1}/${currentMonth}0001/RFP`;

}

console.log(identifier,currentMonth,res_month,stored_year,currentYear)