const display = document.querySelector(".display");

const teclasNumeros = document.querySelectorAll("[id*=tecla]");

const operadores = document.querySelectorAll("[id*=operador]");

const historico = document.querySelector(".historico");

let novoNumero = true;
let operador;
let numeroAnterior;
let calculoHistorico;

const atualizarDisplay = (texto) => {
  if (novoNumero === true) {
    display.textContent = texto;
    novoNumero = false;
  } else {
    display.textContent += texto;
  }
};

const inserirNumero = (event) => atualizarDisplay(event.target.textContent);

teclasNumeros.forEach(function (tecla) {
  tecla.addEventListener("click", inserirNumero);
});

const selecionarOperador = (event) => {
  novoNumero = true;
  operador = event.target.textContent;
  calculoHistorico = display.textContent + operador;
  numeroAnterior = display.textContent.replace(",", ".");
};

operadores.forEach((operador) => {
  operador.addEventListener("click", selecionarOperador);
});

const calcular = () => {
  //verificamos se há um operador em memória
  if (operador !== undefined) {
    calculoHistorico += display.textContent;
    //pega o número do display e coloca em numeroAtual
    const numeroAtual = display.textContent.replace(",", ".");
    //seta novoNumero como verdadeiro, ´
    //para que possamos atualizar o display com o resultado
    novoNumero = true;
    //calculamos o resultado com a função eval
    //o eval interpreta uma expresssão, executa e retorna o resultado
    let resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);
    //atualizamos o display com o resultado calculado
    if (resultado.toString().includes(".")) {
      resultado = resultado.toFixed(1);
    }

    calculoHistorico += "=" + resultado.toString().replace(".", ",");

    atualizarDisplay(resultado.toString().replace(".", ","));
    //resetamos o operador como indefinido (estado inicial)
    operador = undefined;

    incluirHistorico();
  }
};

const incluirHistorico = () => {
  const novoHistorico = document.createElement("p");
  novoHistorico.textContent = calculoHistorico;

  historico.appendChild(novoHistorico);

  novoHistorico = undefined;
};

const ativarIgual = () => calcular();

document.querySelector("#igual").addEventListener("click", ativarIgual);

const limparDisplay = () => (display.textContent = "");

document
  .querySelector("#limparDisplay")
  .addEventListener("click", limparDisplay);

const limparCalculo = () => {
  limparDisplay();
  operador = undefined;
  novoNumero = true;
  numeroAnterior = undefined;
};

document
  .querySelector("#limparCalculo")
  .addEventListener("click", limparCalculo);

//é uma boa prática utilizar sempre a função de abstração para fazer algo no sistema
const removerUltimoNumero = () => {
  novoNumero = true;
  atualizarDisplay(display.textContent.slice(0, -1));
};

document
  .querySelector("#backspace")
  .addEventListener("click", removerUltimoNumero);

//criar a função que atualiza o display invertendo o sinal (*-1)
const inverterSinal = () => {
  novoNumero = true;
  atualizarDisplay(display.textContent * -1);
};

//atribuir a função criada ao botão de inversão
document.querySelector("#inverter").addEventListener("click", inverterSinal);

const inserirDecimal = () => {
  if (!display.textContent.includes(",")) {
    if (display.textContent.length > 0) {
      atualizarDisplay(",");
    } else {
      atualizarDisplay("0,");
    }
  }
};