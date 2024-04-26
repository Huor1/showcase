$(document).ready(function() {
    var clickedFlag = $("#flag1"); // Domyślnie ustawiona flaga UK
  
    function translateElements(language) {
      
  
      if (language === "pl") {
        translations = {
          "Zaloguj": "Zaloguj",
          'label[for="username"]': "Login:",
          'label[for="password"]': "Hasło:",
          ".Dane_uzytkownika": "Dane użytkownika",
          ".Wersja_programu": "Wersja programu" + programVersion,
          ".Autorzy": "Autorzy Jakub Kołodziej i Piotr Wieczorek",
          ".title": "Prognozowanie cen nieruchomości",
          ".powierzchnia-tekst": "Powierzchnia:",
          ".pokoje-tekst": "Pokoje:",
          ".prognozowana-cena": "Prognozowana cena"
          // Dodaj inne tłumaczenia dla polskiego tutaj
        };
      } else if (language === "en") {
        translations = {
          "Zaloguj": "Login",
          'label[for="username"]': "Username:",
          'label[for="password"]': "Password:",
          ".Dane_uzytkownika": "User Data",
          ".Wersja_programu": "Program version" + programVersion,
          ".Autorzy": "Authors Jakub Kołodziej i Piotr Wieczorek",
          ".title": "Real estate price forecasting",
          ".pokoje-tekst": "Rooms:",
          ".powierzchnia-tekst": "Area:",
          ".prognozowana-cena": "Forecasted Price"
          // Dodaj inne tłumaczenia dla angielskiego tutaj
        };
      } else if (language === "spqr") {
        translations = {
          "Zaloguj": "Login",
          'label[for="username"]': "Loginus:",
          'label[for="password"]': "Password:",
          ".Dane_uzytkownika": "User Data",
          ".Wersja_programu": "Version program" + programVersion,
          ".Autorzy": "Auctores Iacobus Wheelwright et Petrus Vesperi",
          ".title": "Projecting verus praedium prices",
          ".pokoje-tekst": "Rooms:",
          ".powierzchnia-tekst": "Area:",
          ".prognozowana-cena": "Data pretium"
          // Dodaj inne tłumaczenia dla angielskiego tutaj
        };
      }
  
      for (var key in translations) {
        if (translations.hasOwnProperty(key)) {
          $(key).html(translations[key]);
        }
      }
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
  });
  