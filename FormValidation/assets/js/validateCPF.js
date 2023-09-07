class ValidateCPF {

    constructor(cpfValue) {
        this.cpfValue = cpfValue.replace(/\D+/g, '');
    }

    
    get getCpfValue () {
        return this.cpfValue;
    }
    
    isSequencial() {
        return this.getCpfValue[0].repeat(this.getCpfValue.length) === this.getCpfValue;
    }

    static criaDigito(cpfParcial, constMod) {
        const cpfSum = cpfParcial.reduce((ac, valor, index) => {
            return ac + valor * (constMod - index) ;
        }, 0);
    
        let cpfDigit = 11 - (cpfSum % 11);
        return cpfDigit > 9 ? 0 : cpfDigit;
    }
    

    validate() {
        if(typeof this.getCpfValue === 'undefined') return false;
        if(this.getCpfValue.length !== 11) return false;
        if(this.isSequencial()) return false;

        const cpfLimpo = Array.from(this.getCpfValue);
        let cpfNumber = cpfLimpo.map(str => parseInt(str));

        const cpfParcial = cpfNumber.slice(0, -2);
        const cpfDigitOne = ValidateCPF.criaDigito(cpfParcial, 10);
        
        if(!cpfNumber[9] === cpfDigitOne)
            return false;

        const cpfParcial2 = cpfNumber.slice(0, -1);
        const cpfDigitTwo = ValidateCPF.criaDigito(cpfParcial2, 11);

        if(cpfNumber[10] == cpfDigitTwo)
            return true;

        return false;
    }
}