const historyList =
document.getElementById("historyList");

const histori =
JSON.parse(
localStorage.getItem("orderHistory")
) || [];

renderHistory();

function renderHistory(){

  historyList.innerHTML = "";

  if(histori.length === 0){

    historyList.innerHTML =

    `
    <div class="history-card">

      <h3>
      Belum Ada Histori
      </h3>

      <p>
      Anda belum pernah melakukan transaksi.
      </p>

    </div>
    `;

    return;

  }

  histori.reverse().forEach((order,index)=>{

    historyList.innerHTML +=

    `
    <div class="history-card">

      <h3>
      ${order.tanggal}
      </h3>

      <p>

      ${order.produk.map(item=>

      `${item.nama}
      (${item.qty}x)`

      ).join("<br>")}

      </p>

      <hr style="margin:10px 0;">

      <p>
      Subtotal :
      Rp${order.subtotal.toLocaleString('id-ID')}
      </p>

      <p>
      Ongkir :
      Rp${order.ongkir.toLocaleString('id-ID')}
      </p>

      <p>
      Total :
      Rp${order.total.toLocaleString('id-ID')}
      </p>

      <div class="history-actions">

        <button
        class="btn-repeat"
        onclick="beliLagi(${index})">

        Belanja Lagi

        </button>

        <button
        class="btn-delete"
        onclick="hapusHistori(${index})">

        Hapus

        </button>

      </div>

    </div>
    `;

  });

}




function beliLagi(index){

  localStorage.setItem(

    "cart",

    JSON.stringify(
      histori[index].produk
    )

  );

  window.location.href =
  "checkout.html";

}



function hapusHistori(index){

  if(
    !confirm(
      "Hapus histori ini?"
    )
  ){
    return;
  }

  histori.splice(index,1);

  localStorage.setItem(

    "orderHistory",

    JSON.stringify(histori)

  );

  renderHistory();

}