# Plan: Test tworzenia nowego pola w widoku Staff & Field

## Goal
Dodać test Playwright dla zalogowanego użytkownika, który tworzy nowe pole (field) w widoku Staff & Field i weryfikuje rezultat widoczny dla użytkownika.

## Assumptions and Open Questions
- Zakładam, że flow tworzenia pola jest dostępny dla standardowo zalogowanego użytkownika używanego w istniejącym setupie auth.
- Zakładam, że istnieją stabilne selektory/role do otwarcia formularza i potwierdzenia sukcesu.
- Otwarte pytanie: które dokładnie pola formularza są wymagane oraz jaki jest jednoznaczny sygnał sukcesu (toast, alert, nowy rekord na liście).

## Risks and Constraints
- Ryzyko flaky testu przy asynchronicznym odświeżaniu listy pól po utworzeniu.
- Ryzyko kolizji danych testowych przy wielokrotnych uruchomieniach.
- Ograniczenie: test musi używać tagów zgodnych z test-plan.md i wzorcami repo.

## Planned Steps
1. Przejrzeć dokumenty i istniejące wzorce: copilot-instructions, test-plan, playwright config, podobne testy i page objecty.
2. Przeprowadzić eksplorację UI przez Playwright MCP, aby potwierdzić flow i stabilne lokatory.
3. Zaktualizować plan o ustalenia z eksploracji (potwierdzone/odrzucone założenia, ryzyka).
4. Zaprojektować scenariusz testowy i dobrać tagi.
5. Zaimplementować lub rozszerzyć Page Object dla Staff & Field, jeśli potrzebne.
6. Dodać test dla zalogowanego użytkownika tworzącego pole.
7. Uruchomić pełny suite testów: npx playwright test.
8. Zweryfikować wynik, zaktualizować plan statusem i przygotować raport końcowy.

## Exploration Findings (Playwright MCP)
- Potwierdzony nawigacyjny link do widoku: "Staff & Fields Management" (URL: /staff-fields-main.html).
- Potwierdzony flow tworzenia pola:
	- Przycisk "+ Add Field" otwiera modal "Add Field".
	- Pola formularza: "Field Name" (textbox), "Area (ha)" (spinbutton), opcjonalnie "District" (combobox).
	- Submit przez przycisk "+ Add Field" w formularzu.
- Potwierdzony sygnał sukcesu widoczny dla użytkownika: tekst "Field added!".
- Potwierdzona stabilna weryfikacja rekordu:
	- Pole wyszukiwania "Search fields..." filtruje listę.
	- Po wpisaniu unikalnej nazwy pole jest widoczne na liście.

## Test Design Decisions
- Test zostanie dodany do authenticated suite.
- Tagi: @smoke i @farm (zgodne z przypadkiem 2.2 z test-plan.md: Add a field).
- Dane testowe: unikalna nazwa pola z Date.now(), stała area (np. 21).
- Asercje:
	- twarda asercja URL po przejściu do Staff & Fields;
	- widoczny komunikat "Field added!";
	- wyszukanie po nazwie i widoczność utworzonego pola oraz area.

## Progress
- [x] Krok 1
- [x] Krok 2
- [x] Krok 3
- [x] Krok 4
- [x] Krok 5
- [x] Krok 6
- [x] Krok 7
- [x] Krok 8

## Validation Results
- Dodano test authenticated: tworzenie nowego pola przez zalogowanego użytkownika.
- Rozszerzono StaffFieldsPage o lokatory i akcje do:
	- otwarcia modala,
	- dodania pola,
	- filtrowania listy pól,
	- odnalezienia utworzonego rekordu.
- Uruchomiono pełny suite: `npx playwright test`.
- Wynik: 15/15 testów zaliczonych, brak regresji.

## Final Status
Plan completed.
