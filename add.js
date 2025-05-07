import fs from 'fs';
import { exec } from 'child_process';

// File to modify
const fileName = 'commit_boost22.txt';
let counter = 0;

// Function to modify the file
function modifyFile() {
  counter++;
  const content = `Boost Commit #${counter}\n`;

  // Append content to the file
  fs.appendFile(fileName, content, (err) => {
    if (err) {
      console.error('Error modifying file:', err);
      return;
    }
    console.log(`Modified file: ${content.trim()}`);

    // Stage and commit the changes
    exec(`git add ${fileName} && git commit -m "Auto Commit: file change detected #${counter}" && git push`, (err, stdout, stderr) => {
      if (err) {
        console.error('Error committing changes:', stderr);
        return;
      }
      console.log(`Committed: Auto Commit #${counter}`);
    });
  });
}

// Run every 5 seconds (adjust as needed)
setInterval(modifyFile, 5000);
