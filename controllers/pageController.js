

const getAboutPage = (req, res) => {
    res.status(200).render('about', {
        page_name: "about"
    });
};

const getIndexPage = (req, res) => {
    res.status(200).render('index', {
        page_name: "index"
    });
};


const getContactPage = (req, res) => {
    res.status(200).render('contact', {
        page_name: "contact"
    });
};

const getDashboardPage = (req, res) => {
    res.status(200).render('dashboard', {
        page_name: "dashboard"
    });
};

const getRegisterPage = (req, res) => {
    res.status(200).render('register', {
        page_name: "register"
    });
};

export { getAboutPage, getIndexPage, getContactPage, getDashboardPage, getRegisterPage };