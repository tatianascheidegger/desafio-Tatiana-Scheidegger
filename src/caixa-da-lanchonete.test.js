// Importando a classe CaixaDaLanchonete do módulo caixa-da-lanchonete
import { CaixaDaLanchonete } from "./caixa-da-lanchonete";

// Iniciando a suíte de testes
describe('CaixaDaLanchonete', () => {
    // Criando uma instância da classe CaixaDaLanchonete para os testes
    const caixa = new CaixaDaLanchonete();

    // Função utilitária para validar os testes
    const validaTeste = (descricao, formaDePagamento, resultadoEsperado, itens) => {
        // Definindo um teste com uma descrição personalizada
        it(`compra ${descricao} em ${formaDePagamento} deve resultar em ${resultadoEsperado}`, () => {
            // Calculando o resultado da compra com base na instância da classe CaixaDaLanchonete
            const resultado = caixa.calcularValorDaCompra(formaDePagamento, itens);

            // Verificando se o resultado calculado coincide com o resultado esperado
            expect(resultado).toEqual(resultadoEsperado);
        });
    };
    // Testes para carrinho vazio
    validaTeste('com carrinho vazio', 'dinheiro', 'Não há itens no carrinho de compra!', []);
    validaTeste('com carrinho vazio', 'credito', 'Não há itens no carrinho de compra!', []);
    validaTeste('com carrinho vazio', 'divida', 'Não há itens no carrinho de compra!', []);

    // Testes para compra simples
    validaTeste('simples', 'dinheiro', 'R$ 2,85', ['cafeteria,1']);
    validaTeste('simples', 'credito', 'R$ 3,09', ['cafeteria,1']);
    validaTeste('simples', 'divida', 'R$ 3,00', ['cafeteria,1']);

    // Testes para compra de 3 itens
    validaTeste('de 3 itens', 'credito', 'R$ 11,85', ['cafeteria,1', 'sanduiche,1', 'queijo,1']);
    validaTeste('de 3 itens', 'divida', 'R$ 11,50', ['cafeteria,1', 'sanduiche,1', 'queijo,1']);

    // Testes para compra de múltiplas quantidades
    validaTeste('de múltiplas quantidades', 'dinheiro', 'R$ 33,73', ['cafeteria,4', 'sanduiche,3', 'queijo,2']);
    validaTeste('de múltiplas quantidades', 'credito', 'R$ 36,56', ['cafeteria,4', 'sanduiche,3', 'queijo,2']);
    validaTeste('de múltiplas quantidades', 'divida', 'R$ 35,50', ['cafeteria,4', 'sanduiche,3', 'queijo,2']);

    // Testes para casos especiais
    validaTeste('com quantidade zero', 'dinheiro', 'Quantidade inválida!', ['cafeteria,0']);
    validaTeste('com um valor', 'credito', 'Item inválido!', ['1']);
    validaTeste('com código inexistente', 'divida', 'Item inválido!', ['pizza,1']);
    validaTeste('com forma de pagamento inválida', 'especie', 'Forma de pagamento inválida!', ['cafeteria,1']);

    // Testes para itens extras sem principais
    validaTeste('chantily em dinheiro', 'dinheiro', 'Item extra não pode ser pedido sem o principal', ['cafeteria,1', 'chantily,1']);
    validaTeste('queijo em credito', 'credito', 'Item extra não pode ser pedido sem o principal', ['sanduiche,1', 'queijo,1']);
    validaTeste('chantily com outro item em credito', 'credito', 'Item extra não pode ser pedido sem o principal', ['cafeteria,1', 'chantilyextra,1']);
    validaTeste('queijo com outro item em divida', 'divida', 'Item extra não pode ser pedido sem o principal', ['sanduiche,1', 'queijoextra,1', 'salgado,1']);
    });
