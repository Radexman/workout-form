# Workout Form

## Opis projektu

Jest to formularz do rejestracji na treningi, stworzony zgodnie z designem i wymaganiami rekrutacyjnymi. Formularz umożliwia wprowadzenie danych osobowych, wybranie wieku, przesłanie zdjęcia, wybór daty oraz godziny treningu.

Formularz korzysta z [API Ninjas](https://api-ninjas.com/) zwracającego listę świąt w Polsce, blokuje niedziele i święta narodowe, a także wyświetla informacje o świętach typu "OBSERVANCE". Po kliknięciu "Send Application" dane są wysyłane metodą POST na endpoint `http://letsworkout.pl/submit`.

**Demo online:** [Workout Form Live](https://workout-form-001.netlify.app/)

---

## Kluczowe rozwiązania

- Walidacja formularza na submit z pełnym wsparciem dla wszystkich pól
- Obsługa błędów pobierania świąt i błędów submitu, wyświetlanych pod kalendarzem
- Domyślna godzina 12:00 ustawiana przy pierwszym wybraniu daty
- Accessibility: Hour picker jest dostępny dla klawiatury i screen readerów
- Modularna struktura komponentów z wydzielonymi inputami (`TextInput`, `RangeInput`, `FileInput`, `CalendarInput`, `HourPicker`)
- Zabezpieczenie przed wysyłką pustych pól wymaganych

---

## Uwagi techniczne

- **Brak użycia bibliotek typu Redux/Context:**  
  Formularz jest relatywnie prosty i wszystkie stany lokalne komponentów wystarczają do zarządzania danymi, więc nie było potrzeby wprowadzania globalnego kontekstu ani dodatkowej biblioteki do zarządzania stanem.
- **console.log na submit:**  
  Celowo pozostawiony, aby rekruter mógł zobaczyć przesyłane dane. W prawdziwej aplikacji tego typu logowanie byłoby usunięte lub zastąpione odpowiednią obsługą sukcesu/erroru.

- **Range i Calendar Input:**  
  Stylowanie tych komponentów jest trudniejsze w czystym Tailwind CSS ze względu na ograniczenia webkitów. Funkcjonalność jest w pełni zachowana, różnice w wyglądzie są minimalne i celowo opisane w README.

---

## Uruchomienie projektu

1. Sklonuj repozytorium i zainstaluj zależności:

```bash
git clone git@github.com:Radexman/workout-form.git
cd workout-form
npm install
code .
```

2. Stwórz plik .env.local w katalogu głównym projektu i dodaj następujące zmienne środowiskowe:

```bash
VITE_API_NINJAS_URL=https://api.api-ninjas.com/v1/holidays
VITE_API_NINJAS_KEY=OH+HEf/9IH2zuHR/cMO/8g==ldhBovC6Rpa1TIss
```

3. Uruchom serwer developerski:

```bash
npm run dev
```

4. Budowanie projektu

```bash
npm run build
```

---

## Tech Stack

- **React 19 + TypeScript** – komponentowa struktura, typowanie i bezpieczeństwo kodu
- **Vite** – szybki bundler i dev server
- **Tailwind CSS 4** – stylowanie komponentów i layout
- **clsx** – dynamiczne przypisywanie klas CSS
- **prettier-plugin-tailwindcss** (`^0.6.14`) – plugin do Prettiera, który automatycznie sortuje klasy Tailwind w zorganizowany i czytelny sposób.
- **react-datepicker** – wybór daty (Calendar input)
- **@iconify/react** – ikony (np. do wyświetlania błędów)
