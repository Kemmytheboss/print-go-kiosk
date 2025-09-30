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

    function pay (method) {
        const file = fileInput.files[0];
        const copies = document.getElementById('copies').value;
        const color = document.getElementById('color').value;
        const price = copies * 5;

        // save transaction to db.json
        let transaction = {
            filename: file ? filename : 'No File',
            copies : copies,
            color : color,
            price : price,
            paymentMethod : method,
            timeStamp : new Date().toISOString()
        };

        await fecth ('http://localhost:5000/transactions', {
            method: 'POST',
            Headers : {'content-type' : 'application/json'},
            body : JSON.stringfy(transaction)
        });
        document.getElementById('paymentStatus')innerText = 
        `payment via ${method} successful. Transaction saved.`
        }
})