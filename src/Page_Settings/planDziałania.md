## Plan działania

- [X] przejdź przez wszystkie formularze i popraw isSubmitSuccessful
- [ ] przejdź przez wszystkie story i popraw obsługę błędów, w technicianStore jest zrobione dobrze
- [X] wyrzuć form.reset() bo gryzie się z isSubmitSuccessful

- [X] zrobić commita i nową gałąź "reason-list"
- [ ] później do niej podgałęzie

      # Wracasz na bazę listy i tworzysz gałąź edycji
      git switch feature/lista-pojazdów
      git switch -c feature/edytuj-pojazd feature/lista-pojazdów


      # 1. Przechodzisz na gałąź bazową listy i upewniasz się, że jest aktualna
      git switch feature/lista-pojazdów
      git pull

      # 2. Wciągasz zmiany z gałęzi dodawania
      git merge feature/dodaj-pojazd

      # 3. Wciągasz zmiany z gałęzi edycji
      git merge feature/edytuj-pojazd

      # 4. Wysyłasz sklejony w całość moduł na zdalny serwer
      git push origin feature/lista-pojazdów