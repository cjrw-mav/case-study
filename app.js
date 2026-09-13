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
  showScene(0);
})();
