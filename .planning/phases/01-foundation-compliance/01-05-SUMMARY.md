---
phase: 01-foundation-compliance
plan: 05
subsystem: deployment
tags: [deployment, nginx, digitalocean, production]
dependency_graph:
  requires:
    - "01-01: Nuxt 4 static site build capability"
  provides:
    - "Production deployment infrastructure"
    - "Public URL for testing"
  affects:
    - "All subsequent plans requiring live testing"
tech_stack:
  added: []
  patterns:
    - "Static site serving with Nginx"
    - "Deployment automation via shell script"
    - "Non-root user with sudo for deployments"
key_files:
  created:
    - "/var/www/campaign-site/ (deployed site directory)"
    - "/etc/nginx/sites-available/campaign-site (nginx config)"
    - "/home/deploy-user/deploy.sh (deployment script)"
    - "/etc/sudoers.d/deploy-user (sudo configuration)"
  modified:
    - "Remote server: DigitalOcean Droplet configuration"
decisions:
  - "Used HTTPS clone for GitHub repo (public repo, no SSH key setup required for deploy-user)"
  - "master branch as primary deployment target"
  - "deploy-user with limited sudo for nginx reload only"
  - "Delayed SSL configuration (can be added when domain is ready)"
metrics:
  duration: "14 minutes"
  completed_date: "2026-02-24"
---

# Phase 1 Plan 5: Production Deployment Setup Summary

**One-liner:** Static Nuxt 4 site deployed to DigitalOcean Droplet with Nginx serving on port 80, deployment automation via shell script.

## Deployment Overview

The campaign site is now live at **http://159.203.104.116** with:
- Nginx 1.26.3 serving pre-generated static files
- Automated deployment script for updates
- Proper file permissions and security headers
- deploy-user with limited sudo access

## Server Details

| Property | Value |
|----------|-------|
| Droplet IP | 159.203.104.116 |
| OS | Ubuntu 25.04 (plucky) |
| Node.js | v20.19.4 |
| npm | 10.8.2 |
| Nginx | 1.26.3 |
| Web Root | /var/www/campaign-site/.output/public |
| Deploy User | deploy-user (uid 1000) |

## Nginx Configuration

Located at `/etc/nginx/sites-available/campaign-site`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name 159.203.104.116;

    root /var/www/campaign-site/.output/public;
    index index.html;

    gzip on;
    gzip_types text/plain text/css text/xml text/javascript
               application/javascript application/json;

    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        try_files $uri $uri/ /index.html;
    }

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

## Deployment Process

### Manual Deployment

SSH into the droplet and run:
```bash
ssh -i ~/.ssh/id_ed25519_nopass root@159.203.104.116
sudo -u deploy-user /home/deploy-user/deploy.sh
```

### Deployment Script

Located at `/home/deploy-user/deploy.sh`:
1. Pulls latest changes from origin/master
2. Runs `npm install`
3. Builds static site with `npm run generate`
4. Sets proper permissions
5. Reloads Nginx

### Quick Commands

```bash
# SSH to droplet
ssh root@159.203.104.116

# Check Nginx status
systemctl status nginx

# View Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# Test Nginx config
nginx -t

# Reload Nginx
systemctl reload nginx
```

## Deviations from Plan

### 1. GitHub Authentication (Rule 3 - Blocking Issue)
- **Found during:** Task 5 (Clone GitHub repository)
- **Issue:** deploy-user did not have SSH keys configured for GitHub access. SSH clone failed with "Permission denied (publickey)"
- **Fix:** Used HTTPS clone instead of SSH since repository is public. No authentication required.
- **Impact:** Deployment script uses `git reset --hard origin/master` which works with HTTPS clone.

### 2. Branch Name Correction (Rule 1 - Bug)
- **Found during:** Task 9 (Testing deployment script)
- **Issue:** Deployment script initially referenced `origin/main` but repository uses `origin/master`
- **Fix:** Updated deployment script to use `origin/master`
- **Files modified:** /home/deploy-user/deploy.sh

### 3. Git Directory Ownership (Rule 3 - Blocking Issue)
- **Found during:** Task 9 (Verifying git branches)
- **Issue:** "detected dubious ownership in repository" error when running git commands as non-root
- **Fix:** Added `/var/www/campaign-site` to git safe.directory: `git config --global --add safe.directory /var/www/campaign-site`
- **Impact:** deploy-user can now run git commands

### 4. Package Installation Method (Rule 3 - Blocking Issue)
- **Found during:** Task 6 (Building the site)
- **Issue:** `npm ci` failed - package-lock.json was not in the cloned repository
- **Fix:** Used `npm install` instead of `npm ci`
- **Impact:** Slightly slower install but works correctly

## Optional Tasks (Skipped)

The following optional tasks were not completed and can be added later:

1. **SSL/HTTPS with Certbot:** Requires domain name pointed to Droplet IP. Can be added when domain is ready.
2. **GitHub Webhook Auto-deploy:** Can be configured later for continuous deployment.

## Security Notes

- deploy-user has limited sudo access: only `systemctl reload nginx`
- SSH access via `id_ed25519_nopass` key
- Security headers enabled: X-Frame-Options, X-Content-Type-Options, X-XSS-Protection
- No sensitive files (`.env`) exposed in public directory

## Verification

All success criteria met:

- [x] Nginx is installed and running
- [x] Site is accessible via Droplet IP (http://159.203.104.116)
- [x] Static files in .output/public/ are being served correctly
- [x] Deployment script successfully updates the site
- [x] Site navigation works (SPA routing via try_files)

## Self-Check: PASSED

```bash
# Site accessibility
curl -I http://159.203.104.116
# Result: HTTP/1.1 200 OK

# Nginx status
ssh root@159.203.104.116 "systemctl status nginx"
# Result: active (running)

# Site files exist
ssh root@159.203.104.116 "ls -la /var/www/campaign-site/.output/public/"
# Result: index.html, _nuxt/, sitemap.xml, robots.txt present

# Deployment script exists
ssh root@159.203.104.116 "ls -la /home/deploy-user/deploy.sh"
# Result: executable script present
```

## Next Steps

1. When domain is ready: Configure DNS A record pointing to 159.203.104.116
2. When DNS propagates: Install SSL certificate with Certbot
3. Optional: Set up GitHub webhook for auto-deployment
4. Update Nginx server_name when domain is configured
