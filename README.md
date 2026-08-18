# Undangan Pernikahan Agung & Efarna — Revisi

Website statis siap upload untuk pernikahan **Agung Kurniyanto & Efarna Distalia Sari**.

## Fitur
- Nama tamu via `?to=Nama+Tamu`
- Cover roll-up otomatis saat tombol **Buka Undangan** diklik
- Background Jawa dari file `assets/img/background-jawa.png` untuk cover dan seluruh content
- Background **fullscreen anti-crop**: gambar utama selalu `contain` sehingga border/ornamen tidak terpotong; layer blur mengisi sisa layar di tablet/desktop
- Efek parallax ringan antara background dan content
- Font **Great Vibes** untuk `Agung & Efarna` dan nama lengkap mempelai
- Profil mempelai + Instagram masing-masing
- Countdown ke 26 September 2026, pukul 10.00 WIB
- Google Maps GKJ Karangbendo
- Galeri responsif + lightbox popup + swipe di HP
- Wedding Gift BCA dan BRI + tombol salin rekening masing-masing
- Background music yang mulai setelah interaksi pengguna
- RSVP, wishes, dan **reply/balas pada setiap komentar** dengan Supabase
- Fallback localStorage untuk demo jika Supabase belum diisi
- Responsive HP / tablet / laptop / desktop

## Profil Mempelai
- **Agung Kurniyanto** — Putra kedua dari **Bapak Sumantri & Ibu Moeryani**
- **Efarna Distalia Sari** — Putri ketiga dari **Bapak Y. Sudaryanto Sari Wiyono (†) & Ibu Kristania Supani**

## Wedding Gift
- BCA `0374190641` a.n. **AGUNG KURNIYANTO**
- BRI `307701004651508` a.n. **AGUNG KURNIYANTO**

## Cara Upload
Upload **seluruh isi folder ini** ke root/public_html server Anda. File utama harus tetap bernama `index.html`.

Contoh link tamu:
`https://domainanda.com/?to=Mas+Agung+Kurniyanto`

## Ganti Foto
Ganti file berikut, lalu perbarui `src` di `index.html` bila ekstensi file berubah:
- `assets/img/agung-placeholder.svg`
- `assets/img/efarna-placeholder.svg`
- `assets/img/gallery-01.svg` s.d. `gallery-06.svg`

Rekomendasi:
- Foto profil: rasio 4:5, minimal 1200x1500 px
- Galeri: JPG/WebP 1200–2000 px sisi panjang
- Gunakan WebP agar loading lebih cepat

## Background Fullscreen Anti-Crop
Background yang digunakan sekarang:
`assets/img/background-jawa.png`

Sistem background memakai dua layer:
- **Main layer (`contain`)**: selalu menampilkan 100% gambar tanpa zoom, sehingga bunga, gunungan, batik, dan border tidak terpotong.
- **Bleed layer (`cover + blur`)**: mengisi ruang kosong saat rasio layar berbeda, terutama pada monitor landscape.

Efek parallax hanya diterapkan pada bleed layer. Main layer tidak digeser atau diperbesar agar border tetap aman.

Jika ingin menggantinya nanti, gunakan nama file yang sama supaya tidak perlu mengubah CSS.

## Ganti / Tambahkan Musik
Masukkan file MP3 Anda dengan nama:
`assets/music/wedding-music.mp3`

Browser modern biasanya memblokir autoplay sebelum interaksi. Website ini mulai memutar musik setelah tamu menekan **Buka Undangan**.

## Link Instagram
Edit file:
`assets/js/config.js`

Isi URL pada:
- `agungInstagram`
- `efarnaInstagram`

Jika dibiarkan `#`, tombol otomatis tampil nonaktif.

## Aktifkan RSVP + Reply Supabase
1. Buat / buka project di Supabase.
2. Buka **SQL Editor**.
3. Jalankan **seluruh** isi `supabase/schema.sql` versi revisi ini. Jika sebelumnya sudah memakai schema lama, SQL tersebut sekaligus melakukan migrasi untuk fitur reply.
4. Buka **Project Settings > API**.
5. Salin Project URL dan anon/public key.
6. Masukkan ke `assets/js/config.js`:
   - `supabaseUrl`
   - `supabaseAnonKey`
7. Upload ulang file website.

Tanpa Supabase, RSVP dan reply tetap bisa dites tetapi hanya tersimpan pada browser/perangkat yang mengirimkannya.

## Background 4:3 fullscreen responsive
Website sekarang memakai **`background-size: cover`** untuk `assets/img/background-jawa.png`. Dengan metode ini background selalu memenuhi viewport HP, tablet, maupun desktop tanpa mengubah rasio gambar. Konsekuensinya, bagian kiri/kanan atau atas/bawah dapat terpotong sesuai rasio layar.

Untuk hasil terbaik, gunakan file `background-jawa.png` versi **landscape 4:3**. Bila titik crop perlu digeser, buka `assets/css/style.css` lalu ubah variabel `--bg-x` dan `--bg-y` pada media query HP/tablet/desktop. Nilai `50% 50%` berarti tepat di tengah.

Efek parallax tetap aktif secara ringan. Layer background diberi bleed kecil agar tidak muncul celah saat digeser.


## Background fixed 4:3 (revisi terbaru)

Website menggunakan satu `background-jawa.png` fixed melalui `body::before`. Pengaturan utamanya adalah `background-size: cover`, `background-position: center center`, dan `background-repeat: no-repeat`. Dengan demikian gambar selalu memenuhi viewport tanpa berubah rasio. Pada layar dengan rasio berbeda, browser akan melakukan crop otomatis pada bagian tepi. Seluruh `.section` dibuat transparan sehingga content bergerak di atas background tetap, menghasilkan efek parallax sederhana tanpa JavaScript tambahan.

Jika ingin menggeser fokus crop, ubah `background-position` pada `body::before`, misalnya `45% center` atau `55% center`.
