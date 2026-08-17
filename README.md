# Undangan Agung & Efarna — GitHub Pages + Supabase

## Fitur
- Great Vibes untuk seluruh teks "Agung & Efarna"
- Background adat Jawa di setiap section
- `?to=Nama+Penerima`
- Countdown 26 September 2026
- Google Maps GKJ Karangbendo
- RSVP + ucapan tersimpan di Supabase
- Daftar ucapan dapat dibaca semua tamu
- Realtime update untuk komentar baru
- Wedding Gift BCA 0374190641 a.n. AGUNG KURNIYANTO + tombol salin
- Link sosial media mempelai
- Parallax effect
- Cover roll-up setelah Buka Undangan
- Static hosting, cocok untuk GitHub Pages

## 1. Buat database Supabase
Buka SQL Editor di project Supabase, lalu jalankan:
`supabase/schema.sql`

## 2. Isi konfigurasi
Buka:
`assets/js/config.js`

Ganti:
- `url` = Project URL Supabase
- `key` = Publishable key / anon key

Jangan pernah memasukkan `service_role`/secret key ke file website.

Supabase memang menyediakan client JavaScript browser menggunakan Project URL + publishable key/anon key.

## 3. Social media
Di `index.html`, ganti `href="#"` pada Instagram/Facebook masing-masing mempelai dengan link akun yang sebenarnya.

## 4. Foto
Masukkan foto ke `assets/images/`, lalu ganti elemen `Foto Mempelai...` dan gallery placeholder di `index.html`.

## 5. Musik
Masukkan MP3 sebagai:
`assets/music/wedding.mp3`

## 6. GitHub Pages
Upload seluruh isi repository.
Pastikan `index.html` berada di root.
GitHub Pages dapat dipublish dari branch dan folder root. Di repository:
Settings > Pages > Build and deployment > Source: Deploy from a branch > main > /(root) > Save.

## 7. Contoh link penerima
`https://USERNAME.github.io/NAMA-REPO/?to=Mas+Agung+Kurniyanto`

## Catatan keamanan
Publishable/anon key boleh digunakan di browser bila Row Level Security (RLS) dan policy database dikonfigurasi dengan benar. Jangan pernah mengekspos Supabase secret/service_role key.

## Catatan moderasi
Versi ini menerima ucapan langsung dari publik. Untuk penggunaan nyata, sebaiknya tambahkan moderasi/anti-spam (mis. CAPTCHA atau approval admin) jika undangan akan dibagikan secara luas.
