# Pitfalls Research

**Domain:** Political Campaign Websites
**Researched:** 2025-02-23
**Confidence:** MEDIUM

## Critical Pitfalls

### Pitfall 1: Missing or Inadequate Legal Disclaimers

**What goes wrong:**
Campaign websites launch without proper FEC and state-level disclaimers, exposing the campaign to fines, legal challenges, and forced content takedowns. Missing disclaimers on donation pages, social media links, and digital advertisements are the most common violations.

**Why it happens:**
Developers treat campaign websites like standard business sites, unaware that political communications are subject to strict FEC regulations (11 CFR 110.11) and state-level requirements. Disclaimers are often added as an afterthought or delegated to non-legal staff who don't understand requirements.

**Consequences:**
- FEC fines ranging from hundreds to thousands of dollars per violation
- Takedown orders for non-compliant content during critical campaign periods
- Legal challenges that can consume campaign resources
- Negative media coverage damaging candidate credibility
- Georgia Government Transparency and Campaign Finance Commission enforcement (record $300K fine imposed on New Georgia Project for disclosure failures)

**How to avoid:**
- Create standardized disclaimer templates before any content goes live
- Include "Paid for by [Committee Name]" on every public-facing page
- Add "Authorized by [Candidate Name]" where applicable
- Ensure disclaimers are clearly visible (minimum 12-point font where required)
- Include disclaimers in ALL digital communications (emails, social posts, ads)
- Lock disclaimer templates to prevent accidental deletion
- Treat every page as a "public communication" requiring disclosure

**Warning signs:**
- No disclaimer visible above the fold on homepage
- Donation form lacks funding disclosure
- Social media feeds embedded without disclosure context
- Email signup forms without committee identification
- Inconsistent disclaimer language across pages

**Phase to address:**
**Phase 1 (Foundation)** — Legal compliance must be established before any public content is created. This cannot be deferred or added later.

---

### Pitfall 2: Deceptive Donation Practices That Erode Trust

**What goes wrong:**
Campaign donation forms use dark patterns like pre-checked recurring donation boxes, unclear fee disclosures, or buried cancellation options. This results in unexpected charges, donor complaints, and severe reputational damage.

**Why it happens:**
Pressure to maximize short-term revenue leads teams to implement "optimization" tactics that prioritize conversions over transparency. External fundraising platforms may have default settings that enable these practices.

**Consequences:**
- Massive refund obligations (Trump campaign refunded $64.3M to donors)
- Public perception of campaign "robbing" supporters
- Loss of donor trust that persists across future campaigns
- Platform investigations and regulatory scrutiny
- Media coverage portraying campaign as predatory

**How to avoid:**
- Never pre-check recurring donation boxes
- Clearly display one-time vs. recurring options
- Show processing fees transparently (or offer cover option)
- Provide easy cancellation link for recurring donations
- Send immediate confirmation emails with clear terms
- Include contact info for donation questions
- Regular audit of donation flow for dark patterns

**Warning signs:**
- Pre-selected checkboxes on donation form
- Recurring option emphasized over one-time
- No clear way to cancel recurring donations
- Fee disclosure buried in fine print
- Confirmation email missing or unclear

**Phase to address:**
**Phase 2 (Donation Integration)** — Donation UX must be designed with transparency as a core principle, not an afterthought.

---

### Pitfall 3: Accessibility Non-Compliance

**What goes wrong:**
Campaign websites fail to meet WCAG 2.1 Level AA standards, excluding voters with disabilities and exposing the campaign to ADA lawsuits. Common issues include missing alt text, poor color contrast, no keyboard navigation, and uncaptioned videos.

**Why it happens:**
Accessibility is treated as a "nice to have" rather than a requirement. Tight deadlines lead to skipped testing, and developers may lack accessibility expertise.

**Consequences:**
- ADA lawsuits (3,862 website accessibility lawsuits filed in US in 2023)
- Settlement costs ranging from thousands to millions (Harvard paid $1.575M, Target paid $6M)
- Exclusion of disabled voters from campaign information
- Negative press from disability rights organizations
- Potential for complaints to be amplified by opposition

**How to avoid:**
- Design with WCAG 2.1 AA as baseline requirement
- Include alt text for all meaningful images
- Ensure 4.5:1 minimum color contrast for text
- Make all functionality keyboard-accessible
- Caption all video content
- Test with screen readers and keyboard-only navigation
- Use semantic HTML throughout

**Warning signs:**
- Images missing alt attributes
- Text fails contrast check against background
- Dropdowns can't be opened without mouse
- Videos lack captions
- Forms can't be completed via keyboard
- No skip-to-content link for keyboard users

**Phase to address:**
**Phase 1 (Foundation)** — Accessibility must be built into the design system and component library, not retrofitted later.

---

### Pitfall 4: Mobile Donation Friction

**What goes wrong:**
Donation forms are unusable on mobile devices—tiny touch targets, complex multi-page flows, poor performance, or keyboard issues that block completion. Mobile users abandon at high rates, directly costing the campaign donations.

**Why it happens:**
Desktop-first design approach, insufficient mobile testing, and assumption that "responsive" means "mobile-optimized."

**Consequences:**
- 50%+ abandonment on mobile donation flows
- Lost revenue from mobile-first demographics
- Negative user experience shared with potential voters
- Lower overall conversion rates

**How to avoid:**
- Design donation flow mobile-first
- Minimum 44x44px touch targets (WCAG standard)
- Single-page donation forms when possible
- Test on actual mobile devices across iOS/Android
- Optimize for slow connections (compress images, minimize scripts)
- Ensure numeric inputs trigger correct keyboard type
- Target <3 second load on 4G mobile connection

**Warning signs:**
- Donation form requires horizontal scrolling on mobile
- Tap targets smaller than 44px
- More than 3 fields visible at once on mobile
- Load time exceeds 3 seconds on mobile
- Numeric field triggers full keyboard instead of number pad

**Phase to address:**
**Phase 2 (Donation Integration)** — Donation UX must be validated on real mobile devices before launch.

---

### Pitfall 5: Missing Trust Signals

**What goes wrong:**
Campaign website fails to establish credibility, appearing amateurish or suspicious. Missing contact information, no verification of claims, dated content, or anonymous posting creates doubt about legitimacy.

**Why it happens:**
Focus on message delivery without considering source credibility. Assumption that voters already know the candidate or will trust based on party affiliation alone.

**Consequences:**
- Visitors question site legitimacy
- Lower volunteer and donation conversion
- Vulnerability to misinformation attacks
- Opponent research highlighting untrustworthy presentation
- Lost persuadable voters who need reassurance

**How to avoid:**
- Display physical address and contact information prominently
- Include high-quality candidate photo and bio
- Show endorsement logos with attribution
- Link to external verification of claims (news coverage, official records)
- Regular content updates with dates
- Professional photography over stock images
- Clear committee/filing information
- Social proof (volunteer count, donation progress)

**Warning signs:**
- No physical address visible
- Copyright date is outdated
- Stock photos instead of real photos
- No way to verify claims made
- No social media links or feeds
- "About" page missing or vague

**Phase to address:**
**Phase 1 (Foundation)** — Trust elements must be designed into the site structure, not added as content later.

---

### Pitfall 6: Poor Performance Under Traffic Spikes

**What goes wrong:**
Site crashes or slows dramatically during traffic spikes (after ads, events, or news coverage). This is especially damaging for campaigns where momentum events drive surges.

**Why it happens:**
Testing only under normal load, using unoptimized hosting, or heavy third-party scripts (analytics, chat widgets) that don't scale.

**Consequences:**
- Site completely down during critical moments
- Lost donations during peak interest
- Negative perception of campaign competence
- Media coverage highlighting technical failures

**How to avoid:**
- Use static hosting or CDN (Netlify, Vercel, Cloudflare Pages)
- Optimize images (WebP format, lazy loading)
- Minimize third-party scripts
- Test with 3-5x normal traffic simulation
- Set up caching headers for static assets
- Monitor Core Web Vitals (LCP < 2.5s, INP < 200ms, CLS < 0.1)
- Have backup/overflow plan for viral moments

**Warning signs:**
- Page load exceeds 3 seconds on normal connection
- Lighthouse Performance score below 80
- More than 5 third-party scripts loading
- No CDN configured
- Database queries on page load

**Phase to address:**
**Phase 1 (Foundation)** — Hosting architecture must be chosen for scalability; performance budgets must be established upfront.

---

### Pitfall 7: Georgia-Specific Compliance Gaps

**What goes wrong:**
Campaign fails to meet Georgia Government Transparency and Campaign Finance Commission requirements, which can be stricter than federal rules. This includes contribution disclosure ($100+), occupation/employer reporting, and electronic filing requirements.

**Why it happens:**
Assumption that FEC compliance covers all requirements, or lack of familiarity with Georgia-specific rules.

**Consequences:**
- State-level fines and enforcement action
- Required remedial filings under time pressure
- Administrative costs and legal fees
- Georgia GTCFC investigation (commission actively enforcing; $300K fine example)

**How to avoid:**
- Review Georgia GTCFC requirements at ethics.ga.gov
- Report contributions/expenditures over $100 with donor name, address, occupation, employer
- File all reports electronically (no paper filings accepted)
- Meet reporting deadlines (15 days pre-election, Dec 31)
- Register upon raising or spending $500+
- Maintain records for all transactions
- Consider local disclosure requirements for Houston County offices

**Warning signs:**
- No occupation/employer fields on donation form
- No reference to Georgia GTCFC compliance
- Donation form accepts any amount without tracking
- No system for generating required reports

**Phase to address:**
**Phase 2 (Donation Integration)** — Donation system must capture all required fields from day one.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Using campaign-specific platform (NationBuilder, NGP VAN) | Faster initial setup | Platform lock-in, higher costs, limited customization | MVP only for <6 month campaign; migrate after election |
| Hardcoded policy positions | Quick content updates | Hard to maintain, no version control, no rollback | Never—use content management from day one |
| Skipping performance monitoring | Saves setup time | No visibility into issues, reactive debugging | Never—even basic monitoring prevents disasters |
| Delaying accessibility audit | Faster launch | Retrofit costs 3-5x of building in | Only if launch date is statutory deadline; fix immediately after |
| Single donation processor | Simplest integration | No backup if processor fails, limited fee comparison | Acceptable for MVP; add alternative by Phase 3 |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Donation processor (ActBlue, WinRed, Anedot) | Treating embedded form as "fully compliant" for all disclosures | Embed requires separate FEC disclaimers; processor only handles payment compliance |
| Social media feeds | Embedding without context or disclosure | Add "Paid for by..." near embedded feeds; curate content |
| Email signup (Mailchimp, etc.) | Not capturing required donor information | Capture name, address, occupation, employer for donations >$100 (Georgia requirement) |
| Analytics (GA4) | Not configuring for campaign-specific events | Track donations, volunteer signups, form completions with campaign-specific dimensions |
| Payment processing | Storing card data on campaign servers | Never store payment data; use PCI-compliant processor only |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Hero image bloat | Slow LCP, poor mobile experience | Use WebP, <200KB hero, responsive srcset | Breaks immediately on mobile |
| Third-party script overload | CLS issues, delayed interactivity | Audit and defer non-critical scripts, use script loading attributes | Breaks with 3+ analytics/chat widgets |
| Unoptimized donation form | Low conversion on mobile, slow input response | Minimal fields, proper input types, no blocking validation | Breaks under 4G or slower |
| No image optimization | Bandwidth waste, slow loading | Implement build-time optimization pipeline | Breaks with >10 images per page |
| Missing cache headers | Repeated downloads, high server costs | Set aggressive cache for static assets with versioning | Breaks at any traffic level |

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Accepting foreign donations | Federal election law violation | Implement address verification, flag international addresses for review |
| Storing donor data insecurely | Data breach, legal liability | Use compliant payment processor, never store full card numbers, encrypt PII at rest |
| No donation confirmation emails | Donor disputes, lack of records | Automate confirmation emails with transaction details and disclaimers |
| Exposing volunteer/donor data | Privacy violation, reputation damage | Limit data access, use secure backend, no public export of personal data |
| Unsecured form submissions | Data interception | Enforce HTTPS (no mixed content), validate server-side |
| Missing rate limiting | Donation form abuse, spam | Implement rate limiting on forms, CAPTCHA after threshold |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Buried donation button | Users can't find how to contribute | Sticky donate button on every page, above the fold on homepage |
| Complex volunteer form | Friction reduces signups | Minimal initial form (name, email, interest), follow up for details |
| Missing mobile navigation | Mobile users can't explore site | Hamburger menu, clear back buttons, thumb-friendly targets |
| No search on issues page | Users can't find candidate positions | Search/filter by topic, clear issue categories |
| Autoplaying video | Interrupts users, accessibility issue | User-initiated playback with clear controls |
| Popups immediately on load | Annoying, blocks content, accessibility fail | Delayed exit-intent or scroll-triggered (use sparingly) |
| Small text on mobile | Unreadable without zoom | Minimum 16px body text, proportional scaling |

## "Looks Done But Isn't" Checklist

- [ ] **Legal disclaimers:** Often missing from inner pages, embedded content, or social media links — verify every page has "Paid for by..." visible above the fold
- [ ] **Donation form:** Often missing recurring donation cancellation link, fee transparency, or Georgia-required occupation/employer fields — verify donation flow end-to-end
- [ ] **Mobile testing:** Often checked only on one device — verify on iOS and Android, multiple screen sizes, and portrait/landscape
- [ ] **Accessibility:** Often assumed due to semantic HTML — verify with screen reader testing and keyboard-only navigation
- [ ] **Performance:** Often tested only on fast connections — verify with Chrome DevTools throttling (Fast 3G)
- [ ] **Contact information:** Often generic email only — verify physical address, phone, and committee info are displayed
- [ ] **External links:** Often open in same tab, losing the user — verify external links open in new tabs
- [ ] **Form validation:** Often shows errors only after submission — verify real-time, clear error messages
- [ ] **404 page:** Often generic or missing — verify custom 404 with navigation back to site
- [ ] **Privacy policy:** Often missing boilerplate — verify privacy policy for donor/volunteer data handling

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Missing FEC disclaimers | LOW (if caught early) / MEDIUM (after complaint) | Add disclaimers to all pages immediately; review all content; file amended reports if required; document for future reference |
| Deceptive donation practices | HIGH (reputational damage lasts) | Issue refunds to affected donors; public apology/transparency statement; redesign donation flow with external UX audit |
| ADA accessibility lawsuit | VERY HIGH | Legal settlement; complete site remediation; ongoing monitoring; VPAT documentation; possible damages |
| Site crash during traffic spike | MEDIUM | Emergency scaling plan; migrate to static/CDN hosting; implement caching; load testing; apology to affected users |
| Georgia compliance gap | MEDIUM | File required reports with late filing explanation; pay penalties; update donation forms; implement reporting system |
| Low mobile donation conversion | MEDIUM | Redesign mobile donation UX; A/B test new flow; optimize images; reduce form fields |
| Trust signal deficit | LOW-MEDIUM | Add contact info, real photos, endorsements; update content regularly; professional design refresh |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Missing FEC disclaimers | Phase 1 (Foundation) | Legal review of all pages before launch; automated scan for disclaimer text |
| Georgia compliance gaps | Phase 2 (Donation Integration) | Compare donation form fields against Georgia GTCFC requirements; test data export |
| Deceptive donation practices | Phase 2 (Donation Integration) | UX audit focusing on dark patterns; external review of donation flow |
| Accessibility non-compliance | Phase 1 (Foundation) | Automated accessibility scan (axe, WAVE); manual keyboard testing; screen reader testing |
| Mobile donation friction | Phase 2 (Donation Integration) | Real-device testing on iOS/Android; load time testing on 4G; touch target audit |
| Missing trust signals | Phase 1 (Foundation) | Content audit for contact info, photos, endorsements; external credibility review |
| Performance under load | Phase 1 (Foundation) | Lighthouse Performance audit; load testing with simulated traffic; Core Web Vitals monitoring |
| Security mistakes | Phase 2 (Donation Integration) | Security audit of payment flow; data handling review; penetration testing if handling data |

## Phase-Specific Warnings

### Phase 1: Foundation
**Critical risks:** Legal disclaimers, accessibility foundation, performance architecture
**Mitigation:** Create disclaimer component library before any pages; establish WCAG 2.1 AA as non-negotiable design standard; choose scalable hosting from day one

### Phase 2: Donation Integration
**Critical risks:** Deceptive practices, Georgia compliance, mobile UX
**Mitigation:** External UX review of donation flow; Georgia GTCFC requirements checklist; mandatory real-device mobile testing

### Phase 3: Content & Features
**Critical risks:** Missing trust signals, content accessibility
**Mitigation:** Content must meet trust signal checklist; all new content validated for accessibility before publish

## Sources

- FEC regulations on digital disclaimers (11 CFR 110.11) — MEDIUM confidence
- Georgia Government Transparency and Campaign Finance Commission requirements (ethics.ga.gov) — MEDIUM confidence
- ADA website litigation trends (3,862 lawsuits in 2023) — MEDIUM confidence
- WCAG 2.1 Level AA requirements — HIGH confidence (official standard)
- Campaign donation deception cases (Trump $64.3M refunds, WinRed/ActBlue foreign donation concerns) — MEDIUM confidence
- Mobile performance best practices (Core Web Vitals) — HIGH confidence
- Georgia GTCFC enforcement ($300K New Georgia Project fine) — LOW confidence (single source, verify with official commission records)

---
*Pitfalls research for: Political Campaign Websites (Houston County, GA context)*
*Researched: 2025-02-23*
