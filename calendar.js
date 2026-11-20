const events = [
  { year: 2026, month: 10, day: 14, id: 'thanksgiving', title: 'Thanksgiving Dialogue Gathering' },
  { year: 2026, month: 11, day: 12, id: 'christmas-dinner', title: 'Anglican Interfaith Christmas Dinner' }
];
let month = new Date(2026, 11, 1);
const grid = document.querySelector('#calendar-grid');
const title = document.querySelector('#month');
const monthStatus = document.querySelector('#month-status');

function render() {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const monthEvents = events.filter(event => event.year === year && event.month === monthIndex);
  const monthLabel = month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  title.textContent = monthLabel;
  const firstWeekday = month.getDay();
  const days = new Date(year, monthIndex + 1, 0).getDate();
  const body = grid.tBodies[0];
  body.replaceChildren();

  for (let offset = 0; offset < firstWeekday + days; offset += 7) {
    const row = body.insertRow();
    for (let weekday = 0; weekday < 7; weekday += 1) {
      const cell = row.insertCell();
      const day = offset + weekday - firstWeekday + 1;
      if (day < 1 || day > days) continue;
      const event = monthEvents.find(item => item.day === day);
      if (event) {
        const link = document.createElement('a');
        link.href = '#' + event.id;
        link.className = 'calendar-event-day';
        link.textContent = String(day);
        link.setAttribute('aria-label', `${monthLabel}, day ${day}: ${event.title}`);
        cell.append(link);
      } else {
        cell.textContent = String(day);
      }
    }
  }
  monthStatus.textContent = monthEvents.length ? 'One scheduled event this month.' : 'No events are listed for this month.';
}

for (const [id, step] of [['previous', -1], ['next', 1]]) {
  document.getElementById(id).addEventListener('click', () => {
    month = new Date(month.getFullYear(), month.getMonth() + step, 1);
    render();
  });
}
render();
grid.hidden = false;
document.querySelector('#month-controls').hidden = false;
