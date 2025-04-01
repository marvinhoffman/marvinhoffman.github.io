document.addEventListener("DOMContentLoaded", () => {
    const postList = document.getElementById("post-list");
    const postContent = document.getElementById("post-content");
  
    // Fetch posts.json from shared data folder
    fetch("../../data/posts.json")
      .then(res => res.json())
      .then(posts => {
        posts.forEach(post => {
          const li = document.createElement("li");
          const link = document.createElement("a");
          link.href = "#";
          link.textContent = post.title;
          link.className = "hover:underline";
          link.addEventListener("click", (e) => {
            e.preventDefault();
            // Load the Markdown file (already published without frontmatter)
            loadPost(`./${post.file}`);
          });
          li.appendChild(link);
          postList.appendChild(li);
        });
  
        if (posts.length > 0) {
          loadPost(`./${posts[0].file}`);
        }
      })
      .catch(err => {
        postList.innerHTML = "<p class='text-red-600'>Failed to load posts list.</p>";
        console.error("Error loading posts.json:", err);
      });
  
    // Load and render the selected Markdown file as HTML
    function loadPost(path) {
      fetch(path)
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP ${res.status} - ${res.statusText}`);
          }
          return res.text();
        })
        .then(md => {
            const html = marked.parse(md);
            //console.log("Converted HTML:", html); // Log the converted HTML
            postContent.innerHTML = html;
            window.scrollTo({ top: postContent.offsetTop - 30, behavior: "smooth" });
          })
        .catch(err => {
          postContent.innerHTML = "<p class='text-red-600'>Could not load post content.</p>";
          console.error("Error loading post:", err);
        });
    }
  });