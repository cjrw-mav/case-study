import assert from 'node:assert/strict';
import console from 'node:console';
import { createServer } from 'vite';
const server = await createServer({server:{middlewareMode:true}});
try {
  const c = await server.ssrLoadModule('/src/content/caseStudy.ts');
  assert.equal(c.scenes.length,10);
  for(const scene of c.scenes) assert.ok(scene.title?.length>10,`Missing scene title: ${scene.name}`);
  assert.equal(c.candidateIntro.categories.length,11);
  assert.equal(c.scalingMilestones.length,4);
  assert.equal(c.scalingMilestones[0].signals.length,4);
  for(const m of c.scalingMilestones) {assert.ok(m.constraints.length);assert.ok(m.response.length);}
  assert.equal(c.operatingPrinciples.length,4);
  assert.equal(c.diagnosticLenses.length,7);
  for(const lens of c.diagnosticLenses) assert.ok(lens.topics.length,`Missing topics: ${lens.title}`);
  assert.equal(c.ninetyDayPhases.length,3);
  assert.equal(c.prioritisationCriteria.length,6);
  assert.equal(c.illustrativeInitiatives.length,6);
  assert.equal(c.governanceModel.length,6);
  assert.equal(c.aiCase.fields.length,5);
  assert.equal(c.aiCase.metrics.length,6);
  assert.equal(c.experienceLibrary.length,7);
  assert.equal(c.closingNarrative.steps.length,5);
  const strings=value=>typeof value==='string'?[value]:Array.isArray(value)?value.flatMap(strings):value&&typeof value==='object'?Object.values(value).flatMap(strings):[];
  for (const key of ['candidateIntro','scalingNarrative','scalingMilestones','operatingPrinciples','diagnosticLenses','ninetyDayPhases','day90','prioritisationCriteria','illustrativeInitiatives','governanceModel','deliveryModel','risks','aiCase','experienceLibrary','assumptions','closingNarrative']) {
    for(const text of strings(c[key]).filter(Boolean)) assert.ok(c.sourceBrief.includes(text),`Text differs from supplied brief: ${text}`);
  }
  console.log('Content checks passed: ten scenes, complete interaction datasets, and verbatim source fidelity.');
} finally {await server.close();}
