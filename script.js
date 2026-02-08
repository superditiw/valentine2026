document.addEventListener('DOMContentLoaded', function() {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const popup = document.getElementById('error-popup');
    const closePopup = document.getElementById('close-popup');
    const giftBtns = document.querySelectorAll('.gift-btn');
    const message = document.getElementById('message');
    const specialPopup = document.getElementById('special-popup');
    const closeSpecialPopup = document.getElementById('close-special-popup');
    const passwordInput = document.getElementById('password-input');
    const submitPassword = document.getElementById('submit-password');
    const couponPopup = document.getElementById('coupon-popup');
    const closeCouponPopup = document.getElementById('close-coupon-popup');
    const couponImage = document.getElementById('coupon-image');
    const couponMessage = document.getElementById('coupon-message');
    
    let clickCount = 0;
    const correctPassword = 'dimas anak baik dan pintar'; // password yang benar
    let lastClickedBtn = null; // tombol yang diklik terakhir keberapa (ini khusus untuk ke3)
    let passwordSubmittedCorrectly = false; // untuk cek password sudah benar ato belum, awalnya false karena belum disubmit

    if (yesBtn) {
        yesBtn.addEventListener('click', function() {
            window.location.href = 'gifts.html';
        });
    }

    if (noBtn) {
        noBtn.addEventListener('click', function() {
            popup.classList.add('active');

        });
    }

    if (closePopup) {
        closePopup.addEventListener('click', function() {
            popup.classList.remove('active');
        });
    }

    if (giftBtns.length > 0) {
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        const giftsContainer = document.querySelector('.gifts');
        if (giftsContainer) { // jika giftsContainer 'ada' -> jalankan kode
            const giftElements = Array.from(giftsContainer.children); // value dari 3 gifts di gifts.html konversi ke array
            shuffleArray(giftElements);  // dilakukan shuffle namun hanya pada memori di JS
            giftsContainer.innerHTML = '';  // mengosongkan tampilan
            giftElements.forEach(el => giftsContainer.appendChild(el)); // memunculkan lagi tampilannya 
        }

        giftBtns.forEach(btn => {
            btn.addEventListener('click', function() {

                if (clickCount >= 3) return;

                clickCount++;

                const gift = this.getAttribute('data-gift');
                let imageSrc = '';
                let couponMsg = '';

                if (gift === 'FLOWER') {
                    imageSrc = 'images/flowers.png';
                    couponMsg = '🌸 Enjoy your Flower coupon!';
                } else if (gift === 'CHOCOLATE') {
                    imageSrc = 'images/chocolates.png';
                    couponMsg = '🍫 Enjoy your Chocolate coupon!';
                } else if (gift === 'LOVE') {
                    imageSrc = 'images/love.png';
                    couponMsg = '❤️ Enjoy your Love coupon!';
                }

                this.disabled = true;

                // 👉 GIFT KE-3 (PAKAI PASSWORD)
                if (clickCount === 3) {
                    message.textContent = `YEAAYY CANTIKKU DAPAT ${gift} COUPON!\n\nSELAMAT DAPAT 3 COUPON YUHUUUUUUUUUU!`;

                    lastClickedBtn = this;

                    // simpan data hadiah
                    this.dataset.couponImage = imageSrc;
                    this.dataset.couponMessage = couponMsg;

                    // specialPopup.style.display = 'block';
                    specialPopup.classList.add('active');
                    return;
                }

                // 👉 GIFT KE-1 & KE-2 (LANGSUNG)
                message.textContent = `YEAAYY CANTIKKU DAPAT ${gift} COUPON!\n\nada ${clickCount} coupon yang cantikku dapatkan!`;

                couponImage.src = imageSrc;
                couponMessage.textContent = couponMsg;
                //couponPopup.style.display = 'block';
                couponPopup.classList.add('active');
            });
        });



        // Logika untuk tombol submit password di special popup
        if (submitPassword) {
            submitPassword.addEventListener('click', function() {
                const enteredPassword = passwordInput.value.trim();
                if (enteredPassword === correctPassword) {
                    // Password benar: Auto-close popup dan langsung dapat hadiah
                    passwordSubmittedCorrectly = true; // Set flag
                    // specialPopup.style.display = 'none';

                    specialPopup.classList.remove('active');

                    const img = lastClickedBtn.dataset.couponImage;
                    const msg = lastClickedBtn.dataset.couponMessage;

                    // tampilkan coupon
                    couponImage.src = img;
                    couponMessage.textContent = msg;
                    couponPopup.classList.add('active');

                    message.textContent += ' hehehe cieeee dapet 3, ditunggu yaa claim hadiahnya!';


                    passwordInput.value = ''; // Reset input
                } else {
                    alert('Password salah! Coba lagi.');
                    passwordInput.value = ''; // Reset input
                }
            });
        }

        // Logika untuk tombol close (X) pada special popup
        if (closeSpecialPopup) {
            closeSpecialPopup.addEventListener('click', function() {
                // specialPopup.style.display = 'none';

                specialPopup.classList.remove('active');
                // Jika password belum benar, izinkan klik ulang gift ke-3
                if (!passwordSubmittedCorrectly && clickCount === 3 && lastClickedBtn) {
                    clickCount = 2; // Kurangi clickCount
                    lastClickedBtn.disabled = false; // Enable tombol kembali
                    lastClickedBtn = null; // Reset
                    message.textContent = `hanya ada 2 coupon yang cantikku dapatkan!`;
                }
            });
        }

        // Tutup special popup jika klik di luar (opsional)
        window.addEventListener('click', function(event) {
            if (event.target === specialPopup) {
                // specialPopup.style.display = 'none';

                specialPopup.classList.remove('active');
                // Jika password belum benar, izinkan klik ulang gift ke-3
                if (!passwordSubmittedCorrectly && clickCount === 3 && lastClickedBtn) {
                    clickCount = 2; // Kurangi clickCount
                    lastClickedBtn.disabled = false; // Enable tombol kembali
                    lastClickedBtn = null; // Reset                    
                }
            }
        });

        if (closeCouponPopup) {
            closeCouponPopup.addEventListener('click', function() {
                couponPopup.classList.remove('active');
            });
        }
    }
});
