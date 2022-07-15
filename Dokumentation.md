# Reflexion zum Projekt des Password-Managers
### Jonas Marschall & Silvan Chervet

## Grundkonzept

Frontend baut auf ReactTS
Backend baut auf NestJS (auf absprache mit der Lehrperson)

Wir haben uns beschlossen, ein JWT-Authentifizierung-System aufzusetzen. Das bedeutet, der User kann sich auf dem WebUI anmelden, wober der Client ein JWT-Token erhält. Dieser wird dann bei den Requests verwendet.

Ein User soll seine eigenen Passwörter mit Benutzernamen einspeichern können. Damit die Eigentümer vom Server diese Daten nicht einlesen können, wird das eigene Passwort vom User als Hash-Secret verwendet. Das heisst, die Daten werden vom Client aus gehasht und erst dann ins Backend geschickt.

Ein User wird zusätzlich Kategorien erstellen können, um seine Passwörter zu sortieren.

## Reflexion zur Projektarbeit
Das ganze Projekt war ein bisschen eine Herausforderung. 
Auf der einen Seite sind wir am Ende unter starkem Zeitdruck gekommen, wo es sich angefühlt hat, als würden wir keinen Fortschritt machen. Das Entschlüsseln der Passwörter hat uns Probleme aufgestellt und wir hatten generelle Schwierigkeiten mit Bugs.
Jedoch haben wir gut zusammengearbeitet und konnten uns meistens gegenseitig unterstützen.

## Was sollen wir erreicht haben?
Wir haben ein stabiles Backend aufgesetzt, welches alle nötigen Endpoints verwaltet und umsetzt. Dies kann beim laufen der Applikation eingesehen werden, indem man `http://localhost:3000/api` öffnet.
Hiermit wird ein Swagger-UI aufgemacht, welches alle Endpoints anzeigt.

Ein User kann sich im Frontend registrieren und anmelden, wonach er all seine Passwörter einsehen kann, die er bisher erstellt hat. Diese kann er dann abfragen, bearbeiten oder löschen. Wenn er das Passwort lesen will, muss er ein Knopf drücken.

Falls er seine Passwörter kategorisieren will, kann er das auch. Diese Kategorien können auch bearbeitet, erstellt und gelöscht werden. Beim Löschen entfernt es einfach die Kategorie von den gelinkten Passwörtern, welche dann keine Kategorie mehr haben.

Falls ein User sein Master-Passwort ändern will, kann er einfach das Formular öffnen, sein altes und neues Passwort eingeben und dann speichern. Damit sollen alle Passwöter neu entschlüsselt und gespeichert werden.

## Was haben wir nicht erreicht?
- Die Funktion, um den Master-Password zu ändern, wirkt so, als ob es immer per Zufall funktioniert oder nicht. Entweder, funktioniert die änderung Einwandfrei oder die ganze Datenbank wird ruiniert. 
