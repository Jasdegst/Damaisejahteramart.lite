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

/* Keranjang */

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

/* Pilihan Pengambilan */

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
"Browser tidak mendukung GPS"
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
Jarak :
${jarak.toFixed(1)} KM`;

},

()=>{

alert(
"Gagal mengambil lokasi"
);

}

);

});

/* Kirim WhatsApp */

function sendWhatsapp(){

const nama =
document
.getElementById("nama")
.value;

const telepon =
document
.getElementById("telepon")
.value;

const alamat =
document
.getElementById("alamat")
.value;

const metode =
document.querySelector(
'input[name="delivery"]:checked'
).value;

if(
!nama ||
!telepon ||
!alamat
){

alert(
"Lengkapi data pemesan terlebih dahulu"
);

return;

}

/* Jika Diantar */

if(
metode === "delivery"
){

if(
!latitude ||
!longitude
){

alert(
"Silakan ambil lokasi terlebih dahulu"
);

return;

}

}

/* Jika Ambil di Toko */

if(
metode === "pickup"
){

ongkir = 0;

}

const total =
subtotal + ongkir;

const lokasiMaps =

metode === "delivery"

?

`https://maps.google.com/?q=${latitude},${longitude}`

:

"Ambil di Toko";

const pesan =

`*DAMAI SEJAHTERA MART*

DATA PEMESAN

Nama :
${nama}

WhatsApp :
${telepon}

Alamat :
${alamat}

=================

PESANAN :

${cart.map(item=>

`${item.nama}
(${item.qty}x)`

).join('\n')}

=================

Metode :
${metode === "pickup"
? "Ambil di Toko"
: "Diantar ke Rumah"}

Subtotal :
Rp${subtotal.toLocaleString('id-ID')}

Ongkir :
Rp${ongkir.toLocaleString('id-ID')}

Total :
Rp${total.toLocaleString('id-ID')}

=================

LOKASI

${lokasiMaps}
`;

window.open(

`https://wa.me/6289691780494?text=${encodeURIComponent(pesan)}`

);

}