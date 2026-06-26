const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  "src/pages/TransactionsPage.jsx",
  "src/pages/SariChat.jsx",
  "src/pages/ProfilePage.jsx",
  "src/pages/ProductDetailsPage.jsx",
  "src/pages/InsightsPage.jsx",
  "src/pages/EditProductPage.jsx",
  "src/pages/AddTransactionPage.jsx",
  "src/pages/AddProductPage.jsx",
  "src/pages/3_InventoryPage.jsx",
  "src/pages/2_Homepage.jsx",
  "src/components/AdjustStockModal.jsx"
];

for (const relPath of filesToUpdate) {
  const fullPath = path.join(__dirname, relPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${fullPath}`);
    continue;
  }
  
  let content = fs.readFileSync(fullPath, 'utf-8');
  
  // Calculate relative path to utils/api
  const dirParts = relPath.split('/');
  const depth = dirParts.length - 2; // src/pages/file.jsx -> 1 level up from pages
  let relImportPath = '../utils/api.js';
  if (depth === 2) {
    relImportPath = '../../utils/api.js';
  }
  
  // Check if already imported
  if (!content.includes('apiFetch')) {
    // Add import statement at the top after the last import
    const importStatement = `import { apiFetch } from "${relImportPath}";\n`;
    
    // Find the end of the last import
    const importRegex = /import .* from ['"].*['"];\n/g;
    let match;
    let lastImportIndex = 0;
    while ((match = importRegex.exec(content)) !== null) {
      lastImportIndex = match.index + match[0].length;
    }
    
    if (lastImportIndex === 0) {
      // No imports found, prepend
      content = importStatement + content;
    } else {
      content = content.slice(0, lastImportIndex) + importStatement + content.slice(lastImportIndex);
    }
  }
  
  // Replace fetch( with apiFetch(
  content = content.replace(/fetch\(/g, 'apiFetch(');
  
  fs.writeFileSync(fullPath, content, 'utf-8');
  console.log(`Updated ${relPath}`);
}
