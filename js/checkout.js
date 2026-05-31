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

/* sementara */

const cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

renderOrder();

function renderOrder(){

subtotal = 0;

orderList.innerHTML = "";

cart.forEach(item=>{

subtotal +=
item.harga * item.qty;

orderList.innerHTML += `

<p>

${item.nama}

(${item.qty}x)

- Rp${(
item.harga *
item.qty
).toLocaleString()}

</p>

`;

});

updateTotal();

}

function updateTotal(){

subtotalEl.innerText =
"Rp" +
subtotal.toLocaleString();

shippingEl.innerText =
"Rp" +
ongkir.toLocaleString();

totalEl.innerText =
"Rp" +
(
subtotal +
ongkir
).toLocaleString();

}

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
radio.value ===
'delivery' &&
radio.checked
){

card.style.display =
'block';

}else{

card.style.display =
'none';

ongkir = 0;

updateTotal();

}

});

});

document
.getElementById(
'distance'
)

.addEventListener(
'input',
e=>{

const km =
parseFloat(
e.target.value
) || 0;

ongkir =
km * 2000;

updateTotal();

});

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

if(
!latitude ||
!longitude
){

alert(
"Silakan ambil lokasi terlebih dahulu"
);

return;

}

const total =
subtotal + ongkir;

const lokasiMaps =

`https://maps.google.com/?q=${latitude},${longitude}`;

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

Subtotal :
Rp${subtotal.toLocaleString()}

Ongkir :
Rp${ongkir.toLocaleString()}

Total :
Rp${total.toLocaleString()}

=================

LOKASI CUSTOMER

${lokasiMaps}

`;

window.open(

`https://wa.me/6282225869938?text=${encodeURIComponent(pesan)}`

);

}




document
.getElementById("lokasiBtn")
.addEventListener("click",()=>{

if(!navigator.geolocation){

alert("Browser tidak mendukung GPS");

return;

}

navigator.geolocation.getCurrentPosition(

(pos)=>{

latitude = pos.coords.latitude;
longitude = pos.coords.longitude;

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
Math.ceil(jarak) * 2000;

updateTotal();

document
.getElementById("lokasiStatus")
.innerHTML =

`✓ Lokasi berhasil diambil
<br>
Jarak:
${jarak.toFixed(1)} KM`;

},

()=>{

alert(
"Gagal mengambil lokasi"
);

}

);

});