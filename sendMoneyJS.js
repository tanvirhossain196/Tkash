// Enhanced Professional Send Money Form Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const showBalanceBtn = document.getElementById("showBalanceBtn");
  const hideBalanceBtn = document.getElementById("hideBalanceBtn");
  const balanceHidden = document.getElementById("balanceHidden");
  const balanceVisible = document.getElementById("balanceVisible");

  const numberInputSection = document.getElementById("numberInputSection");
  const amountInputSection = document.getElementById("amountInputSection");
  const numberNextBtn = document.getElementById("numberNextBtn");
  const backToNumberBtn = document.getElementById("backToNumberBtn");
  const clearSearchBtn = document.getElementById("clearSearch");

  const phoneInput = document.getElementById("phone-number");
  const amountInput = document.getElementById("amount");
  const quickAmountBtns = document.querySelectorAll(".quick-amount-btn");
  const contactItems = document.querySelectorAll(".contact-item");
  const giftOptions = document.querySelectorAll(".gift-option");
  const tabBtns = document.querySelectorAll(".tab-btn");

  const summaryAmount = document.getElementById("summary-amount");
  const summaryCharge = document.getElementById("summary-charge");
  const summaryTotal = document.getElementById("summary-total");
  const sendMoneyBtn = document.getElementById("send-money-btn");

  // Variables
  let selectedContact = null;
  let currentAmount = 0;
  let currentCharge = 0;
  let currentTotal = 0;

  // Add number formatting function
  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Balance toggle with animation
  if (showBalanceBtn) {
    showBalanceBtn.addEventListener("click", function () {
      balanceHidden.style.opacity = "0";
      setTimeout(() => {
        balanceHidden.style.display = "none";
        balanceVisible.style.display = "flex";
        balanceVisible.style.opacity = "0";
        setTimeout(() => {
          balanceVisible.style.opacity = "1";
        }, 50);
      }, 150);
    });
  }

  if (hideBalanceBtn) {
    hideBalanceBtn.addEventListener("click", function () {
      balanceVisible.style.opacity = "0";
      setTimeout(() => {
        balanceVisible.style.display = "none";
        balanceHidden.style.display = "flex";
        balanceHidden.style.opacity = "0";
        setTimeout(() => {
          balanceHidden.style.opacity = "1";
        }, 50);
      }, 150);
    });
  }

  // Tab switching
  if (tabBtns.length) {
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Remove active class from all tabs
        tabBtns.forEach((tab) => tab.classList.remove("active"));

        // Add active class to clicked tab
        this.classList.add("active");

        // Get tab content id
        const tabId = this.dataset.tab;

        // Animation for smoother tab transition
        const contactsContainer = document.querySelector(".contacts-container");
        contactsContainer.style.opacity = "0";

        setTimeout(() => {
          contactsContainer.style.opacity = "1";
        }, 200);
      });
    });
  }

  // Clear search button
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", function () {
      phoneInput.value = "";
      phoneInput.focus();
    });
  }

  // Navigation between sections with smooth transition
  if (numberNextBtn) {
    numberNextBtn.addEventListener("click", function () {
      // Validate phone number
      if (phoneInput.value.length >= 11 || selectedContact) {
        // Add exit animation to current section
        numberInputSection.style.opacity = "0";
        numberInputSection.style.transform = "translateX(-20px)";

        setTimeout(() => {
          numberInputSection.style.display = "none";

          // Show amount section with entrance animation
          amountInputSection.style.display = "block";
          amountInputSection.style.opacity = "0";
          amountInputSection.style.transform = "translateX(20px)";

          setTimeout(() => {
            amountInputSection.style.opacity = "1";
            amountInputSection.style.transform = "translateX(0)";
          }, 50);

          // Set recipient display info from selected contact or input
          const recipientName = document.querySelector(".recipient-name");
          const recipientNumber = document.querySelector(".recipient-number");
          const recipientAvatar = document.querySelector(".recipient-avatar");
          const operatorBadge = document.querySelector(
            ".recipient-name-operator .operator-badge"
          );

          if (selectedContact) {
            recipientName.textContent = selectedContact.name;
            recipientNumber.textContent = selectedContact.number;
            recipientAvatar.textContent = selectedContact.initial;
            recipientAvatar.className =
              "recipient-avatar " + selectedContact.gradient;
            operatorBadge.className =
              "operator-badge " + selectedContact.operator;
            operatorBadge.textContent = selectedContact.operatorName;
          } else {
            recipientName.textContent = "নতুন পরিচিতি";
            recipientNumber.textContent = phoneInput.value;
            recipientAvatar.textContent = "ন";
            recipientAvatar.className = "recipient-avatar gradient-1";

            // Determine operator from number
            let operator = "gp";
            let operatorName = "জিপি";

            if (phoneInput.value.startsWith("017")) {
              operator = "gp";
              operatorName = "জিপি";
            } else if (phoneInput.value.startsWith("018")) {
              operator = "robi";
              operatorName = "রবি";
            } else if (phoneInput.value.startsWith("019")) {
              operator = "bl";
              operatorName = "বিএল";
            } else if (phoneInput.value.startsWith("016")) {
              operator = "airtel";
              operatorName = "এয়ারটেল";
            } else if (phoneInput.value.startsWith("015")) {
              operator = "tt";
              operatorName = "টেলিটক";
            }

            operatorBadge.className = "operator-badge " + operator;
            operatorBadge.textContent = operatorName;
          }

          // Focus on amount input
          amountInput.focus();
        }, 200);
      } else {
        // Shake effect for validation error
        phoneInput.classList.add("shake-effect");
        setTimeout(() => {
          phoneInput.classList.remove("shake-effect");
        }, 600);

        // Show validation message
        const searchContainer = document.querySelector(".search-container");
        const validationMsg = document.createElement("div");
        validationMsg.className = "validation-message";
        validationMsg.textContent = "সঠিক মোবাইল নম্বর দিন";
        validationMsg.style.color = "#e74c3c";
        validationMsg.style.fontSize = "12px";
        validationMsg.style.textAlign = "center";
        validationMsg.style.padding = "5px";

        // Remove any existing validation message
        const existingMsg = searchContainer.querySelector(
          ".validation-message"
        );
        if (existingMsg) {
          existingMsg.remove();
        }

        searchContainer.appendChild(validationMsg);

        // Auto remove message after 3 seconds
        setTimeout(() => {
          validationMsg.style.opacity = "0";
          setTimeout(() => {
            validationMsg.remove();
          }, 300);
        }, 3000);
      }
    });
  }

  if (backToNumberBtn) {
    backToNumberBtn.addEventListener("click", function () {
      // Add exit animation
      amountInputSection.style.opacity = "0";
      amountInputSection.style.transform = "translateX(20px)";

      setTimeout(() => {
        amountInputSection.style.display = "none";

        // Show number section with entrance animation
        numberInputSection.style.display = "block";
        numberInputSection.style.opacity = "0";
        numberInputSection.style.transform = "translateX(-20px)";

        setTimeout(() => {
          numberInputSection.style.opacity = "1";
          numberInputSection.style.transform = "translateX(0)";
        }, 50);
      }, 200);
    });
  }

  // Contact selection with enhanced animation
  contactItems.forEach((contact) => {
    contact.addEventListener("click", function () {
      // Add selection animation
      this.classList.add("selected-contact");

      // Get contact info
      const name = this.querySelector(".contact-name").textContent;
      const number = this.querySelector(".contact-number").textContent;
      const initial = name.charAt(0);
      const avatarClass = this.querySelector(".contact-avatar").className;
      const gradient = avatarClass.split(" ")[1];
      const operatorBadge = this.querySelector(".operator-badge");
      const operator = operatorBadge.className.split(" ")[1];
      const operatorName = operatorBadge.textContent;

      // Store selected contact
      selectedContact = {
        name,
        number,
        initial,
        gradient,
        operator,
        operatorName,
      };

      // Set number input value
      phoneInput.value = number;

      // Highlight selected contact
      contactItems.forEach((item) => {
        if (item !== this) {
          item.classList.remove("selected-contact");
        }
      });

      // Automatically go to next section after a short delay
      setTimeout(() => {
        numberNextBtn.click();
      }, 500);
    });
  });

  // Gift option selection with animation
  giftOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // First remove active class with fadeout
      giftOptions.forEach((opt) => {
        if (opt.classList.contains("active")) {
          opt.style.transition = "all 0.3s";
          opt.style.opacity = "0.6";
          opt.style.transform = "scale(0.95)";

          setTimeout(() => {
            opt.classList.remove("active");
            opt.style.opacity = "1";
            opt.style.transform = "scale(1)";
          }, 150);
        }
      });

      // Add active class with animation
      setTimeout(() => {
        this.classList.add("active");
        this.style.transition = "all 0.3s";
        this.style.transform = "scale(1.05)";

        setTimeout(() => {
          this.style.transform = "scale(1)";
        }, 200);
      }, 150);
    });
  });

  // Charge calculation function
  function calculateCharge(amount) {
    if (!amount || amount <= 0) return 0;

    // bKash charge structure
    if (amount <= 500) return 5;
    if (amount <= 1000) return 10;
    if (amount <= 2500) return 15;
    if (amount <= 5000) return 25;
    if (amount <= 10000) return 40;
    if (amount <= 25000) return 55;
    return 60; // For amounts over 25,000
  }

  // Process amount change with animations
  function updateAmount(amount) {
    currentAmount = amount;
    currentCharge = calculateCharge(currentAmount);
    currentTotal = currentAmount + currentCharge;

    // Update display with counting animation
    animateValue(
      summaryAmount,
      "৳" + (summaryAmount.innerText.replace("৳", "") || "0"),
      "৳" + formatNumber(currentAmount),
      300
    );
    animateValue(
      summaryCharge,
      "৳" + (summaryCharge.innerText.replace("৳", "") || "0"),
      "৳" + formatNumber(currentCharge),
      300
    );
    animateValue(
      summaryTotal,
      "৳" + (summaryTotal.innerText.replace("৳", "") || "0"),
      "৳" + formatNumber(currentTotal),
      300
    );

    // Enable/disable send button with animation
    if (currentAmount >= 10 && !sendMoneyBtn.classList.contains("enabled")) {
      sendMoneyBtn.disabled = false;
      sendMoneyBtn.classList.add("enabled");
      sendMoneyBtn.style.transition = "all 0.3s";
      sendMoneyBtn.style.animation = "pulse 2s infinite";
    } else if (
      currentAmount < 10 &&
      sendMoneyBtn.classList.contains("enabled")
    ) {
      sendMoneyBtn.disabled = true;
      sendMoneyBtn.classList.remove("enabled");
      sendMoneyBtn.style.animation = "none";
    }

    // Update active state for quick amount buttons
    quickAmountBtns.forEach((btn) => {
      const btnAmount = parseInt(btn.dataset.amount);

      if (btnAmount === currentAmount && !btn.classList.contains("active")) {
        // Add active class with animation
        btn.style.transition = "all 0.3s";
        btn.style.transform = "scale(0.95)";
        setTimeout(() => {
          btn.classList.add("active");
          btn.style.transform = "scale(1.05)";
          setTimeout(() => {
            btn.style.transform = "scale(1)";
          }, 200);
        }, 50);
      } else if (
        btnAmount !== currentAmount &&
        btn.classList.contains("active")
      ) {
        // Remove active class
        btn.style.transition = "all 0.3s";
        btn.style.opacity = "0.8";
        setTimeout(() => {
          btn.classList.remove("active");
          btn.style.opacity = "1";
        }, 200);
      }
    });
  }

  // Animate value changes
  function animateValue(element, start, end, duration) {
    // Strip non-numeric characters for calculation but keep for display
    const startValue = parseInt(start.replace(/[^\d]/g, "")) || 0;
    const endValue = parseInt(end.replace(/[^\d]/g, ""));
    const prefix = end.replace(/[\d,]/g, "");

    // Don't animate if values are the same
    if (startValue === endValue) return;

    let startTime = null;
    const step = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = Math.floor(progress * (endValue - startValue) + startValue);
      element.textContent = prefix + formatNumber(value);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  // Quick amount buttons with enhanced feedback
  quickAmountBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const amount = parseInt(this.dataset.amount);

      // Set value with visual feedback
      amountInput.value = amount;
      amountInput.style.transition = "all 0.2s";
      amountInput.style.transform = "scale(1.05)";

      setTimeout(() => {
        amountInput.style.transform = "scale(1)";
      }, 200);

      updateAmount(amount);
    });
  });

  // Amount input change with better formatting
  if (amountInput) {
    amountInput.addEventListener("input", function () {
      // Remove non-numeric characters
      this.value = this.value.replace(/[^\d]/g, "");

      let value = parseInt(this.value) || 0;

      // Restrict to maximum allowed amount
      if (value > 25000) {
        value = 25000;
        this.value = value;

        // Show max limit notification
        const amountCard = document.querySelector(".amount-entry-card");
        const maxNote = document.createElement("div");
        maxNote.className = "max-limit-note";
        maxNote.textContent = "সর্বোচ্চ ২৫,০০০ টাকা পাঠানো যাবে";
        maxNote.style.color = "#e74c3c";
        maxNote.style.fontSize = "12px";
        maxNote.style.textAlign = "center";
        maxNote.style.padding = "5px";
        maxNote.style.marginTop = "10px";

        // Remove any existing note
        const existingNote = amountCard.querySelector(".max-limit-note");
        if (existingNote) {
          existingNote.remove();
        }

        amountCard.appendChild(maxNote);

        // Auto remove after 3 seconds
        setTimeout(() => {
          maxNote.style.opacity = "0";
          setTimeout(() => {
            maxNote.remove();
          }, 300);
        }, 3000);
      }

      updateAmount(value);
    });

    // Add focus effects
    amountInput.addEventListener("focus", function () {
      const wrapper = this.closest(".amount-input-wrapper");
      wrapper.style.boxShadow = "0 0 0 2px rgba(226, 20, 108, 0.2)";
    });

    amountInput.addEventListener("blur", function () {
      const wrapper = this.closest(".amount-input-wrapper");
      wrapper.style.boxShadow = "";
    });
  }

  // Add focus effects to phone input
  if (phoneInput) {
    phoneInput.addEventListener("focus", function () {
      const wrapper = this.closest(".search-input-wrapper");
      wrapper.style.boxShadow = "0 0 0 2px rgba(226, 20, 108, 0.2)";
    });

    phoneInput.addEventListener("blur", function () {
      const wrapper = this.closest(".search-input-wrapper");
      wrapper.style.boxShadow = "";
    });

    // Real-time formatting and validation
    phoneInput.addEventListener("input", function () {
      // Remove non-numeric characters
      this.value = this.value.replace(/\D/g, "");

      // Auto determine operator from number
      if (this.value.length >= 3) {
        let operator = "unknown";

        if (this.value.startsWith("017")) {
          operator = "gp";
        } else if (this.value.startsWith("018")) {
          operator = "robi";
        } else if (this.value.startsWith("019")) {
          operator = "bl";
        } else if (this.value.startsWith("016")) {
          operator = "airtel";
        } else if (this.value.startsWith("015")) {
          operator = "tt";
        }

        // Update search icon with operator icon
        const searchIcon = document.querySelector(".search-icon");
        if (operator !== "unknown") {
          searchIcon.className = "operator-indicator " + operator;
          searchIcon.innerHTML = getOperatorShortName(operator);
          searchIcon.style.width = "20px";
          searchIcon.style.height = "20px";
          searchIcon.style.borderRadius = "50%";
          searchIcon.style.color = "white";
          searchIcon.style.fontSize = "10px";
          searchIcon.style.fontWeight = "bold";
          searchIcon.style.display = "flex";
          searchIcon.style.alignItems = "center";
          searchIcon.style.justifyContent = "center";
        } else {
          searchIcon.className = "search-icon";
          searchIcon.innerHTML = '<i class="fas fa-search"></i>';
        }
      } else {
        // Reset to search icon
        const searchIcon = document.querySelector(".search-icon");
        searchIcon.className = "search-icon";
        searchIcon.innerHTML = '<i class="fas fa-search"></i>';
      }
    });
  }

  // Helper function to get operator short name
  function getOperatorShortName(operator) {
    switch (operator) {
      case "gp":
        return "GP";
      case "robi":
        return "R";
      case "bl":
        return "BL";
      case "airtel":
        return "AT";
      case "tt":
        return "TT";
      default:
        return "";
    }
  }

  // Send Money button click
  if (sendMoneyBtn) {
    sendMoneyBtn.addEventListener("click", function () {
      if (currentAmount >= 10) {
        const recipient =
          document.querySelector(".recipient-number").textContent;

        // Show sending animation
        this.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> সেন্ড হচ্ছে...';
        this.style.pointerEvents = "none";

        // Simulate API call delay
        setTimeout(() => {
          // Show PIN modal in real implementation
          showPinEntryModal(
            recipient,
            currentAmount,
            currentCharge,
            currentTotal
          );
        }, 1000);
      }
    });
  }

  // PIN Entry Modal
  function showPinEntryModal(recipient, amount, charge, total) {
    // Create modal overlay
    const modalOverlay = document.createElement("div");
    modalOverlay.className = "modal-overlay";

    const modalHTML = `
      <div class="pin-modal">
        <div class="pin-modal-header">
          <h3 class="pin-title">PIN দিন</h3>
          <button class="pin-close-btn">&times;</button>
        </div>
        <div class="pin-modal-body">
          <div class="pin-summary">
            <div class="pin-summary-row">
              <span class="pin-label">প্রাপক</span>
              <span class="pin-value">${recipient}</span>
            </div>
            <div class="pin-summary-row">
              <span class="pin-label">পরিমাণ</span>
              <span class="pin-value">৳${formatNumber(amount)}</span>
            </div>
            <div class="pin-summary-row">
              <span class="pin-label">চার্জ</span>
              <span class="pin-value">৳${formatNumber(charge)}</span>
            </div>
            <div class="pin-summary-row total">
              <span class="pin-label">মোট</span>
              <span class="pin-value">৳${formatNumber(total)}</span>
            </div>
          </div>
          
          <div class="pin-input-container">
            <label class="pin-label">আপনার PIN দিন</label>
            <div class="pin-digits">
              <input type="password" class="pin-digit" maxlength="1" inputmode="numeric">
              <input type="password" class="pin-digit" maxlength="1" inputmode="numeric">
              <input type="password" class="pin-digit" maxlength="1" inputmode="numeric">
              <input type="password" class="pin-digit" maxlength="1" inputmode="numeric">
            </div>
            <div class="pin-error"></div>
      </div>
          
          <button class="pin-confirm-btn" disabled>নিশ্চিত করুন</button>
          
          <div class="pin-help">
            <a href="#" class="forgot-pin">PIN ভুলে গেছেন?</a>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modalOverlay);
    modalOverlay.innerHTML = modalHTML;

    // Animate modal appearance
    setTimeout(() => {
      modalOverlay.style.opacity = "1";
      modalOverlay.querySelector(".pin-modal").style.transform =
        "translateY(0)";
    }, 10);

    // Style the modal with CSS
    const style = document.createElement("style");
    style.textContent = `
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
        backdrop-filter: blur(3px);
      }
      
      .pin-modal {
        background-color: white;
        border-radius: 16px;
        width: 90%;
        max-width: 400px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        transform: translateY(20px);
        transition: transform 0.3s ease;
      }
      
      .pin-modal-header {
        background: linear-gradient(135deg, #e2146c 0%, #a4126a 100%);
        color: white;
        padding: 16px 20px;
        border-radius: 16px 16px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .pin-title {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
      }
      
      .pin-close-btn {
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        line-height: 1;
      }
      
      .pin-modal-body {
        padding: 20px;
      }
      
      .pin-summary {
        background-color: #f9f9f9;
        border-radius: 12px;
        padding: 15px;
        margin-bottom: 20px;
      }
      
      .pin-summary-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
      }
      
      .pin-summary-row.total {
        border-top: 1px solid #eee;
        padding-top: 8px;
        margin-top: 5px;
        font-weight: 600;
      }
      
      .pin-label {
        color: #666;
      }
      
      .pin-value {
        color: #333;
      }
      
      .pin-input-container {
        margin-bottom: 20px;
      }
      
      .pin-label {
        display: block;
        text-align: center;
        margin-bottom: 15px;
        color: #444;
        font-weight: 500;
      }
      
      .pin-digits {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-bottom: 10px;
      }
      
      .pin-digit {
        width: 50px;
        height: 50px;
        border: 2px solid #e0e0e0;
        border-radius: 10px;
        font-size: 20px;
        text-align: center;
        outline: none;
        -webkit-text-security: disc;
      }
      
      .pin-digit:focus {
        border-color: #e2146c;
        box-shadow: 0 0 0 3px rgba(226, 20, 108, 0.2);
      }
      
      .pin-error {
        color: #e74c3c;
        text-align: center;
        min-height: 20px;
        font-size: 14px;
      }
      
      .pin-confirm-btn {
        width: 100%;
        padding: 14px;
        background: linear-gradient(135deg, #e2146c 0%, #a4126a 100%);
        color: white;
        border: none;
        border-radius: 12px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
      }
      
      .pin-confirm-btn:disabled {
        background: #f0f0f0;
        color: #aaa;
      }
      
      .pin-help {
        text-align: center;
        margin-top: 15px;
      }
      
      .forgot-pin {
        color: #e2146c;
        text-decoration: none;
        font-size: 14px;
      }
    `;

    document.head.appendChild(style);

    // Handle PIN digits
    const pinDigits = modalOverlay.querySelectorAll(".pin-digit");
    const confirmBtn = modalOverlay.querySelector(".pin-confirm-btn");
    const closeBtn = modalOverlay.querySelector(".pin-close-btn");
    const pinError = modalOverlay.querySelector(".pin-error");

    // Focus first digit
    setTimeout(() => {
      pinDigits[0].focus();
    }, 300);

    // Handle PIN input
    pinDigits.forEach((digit, index) => {
      digit.addEventListener("input", function () {
        if (this.value && index < pinDigits.length - 1) {
          pinDigits[index + 1].focus();
        }

        // Check if all digits are filled
        let allFilled = true;
        pinDigits.forEach((d) => {
          if (!d.value) allFilled = false;
        });

        confirmBtn.disabled = !allFilled;
      });

      // Navigate backward on backspace
      digit.addEventListener("keydown", function (e) {
        if (e.key === "Backspace" && !this.value && index > 0) {
          pinDigits[index - 1].focus();
        }
      });
    });

    // Close button
    closeBtn.addEventListener("click", function () {
      modalOverlay.style.opacity = "0";
      modalOverlay.querySelector(".pin-modal").style.transform =
        "translateY(20px)";

      // Reset send button
      sendMoneyBtn.innerHTML =
        '<i class="fas fa-paper-plane"></i> সেন্ড মানি করুন';
      sendMoneyBtn.style.pointerEvents = "";

      // Remove modal after animation
      setTimeout(() => {
        document.body.removeChild(modalOverlay);
        document.head.removeChild(style);
      }, 300);
    });

    // Confirm button
    confirmBtn.addEventListener("click", function () {
      // Get entered PIN
      let enteredPin = "";
      pinDigits.forEach((digit) => {
        enteredPin += digit.value;
      });

      // Simulate PIN verification (correct PIN is 1234 for demo)
      if (enteredPin === "1234") {
        this.disabled = true;
        this.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> যাচাই করা হচ্ছে...';

        // Simulate processing delay
        setTimeout(() => {
          showSuccessScreen(recipient, amount, charge, total);
          modalOverlay.remove();
          document.head.removeChild(style);
        }, 1500);
      } else {
        // Show error with shake animation
        pinError.textContent = "ভুল PIN। আবার চেষ্টা করুন।";

        // Add shake animation to PIN inputs
        pinDigits.forEach((digit) => {
          digit.style.borderColor = "#e74c3c";
          digit.classList.add("shake-effect");
          setTimeout(() => {
            digit.classList.remove("shake-effect");
          }, 600);
        });

        // Clear the PIN fields
        setTimeout(() => {
          pinDigits.forEach((digit) => {
            digit.value = "";
          });
          pinDigits[0].focus();
        }, 300);
      }
    });
  }

  // Show success screen
  function showSuccessScreen(recipient, amount, charge, total) {
    // Create a random transaction ID
    const txnId = "TXN" + Math.floor(Math.random() * 10000000);
    const dateTime = new Date().toLocaleString("bn-BD");

    // Create success modal
    const successOverlay = document.createElement("div");
    successOverlay.className = "success-overlay";

    const successHTML = `
      <div class="success-modal">
        <div class="success-content">
          <div class="success-icon">
            <i class="fas fa-check-circle"></i>
          </div>
          <h2 class="success-title">সেন্ড মানি সফল হয়েছে!</h2>
          <p class="success-message">${recipient} নম্বরে ৳${formatNumber(
      amount
    )} টাকা সফলভাবে প্রেরণ করা হয়েছে</p>
          
          <div class="txn-details">
            <div class="txn-row">
              <span class="txn-label">ট্রানজেকশন আইডি</span>
              <span class="txn-value">${txnId}</span>
            </div>
            <div class="txn-row">
              <span class="txn-label">তারিখ ও সময়</span>
              <span class="txn-value">${dateTime}</span>
            </div>
            <div class="txn-row">
              <span class="txn-label">পরিমাণ</span>
              <span class="txn-value">৳${formatNumber(amount)}</span>
            </div>
            <div class="txn-row">
              <span class="txn-label">চার্জ</span>
              <span class="txn-value">৳${formatNumber(charge)}</span>
            </div>
            <div class="txn-row total">
              <span class="txn-label">মোট</span>
              <span class="txn-value">৳${formatNumber(total)}</span>
            </div>
          </div>
          
          <div class="success-actions">
            <button class="success-btn new-transaction">নতুন সেন্ড মানি</button>
            <button class="success-btn download-receipt">
              <i class="fas fa-download"></i> রিসিট ডাউনলোড করুন
            </button>
          </div>
        </div>
        
        <div class="success-footer">
          <p>ধন্যবাদ যে আমাদের সেবা ব্যবহার করছেন</p>
        </div>
      </div>
    `;

    document.body.appendChild(successOverlay);
    successOverlay.innerHTML = successHTML;

    // Add success styles
    const successStyle = document.createElement("style");
    successStyle.textContent = `
      .success-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(255, 255, 255, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        animation: fadeIn 0.5s ease;
      }
      
      .success-modal {
        background-color: white;
        border-radius: 20px;
        width: 90%;
        max-width: 450px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        animation: slideUp 0.5s ease;
        overflow: hidden;
      }
      
      .success-content {
        padding: 30px;
      }
      
      .success-icon {
        width: 80px;
        height: 80px;
        margin: 0 auto 20px;
        animation: scaleIn 0.5s ease;
      }
      
      .success-icon i {
        color: #2ecc71;
        font-size: 80px;
      }
      
      .success-title {
        color: #333;
        text-align: center;
        font-size: 22px;
        margin-bottom: 10px;
      }
      
      .success-message {
        color: #666;
        text-align: center;
        margin-bottom: 25px;
      }
      
      .txn-details {
        background-color: #f9f9f9;
        border-radius: 12px;
        padding: 18px;
        margin-bottom: 25px;
      }
      
      .txn-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
      }
      
      .txn-label {
        color: #666;
      }
      
      .txn-value {
        color: #333;
        font-weight: 500;
      }
      
      .txn-row.total {
        border-top: 1px solid #eee;
        padding-top: 10px;
        margin-top: 5px;
        font-weight: 600;
      }
      
      .success-actions {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      
      .success-btn {
        padding: 14px;
        border-radius: 12px;
        font-size: 15px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        border: none;
      }
      
      .new-transaction {
        background: linear-gradient(135deg, #e2146c 0%, #a4126a 100%);
        color: white;
      }
      
      .download-receipt {
        background-color: #f0f0f0;
        color: #333;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }
      
      .success-footer {
        background-color: #f5f5f5;
        padding: 15px;
        text-align: center;
        border-top: 1px solid #eee;
      }
      
      .success-footer p {
        color: #777;
        margin: 0;
        font-size: 14px;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes slideUp {
        from { transform: translateY(30px); }
        to { transform: translateY(0); }
      }
      
      @keyframes scaleIn {
        from { transform: scale(0.5); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
      
      .shake-effect {
        animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
      }
      
      @keyframes shake {
        10%, 90% { transform: translateX(-1px); }
        20%, 80% { transform: translateX(2px); }
        30%, 50%, 70% { transform: translateX(-4px); }
        40%, 60% { transform: translateX(4px); }
      }
    `;

    document.head.appendChild(successStyle);

    // Add click handlers
    const newTxnBtn = successOverlay.querySelector(".new-transaction");
    const downloadBtn = successOverlay.querySelector(".download-receipt");

    newTxnBtn.addEventListener("click", function () {
      // Reset form and close success screen
      resetForm();

      successOverlay.style.opacity = "0";

      setTimeout(() => {
        document.body.removeChild(successOverlay);
        document.head.removeChild(successStyle);
      }, 300);
    });

    downloadBtn.addEventListener("click", function () {
      // Simulate download
      this.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> ডাউনলোড হচ্ছে...';

      setTimeout(() => {
        alert("রিসিট ডাউনলোড সম্পন্ন হয়েছে");
        this.innerHTML = '<i class="fas fa-download"></i> রিসিট ডাউনলোড করুন';
      }, 1500);
    });
  }

  // Reset form for new transaction
  function resetForm() {
    phoneInput.value = "";
    amountInput.value = "";
    currentAmount = 0;
    currentCharge = 0;
    currentTotal = 0;
    selectedContact = null;

    // Reset UI elements
    summaryAmount.textContent = "৳০";
    summaryCharge.textContent = "৳০";
    summaryTotal.textContent = "৳০";

    sendMoneyBtn.disabled = true;
    sendMoneyBtn.innerHTML =
      '<i class="fas fa-paper-plane"></i> সেন্ড মানি করুন';
    sendMoneyBtn.style.pointerEvents = "";

    // Reset active states
    quickAmountBtns.forEach((btn) => btn.classList.remove("active"));
    contactItems.forEach((item) => item.classList.remove("selected-contact"));

    // Reset section visibility
    if (amountInputSection.style.display === "block") {
      amountInputSection.style.display = "none";
      numberInputSection.style.display = "block";
    }
  }

  // Add CSS animation and effect classes
  document.querySelectorAll(".action-btn").forEach((btn) => {
    btn.classList.add("ripple");
  });

  // Initialize with balance hidden
  if (balanceHidden && balanceVisible) {
    balanceHidden.style.opacity = "1";
    balanceVisible.style.opacity = "0";
    balanceVisible.style.display = "none";
  }

  // Add CSS for shake effect if not already present
  if (!document.querySelector("style#shake-css")) {
    const shakeStyle = document.createElement("style");
    shakeStyle.id = "shake-css";
    shakeStyle.textContent = `
      .shake-effect {
        animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
      }
      
      @keyframes shake {
        10%, 90% { transform: translateX(-1px); }
        20%, 80% { transform: translateX(2px); }
        30%, 50%, 70% { transform: translateX(-4px); }
        40%, 60% { transform: translateX(4px); }
      }
    `;
    document.head.appendChild(shakeStyle);
  }
});
