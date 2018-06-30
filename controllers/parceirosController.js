const ParceirosModel = require('../models/parceirosModel');
const auth = require('../config/auth')

const Parceiros = {
    listarParceiros(req, res, next) {
        ParceirosModel.listarParceiros()
            .then(results => {
                res.send(200, results)
            })
            .catch(err => {
                console.log(err)
                res.send(400, { erro: 'Error!' })
            })
    },
    detalharParceiros(req, res, next) {
        ParceirosModel.detalhesParceiro(req.params.id)
            .then(results => {
                res.send(200, results)
            })
            .catch(err => {
                console.log(err)
                res.send(400, { erro: 'Error!' })
            })
    },
    listarProdutos(req, res, next) {
        ParceirosModel.listarProdutos(req.params.id)
            .then(results => {
                const find = (acc, cur, el) => acc.find(obj => obj[el] == cur[el]);
                const flatten = groupBy => (acc, cur) => {
                    const getNode = find(acc, cur, groupBy);
                    getNode
                        ? getNode.data.push({
                            id_produto: cur.id_produto,
                            nome: cur.nome,
                            desc_produto: cur.desc_produto,
                            valor: cur.valor,
                            embalagem: cur.embalagem
                        })
                        : acc.push({
                            [groupBy]: cur[groupBy],
                            data: [
                                {
                                    id_produto: cur.id_produto,
                                    nome: cur.nome,
                                    desc_produto: cur.desc_produto,
                                    valor: cur.valor,
                                    embalagem: cur.embalagem
                                },
                            ],
                        });
                    return acc;
                };
                const group = (obj, groupBy = 'title') =>
                    obj.reduce(flatten(groupBy), []);

                res.send(200, group(results, 'title'))
            })
            .catch(err => {
                console.log(err)
                res.send(400, { erro: 'Error!' })
            })
    }
}

module.exports = Parceiros