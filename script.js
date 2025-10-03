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