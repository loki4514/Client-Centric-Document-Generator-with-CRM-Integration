// const recent_record = 'BRLLP/2023-2024/071111/RFP';

// const match = recent_record.split('/');
// const imp = match[2].split('/');

// const stored_year = match[1].split('-')[0];
// const res_month = imp[0].substring(0, 2);
// const prev_record = imp[0].substring(2);

// const currentYear = new Date().getFullYear();
// const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, '0');
// // const currentYearLastTwoDigits = currentYear.toString().slice(-2);

// let identifier;

// if (currentMonth.toString() === res_month.toString() && stored_year.toString() === currentYear.toString()) {
//   const incrementedRecord = (parseInt(prev_record, 10) + 1).toString().padStart(4, '0');
//   identifier = `BRLLP/${currentYear}-${currentYear + 1}/${res_month}${incrementedRecord}/RFP`;
// } else {
//   identifier = `BRLLP/${currentYear}-${currentYear + 1}/${currentMonth}0001/RFP`;

// }

// console.log(identifier,currentMonth,res_month,stored_year,currentYear)


const text = `This proposal and contract are the property of Blaxol Risensi LLP (“Blaxol”) and must 
        not be disclosed outside the family of or be duplicated, used, or disclosed—in 
        whole or in part—for any purpose other than to evaluate this proposal. If a contract is awarded to 
        Blaxol as a result of, or in connection with, this proposal, the Promoters shall have the right to 
        duplicate, use, or disclose the data to the extent provided in the resulting contract and subject to 
        the limitations of the Privacy Policy and other applicable bylaws. 
        This proposal contains trade secrets and proprietary commercial or financial information, and 
        information of a personal nature that is exempt from disclosure under OPRAA and other applicable laws.
        Accordingly, no portion of this document should be released without consulting BLAXOL. 
        This information is contingent on the Parties reaching mutually agreeable terms and conditions and 
        upon acceptance of any limitations described herein`
        
        const singleLineText = text.replace(/\s+/g, ' ');

        console.log(singleLineText);