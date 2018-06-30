const jwt = require('jsonwebtoken')
const secretKey = 'ecastsecrettoken'

const auth = {
    gerarToken(user) {
        return new Promise((resolve, reject) => {
            jwt.sign({ user }, secretKey, { expiresIn: '1 day' }, (err, token) => {
                if (token) {
                    resolve(token)
                } else {
                    reject(err)
                }
            })
        })
    },
    verificarToken(req, res, next) {
        let { token } = req.headers
        jwt.verify(token, secretKey, (err, decoded) => {
            if (decoded) {
                req.usuario = decoded.user;
                return next()
            } else {
                console.log(err)
                res.send(401, { erro: 'Sessão expirada.' })
            }
        })
    }
}

module.exports = auth