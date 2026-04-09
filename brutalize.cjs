const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function brutalizeFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            brutalizeFiles(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;

            // Remove all border radius
            content = content.replace(/borderRadius:\s*['"][^'"]+['"]/g, "borderRadius: '0'");
            
            // Make borders 2px thick
            content = content.replace(/border:\s*['"]1px solid/g, "border: '2px solid");
            content = content.replace(/borderBottom:\s*['"]1px solid/g, "borderBottom: '2px solid");
            content = content.replace(/borderTop:\s*['"]1px solid/g, "borderTop: '2px solid");
            content = content.replace(/borderRight:\s*['"]1px solid/g, "borderRight: '2px solid");
            content = content.replace(/borderLeft:\s*['"]1px solid/g, "borderLeft: '2px solid");
            
            // Replace any string '8px', '12px', '10px' in borderRadius with '0' if missed
            // (The regex above should catch most)

            if (content !== original) {
                fs.writeFileSync(fullPath, content);
                console.log(`Brutalized ${fullPath}`);
            }
        }
    }
}

brutalizeFiles(srcDir);
