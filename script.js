document.addEventListener("DOMContentLoaded", () => {

    // =================================
    // TAHUN OTOMATIS
    // =================================

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    // =================================
    // DARK MODE DAN LIGHT MODE
    // =================================

    const body = document.body;
    const themeButton = document.querySelector(".theme-toggle");

    const savedTheme = localStorage.getItem("kusnul-theme");

    if (savedTheme === "dark") {
        body.classList.add("dark");
    }

    function updateThemeIcon() {

        if (themeButton) {
            themeButton.textContent =
                body.classList.contains("dark") ? "☀" : "☾";
        }

    }

    updateThemeIcon();

    if (themeButton) {

        themeButton.addEventListener("click", () => {

            body.classList.toggle("dark");

            localStorage.setItem(
                "kusnul-theme",
                body.classList.contains("dark") ? "dark" : "light"
            );

            updateThemeIcon();

        });

    }


    // =================================
    // MENU NAVIGASI HP
    // =================================

    const menuButton = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav-links");

    if (menuButton && nav) {

        menuButton.addEventListener("click", () => {

            const isOpen = nav.classList.toggle("open");

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuButton.textContent = isOpen ? "×" : "☰";

        });

    }


    // =================================
    // FORM KONTAK EMAIL
    // =================================

    const form = document.getElementById("contactForm");
    const feedback = document.getElementById("formFeedback");

    if (form && feedback) {

        form.addEventListener("submit", async (event) => {

            event.preventDefault();

            const name = form.elements.name.value.trim();
            const phone = form.elements.phone.value.trim();
            const email = form.elements.email.value.trim();
            const message = form.elements.message.value.trim();

            // Validasi nama

            if (name.length < 2) {

                feedback.textContent =
                    "Nama minimal 2 karakter.";

                form.elements.name.focus();
                return;

            }

            // Validasi nomor WhatsApp

            const phoneClean = phone.replace(/[\s\-+()]/g, "");

            if (!/^0?8[0-9]{8,12}$/.test(phoneClean)) {

                feedback.textContent =
                    "Nomor WhatsApp tidak valid. Contoh: 081234567890.";

                form.elements.phone.focus();
                return;

            }

            // Validasi email

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                feedback.textContent =
                    "Masukkan alamat email yang benar.";

                form.elements.email.focus();
                return;

            }

            // Validasi pesan

            if (message.length < 10) {

                feedback.textContent =
                    "Pesan minimal 10 karakter.";

                form.elements.message.focus();
                return;

            }


            // =================================
            // KONFIGURASI EMAIL
            // =================================

            const emailTujuan = "kusnulanjai@gmail.com";

            const data = new FormData();

            data.append("name", name);
            data.append("phone", phone);
            data.append("email", email);
            data.append("message", message);

            data.append(
                "_subject",
                "Pesan Baru dari Website Kusnul Portfolio"
            );

            data.append("_template", "table");


            // =================================
            // PROSES PENGIRIMAN
            // =================================

            const tombol = form.querySelector(
                "button[type='submit']"
            );

            tombol.disabled = true;
            tombol.innerHTML = "Mengirim...";

            feedback.textContent =
                "Sedang mengirim pesan, harap tunggu...";

            try {

                const response = await fetch(
                    `https://formsubmit.co/ajax/${emailTujuan}`,
                    {
                        method: "POST",
                        body: data,
                        headers: {
                            "Accept": "application/json"
                        }
                    }
                );

                const result = await response.json();

                if (response.ok && result.success) {

                    feedback.textContent =
                        "Pesan berhasil dikirim! Terima kasih sudah menghubungi saya.";

                    form.reset();

                } else {

                    feedback.textContent =
                        "Pesan gagal dikirim. Silakan coba beberapa saat lagi.";

                }

            } catch (error) {

                console.error("Email error:", error);

                feedback.textContent =
                    "Terjadi kesalahan koneksi. Silakan coba lagi.";

            } finally {

                tombol.disabled = false;

                tombol.innerHTML =
                    'Kirim Pesan <span>→</span>';

            }

        });

    }

});
