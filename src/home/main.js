import tools from '../tools.js';
import './home.css';

const SVG_NS = 'http://www.w3.org/2000/svg';

// Simple line icons (24x24). Each is a list of [element, attributes].
const ICONS = {
  breath: [
    ['circle', { cx: 12, cy: 12, r: 3 }],
    ['circle', { cx: 12, cy: 12, r: 6.5, opacity: 0.7 }],
    ['circle', { cx: 12, cy: 12, r: 10, opacity: 0.4 }],
  ],
  timer: [
    ['circle', { cx: 12, cy: 13, r: 8 }],
    ['path', { d: 'M12 9v4l2.5 2.5' }],
    ['path', { d: 'M10 2h4' }],
    ['path', { d: 'M12 2v3' }],
  ],
  strength: [
    ['path', { d: 'M3 20h18' }],
    ['path', { d: 'M6 16l4-4 3 3 5-6' }],
    ['path', { d: 'M14.5 9H18v3.5' }],
  ],
};

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function iconFor(tool) {
  const box = el('div', 'tool-icon');
  box.setAttribute('aria-hidden', 'true');
  const shapes = ICONS[tool.icon];
  // Each icon has its own soft color (see home.css), taken from the breathing bubble.
  box.dataset.accent = shapes ? tool.icon : 'default';
  if (!shapes) {
    // No icon given: show the first letter of the tool's name.
    box.appendChild(el('span', 'tool-letter', (tool.name || '?').trim().charAt(0).toUpperCase()));
    return box;
  }
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', '26');
  svg.setAttribute('height', '26');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.8');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  for (const [name, attrs] of shapes) {
    const shape = document.createElementNS(SVG_NS, name);
    for (const [key, value] of Object.entries(attrs)) shape.setAttribute(key, String(value));
    svg.appendChild(shape);
  }
  box.appendChild(svg);
  return box;
}

function card(tool) {
  const item = el('li', 'tool-card');
  item.dataset.tool = tool.id || '';

  const top = el('div', 'tool-top');
  top.appendChild(iconFor(tool));
  if (tool.tag) top.appendChild(el('span', 'tool-tag', tool.tag));
  item.appendChild(top);

  const title = el('h3', 'tool-name', tool.name);
  const titleId = 'tool-' + (tool.id || Math.random().toString(36).slice(2));
  title.id = titleId;
  item.appendChild(title);
  item.appendChild(el('p', 'tool-desc', tool.description || ''));

  // One link per card. CSS stretches it over the whole card, so the
  // full card is clickable, but keyboard users still Tab to one link.
  const link = el('a', 'tool-open');
  link.href = tool.path;
  link.setAttribute('aria-describedby', titleId);
  link.appendChild(el('span', null, 'Open'));
  const arrow = el('span', 'tool-arrow', '→');
  arrow.setAttribute('aria-hidden', 'true');
  link.appendChild(arrow);
  item.appendChild(link);
  return item;
}

function render() {
  const list = document.getElementById('tool-list');
  if (!list) return;
  list.replaceChildren();
  for (const tool of tools) {
    if (!tool || !tool.name || !tool.path) {
      console.warn('Skipped a tool entry with no name or path in src/tools.js:', tool);
      continue;
    }
    list.appendChild(card(tool));
  }
}

render();
