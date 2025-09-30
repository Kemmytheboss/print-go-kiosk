const fileInput = document.querySelector("#fileInput");
const Preview = document.querySelector("#preview")
const priceTag = document.querySelector("#price");
const copiesInput = document.querySelector("#copies");
const uploads = document.querySelector("#uploadForm");
const payment = document.querySelector("paymentStatus");

uploads.addEventListener('submit', 
    async (e) =>{
    e.preventDefault();
    
    const formData = new formData();
    formData.append('file', fileInput.files[0]);

    let res = await fetch('/upload', 
        {
            method: "POST", 
            body: formData
        }
    )
    let data = await res.json();
    Preview.innerHTML = `<p>Uploaded: ${data.filename}</p>`

    copiesInput.addEventListener('input', () =>{
        let copies = copiesInput.value;
        priceTag.textContent = 'KES' + (copies * 5);
    });
(
    function pay (method) {
        payment.innerText = `Processing ${method} payment...(simulation)`;
    }
})