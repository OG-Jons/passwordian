### Grundkonzept

Frontend baut auf ReactTS
Backend baut auf NestJS (auf absprache mit der Lehrperson)

Wir haben uns beschlossen, ein JWT-Authentifizierung-System aufzusetzen. Das bedeutet, der User kann sich auf dem WebUI anmelden, wober der Client ein JWT-Token erhält. Dieser wird dann bei den Requests verwendet.

Ein User soll seine eigenen Passwörter mit Benutzernamen einspeichern können. Damit die Eigentümer vom Server diese Daten nicht einlesen können, wird das eigene Passwort vom User als Hash-Secret verwendet. Das heisst, die Daten werden vom Client aus gehasht und erst dann ins Backend geschickt.

Ein User wird zusätzlich Kategorien erstellen können, um seine Passwörter zu sortieren.
