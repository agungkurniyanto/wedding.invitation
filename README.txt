TEMPLATE UNDANGAN DIGITAL — AGUNG & EFARNA

1. Upload seluruh isi folder ini ke hosting.
   Untuk Cloudflare Pages, upload/deploy folder sebagai static site.

2. Struktur:
   index.html
   assets/css/style.css
   assets/js/script.js
   assets/music/wedding.mp3
   assets/images/ (untuk foto jika ditambahkan)

3. NAMA PENERIMA DINAMIS
   Contoh:
   https://domainkamu.com/?to=Mas+Agung+Kurniyanto

   Nama setelah ?to= akan otomatis tampil di cover.

4. FOTO
   Template saat ini memakai placeholder.
   Ganti elemen placeholder di index.html dengan:
   <img src="assets/images/nama-file.jpg" alt="...">

5. MUSIK
   Masukkan file:
   assets/music/wedding.mp3

6. WHATSAPP RSVP
   Buka:
   assets/js/script.js
   Cari:
   whatsappNumber: "6281234567890"
   Ganti dengan nomor WhatsApp tujuan dalam format internasional tanpa +.

7. GOOGLE MAPS
   Link lokasi saat ini adalah pencarian "GKJ Karangbendo".
   Setelah alamat/link Google Maps final tersedia, ganti href pada tombol "Lihat Lokasi".

8. CATATAN
   Template ini dibuat sebagai static website sehingga tidak membutuhkan database atau PHP.
   Parameter ?to= diproses langsung oleh JavaScript di browser.
