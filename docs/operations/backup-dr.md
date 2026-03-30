# Backup/Restore + Disaster Recovery

## Zakres backupu
- Baza danych produkcyjna (pełny backup + PITR)
- Sekrety i konfiguracje (vault export / sealed backups)
- Artefakty workflow i pliki użytkowników

## Harmonogram
- Full backup: codziennie 02:00 UTC
- Incremental/WAL: co 15 minut
- Replikacja snapshotów do drugiego regionu: co 1h

## Retencja
- Daily: 30 dni
- Weekly: 12 tygodni
- Monthly: 12 miesięcy

## Cele RTO / RPO
- **RTO** (czas odtworzenia): <= 60 minut
- **RPO** (utrata danych): <= 15 minut

## Procedura restore
1. Izoluj środowisko od ruchu write.
2. Odtwórz snapshot bazy + replay WAL do punktu T.
3. Odtwórz sekrety i konfigurację.
4. Uruchom testy integralności danych i smoke testy aplikacji.
5. Otwórz ruch stopniowo (canary).

## Testy DR
- Częstotliwość: minimum raz na kwartał
- Wymagane scenariusze:
  - awaria regionu primary
  - utrata jednej instancji DB
  - przypadkowe usunięcie danych
- Raport z testu:
  - osiągnięte RTO/RPO
  - odchylenia i plan remediacji
