$(document).ready(function() {
  var programVersion = " Beta 0.19.3"; // Numer programu

  // Funkcja do zmiany tła
  var imagesUKPL = ["static/zdj1.png", "static/zdj2.png", "static/zdj3.png"];
  var imagesSPQR = ["static/zdj4.jpg", "static/zdj5.jpg", "static/zdj6.jpg"];
  var currentImageIndex = 0;
  var clickedFlag = $("#flag1"); // Domyślnie ustawiona flaga UK

  function changeBackgroundImage() {
    var images = [];

    if (clickedFlag.attr("id") === "flag1" || clickedFlag.attr("id") === "flag2") {
      // Jeśli kliknięto flagę UK lub PL, użyj zdjęć dla UK i PL
      images = imagesUKPL;
    } else if (clickedFlag.attr("id") === "flag3") {
      // Jeśli kliknięto flagę SPQR, użyj zdjęć dla SPQR
      images = imagesSPQR;
    }

    currentImageIndex = (currentImageIndex + 1) % images.length;
    var imageUrl = images[currentImageIndex];
    document.body.style.backgroundImage = "url('" + imageUrl + "')";
  }

  function startImageRotation() {
    setInterval(changeBackgroundImage, 5000); // Zmieniaj obraz co 5 sekund
  }
  startImageRotation(); // Rozpoczęcie automatycznej rotacji obrazów

  // Wywołaj funkcję startImageRotation() po kliknięciu na flagę
  $("#flag1, #flag2, #flag3").click(function() {
    clickedFlag = $(this);
    changeBackgroundImage(); // Natychmiastowa zmiana obrazu po kliknięciu na flagę
  });

  console.log("script.js loaded"); // Dodanie console.log()

  // Ukryj wszystkie flagi, oprócz flagi UK
  $('.flag-item:not(#flag1)').hide();

  // Funkcja do tłumaczenia elementów na podstawie mapy translations
  function translateElements(language) {
    var translations = {};

    if (language === "pl") {
      translations = {
        "Zaloguj": "Zaloguj",
        'label[for="username"]': "Login:",
        'label[for="password"]': "Hasło:",
        ".Dane_uzytkownika": "Dane użytkownika",
        ".Wersja_programu": "Wersja programu" + programVersion,
        ".Autorzy": "Autorzy Jakub Kołodziej i Piotr Wieczorek",
        ".title": "Estymowanie cen nieruchomości",
        ".prognozowana-cena": "Prognozowana cena",
        ".active": "Home",
        ".Funkcja1": "Funkcja 1",
        ".Funkcja2": "Funkcja 2 ",
        ".About": "O nas",
        ".Login": "Zaloguj",
        ".Register": "Zarejestruj",
        'offer_type': 'Typ oferty','offer_type': 'Typ oferty',
        'floor': 'Piętro',
        'area': 'Metraż',
        'rooms': 'Liczba pokoi',
        'offer_type_of_building': 'Typ budynku',
        'market': 'Rynek',
        'city_name': 'Miasto',
        'voivodeship': 'Województwo',
      
      };
      // Zmiana obrazu na "Palac.jpg"
      $("#zdjecie-prawo").attr("src", "static/Palac.jpg");
    } else if (language === "en") {
      translations = {
        "Zaloguj": "Login",
        'label[for="username"]': "Username:",
        'label[for="password"]': "Password:",
        ".Dane_uzytkownika": "User Data",
        ".Wersja_programu": "Program version" + programVersion,
        ".Autorzy": "Authors Jakub Kołodziej i Piotr Wieczorek",
        ".title": "Real estate price estimation",
        ".prognozowana-cena": "Forecasted Price",
        ".active": "Home",
        ".Funkcja1": "Function 1",
        ".Funkcja2": "Function 2 ",
        ".About": "About us",
        ".Login": "Login",
        ".Register": "Register",
        "offer_type": "Type of offer",
        'floor': 'Floor',
        'area': 'Area',
        'rooms': 'Number of rooms',
        'offer_type_of_building': 'Type of building',
        'market': 'Market',
        'city_name': 'City',
        'voivodeship': 'Voivodeship',
      
        // Dodaj inne tłumaczenia dla angielskiego tutaj
      };

      // Zmiana obrazu na "BigBen.jpg"
      $("#zdjecie-prawo").attr("src", "static/BigBen.jpg");
    } else if (language === "spqr") {
      translations = {
        "Zaloguj": "Login",
        'label[for="username"]': "Loginus:",
        'label[for="password"]': "Password:",
        ".Dane_uzytkownika": "User Data",
        ".Wersja_programu": "Version program" + programVersion,
        ".Autorzy": "Auctores Iacobus Wheelwright et Petrus Vesperi",
        ".title": "Projecting verus praedium prices",
        ".prognozowana-cena": "Data pretium",
        ".active": "Home",
        ".Funkcja1": "Officium 1",
        ".Funkcja2": "Officium 2 ",
        ".About": "De nobis",
        ".Login": "Loginus",
        ".Register": "Register",
        'offer_type': 'Generis offerendi',
        'floor': 'Floors',
        'area': 'Area',
        'rooms': 'Numerus cubiculorum',
        'offer_type_of_building': 'Generis aedificii',
        'market': 'Forum',
        'city_name': 'Urbs',
        'voivodeship': 'Provincia',
        
        
       
      };

    }

    for (var key in translations) {
      if (translations.hasOwnProperty(key)) {
          if(key.startsWith('.')){
              $(key).text(translations[key]);
          } else {
              $("label[for='" + key + "']").text(translations[key]);
              $("#" + key).attr("placeholder", translations[key]);
          }
      }
  }
  }

  var voivodeship = {
      "Lower Silesia": ["Wrocław", "Wałbrzych", "Legnica", "Jelenia Góra", "Głogów", "Świdnica", "Nowa Ruda", "Oława", "Trzebnica"],
      "Kuyavia-Pomerania": ["Bydgoszcz", "Toruń", "Włocławek", "Grudziądz", "Inowrocław", "Brodnica", "Świecie", "Nakło nad Notecią", "Chełmno"],
      "Lublin": ["Lublin", "Zamość", "Chełm", "Puławy", "Biała Podlaska", "Łęczna", "Kraśnik", "Łuków", "Biłgoraj"],
      "Lubusz": ["Gorzów Wielkopolski", "Zielona Góra", "Świebodzin", "Nowa Sól", "Kostrzyn nad Odrą", "Słubice", "Żary", "Gubin", "Sulechów"],
      "Lodzkie": ["Łódź", "Piotrków Trybunalski", "Pabianice", "Tomaszów Mazowiecki", "Bełchatów", "Zgierz", "Ozorków", "Radomsko", "Skierniewice"],
      "Lesser Poland": ["Kraków", "Tarnów", "Nowy Sącz", "Oświęcim", "Wieliczka", "Zakopane", "Nowy Targ", "Bochnia", "Chrzanów"],
      "Masovia": ["Warszawa", "Radom", "Płock", "Siedlce", "Ostrołęka", "Pruszków", "Piaseczno", "Wołomin", "Żyrardów"],
      "Opole": ["Opole", "Nysa", "Kędzierzyn-Koźle", "Brzeg", "Kluczbork", "Prudnik", "Strzelce Opolskie", "Głuchołazy", "Krapkowice"],
      "Subcarpathia": ["Rzeszów", "Przemyśl", "Tarnobrzeg", "Krosno", "Mielec", "Dębica", "Sanok", "Stalowa Wola", "Jarosław"],
      "Podlaskie": ["Białystok", "Łomża", "Suwałki", "Bielsk Podlaski", "Siemiatycze", "Grajewo", "Augustów", "Zambrów", "Wysokie Mazowieckie"],
      "Pomerania": ["Gdańsk", "Gdynia", "Sopot", "Tczew", "Wejherowo", "Starogard Gdański", "Rumia", "Kościerzyna", "Puck"],
      "Silesia": ["Katowice", "Gliwice", "Zabrze", "Bielsko-Biała", "Bytom", "Tychy", "Ruda Śląska", "Rybnik", "Chorzów"],
      "Świętokrzyskie": ["Kielce", "Ostrowiec Świętokrzyski", "Starachowice", "Skarżysko-Kamienna", "Końskie", "Busko-Zdrój", "Jędrzejów", "Sandomierz", "Staszów"],
      "Warmia-Masuria": ["Olsztyn", "Elbląg", "Ostróda", "Ełk", "Mrągowo", "Kętrzyn", "Giżycko", "Bartoszyce", "Iława"],
      "Greater Poland": ["Poznań", "Kalisz", "Konin", "Piła", "Leszno", "Gniezno", "Ostrów Wielkopolski", "Jarocin", "Krotoszyn"],
      "West Pomerania": ["Szczecin", "Koszalin", "Stargard Szczeciński", "Świnoujście", "Police", "Słupsk", "Gryfino", "Kołobrzeg", "Świdwin"] 
}

window.onload = function(){
    const selectVoivodeship = document.getElementById('voivodeship'),
          selectCity = document.getElementById('city_name');

    selectCity.disabled = true;

    // Załaduj województwa
    for (let voivo in voivodeship) {
        selectVoivodeship.options[selectVoivodeship.options.length] = new Option(voivo, voivo);
    }

    // Zamiana województw
    selectVoivodeship.onchange = function() {
        selectCity.disabled = false;
        selectCity.length = 1; // Wyczyść poprzednie miasta
        const citys = voivodeship[this.value];

        citys.forEach(function(city) {
            selectCity.add(new Option(city, city));
        });
    };
}


  // Ustaw flagę Polski jako domyślnie wybraną
  $("#flag1").addClass("open");

  // Wywołaj funkcję tłumaczącą elementy na język polski przy ładowaniu strony
  translateElements("pl");

  // Po kliknięciu na flagę
  $('.flag-item').click(function() {
    var clickedFlag = $(this);
    var otherFlags = $('.flag-item').not(clickedFlag);

    // Sprawdź, czy flaga jest już rozwinięta
    if (clickedFlag.hasClass('open')) {
      // Jeśli jest rozwinięta, zwiń ją
      clickedFlag.removeClass('open');
      otherFlags.slideDown(300); // Pokaż pozostałe flagi
    } else {
      // Jeśli nie jest rozwinięta, rozwij ją i ukryj pozostałe flagi
      clickedFlag.addClass('open');
      otherFlags.slideUp(300); // Zwiń pozostałe flagi
    }

    if (clickedFlag.attr("id") === "flag1") {
      // Jeśli kliknięto flagę Polski, tłumacz na język polski
      translateElements("pl");
    } else if (clickedFlag.attr("id") === "flag2") {
      // Jeśli kliknięto flagę UK, tłumacz na język angielski
      translateElements("en");
    } else if (clickedFlag.attr("id") === "flag3") {
      // Jeśli kliknięto flagę SPQR, tłumacz na język SPQR
      translateElements("spqr");
    }
  });

  // Po zakończeniu animacji slideUp
  $('.flag-item').on('slideUp', function() {
    var flag = $(this);
    if (!flag.hasClass('open')) {
      flag.hide(); // Ukryj zwiniete flagi po zakończeniu animacji
    }
  });

  

  // Obsługa zdarzenia kliknięcia na dokument
  $(document).click(function(event) {
    var target = $(event.target);

    // Sprawdź, czy kliknięcie było na flagę lub jej obrazek
    if (!target.hasClass('flag-item') && !target.closest('.flag-item').length) {
      // Jeśli kliknięcie było gdzieś indziej, zwijaj flagi
      $('.flag-item').removeClass('open');
    }
  });

  // Pobierz element audio
  var audio = document.getElementById("background-music");

  // Funkcja do odtwarzania muzyki
  function playMusic() {
    audio.play();
  }

  // Funkcja do zatrzymywania muzyki
  function stopMusic() {
    audio.pause();
    audio.currentTime = 0;
  }

  // Obsługa zdarzenia kliknięcia na flagę SPQR
  $("#flag3").click(function() {
    // Uruchom odtwarzanie muzyki po bezpośredniej interakcji użytkownika
    playMusic();
  });

  // Obsługa zdarzenia kliknięcia na flagę PL i UK
  $("#flag1, #flag2").click(function() {
    // Zatrzymaj odtwarzanie muzyki po zmianie tłumaczenia na PL lub UK
    stopMusic();
  });

  // Odtwórz muzykę po załadowaniu strony, jeśli flaga SPQR jest już wybrana
  if ($("#flag3").hasClass("open")) {
    playMusic();
  }

  // Po kliknięciu na "Funkcja 1"
  $(".Funkcja1").click(function() {
    // Zmień nazwę nagłówka na "Estymowanie cen auta"
    $(".title").text("Estymowanie cen auta");
  });

  // Dodaj funkcję translateElements do zmiany tytułu na stronie index.html
  function translateTitle(language) {
    if (language === "pl") {
      $(".title").text("Estymowanie cen nieruchomości");
    } else if (language === "en") {
      $(".title").text("Real estate price estimation");
    } else if (language === "spqr") {
      $(".title").text("Projecting verus praedium prices");
    }
  }

  // Wywołaj funkcję translateTitle z odpowiednim językiem po kliknięciu na flagę
  $("#flag1, #flag2, #flag3").click(function() {
    var language = $(this).attr("data-lang");
    translateTitle(language);
  });

  // Wywołaj funkcję translateTitle z odpowiednim językiem przy ładowaniu strony
  var defaultLanguage = $("#flag1").attr("data-lang");
  translateTitle(defaultLanguage);

  // Obsługa formularza, aby zapobiec jego resetowaniu
    $("#priceForm").submit(function(e) {
      e.preventDefault(); // Zapobiega realnemu wysłaniu formularza
    });
});




document.getElementById('priceForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  var inputData = {
    offer_type: document.getElementById('offer_type').value,
    floor: document.getElementById('floor').value,
    area: document.getElementById('area').value,
    rooms: document.getElementById('rooms').value,
    offer_type_of_building: document.getElementById('offer_type_of_building').value,
    market: document.getElementById('market').value,
    voivodeship: document.getElementById('voivodeship').value,
    city_name: document.getElementById('city_name').value
  };

  console.log(inputData)

  // Send POST request
  fetch('http://localhost:5000/housesPriceEstimation', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputData)
  })
  .then(response => {
      // Check if response is ok
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      
      return response.text();
  })
  .then(data => {
      // Display the result in the <p> tag
      document.getElementById('estimatedPrice').textContent = data;
  })
  .catch(error => {
      // Handle errors
      console.error('Error:', error);
  });
});