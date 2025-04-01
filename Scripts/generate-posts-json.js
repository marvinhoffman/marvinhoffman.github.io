const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

// Define directories
const storageDir = path.join(__dirname, "../content/Posts/md_staging");  // Source with frontmatter
const publishedDir = path.join(__dirname, "../content/Posts");          // Where cleaned MD files will go
const outputJsonPath = path.join(__dirname, "../data/posts.json");

// Read all markdown files from the storage folder
const files = fs.readdirSync(storageDir).filter(file => file.endsWith(".md"));

const posts = [];

// Process each Markdown file
files.forEach(file => {
  const storagePath = path.join(storageDir, file);
  const rawContent = fs.readFileSync(storagePath, "utf8");
  // Use gray-matter to parse frontmatter and content
  const { data, content: cleanContent } = matter(rawContent);

  // Build the post object using frontmatter data or fallbacks
  const post = {
    title: data.title || file.replace(/\.md$/, "").replace(/_/g, " "),
    file: file,  // same filename; you could also rename if desired
    date: data.date || fs.statSync(storagePath).mtime.toISOString(),
    pinned: !!data.pinned,
    tags: data.tags || []
  };

  posts.push(post);

  // Write the clean content (without frontmatter) to the published directory
  const publishedPath = path.join(publishedDir, file);
  fs.writeFileSync(publishedPath, cleanContent);
});

// Optionally, sort posts by date (descending order)
posts.sort((a, b) => new Date(b.date) - new Date(a.date));

// Write the posts.json file to the data folder
fs.writeFileSync(outputJsonPath, JSON.stringify(posts, null, 2));

console.log(`✅ Generated posts.json with ${posts.length} post(s) and published clean Markdown files.`);