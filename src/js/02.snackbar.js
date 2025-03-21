document.querySelector(".form").addEventListener("submit", (event) => {
  event.preventDefault(); // Sayfanın yenilenmesini engelle
  
  const delay = Number(document.querySelector("input[name='delay']").value);
  const state = document.querySelector("input[name='state']:checked").value;

  // Yeni bir Promise oluştur
  const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  // Promise sonuçlarını işle
  myPromise
    .then((result) => {
      console.log(result);
      iziToast.success({
        title: "Başarılı!",
        message: result,
        position: "topRight",
        timeout: 3000,
      });
    })
    .catch((error) => {
      console.log(error);
      iziToast.error({
        title: "Hata!",
        message: error,
        position: "topRight",
        timeout: 3000,
      });
    });
});


