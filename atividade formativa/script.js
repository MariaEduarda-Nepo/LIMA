document.addEventListener('DOMContentLoaded', () => {
    // Referências aos elementos HTML
    const cartIcon = document.querySelector('.cart-icon');
    const cartPage = document.querySelector('.cart-page');
    const productCards = document.querySelectorAll('.product-card');
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceSpan = document.querySelector('.total-price');
    const cartEmptyMessage = document.querySelector('.cart-empty-message');

    let cart = []; // Array para armazenar os itens do carrinho

    // Função para atualizar o carrinho na interface do usuário
    function updateCartUI() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartEmptyMessage.style.display = 'block';
        } else {
            cartEmptyMessage.style.display = 'none';
            cart.forEach(item => {
                const cartItemElement = document.createElement('div');
                cartItemElement.classList.add('cart-item');
                cartItemElement.innerHTML = `
                    <p class="cart-item-name">${item.name}</p>
                    <p class="cart-item-price">R$ ${item.price.toFixed(2)}</p>
                    <button class="remove-from-cart" data-name="${item.name}">Remover</button>
                `;
                cartItemsContainer.appendChild(cartItemElement);
                total += item.price;
            });
        }
        
        totalPriceSpan.textContent = `R$ ${total.toFixed(2)}`;
    }

    // Evento de clique para mostrar/esconder o carrinho
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        cartPage.style.display = cartPage.style.display === 'block' ? 'none' : 'block';
        document.querySelector('.product-gallery').scrollIntoView({ behavior: 'smooth' });
    });

    // Evento para adicionar itens ao carrinho
    productCards.forEach(card => {
        const addButton = card.querySelector('.add-to-cart');
        addButton.addEventListener('click', () => {
            const productName = card.querySelector('.product-name').textContent;
            const productPriceText = card.querySelector('.product-price').textContent;
            const productPrice = parseFloat(productPriceText.replace('R$', '').replace(',', '.'));

            const product = {
                name: productName,
                price: productPrice
            };

            cart.push(product);
            updateCartUI();
            
            // Feedback visual ao usuário
            addButton.textContent = 'Adicionado!';
            setTimeout(() => {
                addButton.textContent = 'Adicionar ao Carrinho';
            }, 1500);
        });
    });

    // Evento para remover itens do carrinho
    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-from-cart')) {
            const productName = e.target.getAttribute('data-name');
            cart = cart.filter(item => item.name !== productName);
            updateCartUI();
        }
    });

    // Inicializa a UI do carrinho
    updateCartUI();
});