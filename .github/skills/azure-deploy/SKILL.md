---
name: azure-deploy
description: Deploy AI-Native tutorial to Azure Static Web Apps. Use when publishing to production, deploying updates, troubleshooting deployment issues, or checking deployment status. Includes pre-flight checks, build validation, and deployment commands for the learn-ai-first-dev app.
allowed-tools: Bash(npm:*) Bash(az:*) Bash(swa:*)
---

# Azure Static Web Apps Deployment

This skill handles deployment of the AI-Native Development Tutorial to Azure Static Web Apps.

## When to Use This Skill

- When deploying updates to production
- When troubleshooting deployment failures
- When checking deployment status
- When setting up deployment for the first time
- When validating the build before deployment

## Deployment Information

See `AGENTS.md` → Deployment section for app name, resource group, production URL, and basic deploy commands.

## Quick Deploy (PowerShell)

```powershell
npm run build; $token = az staticwebapp secrets list --name learn-ai-first-dev --resource-group tutorials --query "properties.apiKey" -o tsv; swa deploy ./dist --deployment-token $token --env production
```

## Prerequisites

- Azure CLI (`az login`)
- SWA CLI (`npm install -g @azure/static-web-apps-cli`)
- Node.js 20+

## Deployment Process

Follow `AGENTS.md` → Manual Deployment steps: build → get token → deploy → verify.

## Troubleshooting

### "Not logged in to Azure"

```bash
az login
```

Then retry deployment.

### "Resource not found"

Verify resource group and app name:
```bash
az staticwebapp list --resource-group tutorials --output table
```

### "Build fails"

1. Check TypeScript errors:
   ```bash
   npx tsc --noEmit
   ```

2. Check for missing dependencies:
   ```bash
   npm install
   ```

3. Clear cache and rebuild:
   ```bash
   rm -rf node_modules dist
   npm install
   npm run build
   ```

### "Deployment succeeds but site not updated"

1. Clear browser cache (hard refresh)
2. Check deployment URL matches expectation
3. Verify you deployed to correct environment (`production`)

### "SWA CLI not found"

```bash
npm install -g @azure/static-web-apps-cli
```

### "Permission denied"

Ensure your Azure account has Contributor access to the resource group.

## Rollback

If deployment causes issues:

1. Check recent deployments in Azure Portal
2. Navigate to the Static Web App resource
3. Go to "Environments" or "Deployments"
4. Redeploy a previous version if available

Or redeploy from a known-good commit:
```bash
git checkout <known-good-commit>
npm run build
swa deploy ./dist --deployment-token $token --env production
git checkout main
```

## Deployment Checklist

Before every deployment:

- [ ] All changes committed and pushed
- [ ] `npm run build` succeeds
- [ ] Local preview works (`npm run preview`)
- [ ] No console errors in browser
- [ ] TypeScript compiles without errors
- [ ] Key pages load correctly

After deployment:

- [ ] Production URL loads
- [ ] Navigation works
- [ ] No console errors
- [ ] Changes are visible (hard refresh)

## CI/CD Note

GitHub Actions hosted runners are disabled for this repository. All deployments must be done manually using this process.

## Related Commands

```bash
# Check Azure Static Web App status
az staticwebapp show --name learn-ai-first-dev --resource-group tutorials

# List all Static Web Apps in resource group
az staticwebapp list --resource-group tutorials --output table

# Check deployment environments
az staticwebapp environment list --name learn-ai-first-dev --resource-group tutorials

# View app settings
az staticwebapp appsettings list --name learn-ai-first-dev --resource-group tutorials
```
