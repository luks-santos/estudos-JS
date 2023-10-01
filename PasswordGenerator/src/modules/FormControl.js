import PassGenerator from "./PassGenerator";

document.addEventListener('DOMContentLoaded', () => {
    const spanPasswordGenerated = document.querySelector('.span-pass');
    const btnGeneratePassword = document.querySelector('.btn-generate');

    btnGeneratePassword.addEventListener('click', () => {
        const qtyCharInput = document.querySelector('#qty-characters');
        const chkNumberInput = document.querySelector('#chk-include-numbers');
        const chkUpperLetterInput = document.querySelector('#chk-include-upper-letters');
        const chkLowerLetterInput = document.querySelector('#chk-include-lower-letters');
        const chkSymbolsInput = document.querySelector('#chk-include-symbols');
        
        const passGenerator = new PassGenerator(
            qtyCharInput.value,
            chkNumberInput.checked,
            chkUpperLetterInput.checked,
            chkLowerLetterInput.checked,
            chkSymbolsInput.checked
        );

        const generatedPassword = passGenerator.generator();
        spanPasswordGenerated.innerHTML = generatedPassword;      
    });
});