# Hallo Gruppe 15!

Willkommen in Ihrem Repo für Web-Programmierung!

Projekt-URL: https://gruppe-15.wp20.mylab.th-luebeck.de

Informationen zu benötigter Software und Technik: https://wp20.mylab.th-luebeck.de/

Der Inhalt dieser Datei (`README.md`) wird in GitLab auf der Hauptseite Ihres Projektes angezeigt. Entsprechend ist hier ein guter Ort, ein paar grundlegende Angaben zu Ihrem Projekt zu machen, beispielsweise zu Besonderheiten Ihrer Ordnerstruktur und ähnliches. Diesen Absatz können Sie durch eine (kurze) Beschreibung Ihres Projektes ersetzen. Passen Sie bitte auch die Überschrift und die Mitgliederliste entsprechend an.

## Mitglieder

- Marc Andre Fischer
- Tom Gibson
- Felix Hansmann
- Frederic Karliczek

## Ordnerstruktur

    |-public    Auf dem Webserver vorliegende Dateien.
    | |-images  Unterordner für Bilddateien
    | |-css     Unterordner für CSS-Dateien
    | |-js      Unterordner für JavaScript-Dateien
    |
    |-doku      Die ausgearbeitete Dokumentation und zugehörige Dateien.
    |
    |-allgemein Dateien für die Organisation im Team

## Build-Prozess und Docker

Sobald an dem master-Branch dieses Repositories Veränderungen vorgenommen bzw. gepusht werden, wird automatisch ein Build-Prozess angestoßen, welcher das [Deployment Ihres Projektes](https://gruppe-15.wp20.mylab.th-luebeck.de) aktualisiert. Die Dateien `Dockerfile` und `.gitlab-ci.yml` steuern diesen Build-Prozess, und sollten von Ihnen in der Regel nicht verändert werden! Bei Interesse finden Sie weitergehende Informationen und Anleitungen zu Docker z.B. [hier](https://doku.mylab.th-luebeck.de/docs/docker/).