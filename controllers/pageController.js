import nodemailer from 'nodemailer';

const getAboutPage = (req, res) => {
    res.status(200).render('about', {
        page_name: "about"
    });
};

const getIndexPage = (req, res) => {
    console.log(req.session.userID);
    res.status(200).render('index', {
        page_name: "index"
    });
};




const getRegisterPage = (req, res) => {
    res.status(200).render('register', {
        page_name: "register"
    });
};


const getLoginPage = (req, res) => {
    res.status(200).render('login', {
        page_name: "login"
    });
};


const getContactPage = (req, res) => {
    res.status(200).render('contact', {
        page_name: "contact"
    });
};

const sendEmail = async (req, res) => {
    try {
        const outputMessage = `
    <h1>Mail Details </h1>
    <ul>
        <li>Name : ${req.body.name} </li>
        <li>Email : ${req.body.email} </li>
    </ul>
    <h1>Message</h1>
    <p> ${req.body.message}  </p>
    `

        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.USER_MAIL, // generated ethereal user
                pass: process.env.USER_PASSWORD, // generated ethereal password
            },
        });

        const mail = "ismetcanbyk@gmail.com";

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: `"SMART EDU CONTACT FORM" <${process.env.USER_MAIL}>`, // sender address
            to: mail, // list of receivers
            subject: "New Message ✔", // Subject line
            html: outputMessage, // html body
        });



        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

        req.flash("success", "We Received Your Message Succesfully ");

        res.status(200).redirect('/contact');
    } catch (error) {
        req.flash("error", `Something happened!`);
    }
};



export { getAboutPage, getIndexPage, getContactPage, getRegisterPage, getLoginPage, sendEmail };