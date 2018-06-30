const db = require('../config/db');

const Usuario = {
    login(dados) {
        let sql = `SELECT id, email, nome, tipo_usuario_id tipo, estabelecimento_id estabelecimento FROM usuario WHERE email='${dados.email}' AND senha='${dados.senha}'`;
        return db.execSQL(sql);
    },
    novoCliente(dados) {
        let sql = `INSERT INTO usuario (email, nome, senha, cpf, dt_nasc, tel, tipo_usuario_id)
                            VALUES('${dados.email}', '${dados.nome}', '${dados.senha}', '${dados.cpf}', '${dados.dt_nasc}', '${dados.tel}', 999)`
        return db.execSQL(sql)
    },
    verificarEmail(email) {
        let sql = `SELECT email FROM usuario WHERE email='${email}'`
        return db.execSQL(sql)
    },
    selecionarTodos() {
        let sql = `SELECT email, nome, cpf, dt_nasc, tel FROM usuario`
        return db.execSQL(sql)
    },
    selecionarPorId(id) {
        let sql = `SELECT email, nome, cpf, tel FROM usuario WHERE id = '${id}'`
        return db.execSQL(sql)
    },
    selecionarEmail() {
    },
    inserirNovoEndereco(dados) {
        let sql = `INSERT INTO endereco (nome, cep, endereco, numero, bairro, complemento, referencia, cidade, estado)
                    VALUES ('${dados.descricao}', '${dados.cep}', '${dados.logradouro}', '${dados.numero}', '${dados.bairro}', 
                    '${dados.complemento}', '${dados.referencia}', '${dados.cidade}', '${dados.estado}')`
        return db.execSQL(sql)
    },
    refreshUserHasEndereco(insertRow, userId) {
        let sql = `INSERT INTO usuario_has_endereco (endereco_id, usuario_id) 
                    VALUES ('${insertRow}', '${userId}')`
        return db.execSQL(sql)
    },
    selecionarEnderecos(userId) {
        let sql = `SELECT e.id, e.nome, e.cep, e.endereco, e.numero, e.bairro, e.complemento, e.referencia, e.cidade, e.estado
                    FROM endereco as e, usuario_has_endereco as uhe WHERE e.id = uhe.endereco_id AND uhe.usuario_id = '${userId}'`
        return db.execSQL(sql)
    },
    selecionarEnderecoPorId(enderecoId) {
        let sql = `SELECT cep, endereco, numero, bairro, complemento, cidade, estado FROM endereco WHERE id='${enderecoId}'`
        return db.execSQL(sql)
    }
}

module.exports = Usuario;