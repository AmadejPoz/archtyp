# ARCHTYP
## VSEBINSKA SPECIFIKACIJA SPLETNE STRANI
**Različica 1.0 – koncept »Neural Interface«**
februar 2026

---

## PREGLED STRUKTURE SPLETNE STRANI

### Osrednji koncept
ARCHTYP se predstavi kot nevronski vmesnik – kot um, ki se prebuja. Zaslon deluje kot temna praznina vesolja, iz katere emergira zavest. Vijolična barva deluje kot signal kognitivne aktivnosti, kot sinaptični impulz. Stran se obnaša kot zagon umetne inteligence: fragmenti misli, pulzirajoče linije in geometrijski vzorci se med drsenjem sestavljajo v jasno, razumljivo sporočilo. Oblikovni jezik sledi trem usmeritvam: prikaz platforme za kognitivno plast robotov, futuristični sci-fi občutek z visoko-tehnološkimi detajli, in preprost tok, ki ne potrebuje designerja za implementacijo.

### Osnovna barvna paleta
- **Ozadje**: globoko črno (#000000 ali #050608)
- **Primarno besedilo**: čisto belo (#FFFFFF ali #F5F5F5)
- **Primarni poudarek**: ARCHTYP vijolična #A855F7 (živahna vijolična)
- **Sekundarna vijolična**: #9333EA (temnejša vijolična)
- **Sekundarni poudarek** za kartice/panele: #111317 (skoraj črna)
- **Terciarni signal** za hover/aktivne elemente: #C084FC (svetla vijolična)

### Tipografija
- **Naslovi**: geometrijsko sans (Space Grotesk / Inter)
- **Tekoče besedilo**: sodoben sans (Inter / system-ui)
- **Tehnični detajli**: monospace (JetBrains Mono / Fira Code)

### Tok strani
1. **Hero** - poln zaslon, animirane linije, glavno sporočilo
2. **Problem** - kontrast (svetla vijolična podlaga), jasen prikaz težave
3. **Rešitev** - opis platforme in sposobnosti
4. **Kako deluje** - tehnični pregled sklada
5. **Partnerji in stranke** - logotipi, primeri uporabe
6. **O nas** - ekipa, ozadje
7. **CTA** - poziv k akciji, kontakt
8. **Noga** - podatki o podjetju

### Navigacija
- **Namizje**: fiksna vrstica [LOGOTIP] | Problem | Rešitev | Tehnologija | Partnerji | O nas | [Kontakt gumb]
- **Mobilne**: hamburger meni → celozaslonski overlay

### Cilj strani
ARCHTYP kot očitna izbira za distributerje robotov in OEM proizvajalce. B2B tok: razume problem → spozna rešitev → pridobi zaupanje → kontakt za pilot.

**Notranji stavek**: »Roboti, ki govorijo, razumejo, si zapomnijo.«

---

## VIZUALNI IN INTERAKCIJSKI KONCEPT »NEURAL INTERFACE«

### Splošno vzdušje
- Globoko črno platno
- Čista bela tipografija
- Vijolična kot signal (sinaptični impulz, nevronska aktivacija)
- Vijolična pri interaktivnih elementih (hover, gumbi, povezave)

### Mikro animacije
- Geometrijske linije (logotip stil) - počasno vrtenje/pulziranje
- Typing efekt za glavni naslov
- Particle effect - vijolične točke (nevronska aktivnost)
- Fade-in ob drsenju
- Gumbi: vijolični glow ob hoverju

### Sci-fi detajli
- Bloki psevdokode: `> archtyp.init()`, `> cognitive_layer: ACTIVE`, `> languages: [sl, en, de, hr, sr]`
- Nizka prosojnost (20-30%)
- Tanke vijolične linije kot nevronske povezave

### Geometrijski vzorci
- Trikotnik iz linij (logotip motiv)
- Uporaba: hero ozadje, ob naslovih, loading, ločilne linije
- Preprost - samo linije, brez 3D

### Pravilo intenzivnosti
- En glavni vizualni učinek po odseku
- Ostalo mirno, čitljivo
- Subtilne animacije
- Izvedljivo s CSS + preprosti JS

---

## HERO ODSEK

### Namen
Takoj pove: ARCHTYP daje robotom sposobnostговarjања, razumevanja, spominjanja.

### Postavitev
- Črno ozadje, polnozaslonsko
- Logotip z animiranim trikotnim vzorcem
- Naslov + podnaslov + gumbi
- Vijolične particle/linije v ozadju
- Indicator za drsenje na dnu

### Besedilo
**Ime**: ARCHTYP
**Podnaslov**: THE COGNITIVE LAYER FOR ROBOTS.

**Glavni naslov** (možnosti):
- "We make robots talk well."
- "Robots that speak. Understand. Remember."
- "Give any robot a voice. And a mind."

**Podnaslov**: "Universal cognitive platform for service robots and humanoids. Speech, understanding, memory, personality – in one layer."

### Pozivni akciji
- **Primarni gumb**: vijolična (#A855F7) + belo besedilo → "Get Started" / "Request Demo"
- **Sekundarni gumb**: transparent + vijolična obroba → "Learn More"

### Mikro interakcija
Konzolna vrstica: `> status: COGNITIVE_LAYER_READY` + utripajoč kazalec

---

## ODSEK »PROBLEM«

### Namen
Jasen, preprost opis problema.

### Postavitev
- Svetla vijolična podlaga (#C4B5DC)
- Črno besedilo
- Naslov, glavni stavek, razlaga, ikona

### Vsebina
**Naslov**: "PROBLEM?"

**Glavni stavek**: "Robots can't talk well."

**Razlaga**: "A hotel spends €20.000 on a robot that can't answer 'where's the pool?' in German. You know what happens: staff keeps answering, customers avoid the robot."

**Dodatno**:
- No memory between visits
- English only in multilingual markets
- Generic responses, no personality

---

## ODSEK »REŠITEV«

### Namen
Jasna predstavitev ARCHTYP platforme.

### Postavitev
- Temno ozadje
- Naslov + uvod
- 4 kartice v mreži (temno sivo #111317, vijolične ikone)

### Vsebina
**Naslov**: "SOLUTION."

**Glavni stavek**: "Cognitive layer that makes any robot speak, sense, understand and remember."

#### Štiri sposobnosti

**Kartica 1 – Speak**
- Naslov: "Natural voice in any language."
- Telo: "Slovenian, German, Croatian, Serbian – and growing. Real conversations, not scripted responses. Voice that matches the robot's personality and brand."

**Kartica 2 – Sense**
- Naslov: "Aware of the world around."
- Telo: "The robot knows where it is, what it can do, what time it is, who's nearby. Context-aware responses that make sense in the moment."

**Kartica 3 – Understand**
- Naslov: "Real comprehension, not keywords."
- Telo: "Powered by LLMs. Handles accents, dialects, noisy environments. Knows when to ask for clarification. Knows when to escalate to humans."

**Kartica 4 – Remember**
- Naslov: "Persistent memory, consistent character."
- Telo: "The robot remembers returning guests, previous conversations, preferences. Builds relationships over time. Maintains consistent personality across all interactions."

---

## ODSEK »KAKO DELUJE«

### Namen
Kratka razlaga tehnološkega sklada.

### Postavitev
- Namizje: levo besedilo, desno shema
- Mobilne: navpično
- Shema: minimalne linije, vijolični poudarki

### Vsebina
**Naslov**: "HOW IT WORKS."

**Uvod**: "One platform. Any robot."

#### Trije koraki

**Korak 1 – Connect**
"Install ARCHTYP on any service robot or humanoid. Works with Keenon, Pudu, Temi, and more. 15-minute basic setup."

**Korak 2 – Configure**
"Define the robot's personality, knowledge base, and rules. Upload location info, FAQ, brand guidelines. Set language preferences."

**Korak 3 – Deploy**
"Robot is ready. Monitor conversations, analyze interactions, improve over time. Dashboard shows real-time status and insights."

**Tehnični zaupanje**:
"Built on proven LLM infrastructure. GDPR compliant. AI Act ready. EU-hosted data. Full conversation logs and analytics."

---

## ODSEK »PARTNERJI IN STRANKE«

### Namen
Socialni dokaz - partnerji, stranke, OEM zanimanje.

### Vsebina
**Naslov**: "WHY US."

**Ključne trditve**:
- Live customer (DORMEO)
- Distribution partner signed (INEEDROBOT)
- OEMs already interested (KEENON, PUDU, TEMI)
- The team behind the #1 humanoid brand in Adria
- Major media coverage
- EU-native (GDPR, AI Act ready)

**Logotipi**: Keenon, Pudu, Temi (grayscale → barva ob hoverju)

---

## ODSEK »O ARCHTYP«

### Vsebina
**Naslov**: "THE TEAM."

**Ekipa**:
- CEO Amadej Pozelnik
- COO Luka Slapnik
- CTO Blaž Bračko
- Head of AI Nejc Krmelj

**Ozadje**: "ARCHTYP is a spinoff from Vandri Robotics – the leading humanoid robotics company in the Adria region. We combine deep robotics experience with cutting-edge AI to build the cognitive layer that robots need to truly interact with people."

**Lokacija**: "Built in Ljubljana, Slovenia. Deployed across Europe."

---

## ODSEK »POZIV K AKCIJI«

### Vsebina
**Naslov**: "READY TO GIVE YOUR ROBOTS A VOICE?"

**Podnaslov**: "Let's talk. Whether you're a robot distributor, OEM, or enterprise deploying robots – we can help."

**Gumbi**:
- "Request Demo" → kontaktni obrazec
- "Download Overview" → PDF (opcijsko)

**Kontaktni obrazec**:
- Ime
- E-pošta
- Organizacija
- Tip (Distributor / OEM / Enterprise / Other)
- Sporočilo
- [Pošlji]

Konzolna vrstica: `> message_received: PROCESSING`

---

## NOGA STRANI

### Vsebina
- Logotip ARCHTYP (manjši)
- ARCHTYP – A Vandri Robotics Company
- Ljubljana, Slovenia
- Kontakt: e-pošta, LinkedIn
- Povezave: O nas, Zasebnost, Pogoji uporabe
- Copyright

Ozadje črno, tekst siv, hover vijolično.

---

## NAVIGACIJA IN PRILAGODLJIVOST

### Namizje
- Fiksna vrstica (transparent → temnejša ob drsenju)
- Backdrop blur efekt
- Logotip levo, navigacija sredina, Contact gumb desno

### Mobilne
- Hamburger ikona
- Celozaslonski črn overlay
- Navpične postavke, velike
- Vijolični glow ob dotiku

### Drsenje
- Hero = 100vh
- Fade-in animacije ob drsenju

---

## TON VSEBINE

### Ton
- Preprost, neposreden, samozavesten
- Kratki stavki
- Jasne trditve (brez "potentially could")

### Ciljne skupine
- **Distributerji**: diferenciator
- **OEM**: partner za EU trg, lokalizacija, AI
- **Enterprise**: roboti ki delajo

### Pravila
- Angleščina (primarno), slovenščina (sekundarno)
- Konsistentni izrazi: cognitive layer, platform, robot, deploy, integrate

### Ključni stavki
- "We make robots talk well."
- "The cognitive layer for robots."
- "Speak. Sense. Understand. Remember."
- "Any robot. One platform."

---

## TEHNIČNA IMPLEMENTACIJA

### Tehnologije
- **Framework**: Next.js / Astro
- **Styling**: Tailwind CSS
- **Animacije**: CSS animations, transitions, opcijsko Framer Motion
- **Particles**: Canvas + particles.js

### CSS efekti
- Glow: `box-shadow: 0 0 20px rgba(168, 85, 247, 0.5)`
- Typing: CSS animation `steps()` ali JS
- Fade in: Intersection Observer + opacity transition
- Pulz: CSS keyframes (opacity/scale)
- Blur: `backdrop-filter: blur(10px)`

### Izogibamo se
- 3D animacije (WebGL)
- Video ozadja
- Preveč različnih animacij
- Custom ilustracije

---

## BARVNA PALETA – POVZETEK

| Uporaba | HEX | Opis |
|---------|-----|------|
| Ozadje | #000000 | Čisto črno |
| Ozadje alt | #050608 | Skoraj črno |
| Primarna vijolična | #A855F7 | Gumbi, poudarki, logotip |
| Temna vijolična | #9333EA | Gradienti, sence |
| Svetla vijolična | #C084FC | Hover, glow |
| Problem sekcija | #C4B5DC | Svetla vijolična podlaga |
| Kartice | #111317 | Temno sivo ozadje |
| Sekundarno besedilo | #9CA3AF | Siva |

---

## ZAKLJUČEK

Ključni principi:
- Temna tema + vijolična signalna barva
- Futuristično brez kompleksnosti
- Jasna struktura: problem → rešitev → akcija
- Izvedljivo brez profesionalnega designerja
- Standard CSS/JS tehnike

**Fokus**: "ARCHTYP daje robotom sposobnost, da govorijo, razumejo in si zapomnijo."
