# Undangan Pernikahan Agung & Efarna — Full Revisi

Website statis siap upload untuk pernikahan **Agung Kurniyanto & Efarna Distalia Sari**.

## Fitur utama
- Nama tamu melalui `?to=Nama+Tamu`
- Cover roll-up otomatis setelah tombol **Buka Undangan** ditekan
- Background Jawa 4:3 melalui `body::before`, `background-size: cover`, fixed dan responsif
- Background tidak gepeng; crop menyesuaikan rasio layar HP/tablet/desktop
- Great Vibes untuk nama pasangan
- Profil mempelai + Instagram masing-masing
- Countdown 26 September 2026 pukul 10.00 WIB
- Google Maps lokasi pemberkatan GKJ Karangbendo
- Galeri responsif + lightbox popup + swipe pada HP
- **Wedding Gift tersembunyi dalam popup/modal**
- BCA dan BRI + tombol salin nomor rekening
- Alamat pengiriman hadiah + tombol salin alamat + tombol Google Maps
- Background music setelah interaksi pengguna
- RSVP, Wishes dan fitur **Reply/Balas**
- Supabase untuk komentar online + fallback localStorage mode demo
- Responsive HP, tablet, laptop dan desktop

## Wedding Gift
Pada halaman utama, nomor rekening dan alamat tidak langsung terlihat. Tamu harus menekan tombol **Wedding Gift** untuk membuka popup.

Isi popup:
- BCA `0374190641` a.n. **AGUNG KURNIYANTO**
- BRI `307701004651508` a.n. **AGUNG KURNIYANTO**
- Alamat: **Jl. Cabe 43 Karangploso, Maguwoharjo, Depok, Sleman, Yogyakarta 55282**
- Tombol **Salin Nomor Rekening**
- Tombol **Salin Alamat**
- Tombol **Buka Google Maps**

Catatan: informasi ini tersembunyi secara tampilan, bukan terenkripsi. Data tetap berada pada source HTML website.

## Cara upload
Upload seluruh isi folder website ke `public_html` atau root domain. File utama harus tetap bernama `index.html`.

Contoh link penerima:
`https://agungkurniyanto.github.io/wedding.invitation/?to=Nama%20Tamu%20Undangan`

## Foto
Ganti file berikut dengan foto Anda sendiri:
- `assets/img/agung-placeholder.svg`
- `assets/img/efarna-placeholder.svg`
- `assets/img/gallery-01.svg` sampai `gallery-06.svg`

Jika ekstensi berubah menjadi JPG/PNG/WebP, sesuaikan `src` pada `index.html`. Untuk loading cepat, WebP direkomendasikan.

## Background
File background:
`assets/img/background-jawa.png`

Pengaturan utama ada di `assets/css/style.css`:
```css
body::before {
  position: fixed;
  inset: 0;
  background-image: url("../img/background-jawa.png");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
```

`cover` membuat gambar selalu memenuhi layar dan mempertahankan proporsi. Konsekuensinya sebagian sisi gambar dapat terpotong sesuai rasio layar.

## Musik
Masukkan file MP3 dengan nama:
`assets/music/wedding-music.mp3`

Musik akan dicoba diputar setelah pengguna menekan **Buka Undangan**.

## Instagram
Edit `assets/js/config.js`, lalu isi:
- `agungInstagram`
- `efarnaInstagram`

## Supabase RSVP + Reply
1. Buat/buka project Supabase.
2. Buka SQL Editor.
3. Jalankan isi `supabase/schema.sql`.
4. Ambil Project URL dan anon/public key.
5. Isi `supabaseUrl` dan `supabaseAnonKey` di `assets/js/config.js`.
6. Upload ulang website.

Tanpa Supabase, RSVP dan reply hanya tersimpan pada browser/perangkat lokal sebagai mode demo.
