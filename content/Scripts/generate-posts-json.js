const fs = require("fs");
const path = require("path");

// Folder where your .md files live
const postsDir = path.join(__dirname, "Posts");
const outputPath = path.join(postsDir, "posts.json");

// Utility to convert filenames into titles
const formatTitle = (filename) =>
  filename
    .replace(/\.md$/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

// Read all .md files in the directory
const files = fs.readdirSync(postsDir).filter((file) => file.endsWith(".md"));

// Build the posts array
const posts = files.map((file) => ({
  title: formatTitle(file),
  file,
}));

// Write the JSON output
fs.writeFileSync(outputPath, JSON.stringify(posts, null, 2));

console.log(`✅ posts.json generated with ${posts.length} post(s)!`);