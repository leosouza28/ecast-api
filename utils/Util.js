const Util = {
    getDateBr: (datetime) => {
        let retorno = datetime.split('T')[0].split('-').reverse().join('/');
        return retorno;
    },
    getHoraBr: (datetime) => {
        let horas = datetime.split('T')[1].split(':');
        let retorno = `${horas[0]}:${horas[1]}`;
        return retorno;
    },
    dateBRtoUS: (data) => {
        let dia = data.substring(0, 2)
        let mes = data.substring(3, 5)
        let ano = data.substring(6, 10)
        return ano + '-' + mes + '-' + dia;
    },
    floatToMoney: (text) => {
        if (!text)
            return '0,00';
        return Util.moneyBr(Number(text).toFixed(2).split('.').join(''));
    },
    moneyBr: text => {
        if (!text)
            return '';
        let money = String(Number(Util.somenteNumero(text)));
        if (money.length < 3)
            money = Util.zeroEsquerda(3, money);
        money = money.replace(/([0-9]{2})$/g, ",$1");
        if (money.length > 6)
            money = money.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        return money;
    },
    zeroEsquerda: (zeros, text) => {
        text = text + '';
        let resp = '';
        let size = zeros - text.length;
        for (let i = 0; i < size; i++) {
            resp += '0';
        }
        resp += text;
        return resp;
    },
    somenteNumero(text) {
        if (!text)
            return '';
        let numeros = [];
        '0123456789'.split('')
            .map(value => numeros[value] = true);
        return text.split('')
            .filter(
                value => numeros[value]
            ).join('');
    },

}
module.exports = Util