/**
 * Возвращает дату в соответствии с указанным форматом.
 * Поддерживаемые значения:
 * - YYYY -- Год;
 * - MM -- Месяц;
 * - DD -- День;
 * - HH -- Час;
 * - NN -- Минуты;
 * - SS -- Секунды;
 * - ZZZ -- Миллисекунды.
 *
 * @param time Время UTC;
 * @param format Формат записи. Например DD/MM/YYYY HH:NN:SS.ZZZ;
 * @param timeZone Часовая зона в минутах. Если не число, то соответствует настройкам системы.
 */
export const formatDate = (time: number, format: string, timeZone?: number): string => {
	if (!time || !format) return '';

	const utcDate = new Date((time || 0) + (timeZone || 0) * 60 * 1000);
	const useDate = new Date(Date.UTC(
		utcDate.getFullYear(),
		utcDate.getMonth(),
		utcDate.getDate(),
		utcDate.getHours(),
		utcDate.getMinutes(),
		utcDate.getSeconds(),
		utcDate.getMilliseconds()
	));

	const split = (!timeZone && (timeZone !== 0) ? useDate : utcDate).toISOString().split(/[-T:.Z]/);

	return format
		.replace('YYYY', split[0])
		.replace('MM', split[1])
		.replace('DD', split[2])
		.replace('HH', split[3])
		.replace('NN', split[4])
		.replace('SS', split[5])
		.replace('ZZZ', split[6]);
};
