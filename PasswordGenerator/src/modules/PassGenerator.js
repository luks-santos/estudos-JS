export default class PassGenerator {
    constructor(lengthPass, includeNumbers, includeUpperLetters, includeLowerLetters, includeSymbols) {
        this.lengthPass = lengthPass;
        this.includeNumbers = includeNumbers;
        this.includeUpperLetters = includeUpperLetters;
        this.includeLowerLetters = includeLowerLetters;
        this.includeSymbols = includeSymbols;
    }

    rand_number(min = 33, max = 126) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    generator () {
        let password_generated = '';

        for (let index = 0; index < this.lengthPass; index++) {

            if(this.includeNumbers) {
                password_generated += String.fromCharCode(this.rand_number(48, 58));
            }
            
            if(this.includeUpperLetters) {
                password_generated += String.fromCharCode(this.rand_number(65, 91));
            }

            if(this.includeSymbols) {
                const symbols = '!@#$%^&*()_+{}[]|:;<>,.?/-=~';
                password_generated+= symbols[this.rand_number(0, symbols.length)];
            }

            if(this.includeLowerLetters) {
                password_generated += String.fromCharCode(this.rand_number(97, 123));
            }
        }
        return password_generated.slice(0, this.lengthPass); 
    }
} 