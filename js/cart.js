const cartSheet =
document.getElementById("cartSheet");

const cartOverlay =
document.getElementById("cartOverlay");

const cartItems =
document.getElementById("cartItems");

const cartCount =
document.getElementById("cartCount");

const cartTotal =
document.getElementById("cartTotal");

/* Ambil data lama */

let cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

/* Buka Keranjang */

document
.getElementById("cartToggle")
.addEventListener("click",()=>{

cartSheet.classList.add("active");
cartOverlay.classList.add("active");

});

/* Tutup */

document
.getElementById("closeCart")
.addEventListener("click",closeCart);

cartOverlay.addEventListener(
"click",
closeCart
);

function closeCart(){

cartSheet.classList.remove("active");
cartOverlay.classList.remove("active");

}

/* Tambah Produk */

function addToCart(
nama,
harga,
gambar
){

const produk =
cart.find(
item => item.nama === nama
);

if(produk){

produk.qty++;

}else{

cart.push({

nama,
harga,
gambar,
qty:1

});

}

saveCart();

renderCart();

}

/* Simpan */

function saveCart(){

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

}

/* Render */

function renderCart(){

cartItems.innerHTML = "";

let total = 0;

cart.forEach((item,index)=>{

total +=
item.harga *
item.qty;

cartItems.innerHTML += `

<div class="cart-item">

<img src="${item.gambar}">

<div class="cart-info">

<h4>${item.nama}</h4>

<p>
Rp${item.harga.toLocaleString('id-ID')}
</p>

<div class="qty">

<button onclick="kurang(${index})">
-
</button>

<span>
${item.qty}
</span>

<button onclick="tambah(${index})">
+
</button>

<button
onclick="hapusProduk(${index})">
🗑
</button>

</div>

</div>

</div>

`;

});

cartCount.innerText =
cart.reduce(
(a,b)=>a+b.qty,
0
);

cartTotal.innerText =
"Rp" +
total.toLocaleString('id-ID');

}

/* Tambah */

function tambah(index){

cart[index].qty++;

saveCart();

renderCart();

}

/* Kurang */

function kurang(index){

cart[index].qty--;

if(cart[index].qty <= 0){

cart.splice(index,1);

}

saveCart();

renderCart();

}

/* Hapus */

function hapusProduk(index){

cart.splice(index,1);

saveCart();

renderCart();

}

/* Pertama Kali */

renderCart();


document
.getElementById("checkoutBtn")
.addEventListener("click",()=>{

window.location.href =
"checkout.html";

});


