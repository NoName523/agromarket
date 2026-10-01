let cartCount = 0;

async function loadProducts() {
    const productsContainer = document.querySelector('.products');

    try {
        const response = await fetch('http://localhost:3001/products');

        if (!response.ok) {
            throw new Error('Ошибка загрузки товаров');
        }

        const products = await response.json();

        renderProducts(products);

    } catch (error) {
        productsContainer.innerHTML = `
            <p>
                Не удалось загрузить товары.
                Проверьте, запущен ли json-server.
            </p>
        `;

        console.error(error);
    }
}


function renderProducts(products) {

    const productsContainer = document.querySelector('.products');

    const cartCountElement = document.querySelector('#cart-count');

    products.forEach((product) => {

        const card = document.createElement('article');

        card.className = 'card';

        card.innerHTML = `
            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <h3>
                ${product.name}
            </h3>

            <p class="price">
                ${product.price} тг
            </p>

            <button>
                В корзину
            </button>
        `;

        const button = card.querySelector('button');

        button.addEventListener('click', () => {

            cartCount++;

            cartCountElement.textContent = cartCount;

        });

        productsContainer.appendChild(card);

    });

}


loadProducts();


