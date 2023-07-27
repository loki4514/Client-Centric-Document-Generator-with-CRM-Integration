const express = require('express')
const router = express.Router()
const User = require('../models/User')
const RFP = require('../models/RFP')
const {body,validationResult} = require('express-validator')

router.post('/createuser',[
    body('name','Enter the Name').isLength({min:3}),
    body('email','Please enter the valid Email!!').isEmail(),
    body('phone_number').isNumeric()
    .isLength({ min: 5 }).withMessage('Please enter a valid phone number'),
    body('call_sign').isLength({min:3}),
    body('description').isLength({min:3}),
    body('spoc').isLength({min:3}),
    // body('date', 'Date is required').notEmpty(),
],async (req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({error : errors.array()})
    }

    let user 
    let rfp_user
    
    try {
        let user_e = await User.findOne({email:req.body.email})
        if (user_e) {
            return res.status(400).json({error : "Email Already Exists"})
        }

        let user_p = await User.findOne({phone_number :req.body.phone_number})
        if (user_p) {
            return res.status(400).json({error : "Phone Number Already Exists"})
        }

        

        async function generateIdentifier() {
            const recentRecord = await RFP.find().limit(1).sort({ $natural: -1 });
            let identifier;
            
            if (recentRecord.length > 0) {
                const match = recentRecord[0].rfp.split('/');
                const imp = match[2].split('/');
        
                const storedYear = match[1].split('-')[0];
                const resMonth = imp[0].substring(0, 2);
                const prevRecord = imp[0].substring(2);
        
                const currentYear = new Date().getFullYear();
                const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, '0');
        
                if (currentMonth === resMonth && storedYear === currentYear.toString()) {
                    const incrementedRecord = (parseInt(prevRecord, 10) + 1).toString().padStart(4, '0');
                    identifier = `BRLLP/${currentYear}-${currentYear + 1}/${resMonth}${incrementedRecord}/RFP`;
                } else {
                    identifier = `BRLLP/${currentYear}-${currentYear + 1}/${currentMonth}0001/RFP`;
                }
            } else {
                const currentYear = new Date().getFullYear();
                const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, '0');
                identifier = `BRLLP/${currentYear}-${currentYear + 1}/${currentMonth}0001/RFP`;
            }
        
            return identifier;
        }

        const createDate = async () => {
            const currentDate = new Date();
            const month = currentDate.getMonth() + 1; // Months are zero-indexed, so adding 1 to get the correct month
            const day = currentDate.getDate();
            const year = currentDate.getFullYear();

            const formattedDate = `${month}/${day}/${year}`
            return formattedDate
        }
        

        rfp_user = await RFP.create({
            rfp : await generateIdentifier(),
            call_sign : req.body.call_sign,
            description : req.body.description,
            customer_name : req.body.name,
            spoc : req.body.spoc,
            date : await createDate()
        })

        user = await User.create({
            name : req.body.name,
            email : req.body.email,
            phone_number : req.body.phone_number
            
        })
        


        

        res.status(200).json({ user, rfp_user });

    }catch (error) {
        console.log(error);
        User.deleteOne(user)
        RFP.deleteOne(rfp_user)

        res.status(500).send({errors : error});
    }
    });

module.exports = router
