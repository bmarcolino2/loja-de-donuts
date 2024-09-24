const catalogo = document.getElementById('catalogo');
const carrinho = document.getElementById('carrinho');
const catalogoButton = document.querySelector('header button:nth-of-type(1)');
const carrinhoButton = document.querySelector('header button:nth-of-type(2)');
const catalogoList = document.getElementById('catalogo-list');
const carrinhoList = document.getElementById('carrinho-list');
const totalValor = document.getElementById('total-valor');
let carrinhoItems = [];
let total = 0;

function mostrarCatalogo() {
    catalogo.classList.add('ativa');
    carrinho.classList.remove('ativa');
}

function mostrarCarrinho() {
    catalogo.classList.remove('ativa');
    carrinho.classList.add('ativa');
}

function adicionarAoCarrinho(nome, preco, massaId, coberturaId, confeitosId) {
    const massa = document.getElementById(massaId).value;
    const cobertura = document.getElementById(coberturaId).value;
    const confeitos = document.getElementById(confeitosId).value;

    const item = { nome, preco, massa, cobertura, confeitos };
    carrinhoItems.push(item);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    carrinhoList.innerHTML = '';
    total = 0;

    carrinhoItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.nome} - R$ ${item.preco.toFixed(2)}<br>
            Massa: ${item.massa}<br>
            Cobertura: ${item.cobertura}<br>
            Confeitos: ${item.confeitos}<br>
            <button class="decrease-button" onclick="decreaseItem(${index})">-</button>
            <button class="increase-button" onclick="increaseItem(${index})">+</button>
            <button class="delete-button" onclick="removerItem(${index})">Remover</button>
        `;
        carrinhoList.appendChild(li);
        total += item.preco;
    });

    totalValor.textContent = total.toFixed(2);
}

function removerItem(index) {
    carrinhoItems.splice(index, 1);
    atualizarCarrinho();
}

function increaseItem(index) {
    carrinhoItems[index].preco += 5; // Simples exemplo de aumento no preço
    atualizarCarrinho();
}

function decreaseItem(index) {
    if (carrinhoItems[index].preco > 5) {
        carrinhoItems[index].preco -= 5; // Simples exemplo de diminuição no preço
    }
    atualizarCarrinho();
}

function finalizarPedido() {
    const whatsappNumber = document.getElementById('whatsapp-number').value;
    if (whatsappNumber) {
        const mensagem = `Pedido:\n${carrinhoItems.map(item => `${item.nome} - R$ ${item.preco.toFixed(2)}\nMassa: ${item.massa}\nCobertura: ${item.cobertura}\nConfeitos: ${item.confeitos}`).join('\n')}\nTotal: R$ ${total.toFixed(2)}`;
        window.open(`https://wa.me/${48988478865}?text=${encodeURIComponent(mensagem)}`);
    } else {
        alert('48988478865');
    }
}

catalogoButton.addEventListener('click', mostrarCatalogo);
carrinhoButton.addEventListener('click', mostrarCarrinho);

// Exibir a página de catálogo por padrão
mostrarCatalogo();
let cart = [];
const cartIcon = document.getElementById('cart-icon');
const cartCount = document.getElementById('cart-count');

// Função para adicionar produto ao carrinho
function addToCart(product) {
    cart.push(product);
    updateCartUI();
}

// Atualiza a interface do carrinho
function updateCartUI() {
    cartCount.textContent = cart.length;
    cartIcon.classList.add('cart-added');
    
    // Remove a animação depois de 500ms
    setTimeout(() => cartIcon.classList.remove('cart-added'), 500);
}

// Finalizar pedido via WhatsApp
document.getElementById('finalize-order').addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Adicione itens ao carrinho antes de finalizar o pedido.");
    } else {
        let message = "Gostaria de finalizar o pedido com os seguintes itens:\n";
        cart.forEach((item, index) => {
            message += `${index + 1}. ${item.name} - R$${item.price}\n`;
        });
        
        // Encaminhar pedido para o WhatsApp
        let encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/seunumero?text=${encodedMessage}`, '_blank');
    }
});

// Exemplo de produto sendo adicionado
addToCart({name: "Brigadeiro", price: 2.50});
addToCart({name: "Beijinho", price: 2.50});
