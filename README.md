# playwright-fw-e2e
This is the project for building PW Automation E2E Framework

<!-- npx cucumber-js --exit    -->
# npx cucumber-js --tags "@MultiUser" --exit --format html:cucumber-report.html --retry 1
# npx cucumber-js --tags "@InValid"  --parallel 2  --exit --format html:cucumber-report.html
<!-- npx cucumber-js features/BDD_E2E_EShoppingExperience.feature --parallel 2  --exit --format html:cucumber-report.html -->

# Azure
# First get the storage account resource ID
az storage account show \
  --name "pwstrgrrd4320" \
  --resource-group "rrd" \
  --query id -o tsv





//

  az role assignment create \
  --assignee "a5730766-84f8-4d8e-bbed-54f85d7ff" \
  --role "Storage Blob Data Contributor" \
  --scope "$(az storage account show --name pwstrgrrd9171 --resource-group rrd --query id -o tsv)"