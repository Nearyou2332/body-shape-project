'use strict';

// All interactions run locally. No form data is transmitted or persisted.
const programs = {
  strength: { title: 'Strength Foundations', category: 'Strength', goal: 'strength', description: 'Learn the essential squat, hinge, push, and pull patterns. Start with controlled movements and a load that lets you stay focused on form.', format: 'Technique-led strength', level: 'All levels, especially new starters', equipment: 'Dumbbells or gym equipment', focus: 'Movement quality and strength' },
  functional: { title: 'Functional Training', category: 'Conditioning', goal: 'conditioning', description: 'Connect strength, stability, and coordination with full-body movements. Each session can be scaled by adjusting resistance, range of motion, and pace.', format: 'Full-body circuit', level: 'Adaptable to your experience', equipment: 'Suspension straps, mat, light weights', focus: 'Everyday movement and control' },
  pilates: { title: 'Pilates & Mobility', category: 'Mobility', goal: 'mobility', description: 'Slow down and reconnect with how you move. Explore controlled mat work, core stability, and comfortable ranges of motion without rushing the process.', format: 'Controlled mat-based movement', level: 'All levels', equipment: 'Exercise mat and clear floor space', focus: 'Balance, control, and mobility' },
  cardio: { title: 'Cardio Flow', category: 'Conditioning', goal: 'conditioning', description: 'Find a sustainable rhythm through steady movement. Walking, cycling, or low-impact circuits can help you build a routine at a pace that feels manageable.', format: 'Steady movement or light intervals', level: 'All levels', equipment: 'Comfortable shoes; machine optional', focus: 'Conditioning and consistency' },
  hiit: { title: 'Beast Mode', category: 'Conditioning', goal: 'conditioning', description: 'Explore a more demanding mix of work and recovery intervals. Choose this direction when you already feel confident with the basics, and scale the pace to keep your technique steady.', format: 'Work and recovery intervals', level: 'Comfortable with regular training', equipment: 'Battle ropes or circuit equipment', focus: 'Conditioning under controlled effort' },
  kettlebell: { title: 'Kettlebell Strength', category: 'Strength', goal: 'strength', description: 'Bring strength and coordination together with kettlebell movement. Learn the setup, grip, and basic patterns with appropriate guidance before trying more complex movements.', format: 'Skill-focused strength practice', level: 'Basic movement experience helpful', equipment: 'Appropriately weighted kettlebell', focus: 'Coordination and full-body strength' }
};

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
function closeMenu(returnFocus = false) {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('is-open');
  if (returnFocus) menuToggle.focus();
}
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('is-open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') closeMenu(true); });
document.addEventListener('click', event => { if (!navigation.contains(event.target) && !menuToggle.contains(event.target)) closeMenu(); });
window.matchMedia('(min-width: 801px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

const filters = document.querySelectorAll('[data-filter]');
filters.forEach(filter => filter.addEventListener('click', () => {
  const category = filter.dataset.filter;
  filters.forEach(button => {
    const selected = button === filter;
    button.classList.toggle('is-active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  let count = 0;
  document.querySelectorAll('.program-card').forEach(card => {
    const visible = category === 'all' || card.dataset.category === category;
    card.hidden = !visible;
    if (visible) count++;
  });
  document.querySelector('#filter-status').textContent = `Showing ${count} ${category === 'all' ? '' : category + ' '}program${count === 1 ? '' : 's'}`;
}));

const dialog = document.querySelector('#program-dialog');

document.querySelectorAll('[data-program]').forEach(button => button.addEventListener('click', () => {
  const program = programs[button.dataset.program];
  dialog.dataset.goal = program.goal;
  document.querySelector('#dialog-title').textContent = program.title;
  document.querySelector('#dialog-category').textContent = `${program.category} / Program overview`;
  document.querySelector('#dialog-description').textContent = program.description;
  const facts = document.querySelector('#dialog-facts');
  facts.replaceChildren();
  [['Format', program.format], ['Experience', program.level], ['Equipment', program.equipment], ['Focus', program.focus]].forEach(([label, value]) => {
    const item = document.createElement('div');
    const term = document.createElement('dt');
    const detail = document.createElement('dd');
    term.textContent = label.toUpperCase(); detail.textContent = value;
    item.append(term, detail); facts.append(item);
  });
  document.body.classList.add('has-dialog');
  dialog.showModal();
}));
function closeDialog() { dialog.close(); }
document.querySelector('.dialog__close').addEventListener('click', closeDialog);
dialog.addEventListener('click', event => {
  if (event.target === dialog) {
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeDialog();
  }
});
dialog.addEventListener('close', () => document.body.classList.remove('has-dialog'));

const form = document.querySelector('#plan-form');
const result = document.querySelector('#plan-result');
document.querySelector('#choose-program').addEventListener('click', event => {
  event.preventDefault();
  document.querySelector('#goal').value = dialog.dataset.goal;
  clearGoalError();
  form.hidden = false; result.hidden = true; closeDialog();
  document.querySelector('#start').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  requestAnimationFrame(() => document.querySelector('#goal').focus({ preventScroll: true }));
});

const planContent = {
  strength: { title: 'A stronger foundation', sessions: ['Strength Foundations — controlled full-body movement', 'Pilates & Mobility — balance and range of motion', 'Strength Foundations — repeat the basics', 'Cardio Flow — easy, steady movement'] },
  conditioning: { title: 'Find your training rhythm', sessions: ['Cardio Flow — find a comfortable pace', 'Functional Training — scalable full-body movement', 'Pilates & Mobility — reset and move freely', 'Cardio Flow — build consistency'] },
  mobility: { title: 'Make space to move', sessions: ['Pilates & Mobility — slow, controlled mat work', 'Cardio Flow — gentle, steady movement', 'Pilates & Mobility — balance and body awareness', 'Strength Foundations — light, technique-focused movement'] }
};
const experience = { beginner: 'Start gently and learn the movements before increasing effort.', returning: 'Ease back into a comfortable rhythm and leave room for recovery.', experienced: 'Keep your technique consistent as you adjust the challenge.' };
let planText = '';
function clearGoalError() {
  document.querySelector('#goal-error').hidden = true;
  document.querySelector('#goal').removeAttribute('aria-invalid');
}
document.querySelector('#goal').addEventListener('change', clearGoalError);
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!document.querySelector('#goal').value) {
    document.querySelector('#goal-error').hidden = false;
    document.querySelector('#goal').setAttribute('aria-invalid', 'true');
    document.querySelector('#goal').focus();
    return;
  }
  clearGoalError();
  const goal = document.querySelector('#goal').value;
  const level = document.querySelector('#level').value;
  const days = Number(document.querySelector('#days').value);
  const plan = planContent[goal];
  document.querySelector('#result-title').textContent = plan.title;
  const intro = `${days} training days per week. ${experience[level]}`;
  document.querySelector('#result-intro').textContent = intro;
  const list = document.querySelector('#result-sessions');
  list.replaceChildren();
  const sessions = plan.sessions.slice(0, days);
  sessions.forEach((session, index) => {
    const item = document.createElement('li');
    const number = document.createElement('strong'); number.textContent = `DAY 0${index + 1}`;
    const description = document.createElement('span'); description.textContent = session;
    item.append(number, description); list.append(item);
  });
  planText = `BODY SHAPE — YOUR STARTING PLAN\n\n${plan.title}\n${intro}\n\n${sessions.map((session, index) => `Day ${index + 1}: ${session}`).join('\n')}\n\nSpace your training days out and include recovery time. Keep the first sessions comfortable. Adapt the outline to your needs and seek qualified guidance for unfamiliar movements.\n\nThis is an introductory outline, not a booking or individualized coaching prescription. Generated locally; no data was sent.\n`;
  form.hidden = true; result.hidden = false;
  document.querySelector('#download-status').textContent = '';
  document.querySelector('#result-title').focus({ preventScroll: true });
});
document.querySelector('#edit-plan').addEventListener('click', () => {
  result.hidden = true; form.hidden = false; document.querySelector('#goal').focus({ preventScroll: true });
});
document.querySelector('#download-plan').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([planText], { type: 'text/plain;charset=utf-8' }));
  const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'body-shape-starting-plan.txt';
  document.body.append(anchor); anchor.click(); anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  document.querySelector('#download-status').textContent = 'Your plan download has started.';
});
document.querySelector('#year').textContent = String(new Date().getFullYear());
