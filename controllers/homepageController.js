const { mountpath, response, getMaxListeners } = require("../app");
const User = require("../models/User")
const bcrypt = require("bcrypt");
const { render } = require("ejs");
const saltRounds = 10;
const shortid = require("shortid");
const app = require("../app");
const Course = require("../models/Course");

module.exports.index = (req, res) => {
    res.render("index");
    // req.session.destroy();
};
module.exports.landingpage = (req, res) => {
    res.render("landingpage");
    // req.session.destroy();
};

module.exports.login = (req, res) => {
    // let response = { success: false, data: { url: "" } };
    User.find({ email: req.body.email })
        .then((user) => {
            // console.log(user[]);
            // Decrypting Password For validation
            bcrypt.compare(req.body.password, user[0].password, function(
                err,
                result
            ) {
                if (result) {
                    //Session Setup
                    req.session.userObj = user[0];
                    res.status(200);
                    res.redirect("/landingpage");
                } else {
                    // response.data.reason = "Incorrect Password";
                    res.status(401);
                    req.flash("homepageMessage", "Incorrect Password");
                    res.redirect("/");
                }
            });
        })
        .catch((err) => {
            res.status(404);
            req.flash("homepageMessage", "User does not exist");
            res.redirect("/");
        });
};

module.exports.signup = async(req, res) => {
    genHash(req.body.password)
        .then(async(result) => {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                contact: req.body.contact,
                branch: req.body.branch,
                year: req.body.year,
                password: result,
            });

            await user.save((err, result) => {
                try {
                    if (!err) {
                        console.log(result);
                        res.redirect("/landingpage");
                    } else {
                        console.log(err)
                        res.redirect("/")
                    }
                } catch {
                    console.log(err)
                }
            })
        })
        .catch((err) => {
            req.flash("dashboardMessages", err);
            res.redirect("/");
        });

};

// Function for Hashing Password
function genHash(param, callback) {
    return new Promise(function(fulfill, reject) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(param, salt, function(err, hash) {
                if (err) {
                    console.log(err)
                } else {
                    fulfill(hash);
                }
            });
        });
    });
};

module.exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect("/");
};


//student enrolled
module.exports.enroll = async function(req, res, next) {
    let userId = req.session.user._id;
    let id = req.params.id;
    course = {
            userId: userId
        }
        // let comment = req.body.comment;
    let content = await Course.findOneAndUpdate({ '_id': id }, {
        $push: {
            students: course
        }
    }, { 'upsert': true, 'new': true, 'multi': true });
    try {
        // console.log(content)
        res.redirect('back');
    } catch (err) {
        res.redirect('back');
    }
}