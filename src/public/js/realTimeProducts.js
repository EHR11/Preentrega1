const socket = io();

socket.on("connect", () => {
    socketID = socket.id;

    // hacer la petición al servidor de la API
    getProducts()
});

document.querySelector("#form").onsubmit= ()=>{
    let body={
        "title":document.querySelector("#titleInput").value,
        "description":document.querySelector("#descriptionInput").value,
        "price":parseFloat(document.querySelector("#priceInput").value),
        "status":document.querySelector("#statusInput").checked,
        "code":document.querySelector("#codeInput").value,
        "stock":parseInt(document.querySelector("#stockInput").value),
        "category":document.querySelector("#categoryInput").value,
        "thumbnails":[]
    }
    console.log(body)
    fetch("http://localhost:8080/api/products/", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "X-Socket-IO-ID": socketID, // setear el header con el socket id correcto
            "Content-type" : "application/json"
        }
    });
    return false
}


socket.on("WelcomeMsg",data=>{
    console.log(data)
})

socket.on("getProductsResult",products=>{
    console.log(products);
    let table = document.querySelector('#tableBody')
    table.innerHTML=""
    for (product in products) {
	let tr = document.createElement('tr')
	
	Object.entries(products[product]).forEach(([key,value])=>{
        if (["pid","title","description","price","status"].includes(key)){
            let td = document.createElement('td')
            td.id=`${key}`
            td.textContent = `${value}`
            tr.appendChild(td)
        }
	}) 
    let delButton = document.createElement("button")
    delButton.style.backgroundColor="red"
    delButton.style.color="white"
    delButton.textContent="X"
    delButton.onclick=()=>{
        fetch(`http://localhost:8080/api/products/${delButton.closest("tr").querySelector("#pid").innerHTML}`, {
            method: "DELETE",
            headers: {
                "X-Socket-IO-ID": socketID // setear el header con el socket id correcto
            }
        })
    }
    tr.appendChild(delButton)
	table.appendChild(tr)
}
})

socket.on("createProductResult",data=>{
    getProducts()
})

socket.on("deleteProductResult",data=>{
    getProducts()
})

socket.on("createProductError",data=>{
    alert(data)
})
socket.on("deleteProductError",data=>{
    alert(data)
})

const getProducts = ()=>{

    fetch("http://localhost:8080/api/products?limit=999", {
        method: "GET",
        headers: {
            "X-Socket-IO-ID": socketID // setear el header con el socket id correcto
        }
    });
}