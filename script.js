/**
 * DANIEL PRATAMA NAPITUPULU — CURRICULUM VITAE & PORTFOLIO INTERACTIVITY
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Current Year in Footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Mobile Navigation Toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking on nav link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Active Nav Link on Scroll
  const sections = document.querySelectorAll('main > section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const onScroll = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  // 4. Toast Notification System
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMessage');
  let toastTimer = null;

  window.showToast = function (message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  };

  // 5. Copy Email
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyEmailText = document.getElementById('copyEmailText');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = copyEmailBtn.getAttribute('data-email') || 'danielpratama31001@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email berhasil disalin: ' + email);
        if (copyEmailText) {
          const original = copyEmailText.textContent;
          copyEmailText.textContent = 'Tersalin!';
          setTimeout(() => {
            copyEmailText.textContent = original;
          }, 2000);
        }
      }).catch(() => {
        showToast('Gagal menyalin, silakan salin manual: ' + email);
      });
    });
  }

  // 6. Copy WhatsApp Number
  const copyWaNumBtn = document.getElementById('copyWaNumBtn');
  const copyWaText = document.getElementById('copyWaText');

  if (copyWaNumBtn) {
    copyWaNumBtn.addEventListener('click', () => {
      const phone = copyWaNumBtn.getAttribute('data-phone') || '085133965577';
      navigator.clipboard.writeText(phone).then(() => {
        showToast('Nomor WhatsApp disalin: ' + phone);
        if (copyWaText) {
          const original = copyWaText.textContent;
          copyWaText.textContent = 'Nomor Tersalin!';
          setTimeout(() => {
            copyWaText.textContent = original;
          }, 2000);
        }
      }).catch(() => {
        showToast('Gagal menyalin nomor WhatsApp.');
      });
    });
  }

  // 7. WhatsApp Direct Message Launcher & Template Manager
  const waInput = document.getElementById('waMessageInput');
  const sendWaBtn = document.getElementById('sendWaBtn');

  window.applyTemplate = function (text) {
    if (waInput) {
      waInput.value = text;
      waInput.focus();
      showToast('Template pesan diterapkan!');
    }
  };

  if (sendWaBtn && waInput) {
    sendWaBtn.addEventListener('click', () => {
      const message = waInput.value.trim() || 'Halo Daniel Pratama, saya ingin berdiskusi mengenai proyek desain.';
      const encodedMsg = encodeURIComponent(message);
      const waUrl = `https://wa.me/6285133965577?text=${encodedMsg}`;
      window.open(waUrl, '_blank');
    });
  }

  // 8. Portfolio Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filterVal === 'all' || cat === filterVal) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 9. Portfolio Modal Data & Controller
  const projectData = {
    project1: {
      category: 'Desain Grafis & Brand Identity',
      title: 'Rebranding & Panduan Identitas Visual UMKM Retail',
      overview: 'Proyek revitalisasi identitas visual untuk entitas retail modern di Pekanbaru, menggantikan identitas lama yang kaku dengan sistem visual yang adaptif untuk media cetak maupun media digital.',
      challenges: [
        'Membangun identitas merek yang memiliki diferensiasi kuat dari kompetitor di pasar lokal.',
        'Menciptakan logo yang mudah diaplikasikan pada berbagai media fisik (kemasan produk, nota, papan toko) hingga format digital (avatar media sosial, watermark video).'
      ],
      solutions: [
        'Merancang logo monoline modern dengan siluet geometris presisi yang merepresentasikan kehandalan.',
        'Menyusun palet warna korporat (Navy, Ice Blue, dan Gold) serta aturan tipografi hierarkis.',
        'Membuat Brand Guidelines komprehensif berisi zona aman logo, variasi warna, dan contoh mockup kemasan.'
      ],
      impact: 'Meningkatkan citra profesionalisme bisnis secara signifikan di mata konsumen dan mempercepat produksi materi promosi harian.',
      tags: ['Adobe Photoshop', 'Adobe Illustrator', 'Brand Guidelines', 'Packaging Mockup', 'Vector Art']
    },
    project2: {
      category: 'Pemasaran Digital & Konten',
      title: 'Kampanye Konten Edukasi Bisnis Digital & Event Kampus',
      overview: 'Rangkaian kampanye komunikasi dan promosi digital terpadu untuk kegiatan seminar dan publikasi mahasiswa Bisnis Digital UNILAK lintas platform Instagram & TikTok.',
      challenges: [
        'Rendahnya retensi perhatian audiens muda terhadap materi seminar konvensional.',
        'Kebutuhan materi promosi yang harus dibuat dalam tenggat waktu singkat dengan estetika konsisten.'
      ],
      solutions: [
        'Mengembangkan format konten carousel edukatif dengan teknik copywriting "Hook-Story-Offer".',
        'Mendesain visual feed bertema dark navy dengan kontras tinggi agar mencolok di linimasa media sosial.',
        'Mengoptimasi video pendek TikTok dengan teks pembuka dinamis dan audio pendukung yang sedang tren.'
      ],
      impact: 'Mencapai lonjakan engagement rate hingga 140% dan registrasi peserta seminar melampaui kuota target sebelum batas waktu.',
      tags: ['Content Strategy', 'Instagram Reels', 'TikTok Growth', 'Copywriting', 'Canva Pro']
    },
    project3: {
      category: 'Analisis Data & Riset Pasar',
      title: 'Dashboard Analisis Perilaku Konsumen & Performa Penjualan',
      overview: 'Pengembangan spreadsheet analitik terstruktur untuk memantau performa penjualan produk, frekuensi pembelian ulang, serta korelasi antara kampanye promosi dengan konversi.',
      challenges: [
        'Data transaksi yang tersebar tidak beraturan tanpa visualisasi yang jelas bagi pengambil keputusan.',
        'Sulitnya mengidentifikasi produk unggulan dan segmen konsumen dengan nilai transaksi tertinggi.'
      ],
      solutions: [
        'Membersihkan (data cleaning) dan menstrukturkan ribuan baris data transaksi ke dalam format database tabular.',
        'Membangun Pivot Table dinamis dan formula kalkulasi Customer Lifetime Value (CLV).',
        'Merancang dashboard interaktif dengan grafik visual tren harian, heatmap waktu belanja, dan KPI ringkas.'
      ],
      impact: 'Manajemen dapat memangkas alokasi promosi pada produk yang tidak menguntungkan dan memfokuskan anggaran pada segmen dengan konversi tertinggi.',
      tags: ['Microsoft Excel', 'Data Cleaning', 'Pivot Analytics', 'Data Visualization', 'Business Insight']
    },
    project4: {
      category: 'Desain Grafis Industri & K3',
      title: 'Poster Signage & Kampanye Keselamatan Kerja (HSE Awareness)',
      overview: 'Inisiatif perancangan poster edukasi keselamatan kerja (K3/HSE) yang terinspirasi dari standar fasilitas Kilang Pertamina RU II Dumai, ditujukan untuk meminimalisasi insiden kerja dan mengingatkan pentingnya APD.',
      challenges: [
        'Poster peringatan bahaya di lapangan sering kali diabaikan karena tata letak yang monoton dan teks terlalu panjang.',
        'Standar industri kilang minyak menuntut tingkat pemahaman instan (instant recognition) dari jarak pandang tertentu.'
      ],
      solutions: [
        'Menggunakan piktogram universal berstandar ISO dengan palet warna kontras tinggi (Kuning Keamanan, Merah Bahaya, Navy Industri).',
        'Menyederhanakan instruksi menjadi 3 langkah visual cepat (Periksa - Kenakan - Lapor).',
        'Membuat tata letak responsif ukuran besar untuk dinding area pabrik dan selebaran ukuran saku bagi teknisi.'
      ],
      impact: 'Mendapat apresiasi positif dalam meningkatkan pemahaman standar operasional keselamatan kerja bagi staf dan personel lapangan.',
      tags: ['HSE Awareness', 'Industrial Signage', 'Adobe Illustrator', 'Visual Communication', 'Infographics']
    }
  };

  const modalBackdrop = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalBody = document.getElementById('modalBody');

  window.openProjectModal = function (projectId) {
    const data = projectData[projectId];
    if (!data || !modalBody || !modalBackdrop) return;

    modalBody.innerHTML = `
      <div class="modal-header-tag">${data.category}</div>
      <h3 class="modal-title">${data.title}</h3>
      
      <p class="modal-text">${data.overview}</p>

      <h4 class="modal-section-title">Tantangan Proyek:</h4>
      <ul class="modal-list">
        ${data.challenges.map(c => `<li>${c}</li>`).join('')}
      </ul>

      <h4 class="modal-section-title">Solusi &amp; Pendekatan Visual:</h4>
      <ul class="modal-list">
        ${data.solutions.map(s => `<li>${s}</li>`).join('')}
      </ul>

      <h4 class="modal-section-title">Dampak &amp; Hasil Akhir:</h4>
      <p class="modal-text" style="color: #6ee7b7; font-weight: 600;">${data.impact}</p>

      <div class="modal-badge-row">
        ${data.tags.map(t => `<span class="modal-badge">${t}</span>`).join('')}
      </div>
    `;

    modalBackdrop.classList.add('active');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('active');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });
});
