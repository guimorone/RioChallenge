const botao1 = document.getElementById('enviar');
botao1.onclick = _ => {
    const input1 = document.getElementById('codigoPonto').value;
    if(input1 != '') {
        botao1.href = '/ponto/' + input1; 
    } else {
        botao1.href = '#';
    }
};

const botao2 = document.getElementById('enviarInti');
botao2.onclick = _ => {
    const input2 = document.getElementById('typeIdInti').value;
    if(input2 != '') {
        botao2.href = '/inti/' + input2; 
    } else {
        botao2.href = '#';
    }
};