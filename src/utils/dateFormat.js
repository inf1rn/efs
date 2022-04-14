export function dateFormat(date) {
    date = Date.parse(date);
    const year = new Intl.DateTimeFormat('ru-RU', {
        year: 'numeric'
    }).format(date);

    const month = new Intl.DateTimeFormat('ru-RU', {
        month: '2-digit'
    }).format(date);

    const day = new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit'
    }).format(date);

    return `${year}-${month}-${day}`
}