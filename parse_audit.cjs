const fs = require('fs');

const report = JSON.parse(fs.readFileSync('./audit_desktop_1920.report.json', 'utf8'));

console.log('=== PERFORMANCE AUDIT ISSUES ===');
const metricAudits = [
  'first-contentful-paint',
  'largest-contentful-paint',
  'total-blocking-time',
  'cumulative-layout-shift',
  'speed-index',
  'interactive',
];

for (const key of metricAudits) {
  if (report.audits[key]) {
    const audit = report.audits[key];
    console.log(`${key}: ${audit.displayValue || audit.score} (score: ${audit.score})`);
  }
}

console.log('\n=== FAILED AUDITS (score < 0.9) ===');
for (const [key, audit] of Object.entries(report.audits)) {
  if (audit.score !== null && audit.score < 0.9 && audit.score === 0) {
    console.log(`${key}: ${audit.title}`);
  }
}

console.log('\n=== PERFORMANCE OPPORTUNITIES ===');
for (const [key, audit] of Object.entries(report.audits)) {
  if (audit.details && audit.details.type === 'opportunity') {
    console.log(`${key}: ${audit.title} - ${audit.displayValue || ''}`);
  }
}

console.log('\n=== SEO ISSUES ===');
const seoAudits = report.categories.seo.auditRefs;
for (const ref of seoAudits) {
  const audit = report.audits[ref.id];
  if (audit.score !== null && audit.score < 1) {
    console.log(`${ref.id}: ${audit.title} - score: ${audit.score}`);
  }
}
