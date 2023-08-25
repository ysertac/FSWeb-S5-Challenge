import axios from "axios";

const Card = (makale) => {
  // GÖREV 5
  // ---------------------
  // Aşağıda gördüğünüz işaretlemeyi döndürmesi gereken bu fonksiyonu uygulayın.
  // Tek argümanı olarak "anabaslik", "yazarFoto" ve "yazarAdı" özelliklerine sahip bir "makale" nesnesi alır.
  // Kullanılan etiketler, öğelerin hiyerarşisi ve öznitelikleri sağlanan işaretlemeyle tam olarak eşleşmelidir!
  // Öğelerin içindeki metin, "textContent" özelliği kullanılarak ayarlanacaktır ("innerText" DEĞİL).
  // Bir kullanıcı bir kartı tıkladığında makalenin başlığının konsola kaydedilmesi için click event dinleyicisi ekleyin.
  //
  // <div class="card">
  //   <div class="headline">{ anabaslik }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ yazarFoto }>
  //     </div>
  //     <span>{ yazarAdı } tarafından</span>
  //   </div>
  // </div>
  //

  let card = document.createElement("div");
  card.classList.add("card");

  let headline = document.createElement("div");
  headline.classList.add("headline");
  headline.textContent = makale.anabaslik;

  let author = document.createElement("div");
  author.classList.add("author");

  let imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container");

  let img = document.createElement("img");
  img.src = makale.yazarFoto;

  let span = document.createElement("span");
  span.textContent = `${makale.yazarAdi} tarafından`;

  imgContainer.append(img);
  author.append(imgContainer, span);
  card.append(headline, author);

  card.addEventListener("click", () => {
    console.log(makale.anabaslik);
  });

  return card;
};

const cardEkleyici = (secici) => {
  // GÖREV 6
  // ---------------------
  // Tek bağımsız değişkeni olarak bir css seçici alan bu fonksiyonu uygulayın.
  // Makaleleri bu uç noktadan almalıdır: `http://localhost:5001/api/makaleler` (console.log ile test edin!!).
  // Bununla birlikte, makaleler tek bir düzenli dizi halinde organize edilmemiştir. Yanıtı yakından inceleyin!
  // Card bileşenini kullanarak yanıttaki her makale nesnesinden bir kart oluşturun.
  // Her cardı, fonksiyona iletilen seçiciyle eşleşen DOM'daki öğeye ekleyin.
  //
  axios
    .get("http://localhost:5001/api/makaleler")
    .then((response) => {
      const location = document.querySelector(secici);
      const makaleler = response.data.makaleler;
      for (let key in makaleler) {
        makaleler[key].forEach((makale) => {
          location.append(Card(makale));
        });
        /* for (let i = 0; i < makaleler[key].length; i++) {
          location.append(Card(makaleler[key][i]));
        } */
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export { Card, cardEkleyici };
