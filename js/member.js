function daftarMember(){

const nama =
document.getElementById("nama").value;

const telepon =
document.getElementById("telepon").value;

const password =
document.getElementById("password").value;

if(
!nama ||
!telepon ||
!password
){

alert("Lengkapi semua data.");

return;

}

const member = {

nama,
telepon,
password

};

localStorage.setItem(
"member",
JSON.stringify(member)
);

alert(
"Pendaftaran berhasil."
);

window.location.href =
"akun.html";

}


function loginMember(){

const telepon =
prompt(
"Masukkan nomor WhatsApp"
);

const password =
prompt(
"Masukkan password"
);

const member =
JSON.parse(
localStorage.getItem("member")
);

if(
!member
){

alert(
"Belum ada akun terdaftar."
);

return;

}

if(
member.telepon === telepon &&
member.password === password
){

alert(
"Login berhasil."
);

localStorage.setItem(
"isLogin",
"true"
);

window.location.href =
"akun.html";

}else{

alert(
"Nomor atau password salah."
);

}

}