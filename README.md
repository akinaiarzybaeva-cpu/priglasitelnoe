# Электрондук чакыруу (React + Vite)

Конверттен ачылуучу, анимациялуу, телефонго ылайыкташкан премиум электрондук чакыруу.

## Ишке киргизүү

```bash
npm install      # бир жолу
npm run dev      # локалдык көрүү: http://localhost:5173
npm run build    # даяр сайт → dist/ папкасы
npm run preview  # build'ди текшерүү
```

`dist/` папкасын каалаган хостингге (Vercel, Netlify, GitHub Pages, Render ж.б.) жүктөсөңүз болот.

## Маалыматтарды өзгөртүү

Баары **бир файлда**: [`src/config.js`](src/config.js)

| Эмне | config.js ичинде |
|---|---|
| Кыздын / жигиттин аты, мөөрдөгү тамгалар | `couple` |
| Иш-чаранын аталышы, күнү, убактысы | `event` (`date: 'ЖЖЖЖ-АА-КК'`, `time: 'СС:ММ'`) |
| Конверттеги жазуу жана баскыч | `envelope` |
| Башкы сүрөт | `hero.photo` |
| Чакыруу тексти | `invitation.paragraphs` |
| Программа | `program.items` (саат, аталыш, сүрөттөмө, иконка) |
| Дарек жана Google Maps шилтемеси | `location` |
| Музыка | `music.src` |
| WhatsApp номери (RSVP) | `rsvp.whatsappNumber` — мисалы `996700123456` |
| Ыраазычылык тексти | `finale` |
| Түстөр | `theme` |

Календарь, countdown жана бардык даталар `event.date` / `event.time` боюнча автоматтык эсептелет.

## Сүрөттү алмаштыруу

1. Сүрөттү `public/images/` папкасына салыңыз, мисалы `public/images/couple.jpg`.
2. `config.js` ичинде: `photo: 'images/couple.jpg'`.

Тик (вертикалдуу) сүрөт эң кооз көрүнөт. Сүрөт табылбаса, анын ордуна гүлдүү монограмма чыгат.

## Музыканы алмаштыруу

1. MP3 файлды `public/music/` папкасына салыңыз, мисалы `public/music/song.mp3`.
2. `config.js` ичинде: `src: 'music/song.mp3'`.

Музыка колдонуучу конвертти ачкандан кийин гана ойнойт (браузерлердин эрежеси). Өзү башталбасын десеңиз, `playOnOpen: false` коюңуз — анда оң ылдыйкы бурчтагы баскыч менен гана ойнойт.
Азыркы `melody.wav` — демо үчүн түзүлгөн music-box обону (Пахельбелдин «Канону», коомдук мурас).

## Түзүлүшү

```
src/
  config.js            ← бардык маалыматтар
  App.jsx              ← бөлүктөрдүн тартиби
  hooks/useMusic.js    ← музыканы башкаруу
  components/
    Envelope.jsx       1. Конверт жана ачылуу анимациясы
    Hero.jsx           2. Башкы бөлүк
    Invitation.jsx     3. Чакыруу тексти
    Calendar.jsx       4. Календарь
    Countdown.jsx      5. Countdown
    Program.jsx        6. Программа
    Location.jsx       7. Location
    MusicButton.jsx    8. Play/Pause баскычы
    RSVP.jsx           9. RSVP → WhatsApp
    Finale.jsx         10. Акыркы бөлүк
    Ornaments.jsx      SVG гүлдөр, лаванда, бөлгүчтөр
    Petals.jsx         түшкөн гүл желекчелери
  styles/global.css    ← бардык стилдер
```
