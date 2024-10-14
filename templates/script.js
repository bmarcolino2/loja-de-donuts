let carrinho = [];
let total = 0;

function mostrarCatalogo() {
    document.getElementById('catalogo').classList.add('ativa');
    document.getElementById('carrinho').classList.remove('ativa');
}

function mostrarCarrinho() {
    document.getElementById('carrinho').classList.add('ativa');
    document.getElementById('catalogo').classList.remove('ativa');
    atualizarCarrinho();
}

function adicionarAoCarrinho(nome, preco, massaId, coberturaId, confeitosId) {
    const massa = document.getElementById(massaId).value;
    const cobertura = document.getElementById(coberturaId).value;
    const confeitos = document.getElementById(confeitosId).value;

    // Verifica se todos os valores foram inseridos
    if (!massa || !cobertura || !confeitos) {
        alert("Por favor, preencha todos os campos antes de adicionar ao carrinho.");
        return;
    }

    const item = {
        nome: nome,
        preco: preco,
        massa: massa,
        cobertura: cobertura,
        confeitos: confeitos,
        quantidade: 1
    };

    // Verifica se o item já está no carrinho
    const itemExistente = carrinho.find(i => 
        i.nome === nome && i.massa === massa && i.cobertura === cobertura && i.confeitos === confeitos
    );

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push(item);
    }

    total += preco;
    document.getElementById('cart-count').innerText = carrinho.length;
    alert('Item adicionado ao carrinho!');
}

function removerDoCarrinho(nome, massa, cobertura, confeitos) {
    const itemIndex = carrinho.findIndex(i => 
        i.nome === nome && i.massa === massa && i.cobertura === cobertura && i.confeitos === confeitos
    );
    if (itemIndex > -1) {
        total -= carrinho[itemIndex].preco * carrinho[itemIndex].quantidade;
        carrinho.splice(itemIndex, 1);
    }
    document.getElementById('cart-count').innerText = carrinho.length;
    atualizarCarrinho();
}

function aumentarQuantidade(nome, massa, cobertura, confeitos) {
    const itemExistente = carrinho.find(i => 
        i.nome === nome && i.massa === massa && i.cobertura === cobertura && i.confeitos === confeitos
    );
    if (itemExistente) {
        itemExistente.quantidade++;
        total += itemExistente.preco;
    }
    atualizarCarrinho();
}

function diminuirQuantidade(nome, massa, cobertura, confeitos) {
    const itemExistente = carrinho.find(i => 
        i.nome === nome && i.massa === massa && i.cobertura === cobertura && i.confeitos === confeitos
    );
    if (itemExistente && itemExistente.quantidade > 1) {
        itemExistente.quantidade--;
        total -= itemExistente.preco;
    }
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const carrinhoList = document.getElementById('carrinho-list');
    carrinhoList.innerHTML = '';
    carrinho.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `${item.nome} (${item.massa}, ${item.cobertura}, ${item.confeitos}) - R$ ${item.preco.toFixed(2)} x ${item.quantidade}
            <button class="decrease-button" onclick="diminuirQuantidade('${item.nome}', '${item.massa}', '${item.cobertura}', '${item.confeitos}')">-</button>
            <button class="increase-button" onclick="aumentarQuantidade('${item.nome}', '${item.massa}', '${item.cobertura}', '${item.confeitos}')">+</button>
            <button class="delete-button" onclick="removerDoCarrinho('${item.nome}', '${item.massa}', '${item.cobertura}', '${item.confeitos}')">Remover</button>`;
        carrinhoList.appendChild(li);
    });
    document.getElementById('total').innerText = `Total: R$ ${total.toFixed(2)}`;
}

function esconderCampoTroco() {
    document.getElementById('troco-container').style.display = 'none';
}

function mostrarCampoTroco() {
    document.getElementById('troco-container').style.display = 'block';
}

function calcularTroco() {
    const valorRecebido = parseFloat(document.getElementById('valor-recebido').value);
    if (valorRecebido >= total) {
        const troco = valorRecebido - total;
        document.getElementById('troco').innerText = `Troco: R$ ${troco.toFixed(2)}`;
    } else {
        document.getElementById('troco').innerText = 'Valor insuficiente!';
    }
}

function finalizarPedido() {
    const whatsappNumber = document.getElementById('whatsapp-number').value;
    if (!whatsappNumber) {
        alert('Por favor, insira seu número do WhatsApp!');
        return;
    }

    const formaPagamento = document.querySelector('input[name="payment"]:checked');
    if (!formaPagamento) {
        alert('Por favor, escolha uma forma de pagamento!');
        return;
    }

    const mensagem = `Olá! Gostaria de fazer o pedido:\n${carrinho.map(item => `${item.nome} (${item.massa}, ${item.cobertura}, ${item.confeitos}) - Quantidade: ${item.quantidade}`).join('\n')}\nTotal: R$ ${total.toFixed(2)}\nForma de pagamento: ${formaPagamento.value}`;
    
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensagem)}`;
    window.open(url);

    // Limpar o carrinho após a finalização
    carrinho = [];
    total = 0;
    document.getElementById('cart-count').innerText = 0;
    atualizarCarrinho();
}
