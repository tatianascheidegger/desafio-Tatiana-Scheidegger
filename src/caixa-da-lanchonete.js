class CaixaDaLanchonete {
    constructor() {
        // Definição do cardápio com itens e seus valores
        this.cardapio = {
            cafeteria: { descricao: "Café", valor: 3.00 },
            chantily: { descricao: "Chantily (extra do Café)", valor: 1.50 },
            suco: { descricao: "Suco Natural", valor: 6.20 },
            sanduiche: { descricao: "Sanduíche", valor: 6.50 },
            queijo: { descricao: "Queijo (extra do Sanduíche)", valor: 2.00 },
            salgado: { descricao: "Salgado", valor: 7.25 },
            combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.50 },
            combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.50 }
        };

        // Formas de pagamento aceitas
        this.formasDePagamento = ["dinheiro", "credito", "divida"];
    }

    calcularValorDaCompra(formaDePagamento, itens) {
        // Verificação da forma de pagamento
        if (!this.formasDePagamento.includes(formaDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        // Verificação de carrinho vazio
        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        let total = 0;
        let itensPrincipais = new Set();

        // Cálculo do valor total da compra
        for (const item of itens) {
            const [codigo, quantidade] = item.split(",");
            
            // Verificação de item inválido
            if (!this.cardapio[codigo]) {
                return "Item inválido!";
            }

            // Verificação de quantidade inválida
            if (quantidade <= 0) {
                return "Quantidade inválida!";
            }

            // Cálculo do valor do item
            total += this.cardapio[codigo].valor * parseInt(quantidade);

            // Adição de itens principais ao conjunto
            if (!codigo.endsWith("extra")) {
                itensPrincipais.add(codigo);
            }
        }

        // Verificação de itens extras sem itens principais correspondentes
        const itemExtras = itens.filter(item => item.startsWith("99"));

        for (const itemExtra of itemExtras) {
            const itemPrincipalCodigo = itemExtra.slice(2);

            if (!itensPrincipais.has(itemPrincipalCodigo)) {
                return "Item extra não pode ser pedido sem o principal";
            }
        }

        // Aplicação de desconto ou acréscimo baseado na forma de pagamento
        if (formaDePagamento === "dinheiro") {
            total *= 0.95;  // Desconto de 5% para pagamento em dinheiro
        } else if (formaDePagamento === "credito") {
            total *= 1.03;  // Acréscimo de 3% para pagamento no crédito
        }

        // Formatação do valor total para retorno
        return `R$ ${total.toFixed(2).replace(".", ",")}`;
    }
}

export { CaixaDaLanchonete };