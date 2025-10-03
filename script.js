// fetching catalog from db.json
async function loadCatalog () {
    const res = await fetch("db.json");
    const data = await res.json();
    const catalogDiv = document.getElementById("catalog");

    if (catalogDiv) {
        catalogDiv.innerHTML = data.services.map(
            service => `
                <div class="card"
                    <img src="${service.image}" alt="${service.name} width="100%">
                    <h3>${service.name}</h3>
                    <p>${service.description}></p>
                    <p><strong>${service.price}</strong></p>
                    <a href="product.html ? id=${service.id}" class="btn">View</a>
                </div>
                `
             ).join("");
    }

}


// Load single product
async function loadProduct() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) return;

  const res = await fetch("db.json");
  const data = await res.json();
  const product = data.services.find(p => p.id == id);
  const details = document.getElementById("product-details");

  if (product && details) {
    details.innerHTML = `
      <div class="card">
        <img src="${product.image}" alt="${product.name}" width="200">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p><strong>${product.price}</strong></p>
        <button onclick="addToCart(${product.id})" class="btn">Add to Cart</button>
      </div>
    `;
  }
}