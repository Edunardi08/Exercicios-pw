// Seleciona o elemento que exibe o resultado
const display = document.querySelector('.display');

// Seleciona todos os botões dentro do container .botoes
const botoes = document.querySelectorAll('.botoes button');

// Variável para armazenar a expressão matemática completa
let expressaoAtual = ''; 

// Função para atualizar o display na tela
function atualizarDisplay(valor) {
    display.textContent = valor;
}

// Adiciona um listener de evento para cada botão
botoes.forEach(button => {
    button.addEventListener('click', () => {
        const valorBotao = button.textContent;

        if (valorBotao === 'C') {
            // Ação de Limpar
            expressaoAtual = '';
            atualizarDisplay('0');
            return;
        }

        if (valorBotao === '=') {
            // Ação de Calcular
            try {
                // Remove operadores no início ou fim da string antes de calcular
                let expressaoLimpa = expressaoAtual.replace(/^[+\-*/.]+|[+\-*/.]$/g, '');

                // Verifica se a expressão não está vazia
                if (expressaoLimpa) {
                    // ATENÇÃO: eval() é usado para simplicidade, mas pode ser inseguro em grandes projetos.
                    const resultado = eval(expressaoLimpa);
                    atualizarDisplay(resultado);
                    expressaoAtual = resultado.toString(); // Prepara para o próximo cálculo
                }
            } catch (error) {
                // Trata erros de sintaxe (ex: 5 + *)
                atualizarDisplay('Erro!');
                expressaoAtual = '';
            }
            return;
        }
        
        // Se for número, operador ou ponto
        if (valorBotao !== '=' && valorBotao !== 'C') {
            const ultimoCaractere = expressaoAtual.slice(-1);
            const isOperador = ['+', '-', '*', '/'].includes(valorBotao);
            const ultimoEhOperador = ['+', '-', '*', '/'].includes(ultimoCaractere);

            // Evita adicionar múltiplos operadores seguidos, substituindo o anterior
            if (ultimoEhOperador && isOperador) {
                expressaoAtual = expressaoAtual.slice(0, -1) + valorBotao;
            } else {
                // Evita múltiplos pontos em números (ex: 5.5.5) e permite adicionar normalmente
                expressaoAtual += valorBotao;
            }

            // Garante que o display não comece com '0' se estiver vazio
            if (expressaoAtual.length === 1 && expressaoAtual.startsWith('0') && expressaoAtual !== '0.') {
                expressaoAtual = expressaoAtual.substring(1);
            }
            
            // Atualiza o display
            atualizarDisplay(expressaoAtual || '0'); // Se a string estiver vazia, mostra '0'
        }
    });
});
