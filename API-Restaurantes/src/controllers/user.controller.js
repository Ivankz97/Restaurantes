import User from "../models/User";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const email = process.env.MAILER_EMAIL_ID || 'auth_email_address@gmail.com';
const nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport({
    service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
    auth: {
        user: '', // Su correo de Gmail
        pass: '' // Contraseña de su correo
    }
});


// Controlador para crear nuevo usuario
export async function newUser(req, res, next) {
    const { e_mail } = req.body;
    await User.findOne({
        where: { e_mail }
    }).then(admin => {
        if (admin) {
            return res.status(409).json({
                message: "El usario ya se encuentra registrado"
            });
        } else {
            // Trata de encriptar la contraseña 
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    try {
                        let newUser = User.create({
                            name: req.body.name,
                            last_name: req.body.last_name,
                            e_mail: req.body.e_mail,
                            password: hash,
                            phone: req.body.phone,
                            postal_code: req.body.postal_code,
                            experience: req.body.experience
                        }, {
                                fields: ['name', 'last_name', 'e_mail', 'password', 'phone', 'postal_code', 'experience']
                            });
                        if (newUser) {
                            return res.json({
                                message: 'Usuario creado satisfactoriamente',
                                data: newUser
                            });
                        }
                    } catch (error) {
                        console.log(err);
                        res.status(500).json({
                            message: 'Something goes wrong',
                            data: {}
                        })
                    }
                }
            });
        }
    });
}

// Controlador para el login
export async function loginUser(req, res, next) {
    const { e_mail } = req.body;
    await User.findOne({
        where: { e_mail }
    }).then(user => {
        if (!user) {
            return res.status(401).json({
                message: "El correo electronico o la contraseña son incorrectas"
            });
        }
        // Compara la contraseña ingresada con la almacenada en la base de datos
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: "Auth fallida"
                });
            }
            if (result) {
                const token = jwt.sign({
                    userId: user.id,
                    e_mail: user.e_mail
                }, "secretpassword", {
                        expiresIn: "1h"
                    }
                );
                token: token
                return res.status(200).json(token);
                /*return res.status(200).json({
                    message: "Auth successful",
                    token: token
                })*/
            }
            if (req.body.password != user.password) {
                return res.status(401).json({
                    message: "El correo electronico o la contraseña son incorrectas"
                });
            }
        });
    })
}

export async function logout(req, res, next) {
    if (!req.accessToken) return res.sendStatus(401); //return 401:unauthorized if accessToken is not present
    User.logout(req.accessToken.id, function (err) {
        if (err) return next(err);
    });
}

// Controlador para obtener todos los usuarios
export async function getUsers(req, res) {
    try {
        const users = await User.findAll()
        res.json({
            data: users
        });
    } catch (e) {
        console.log(e);
    }
}

// Controlador para obtener un usuario en especifico
export async function getUser(req, res) {
    try {
        const { id } = req.params;
        const user = await User.findOne({
            where: {
                id: id
            }
        });
        res.json({
            data: user
        })
    } catch (error) {
        console.log(error);
    }
}

// Controlador para borrar un usuario
export async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        const user = await User.destroy({
            where: {
                id: id
            }
        });
        res.json({
            message: 'User deleted succesfully',
            count: user
        });
    } catch (error) {
        console.log(error);
    }
}

// Controlador para actualizar un usuario
export async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { name, last_name, e_mail, password, phone, postal_code, experience } = req.body;

        const users = await User.findAll({
            attributes: ['id', 'name', 'last_name', 'e_mail', 'password', 'phone', 'postal_code', 'experience'],
            where: {
                id: id
            }
        });
        if (users.length > 0) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                users.forEach(async user => {
                    await user.update({
                        name,
                        last_name,
                        e_mail,
                        password: hash,
                        phone,
                        postal_code,
                        experience
                    });
                })
                return res.json({
                    message: 'User updated successfully',
                    data: users
                });
            });
        } else {
            return res.json({
                message: 'User does not exists',
                data: users
            });
        }
    } catch (error) {
        console.log(error);
    }
}


export async function forgotPassword(req, res) {
    const { e_mail } = req.body;
    try {
        await User.findOne({
            where: { e_mail }
        }).then(user => {
            if (user) {
                res.json({
                    message: 'Por favor, revise su correo'
                })
            } else {
                return res.json({
                    message: 'User does not exists',
                });
            }
            crypto.randomBytes(20, function (err, buffer) {
                let token = buffer.toString('hex');
                if (user) {
                    user.update({
                        token: token
                    });
                    let data = {
                        to: user.e_mail,
                        from: email,
                        subject: 'Password help has arrived!',
                        text: "Sustituir contraseña",
                        html: "<h1>Entre al siguiente enlace para sustituir su contraseña:</h1> <p>http://localhost:3000/auth/reset_password?token=" + token + "</p>"
                    }
                    smtpTransport.sendMail(data, function (err) {
                        if (!err) {
                            return res.json({ message: 'Por favor, revise su correo' });
                        } else {
                            return console.log(err);
                        }
                    });
                } else {
                    return res.json({
                        message: 'User does not exists',
                    });
                }
            });
        });
    } catch (error) {
        console.log(error);
    }
}



export async function resetPassword(req, res, next) {
    const { token } = req.body;
    await User.findOne({
        where: {token},
    }).then(user => {
        if (user) {
            if (req.body.newPassword === req.body.verifyPassword) {
                bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                    });
                }else{
                    user.password = hash;
                    user.update({
                        password: user.password,
                        token: 'undefined'
                    });
                    if(!hash){
                        return res.status(422).send({
                            message: 'Ha ocurrido un problema, intentelo más tarde'
                        });
                    }else{
                        let data = {
                            to: user.e_mail,
                            from: email,
                            subject: 'Password Reset Confirmation',
                            text: "Sustituir contraseña",
                            context: {
                                name: user.name.split(' ')
                            }
                        }

                        smtpTransport.sendMail(data, function (err) {
                            if (!err) {
                                return res.json({ message: 'Password reset' });
                            } else {
                                return done(err);
                            }
                        });
                    }
                }
            })} else {
                return res.status(422).send({
                    message: 'Passwords do not match'
                });
            }
        } else {
            return res.status(400).send({
                message: 'Password reset token is invalid or has expired.'
            });
        }
    });
};