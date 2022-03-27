let inputName = document.querySelector('#name')
let monthlyPayment =  document.querySelector('#monthlyPayment')
let interestCompound = document.querySelector('#interestCompound')
let contributionTime = document.querySelector('#contributionTime')


inputName.addEventListener("keypress", function(e) {

    const keyCode = (e.keyCode ? e.keyCode : e.wich)

    if(keyCode > 47 && keyCode < 58) {
        e.preventDefault()
    }

    if(!charValidation(e)) {
        e.preventDefault()
    }
})

function charValidation(e) {

    const char = String.fromCharCode(e.keyCode)

    const pattern = '[a-zA-Z0-9]+'

    if(char.match(pattern)){
        console.log(char)
        return true
    }
}

function displayResult(data) {
    let monthlyNumber =  Number(monthlyPayment.value.toString().replace('.',''))
    let convertMonthly = monthlyNumber.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL', minimumFractionDigits: 2})
    
    let resultNumber = Number(data.result)
    let resultConvert = resultNumber.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL', minimumFractionDigits: 2})
    let resultHtml = document.querySelector('#result')

    let validation = false


    if(!inputName.value) {  
        validation = true
        inputName.classList.add('inputError')
        document.querySelector('.nameError').innerText = "Preencha o campo nome."

    }else{
        inputName.classList.remove('inputError')
        document.querySelector('.nameError').innerText = ''
        resultHtml.innerHTML = ""
    }

    if(!monthlyPayment.value) {
        validation = true
        monthlyPayment.classList.add('inputError')
        document.querySelector('.monthlyError').innerText = "Preencha o campo mensalidade."

    }else{
        monthlyPayment.classList.remove('inputError')
        document.querySelector('.monthlyError').innerText = ""
        resultHtml.innerHTML = ""
        
    }

    if(!interestCompound.value) {
        validation = true
        interestCompound.classList.add('inputError')
        document.querySelector('.interestError').innerText = "Preencha o campo da taxa de juros."

    }else {
        interestCompound.classList.remove('inputError')
        document.querySelector('.interestError').innerText = ""
        resultHtml.innerHTML = ""

    }

    if(!contributionTime.value){
        validation = true
        contributionTime.classList.add('inputError')
        document.querySelector(".timeError").innerText = "Selecione o tempo de contribuição."

    }else{
        contributionTime.classList.remove('inputError')
        document.querySelector(".timeError").innerText = ""
        resultHtml.innerHTML = ""
    }

    if(!validation){

        resultHtml.innerHTML = 
        `
        <h3>Olá ${inputName.value}, investindo ${convertMonthly} todo mês, você terá ${resultConvert} em ${contributionTime.value} meses sob uma taxa de juros de ${interestCompound.value}% no mês.</h3>
        
        `
    }


}


function clearFields() {

    let resultHtml = document.querySelector('#result')

    inputName.value = ""
    monthlyPayment.value = ""
    interestCompound.value = ""
    contributionTime.value = ""
    
    resultHtml.innerHTML = ""

    inputName.classList.remove('inputError')
    document.querySelector('.nameError').innerText = ''

    monthlyPayment.classList.remove('inputError')
    document.querySelector('.monthlyError').innerText = ''

    interestCompound.classList.remove('inputError')
    document.querySelector('.interestError').innerText = ''

    contributionTime.classList.remove('inputError')
    document.querySelector('.timeError').innerText = ''
}

const resetSimulator = document.querySelector('#resetSimulator')


resetSimulator.addEventListener('click', () => {

    clearFields()
})

function userSimulator() {
    event.preventDefault()

    

    let url = "http://api.mathjs.org/v4/"

    let options = {

        method: 'POST',

        headers: {'content-type': 'application/json'},

        body: JSON.stringify({

            "expr": [`${monthlyPayment.value.toString().replace('.', '')} * (((1 + ${interestCompound.value/100}) ^ ${contributionTime.value} -1) / ${interestCompound.value/100})`]
        })
    }


    fetch(url, options)
        .then(response => response.json())
        .then(displayResult)
        .catch(e => console.log("Ocorreu um erro:" + e.message))
        
        
}