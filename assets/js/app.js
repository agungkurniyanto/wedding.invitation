(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [
    ...root.querySelectorAll(selector),
  ];
  const cfg = window.WEDDING_CONFIG || {};

  const cover = $("#cover");
  const invitation = $("#invitation");
  const openButton = $("#openInvitation");
  const music = $("#bgMusic");
  const musicToggle = $("#musicToggle");
  const musicIcon = $("#musicIcon");
  const toast = $("#toast");

  // Nama penerima dari ?to=Nama+Tamu
  const params = new URLSearchParams(location.search);
  const guest = (params.get("to") || "Bapak/Ibu/Saudara/i")
    .replace(/\+/g, " ")
    .trim();
  $("#guestName").textContent = guest;
  $("#rsvpName").value = guest === "Bapak/Ibu/Saudara/i" ? "" : guest;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  async function startMusic() {
    try {
      music.volume = 0.65;
      await music.play();
      musicToggle.classList.add("playing");
      musicIcon.textContent = "♫";
    } catch (err) {
      musicToggle.classList.remove("playing");
      musicIcon.textContent = "♪";
      console.info(
        "Musik belum tersedia atau browser menolak playback:",
        err.message,
      );
    }
  }

  openButton.addEventListener("click", async () => {
    document.body.classList.remove("locked");
    invitation.setAttribute("aria-hidden", "false");
    invitation.classList.add("visible");
    cover.classList.add("opened");
    await startMusic();
    setTimeout(() => {
      cover.setAttribute("hidden", "");
      invitation.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 1050);
  });

  musicToggle.addEventListener("click", async () => {
    if (music.paused) {
      await startMusic();
      if (music.paused)
        showToast(
          "Tambahkan file assets/music/wedding-music.mp3 terlebih dahulu.",
        );
    } else {
      music.pause();
      musicToggle.classList.remove("playing");
      musicIcon.textContent = "♪";
    }
  });

  // Instagram mempelai
  const socialMap = {
    "agung-instagram": cfg.social?.agungInstagram,
    "efarna-instagram": cfg.social?.efarnaInstagram,
  };
  $$("[data-social]").forEach((a) => {
    const url = socialMap[a.dataset.social];
    if (url && url !== "#") a.href = url;
    else {
      a.classList.add("disabled");
      a.title = "Isi link Instagram di assets/js/config.js";
      a.removeAttribute("target");
    }
  });

  // Countdown
  const weddingDate = new Date(
    cfg.weddingDate || "2026-09-26T10:00:00+07:00",
  ).getTime();
  function updateCountdown() {
    const distance = weddingDate - Date.now();
    const d = Math.max(0, distance);
    $("#days").textContent = String(Math.floor(d / 86400000)).padStart(2, "0");
    $("#hours").textContent = String(
      Math.floor((d % 86400000) / 3600000),
    ).padStart(2, "0");
    $("#minutes").textContent = String(
      Math.floor((d % 3600000) / 60000),
    ).padStart(2, "0");
    $("#seconds").textContent = String(Math.floor((d % 60000) / 1000)).padStart(
      2,
      "0",
    );
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Copy rekening BCA / BRI
  async function copyText(value) {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = value;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
  }
  $$(".copy-account").forEach((button) => {
    button.addEventListener("click", async () => {
      const target = document.getElementById(button.dataset.copyTarget);
      if (!target) return;
      await copyText(target.textContent.trim());
      showToast(
        `Nomor rekening ${button.dataset.bank || "bank"} berhasil disalin`,
      );
    });
  });

  // Wedding Gift modal
  const giftModal = $("#giftModal");
  const giftDialog = $(".gift-modal-dialog", giftModal);
  const giftOpenButton = $("#openGiftModal");
  const giftAddress = $("#giftAddress");
  const copyGiftAddress = $("#copyGiftAddress");
  let giftLastFocused = null;

  function openGiftModal() {
    giftLastFocused = document.activeElement;
    giftModal.classList.add("open");
    giftModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => giftDialog?.focus());
  }

  function closeGiftModal() {
    giftModal.classList.remove("open");
    giftModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (giftLastFocused && typeof giftLastFocused.focus === "function")
      giftLastFocused.focus();
  }

  giftOpenButton?.addEventListener("click", openGiftModal);
  $$("[data-gift-close]", giftModal).forEach((el) =>
    el.addEventListener("click", closeGiftModal),
  );

  copyGiftAddress?.addEventListener("click", async () => {
    if (!giftAddress) return;
    await copyText(giftAddress.textContent.trim());
    showToast("Alamat pengiriman hadiah berhasil disalin");
  });

  addEventListener("keydown", (e) => {
    if (e.key === "Escape" && giftModal.classList.contains("open"))
      closeGiftModal();
  });

  // Reveal on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.12 },
  );
  $$(".reveal").forEach((el) => observer.observe(el));

  // Background fixed pada body::before memberikan efek parallax sederhana tanpa JavaScript.

  // Lightbox gallery
  const galleryButtons = $$(".gallery-item");
  const galleryImages = galleryButtons.map((btn) => $("img", btn));
  const lightbox = $("#lightbox");
  const lightboxImage = $("#lightboxImage");
  const lightboxCaption = $("#lightboxCaption");
  let currentIndex = 0;

  function showImage(index) {
    currentIndex = (index + galleryImages.length) % galleryImages.length;
    const img = galleryImages[currentIndex];
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightboxCaption.textContent = `${currentIndex + 1} / ${galleryImages.length}`;
  }
  function openLightbox(index) {
    showImage(index);
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  }
  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
  }
  galleryButtons.forEach((btn, i) =>
    btn.addEventListener("click", () => openLightbox(i)),
  );
  $("#lightboxClose").addEventListener("click", closeLightbox);
  $("#lightboxPrev").addEventListener("click", () =>
    showImage(currentIndex - 1),
  );
  $("#lightboxNext").addEventListener("click", () =>
    showImage(currentIndex + 1),
  );
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showImage(currentIndex - 1);
    if (e.key === "ArrowRight") showImage(currentIndex + 1);
  });

  let touchStartX = 0;
  lightbox.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true },
  );
  lightbox.addEventListener(
    "touchend",
    (e) => {
      const dx = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(dx) > 45) showImage(currentIndex + (dx < 0 ? 1 : -1));
    },
    { passive: true },
  );

  // RSVP / Wishes + Reply — Supabase bila dikonfigurasi, localStorage sebagai fallback demo.
  const form = $("#rsvpForm");
  const status = $("#rsvpStatus");
  const wishesList = $("#wishesList");
  const hasSupabase = Boolean(
    cfg.supabaseUrl && cfg.supabaseAnonKey && window.supabase,
  );
  const sb = hasSupabase
    ? window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey)
    : null;
  const storageKey = "agung-efarna-wishes-v2";
  let currentItems = [];

  function escapeHTML(value = "") {
    return String(value).replace(
      /[&<>'"]/g,
      (ch) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#39;",
          '"': "&quot;",
        })[ch],
    );
  }
  function safeId(value) {
    return String(value ?? "").replace(/[^a-zA-Z0-9_-]/g, "-");
  }
  function createLocalId() {
    return `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }

  function buildTree(items) {
    const nodes = new Map();
    const roots = [];
    items.forEach((item) =>
      nodes.set(String(item.id), { ...item, children: [] }),
    );
    nodes.forEach((node) => {
      const parentKey = node.parent_id == null ? null : String(node.parent_id);
      if (parentKey && nodes.has(parentKey))
        nodes.get(parentKey).children.push(node);
      else roots.push(node);
    });
    const byOldest = (a, b) =>
      new Date(a.created_at || 0) - new Date(b.created_at || 0);
    const sortChildren = (node) => {
      node.children.sort(byOldest);
      node.children.forEach(sortChildren);
    };
    roots.sort(
      (a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0),
    );
    roots.forEach(sortChildren);
    return roots;
  }

  function renderComment(item, depth = 0) {
    const id = safeId(item.id);
    const attendance = item.attendance
      ? `<small>${escapeHTML(item.attendance)}</small>`
      : `<small>Balasan</small>`;
    const children = (item.children || [])
      .map((child) => renderComment(child, depth + 1))
      .join("");
    return `
      <article class="wish-card ${depth ? "is-reply" : ""}" data-comment-id="${id}">
        <div class="wish-head"><strong>${escapeHTML(item.name || "Tamu")}</strong>${attendance}</div>
        <p class="wish-message">${escapeHTML(item.message || "")}</p>
        <div class="wish-actions">
          <button class="reply-toggle" type="button" data-reply-id="${id}">↩ Balas</button>
        </div>
        <form class="reply-form" data-parent-id="${id}">
          <label>Nama<input class="reply-name" type="text" maxlength="80" required placeholder="Nama Anda"></label>
          <label>Balasan<textarea class="reply-message" rows="3" maxlength="500" required placeholder="Tuliskan balasan..."></textarea></label>
          <div class="reply-form-actions">
            <button class="primary-button" type="submit">Kirim Balasan</button>
            <button class="reply-cancel" type="button">Batal</button>
          </div>
          <span class="reply-status" role="status"></span>
        </form>
        ${children ? `<div class="reply-children">${children}</div>` : ""}
      </article>`;
  }

  function renderWishes(items) {
    currentItems = items || [];
    if (!currentItems.length) {
      wishesList.innerHTML =
        '<div class="empty-state">Belum ada ucapan. Jadilah yang pertama mengirim doa dan ucapan.</div>';
      return;
    }
    const tree = buildTree(currentItems);
    wishesList.innerHTML = tree.map((item) => renderComment(item)).join("");
  }

  function getLocalItems() {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "[]");
    } catch {
      return [];
    }
  }
  function setLocalItems(items) {
    localStorage.setItem(storageKey, JSON.stringify(items.slice(0, 200)));
  }

  async function loadWishes() {
    if (sb) {
      const { data, error } = await sb
        .from(cfg.supabaseTable || "wedding_wishes")
        .select("id,name,attendance,message,parent_id,created_at")
        .order("created_at", { ascending: false })
        .limit(200);
      if (!error) return renderWishes(data || []);
      console.warn("Supabase load error:", error.message);
    }
    renderWishes(getLocalItems());
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "Mengirim...";
    const payload = {
      name: $("#rsvpName").value.trim(),
      attendance: $("#attendance").value,
      message: $("#message").value.trim(),
      parent_id: null,
    };
    if (!payload.name || !payload.attendance || !payload.message) {
      status.textContent = "Mohon lengkapi semua kolom.";
      return;
    }

    if (sb) {
      const { error } = await sb
        .from(cfg.supabaseTable || "wedding_wishes")
        .insert(payload);
      if (error) {
        status.textContent =
          "Gagal mengirim. Periksa konfigurasi Supabase dan schema terbaru.";
        console.error(error);
        return;
      }
    } else {
      const local = getLocalItems();
      local.unshift({
        ...payload,
        id: createLocalId(),
        created_at: new Date().toISOString(),
      });
      setLocalItems(local);
    }

    status.textContent = sb
      ? "Terima kasih, ucapan Anda berhasil dikirim."
      : "Tersimpan di perangkat ini (mode demo). Aktifkan Supabase agar tampil untuk semua tamu.";
    $("#message").value = "";
    await loadWishes();
  });

  // Event delegation untuk tombol Balas, Batal, dan form reply yang dibuat dinamis.
  wishesList.addEventListener("click", (e) => {
    const toggle = e.target.closest(".reply-toggle");
    if (toggle) {
      const card = toggle.closest(".wish-card");
      const replyForm = card ? $(":scope > .reply-form", card) : null;
      if (!replyForm) return;
      $$(".reply-form.open", wishesList).forEach((f) => {
        if (f !== replyForm) f.classList.remove("open");
      });
      replyForm.classList.toggle("open");
      if (replyForm.classList.contains("open")) {
        const replyName = $(".reply-name", replyForm);
        if (replyName && !replyName.value && guest !== "Bapak/Ibu/Saudara/i")
          replyName.value = guest;
        replyName?.focus();
      }
      return;
    }

    const cancel = e.target.closest(".reply-cancel");
    if (cancel) cancel.closest(".reply-form")?.classList.remove("open");
  });

  wishesList.addEventListener("submit", async (e) => {
    const replyForm = e.target.closest(".reply-form");
    if (!replyForm) return;
    e.preventDefault();

    const replyName = $(".reply-name", replyForm).value.trim();
    const replyMessage = $(".reply-message", replyForm).value.trim();
    const replyStatus = $(".reply-status", replyForm);
    const parentId = replyForm.dataset.parentId;
    if (!replyName || !replyMessage) {
      replyStatus.textContent = "Mohon isi nama dan balasan.";
      return;
    }
    replyStatus.textContent = "Mengirim...";

    if (sb) {
      const numericParent = Number(parentId);
      if (!Number.isFinite(numericParent)) {
        replyStatus.textContent = "ID komentar tidak valid.";
        return;
      }
      const { error } = await sb
        .from(cfg.supabaseTable || "wedding_wishes")
        .insert({
          name: replyName,
          attendance: null,
          message: replyMessage,
          parent_id: numericParent,
        });
      if (error) {
        replyStatus.textContent =
          "Balasan gagal dikirim. Jalankan schema Supabase terbaru.";
        console.error(error);
        return;
      }
    } else {
      const local = getLocalItems();
      local.push({
        id: createLocalId(),
        name: replyName,
        attendance: null,
        message: replyMessage,
        parent_id: parentId,
        created_at: new Date().toISOString(),
      });
      setLocalItems(local);
    }

    replyStatus.textContent = "Balasan berhasil dikirim.";
    await loadWishes();
  });

  loadWishes();
})();
