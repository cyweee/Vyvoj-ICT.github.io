# Technická dokumentace: *Vývoj ICT*

## 1. Klíčové komponenty

### 1.1 Navigační systém

**Funkce:**
- Inteligentní scrollování mezi kartami (`.card`, `.card-pers`)
- Ovládání: klávesa **MEZERNÍK**

**Speciální vlastnosti:**
- Automatické určení pozice
- Cyklická navigace
- Zvýraznění aktuální karty

**Hlavní funkce (JavaScript):**
```javascript
function preciseScrollTo(element) {
  // 1. Analýza velikosti prvku a okna
  // 2. Volba strategie:
  //    - Centrování (pro malé prvky)
  //    - Zobrazení začátku (pro velké prvky)
  // 3. Plynulé scrollování s easing animací
}
```

### 1.2 Animace

**Použité technologie:**

- AOS (Animate On Scroll) pro objevování prvků
- CSS animace pro interaktivní efekty

#### Nastavení AOS:

```javascript
AOS.init({
  duration: 800,
  once: true,
  easing: 'ease-out-back'
});
```

****

## Vizuální prvky

### 2.1 Obsahové karty

#### Typy:

- Historické a budouci(.card)
- Osobnosti (.card-pers)

#### Společné styly (CSS):

```css
.card, .card-pers {
  background: rgba(10, 30, 10, 0.85);
  border: 1px solid rgba(0, 255, 100, 0.2);
  backdrop-filter: blur(5px);
  transition: all 0.5s ease;
}
```

### 2.2 Speciální efekty

#### Dynamické zvýraznění (CSS):

```css
@keyframes highlight {
  to { 
    box-shadow: 0 0 30px rgba(0, 255, 100, 0.7);
    transform: scale(1.02);
  }
}
```
#### Navigační indikátor:

- Stále viditelný prvek
- Animace při interakci

****

## 3. Integrace

### 3.1 Externí závislosti
#### Povinné:

1. AOS CSS/JS (CDN)
2. Google Fonts (Allerta, Share Tech Mono)
3. Matrix efekt (`matrix.js`)

****

## 4. Výkon

#### Kritické optimalizace:

- Použití `will-change` pro animované prvky

- Debounce event handlerů

- Optimalizované CSS animace (`transform` + `opacity`)

#### Metriky:

- Doba inicializace: < 1.5s
- FPS animací: ≥ 60

****

## 5. Autoři

- Kyrylo Buryk – Architektura, programovani, JS logika

- Denisz Sztojka – Obsah, vizuální design

****

## API specifikace

### Navigační metody

`scrollToNextCard()`

Hlavní navigační funkce. Určuje další kartu a plynule k ní scrolluje.

#### Logika:
- Získá všechny karty pomocí getAllCards()
- Určí aktuální pozici
- Vypočítá další cíl
- Spustí plynulé scrollování

#### Event handlery

`keydown`:
```javascript
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    scrollToNextCard();
  }
});
```
****

## Stylový průvodce

### Vizuální standardy

#### Barvy:

- Hlavní: `#00ff88`
- Pozadí: přechod `#000000` → `#001a00`
- Text: `#c0ffc0` (základní), `#ffffff` (nadpisy)

#### Efekty:

- Záře: `box-shadow: 0 0 15px rgba(0, 255, 100, 0.5)`
- Ohraničení: `1px solid rgba(0, 255, 100, 0.3)`

#### Animace:

- Doba trvání: `300–800ms`
- Easing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`