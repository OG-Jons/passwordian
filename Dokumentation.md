# Reflexion zum Projekt des Password-Managers
### Jonas Marschall & Silvan Chervet

## Was haben wir erreicht?
Wir haben ein stabiles Backend aufgesetzt, welches alle nötigen Endpoints verwaltet und umsetzt. Dies kann beim laufen der Applikation eingesehen werden, indem man `http://localhost:3000/api` öffnet.
Hiermit wird ein Swagger-UI aufgemacht, welches alle Endpoints anzeigt.

Ein User kann sich im Frontend registrieren und anmelden, wonach er all seine Passwörter einsehen kann, die er bisher erstellt hat. Diese kann er dann abfragen, bearbeiten oder löschen. Wenn er das Passwort lesen will, muss er ein Knopf drücken.

Falls er seine Passwörter kategorisieren will, kann er das auch. Diese Kategorien können auch bearbeitet, erstellt und gelöscht werden. Beim Löschen entfernt es einfach die Kategorie von den gelinkten Passwörtern, welche dann keine Kategorie mehr haben.

Falls ein User sein Master-Passwort ändern will, kann er einfach das Formular öffnen, sein altes und neues Passwort eingeben und dann speichern. Damit sollen alle Passwöter neu entschlüsselt und gespeichert werden.
