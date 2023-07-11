const userModel = require('../models/model');
const bcrypt = require('bcrypt');


const signUp = async (req, res)=>{
    try {
        const { name, email, password, phoneNumber }= req.body;
        const isEmail = await userModel.findOne({ email });
        if (isEmail) {
            res.status(400).json({
                message: `User with this Email: ${email} already Exist.`
            })
        } else {
            const saltRound = 10;
            const hashPassword = await bcrypt.hash(password, saltRound);
            const data = {
                name,
                email,
                password: hashPassword,
                phoneNumber
            }
            const user = await userModel.create(data);
            if (!user) {
                res.status(404).json({
                    message: 'Cannot create this User. Please Try Again later.'
                });
            } else {
                res.status(201).json({
                    message: 'User created successfully',
                    data: user
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


const signIn = async (req, res) => {
    try {
        const { name, email, password, phoneNumber }= req.body;
        const check = await userModel.findOne({$or: [
            {name: req.body.name},
            {email: req.body.email}
        ]});
        if (!check) {
            res.status(404).json({
                message: `User with this email: ${email} does not exist`
            });
        } else {
            const isPassword = await bcrypt.compare(password, check.password);
            if (!isPassword) {
                res.status(404).json({
                    message: 'Incorrect password'
                });
            } else {
                req.session.isAuth = true;
                res.status(200).json({
                    message: 'Sucessfully Logged in'
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const isAuth = (req, res, next)=>{
    if (req.session.isAuth) {
        next();
    } else {
        res.json('Please Log in before you perform this action.')
    }
}



// get One
const oneUser = async (req, res)=>{
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) {
            res.status(404).json({
                message: 'User not found',
                data: user
            });
        } else {
            res.status(200).json({
                message: 'User Found Successfully',
                data: user
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


module.exports = {signUp, signIn, oneUser, isAuth}






























// const newUser = async (req, res)=>{
//     try {
//         const { name, email, password, phoneNumber }= req.body;

//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         })
//     }
// }



// const allUser = async (req, res)=>{
//     try {
//         const users = await userModel.find();
//         if (!users) {
//             res.status(404).json({
//                 message: 'Users not found',
//                 data: users
//             });
//         } else {
//             res.status(200).json({
//                 message: 'All Users Found Successfully',
//                 data: users
//             })
//         }
//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         })
//     }
// }



// const oneUser = async (req, res)=>{
//     try {
//         const user = await userModel.findById(req.params.id);
//         if (!user) {
//             res.status(404).json({
//                 message: 'User not found',
//                 data: user
//             });
//         } else {
//             res.status(200).json({
//                 message: 'User Found Successfully',
//                 data: user
//             })
//         }
//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         })
//     }
// }



// const updateUser = async (req, res)=>{
//     try {
//         const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
//         if (!user) {
//             res.status(404).json({
//                 message: 'User not found',
//                 data: user
//             });
//         } else {
//             res.status(200).json({
//                 message: 'Updated user Successfully',
//                 data: user
//             })
//         }
//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         })
//     }
// }



// const deleteUser = async (req, res)=>{
//     try {
//         const user = await userModel.findByIdAndUpdate(req.params.id);
//         if (!user) {
//             res.status(404).json({
//                 message: 'User not found',
//                 data: user
//             });
//         } else {
//             res.status(200).json({
//                 message: 'Delete user Successfully',
//                 data: user
//             })
//         }
//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         })
//     }
// }