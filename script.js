const apiURL = "http://localhost:3000/services";

// GET all services
async function loadCatalog() {
  const res = await fetch(apiURL);
  const services = await res.json();

  const catalogDiv = document.getElementById("catalog");
  catalogDiv.innerHTML = services.map(service => `
    <div class="card">
      <img src="${service.image}" alt="${service.name}" width="100%">
      <h3>${service.name}</h3>
      <p>${service.description}</p>
      <p><strong>${service.price}</strong></p>
      <button onclick="deleteService(${service.id})">Delete</button>
      <button onclick="updateService(${service.id})">Edit</button>
    </div>
  `).join("");
}

// POST new service
async function addService(service) {
  await fetch(apiURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(service)
  });
  loadCatalog();
}

// PATCH (update service)
async function updateService(id) {
  const newName = prompt("Enter new name:");
  if (!newName) return;

  await fetch(`${apiURL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: newName })
  });
  loadCatalog();
}

// DELETE service
async function deleteService(id) {
  if (!confirm("Are you sure?")) return;

  await fetch(`${apiURL}/${id}`, { method: "DELETE" });
  loadCatalog();
}

document.addEventListener("DOMContentLoaded", loadCatalog);
