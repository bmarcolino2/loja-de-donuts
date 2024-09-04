
        let carrinho = [];

        function adicionarAoCarrinho(item, preco, massaId, coberturaId, confeitosId) {
            const massa = document.getElementById(massaId).value;
            const cobertura = document.getElementById(coberturaId).value;
            const confeitos = document.getElementById(confeitosId).value;

            const detalhes = `${massa} com ${cobertura} e ${confeitos}`;
            
            let existe = false;
            carrinho = carrinho.map(produto => {
                if (produto.nome === item && produto.detalhes === detalhes) {
                    existe = true;
                    return { nome: produto.nome, detalhes: produto.detalhes, quantidade: produto.quantidade + 1, preco: produto.preco };
                }
                return produto;
            });

            if (!existe) {
                carrinho.push({ nome: item, detalhes: detalhes, quantidade: 1, preco: preco });
            }

            atualizarCarrinho();
        }

        function aumentarQuantidade(item, detalhes) {
            carrinho = carrinho.map(produto => {
                if (produto.nome === item && produto.detalhes === detalhes) {
                    return { nome: produto.nome, detalhes: produto.detalhes, quantidade: produto.quantidade + 1, preco: produto.preco };
                }
                return produto;
            });
            atualizarCarrinho();
        }

        function diminuirQuantidade(item, detalhes) {
            carrinho = carrinho.map(produto => {
                if (produto.nome === item && produto.detalhes === detalhes) {
                    return { nome: produto.nome, detalhes: produto.detalhes, quantidade: produto.quantidade - 1, preco: produto.preco };
                }
                return produto;
            }).filter(produto => produto.quantidade > 0);
            atualizarCarrinho();
        }

        function removerDoCarrinho(item, detalhes) {
            carrinho = carrinho.filter(produto => produto.nome !== item || produto.detalhes !== detalhes);
            atualizarCarrinho();
        }

        function atualizarCarrinho() {
            const carrinhoList = document.getElementById('carrinho-list');
            carrinhoList.innerHTML = '';
            let total = 0;

            carrinho.forEach(produto => {
                const li = document.createElement('li');
                li.textContent = `${produto.nome} (${produto.detalhes}) - Quantidade: ${produto.quantidade} - R$ ${(produto.quantidade * produto.preco).toFixed(2)}`;

                const buttonContainer = document.createElement('div');
                buttonContainer.classList.add('main-buttons');

                const decreaseButton = document.createElement('button');
                decreaseButton.textContent = '-';
                decreaseButton.classList.add('decrease-button');
                decreaseButton.onclick = () => diminuirQuantidade(produto.nome, produto.detalhes);

                const increaseButton = document.createElement('button');
                increaseButton.textContent = '+';
                increaseButton.classList.add('increase-button');
                increaseButton.onclick = () => aumentarQuantidade(produto.nome, produto.detalhes);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Apagar';
                deleteButton.classList.add('delete-button');
                deleteButton.onclick = () => removerDoCarrinho(produto.nome, produto.detalhes);

                buttonContainer.appendChild(decreaseButton);
                buttonContainer.appendChild(increaseButton);
                buttonContainer.appendChild(deleteButton);

                li.appendChild(buttonContainer);
                carrinhoList.appendChild(li);

                total += produto.quantidade * produto.preco;
            });

            document.getElementById('total').textContent = total.toFixed(2);
        }

        function continuarComprando() {
            document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
        }

        function finalizarPedido() {
            let mensagem = 'Gostaria de finalizar a compra dos seguintes itens:\n';
            carrinho.forEach(produto => {
                mensagem += `${produto.nome} (${produto.detalhes}) - Quantidade: ${produto.quantidade} - R$ ${(produto.quantidade * produto.preco).toFixed(2)}\n`;
            });
            mensagem += `\nTotal: R$ ${document.getElementById('total').textContent}`;

            const encodedMessage = encodeURIComponent(mensagem);
            window.open(`https://wa.me/48988478865?text=${encodedMessage}`, '_blank');
        }

        function mostrarCatalogo() {
            document.getElementById('catalogo').classList.add('ativa');
            document.getElementById('carrinho').classList.remove('ativa');
        }

        function mostrarCarrinho() {
            document.getElementById('catalogo').classList.remove('ativa');
            document.getElementById('carrinho').classList.add('ativa');
        }

        document.addEventListener('DOMContentLoaded', function() {
            mostrarCatalogo(); // Mostra o catálogo por padrão
        });
  
