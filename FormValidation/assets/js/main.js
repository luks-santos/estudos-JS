class FormValidation {
    constructor() {
        this.form = document.querySelector('.form');
        this.inputCPF = document.querySelector('.cpf');
        this.events();
    }

    events() {
        this.form.addEventListener('submit', e => {
            this.handleSubmit(e);
        })

        this.inputCPF.addEventListener('input', event => {
            let value = event.target.value;
            value = value.replace(/\D/g, '');
            value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o primeiro ponto
            value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o segundo ponto
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona o hífen
            event.target.value = value;
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const validFields = this.validateInputs();
        const validPassword = this.validatePassword();

        if (validFields && validPassword) {
            alert('Form enviado ao backend!');
            this.form.submit();
        }
    }

    validatePassword() {
        let valid = true;

        const pass1 = document.querySelector('.senha');
        const pass2 = document.querySelector('.repetir-senha');
        
        if (pass1.value !== pass2.value) {
            valid = false;
            this.setError(pass1, 'Campos senha e repetir senha precisar ser iguais.');
            this.setError(pass2, 'Campos senha e repetir senha precisar ser iguais.');
        }
        
        if (pass1.value.length < 6) {
            valid = false;
            this.setError(pass1, 'Senha precisa ser maior que 6 caracteres.');
        }

        return valid;
    }

    validateInputs() {
        let valid = true;
        for (let errorText of document.querySelectorAll('.error-text')) {
            errorText.remove();
        }

        for (let input of document.querySelectorAll('.validar')) {
            const labelInput = input.previousElementSibling.innerHTML;
            
            if (!input.value) {
                this.setError(input, `Campo "${labelInput}" não pode ser vazio.`);
                valid = false;
            }

            if (input.classList.contains('cpf')) {
                if (!this.validCPF(input)) {
                    this.setError(input, 'Informe um CPF válido.');
                    valid = false;
                } 
            }

            if (input.classList.contains('usuario')) {
                if (!this.validUser(input)) {
                    valid = false;
                }
            }
        }
        return valid;
    }

    validUser(inputUser) {
        let valid = true;
        const userValue = inputUser.value;

        if (userValue.length < 3 || userValue.length > 12) {
            this.setError(inputUser, 'Usuário precisa ter entre 3 e 12 caracteres.');
            valid =  false;
        }
        
        if (!userValue.match(/^[a-zA-Z0-9]+$/g)) {
            this.setError(inputUser, 'Nome de usuário precisar conter apenas letras e/ou números.');
            valid = false;
        }
        
        return valid;
    }

    validCPF(inputCPF) {
        const validCPF = new ValidateCPF(inputCPF.value);
        
        return validCPF.validate();      
    }

    setError(input, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        input.insertAdjacentElement('beforebegin', div);
    }
}
const form = new FormValidation();