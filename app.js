/* Native rendering and the original v7 interaction model. */
(() => {
  'use strict';
  const content = window.CASE_STUDY;
  const root = document.getElementById('nourish-case-v7');
  const navigation = root.querySelector('.nav');
  const sceneContainer = root.querySelector('#scenes');
  const previous = root.querySelector('#prev-v7');
  const next = root.querySelector('#next-v7');
  const progress = root.querySelector('#progress-v7');
  let currentScene = 0;

  document.title = content.meta.title;
  navigation.innerHTML = content.brandHtml;
  content.scenes.forEach((scene, index) => {
    const button = document.createElement('button');
    button.textContent = scene.navLabel;
    button.addEventListener('click', () => showScene(index));
    navigation.append(button);
    const section = document.createElement('section');
    section.className = 'scene';
    section.innerHTML = scene.html;
    sceneContainer.append(section);
  });
  previous.textContent = content.controls.previous;
  next.textContent = content.controls.next;
  const scenes = [...sceneContainer.children];
  const navButtons = [...navigation.querySelectorAll('button')];

  function showScene(index) {
    currentScene = Math.max(0, Math.min(scenes.length - 1, index));
    scenes.forEach((scene, i) => scene.classList.toggle('active', i === currentScene));
    navButtons.forEach((button, i) => button.setAttribute('aria-selected', String(i === currentScene)));
    previous.disabled = currentScene === 0;
    next.disabled = currentScene === scenes.length - 1;
    progress.textContent = `${currentScene + 1} / ${scenes.length}`;
  }

  // Templates and every changeable label live with the canonical content.
  function renderDetail(target, template, values) {
    target.innerHTML = template.replace(/\{\{(\d+)\}\}/g, (_, index) => values[index]);
  }
  const milestones = [...root.querySelectorAll('.milestone')];
  function selectScalingStage(index) {
    milestones.forEach((button, i) => button.classList.toggle('active', i === index));
    renderDetail(root.querySelector('#scale-detail-v7'), content.detailTemplates.scaling, content.scalingStages[index]);
  }
  milestones.forEach((button, i) => button.addEventListener('click', () => selectScalingStage(i)));
  root.querySelectorAll('.scale-marker').forEach((marker, i) => marker.addEventListener('click', () => selectScalingStage(i)));

  const lenses = [...root.querySelectorAll('.lens')];
  function selectLens(index) {
    lenses.forEach((button, i) => button.classList.toggle('active', i === index));
    renderDetail(root.querySelector('#lens-detail-v7'), content.detailTemplates.diagnostic, content.diagnosticLenses[index]);
  }
  lenses.forEach((button, i) => button.addEventListener('click', () => selectLens(i)));

  const bubbles = [...root.querySelectorAll('.lev-bubble')];
  function selectOpportunity(index) {
    bubbles.forEach((group, i) => group.querySelector('.bubble').classList.toggle('active', i === index));
    renderDetail(root.querySelector('#leverage-detail-v7'), content.detailTemplates.leverage, content.leverageOpportunities[index]);
  }
  bubbles.forEach((group, i) => group.addEventListener('click', () => selectOpportunity(i)));

  function initialisePrioritisationTool() {
    const host = root.querySelector('#priority-scorer-v7');
    const tool = content.prioritisationTool;
    if (!host || !tool) return;

    host.innerHTML = `<div class="row row-wrap spread layout-gap-3 align-end">
      <div><div class="kicker">${tool.kicker}</div><h2 class="type-xl weight-semibold space-above-1">${tool.title}</h2><p class="type-sm space-above-1 muted-ink">${tool.instruction}</p></div>
      <div class="priority-ranking" aria-live="polite"><div class="kicker">${tool.rankingLabel}</div><ol></ol></div>
    </div>
    <div class="priority-score-grid card-grid columns-3-md layout-gap-4 space-above-4">
      ${tool.challenges.map((challenge, challengeIndex) => `<div class="card priority-score-card" data-priority-challenge="${challengeIndex}">
        <h3>${challenge.name}</h3>
        <div class="priority-total"><span>${tool.totalLabel}</span><strong data-priority-total="${challengeIndex}"></strong></div>
        <div class="priority-sliders">
          ${tool.criteria.map((criterion, criterionIndex) => {
            const inputId = `priority-${challenge.id}-${criterionIndex}`;
            return `<div class="priority-slider-row"><div class="priority-slider-heading"><label for="${inputId}">${criterion}</label><output for="${inputId}">${challenge.scores[criterionIndex]}</output></div><input id="${inputId}" type="range" min="1" max="5" step="1" value="${challenge.scores[criterionIndex]}" data-priority-challenge="${challengeIndex}" data-priority-criterion="${criterionIndex}" aria-label="${challenge.name}: ${criterion}"><div class="priority-scale" aria-hidden="true"><span>1</span><span>5</span></div></div>`;
          }).join('')}
        </div>
      </div>`).join('')}
    </div>`;

    const scores = tool.challenges.map(challenge => [...challenge.scores]);
    const ranking = host.querySelector('.priority-ranking ol');

    function updatePriorities() {
      const totals = scores.map(values => values.reduce((sum, value) => sum + value, 0));
      host.querySelectorAll('[data-priority-total]').forEach(output => {
        const index = Number(output.dataset.priorityTotal);
        output.textContent = `${totals[index]} / ${tool.maximumScore}`;
      });
      const ranked = tool.challenges
        .map((challenge, index) => ({ name: challenge.name, total: totals[index], index }))
        .sort((a, b) => b.total - a.total || a.index - b.index);
      ranking.innerHTML = ranked.map((challenge, index) => `<li><span>${index + 1}</span><b>${challenge.name}</b><strong>${challenge.total}</strong></li>`).join('');
    }

    host.querySelectorAll('input[type="range"]').forEach(input => {
      input.addEventListener('input', () => {
        const challengeIndex = Number(input.dataset.priorityChallenge);
        const criterionIndex = Number(input.dataset.priorityCriterion);
        scores[challengeIndex][criterionIndex] = Number(input.value);
        input.previousElementSibling.querySelector('output').value = input.value;
        updatePriorities();
      });
    });
    updatePriorities();
  }

  function initialiseOperatingSystem() {
    const host = root.querySelector('#operating-system-flow-v7');
    const stages = content.operatingSystemStages;
    if (!host || !stages) return;

    host.innerHTML = stages.map((stage, index) => {
      const panelId = `operating-stage-${index}`;
      const expanded = index === 0;
      return `${index ? '<div class="operating-arrow" aria-hidden="true">↓</div>' : ''}<div class="card operating-step">
        <button class="operating-step-toggle" type="button" aria-expanded="${expanded}" aria-controls="${panelId}">
          <span class="pill ${stage.colour}">${stage.label}</span>
          <span class="operating-step-summary"><b>${stage.question}</b><span>${stage.summary}</span></span>
          <span class="operating-chevron" aria-hidden="true">⌄</span>
        </button>
        <div id="${panelId}" class="operating-step-detail"${expanded ? '' : ' hidden'}>
          <ul class="experience-list">${stage.points.map(point => `<li>${point}</li>`).join('')}</ul>
        </div>
      </div>`;
    }).join('');

    host.querySelectorAll('.operating-step-toggle').forEach(button => {
      button.addEventListener('click', () => {
        const expanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', String(!expanded));
        root.querySelector(`#${button.getAttribute('aria-controls')}`).hidden = expanded;
      });
    });
  }

  previous.addEventListener('click', () => showScene(currentScene - 1));
  next.addEventListener('click', () => showScene(currentScene + 1));
  root.tabIndex = 0;
  root.addEventListener('keydown', event => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName)) return;
    if (event.key === 'ArrowRight') showScene(currentScene + 1);
    if (event.key === 'ArrowLeft') showScene(currentScene - 1);
  });
  selectScalingStage(0);
  selectLens(0);
  selectOpportunity(0);
  initialisePrioritisationTool();
  initialiseOperatingSystem();
  showScene(0);
})();
