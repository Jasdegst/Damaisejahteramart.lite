let latitude = "";
let longitude = "";

const tokoLat = 5.12543;
const tokoLng = 97.4438152;

let subtotal = 0;
let ongkir = 0;

const orderList =
document.getElementById("orderList");

const subtotalEl =
document.getElementById("subtotal");

const shippingEl =
document.getElementById("shipping");

const totalEl =
document.getElementById("total");

/* Ambil Keranjang */

const cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

/* Hitung Jarak */

function hitungJarak(
lat1,
lon1,
lat2,
lon2
){

const R = 6371;

const dLat =
(lat2 - lat1) *
Math.PI / 180;

const dLon =
(lon2 - lon1) *
Math.PI / 180;

const a =

Math.sin(dLat/2) *
Math.sin(dLat/2)

+

Math.cos(lat1*Math.PI/180)

*

Math.cos(lat2*Math.PI/180)

*

Math.sin(dLon/2)

*

Math.sin(dLon/2);

const c =
2 *
Math.atan2(
Math.sqrt(a),
Math.sqrt(1-a)
);

return R * c;

}

/* Render Pesanan */

function renderOrder(){

subtotal = 0;

orderList.innerHTML = "";

if(cart.length === 0){

orderList.innerHTML =
"<p>Keranjang masih kosong</p>";

return;

}

cart.forEach((item,index)=>{

subtotal +=
item.harga *
item.qty;

orderList.innerHTML += `

<p>

${index + 1}. ${item.nama}

(${item.qty}x)

- Rp${(
item.harga *
item.qty
).toLocaleString('id-ID')}

</p>

`;

});

updateTotal();

}

renderOrder();

/* Update Total */

function updateTotal(){

subtotalEl.innerText =
"Rp" +
subtotal.toLocaleString('id-ID');

shippingEl.innerText =
"Rp" +
ongkir.toLocaleString('id-ID');

totalEl.innerText =
"Rp" +
(
subtotal +
ongkir
).toLocaleString('id-ID');

}

/* Pilihan Pengiriman */

document
.querySelectorAll(
'input[name="delivery"]'
)
.forEach(radio=>{

radio.addEventListener(
'change',
()=>{

const card =
document.getElementById(
'distanceCard'
);

if(
radio.value === "delivery" &&
radio.checked
){

card.style.display =
"block";

}else{

card.style.display =
"none";

document
.getElementById("distance")
.value = "";

ongkir = 0;

updateTotal();

}

});

});

/* Ambil Lokasi */

document
.getElementById("lokasiBtn")
.addEventListener(
"click",
()=>{

const metode =
document.querySelector(
'input[name="delivery"]:checked'
).value;

if(
metode === "pickup"
){

alert(
"Ambil di toko tidak memerlukan lokasi."
);

return;

}

if(
!navigator.geolocation
){

alert(
"Browser tidak mendukung GPS."
);

return;

}

navigator.geolocation.getCurrentPosition(

(pos)=>{

latitude =
pos.coords.latitude;

longitude =
pos.coords.longitude;

const jarak =
hitungJarak(

tokoLat,
tokoLng,

latitude,
longitude

);

document
.getElementById("distance")
.value =
jarak.toFixed(1);

ongkir =
Math.ceil(jarak) *
2000;

updateTotal();

document
.getElementById("lokasiStatus")
.innerHTML =

`✓ Lokasi berhasil diambil
<br>
Jarak : ${jarak.toFixed(1)} KM`;

},

()=>{

alert(
"Gagal mengambil lokasi."
);

}

);

});

/* Kirim Pesanan */

let kembalian = 0;


document
.querySelectorAll(
'input[name="payment"]'
)
.forEach(radio=>{

radio.addEventListener(
'change',
()=>{

const cashCard =
document.getElementById(
'cashCard'
);

if(
radio.value === "cash" &&
radio.checked
){

cashCard.style.display =
"block";

}else{

cashCard.style.display =
"none";

}

});

});


document
.getElementById("cashAmount")
.addEventListener(
"input",
()=>{

const bayar =
parseInt(
document.getElementById(
"cashAmount"
).value
) || 0;

const totalBelanja =
subtotal + ongkir;

kembalian =
bayar - totalBelanja;

document.getElementById(
"changeAmount"
).innerText =

"Rp" +

Math.max(
0,
kembalian
).toLocaleString(
'id-ID'
);

});


function sendWhatsapp(){

const nama =
document.getElementById("nama").value;

const telepon =
document.getElementById("telepon").value;

const alamat =
document.getElementById("alamat").value;

const metode =
document.querySelector(
'input[name="delivery"]:checked'
).value;

const pembayaran =
document.querySelector(
'input[name="payment"]:checked'
).value;

/* Validasi */

if(!nama || !telepon || !alamat){

alert(
"Lengkapi data pemesan terlebih dahulu."
);

return;

}

if(cart.length === 0){

alert(
"Keranjang masih kosong."
);

return;

}

/* Delivery wajib lokasi */

if(metode === "delivery"){

if(!latitude || !longitude){

alert(
"Silakan ambil lokasi terlebih dahulu."
);

return;

}

}

/* Pickup tanpa ongkir */

if(metode === "pickup"){

ongkir = 0;

updateTotal();

}

const total =
subtotal + ongkir;

/* Pembayaran */

let bayar = 0;

if(pembayaran === "cash"){

bayar =
parseInt(
document.getElementById(
"cashAmount"
).value
) || 0;

if(bayar < total){

alert(
"Uang pembayaran kurang dari total belanja."
);

return;

}

kembalian =
bayar - total;

}

/* Link Lokasi */

const lokasiMaps =

metode === "delivery"

?

`https://maps.google.com/?q=${latitude},${longitude}`

:

"Ambil di Toko";

/* Daftar Produk */

const daftarProduk =

cart.map(item =>

`${item.nama}
(${item.qty}x)
- Rp${(
item.harga *
item.qty
).toLocaleString('id-ID')}`

).join('\n');

/* Pesan WA */

const pesan =

`*DAMAI SEJAHTERA MART*

=================

DATA PEMESAN

Nama :
${nama}

WhatsApp :
${telepon}

Alamat :
${alamat}

=================

PESANAN

${daftarProduk}

=================

Metode Pengambilan :
${metode === "pickup"
? "Ambil di Toko"
: "Diantar ke Rumah"}

Metode Pembayaran :
${pembayaran === "cash"
? "Tunai"
: "Transfer Bank"}

Subtotal :
Rp${subtotal.toLocaleString('id-ID')}

Ongkir :
Rp${ongkir.toLocaleString('id-ID')}

Total :
Rp${total.toLocaleString('id-ID')}

${pembayaran === "cash"

?

`Uang Dibayar :
Rp${bayar.toLocaleString('id-ID')}

Kembalian :
Rp${kembalian.toLocaleString('id-ID')}`

:

`Pembayaran :
Transfer Bank`

}

=================

LOKASI

${lokasiMaps}`;

/* Simpan Histori */

const histori =

JSON.parse(
localStorage.getItem("orderHistory")
) || [];

histori.push({

tanggal:
new Date().toLocaleString('id-ID'),

nama,
telepon,
alamat,

metode,
pembayaran,

produk:[...cart],

subtotal,
ongkir,
total,

bayar,
kembalian

});

localStorage.setItem(

"orderHistory",

JSON.stringify(histori)

);

/* Buka WhatsApp */

window.open(

`https://wa.me/6289691780494?text=${encodeURIComponent(pesan)}`,

"_blank"

);

/* Kosongkan Keranjang */

cart.length = 0;

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

/* Redirect */

setTimeout(()=>{

window.location.href =
"histori.html";

},1000);

}