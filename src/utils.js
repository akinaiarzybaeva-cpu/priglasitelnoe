import config from './config';

export const MONTHS = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
];

// Дүйшөмбүдөн башталат
export const WEEKDAYS_SHORT = ['Дш', 'Шш', 'Шр', 'Бш', 'Жм', 'Иш', 'Жк'];
export const WEEKDAYS_FULL = ['Дүйшөмбү', 'Шейшемби', 'Шаршемби', 'Бейшемби', 'Жума', 'Ишемби', 'Жекшемби'];

/** `public/` ичиндеги файлга туура жол берет (же https шилтемени ошол бойдон калтырат). */
export function asset(path) {
  if (!path) return '';
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path;
  return import.meta.env.BASE_URL + path.replace(/^\/+/, '');
}

/** Иш-чаранын күнү: календарь үчүн убакыт алкагынан көз карандысыз сандар. */
export function getEventParts() {
  const [year, month, day] = config.event.date.split('-').map(Number);
  // Апта күнү: 0 = Дүйшөмбү
  const weekday = (new Date(Date.UTC(year, month - 1, day)).getUTCDay() + 6) % 7;
  return { year, month, day, weekday, time: config.event.time };
}

/** Countdown үчүн так убакыт (иш-чара өткөн шаардын убактысы боюнча). */
export function getEventTimestamp() {
  const { date, time, timezone } = config.event;
  return new Date(`${date}T${time}:00${timezone}`).getTime();
}

export function pad(n) {
  return String(n).padStart(2, '0');
}
