const fs = require('fs');

const sizes = [
  { name: 'Desktop 1920x1080', file: './prod_audit_desktop_1920.report.json' },
  { name: 'Mobile 390x844', file: './prod_audit_mobile_390.report.json' },
  { name: 'Small Mobile 375x667', file: './prod_audit_small_mobile_375.report.json' },
  { name: 'Tablet 768x1024', file: './prod_audit_tablet_768.report.json' },
];

console.log('=== PRODUCTION BUILD SCORES ===\n');

for (const size of sizes) {
  try {
    const report = JSON.parse(fs.readFileSync(size.file, 'utf8'));
    const perf = Math.floor(report.categories.performance.score * 100);
    const a11y = Math.floor(report.categories.accessibility.score * 100);
    const bp = Math.floor(report.categories['best-practices'].score * 100);
    const seo = Math.floor(report.categories.seo.score * 100);

    console.log(`${size.name}:`);
    console.log(`  Performance: ${perf}/100 ${perf >= 90 ? '✅' : '❌'}`);
    console.log(`  Accessibility: ${a11y}/100 ${a11y >= 90 ? '✅' : '❌'}`);
    console.log(`  Best Practices: ${bp}/100 ${bp >= 90 ? '✅' : '❌'}`);
    console.log(`  SEO: ${seo}/100 ${seo >= 90 ? '✅' : '❌'}`);
    console.log('');

    // Show Core Web Vitals
    const lcp = report.audits['largest-contentful-paint'];
    const tbt = report.audits['total-blocking-time'];
    const cls = report.audits['cumulative-layout-shift'];

    console.log(`  Core Web Vitals:`);
    console.log(`    LCP: ${lcp.displayValue} (${lcp.score >= 0.9 ? '✅' : '❌'})`);
    console.log(`    TBT: ${tbt.displayValue} (${tbt.score >= 0.9 ? '✅' : '❌'})`);
    console.log(`    CLS: ${cls.displayValue} (${cls.score >= 0.9 ? '✅' : '❌'})`);
    console.log('');
  } catch (e) {
    console.log(`${size.name}: Error reading file - ${e.message}`);
  }
}

// Show SEO issues for Desktop
console.log('\n=== SEO ISSUES (Desktop) ===');
const desktopReport = JSON.parse(fs.readFileSync('./prod_audit_desktop_1920.report.json', 'utf8'));
const seoAudits = desktopReport.categories.seo.auditRefs;
for (const ref of seoAudits) {
  const audit = desktopReport.audits[ref.id];
  if (audit.score !== null && audit.score < 0.9) {
    console.log(`${ref.id}: ${audit.title} - score: ${audit.score}`);
  }
}
