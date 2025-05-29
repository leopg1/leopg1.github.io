# Pagină de Mentenanță pentru leopg.me

Aceasta este o pagină simplă de mentenanță pentru domeniul leopg.me, creată folosind GitHub Pages.

## Instrucțiuni pentru configurarea GitHub Pages

1. Creează un repository pe GitHub numit `username.github.io` (înlocuiește "username" cu numele tău de utilizator GitHub)
2. Încarcă aceste fișiere în repository
3. Accesează Settings > Pages în repository
4. Selectează branch-ul main pentru Source
5. Salvează configurările

## Configurare domeniu personalizat

1. În repository, accesează Settings > Pages
2. În secțiunea "Custom domain", adaugă domeniul tău: `leopg.me`
3. Salvează configurările
4. Crează un fișier numit `CNAME` în repository cu domeniul tău

## Configurare DNS

Asigură-te că ai configurate corect înregistrările DNS pentru domeniul tău:

- Adaugă o înregistrare A care să indice către IP-urile GitHub Pages:
  - 185.199.108.153
  - 185.199.109.153
  - 185.199.110.153
  - 185.199.111.153
  
- Sau adaugă o înregistrare CNAME care să indice către `username.github.io`

## Fișiere incluse

- `index.html`: Pagina principală de mentenanță
- `style.css`: Stilurile pentru pagina de mentenanță
- `README.md`: Acest fișier cu instrucțiuni
