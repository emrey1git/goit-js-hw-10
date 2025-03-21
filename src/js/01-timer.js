// Flatpickr'ı input'a bağla
flatpickr("#datetime-picker", {
  enableTime: true,  // Saat seçimini aç
  dateFormat: "Y-m-d H:i",  // Tarih formatı
  time_24hr: true,  // 24 saat formatı kullan
});





const startBtn = document.querySelector("[data-start");
const daysSpan = document.querySelector("[data-days]");
const hoursSpan = document.querySelector("[data-hours]");
const minutesSpan = document.querySelector("[data-minutes]");
const secondsSpan = document.querySelector("[data-seconds]");

// Kullanıcının seçtiği tarih burada tutulacak
let userSelectedDate = null;
let countdownInterval = null;

//  "Start" butonu başlangıçta devre dışı olmalı
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0]; //seçilen tarih değişkene atanıyor

      if (userSelectedDate <= new Date()) {
        //Eğer geçmiş bir tarih seçildiyse
        //   window.alert("Please choose a date in the future");
          iziToast.error({
        title: "Hata",
        message: "Please choose a date in the future",
        position: "topRight",
        timeout: 3000, // 3 saniye sonra kapanır
      });
      startBtn.disabled = true; //butonu devre dışoı bırak
    } else {
      startBtn.disabled = false; // Gelecekteki tarih seçildiyse butonu etkinleştir
    }
  },
};

//Flatpickr tarih seçiciyi input'a bağlıyoruz
flatpickr("#datetime-picker", options);

//geri sayımı başlatıyoruz  
startBtn.addEventListener("click", () => {
  if (!userSelectedDate) return;

  startBtn.disabled = true; // Başlatınca butonu devre dışı bırak

  countdownInterval = setInterval(() => {
    const now = new Date();
    const timeLeft = userSelectedDate - now;

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      return;
      }

      //Kalan zamanı hesaplayıp ekrana yazdır
      const { days, hours, minutes, seconds } = convertMs(timeLeft);

    daysSpan.textContent = addLeadingZero(days);
    hoursSpan.textContent = addLeadingZero(hours);
    minutesSpan.textContent = addLeadingZero(minutes);
    secondsSpan.textContent = addLeadingZero(seconds);
  }, 1000);
});

//lmsden alınan Milisaniyeyi gün, saat, dakika ve saniyeye çeviren fonksiyon
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0"); // 1 → 01 gibi formatlama
}



