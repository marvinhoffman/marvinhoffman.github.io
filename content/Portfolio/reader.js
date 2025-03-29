const storyContent = document.getElementById("storyContent");

function getStoryFromQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get("story");
}

async function loadStory() {
  const storyFile = getStoryFromQuery();
  if (!storyFile) {
    storyContent.innerHTML = "<p class='text-red-500'>No story specified.</p>";
    return;
  }

  try {
    const res = await fetch(storyFile);
    const html = await res.text();
    storyContent.innerHTML = html;
  } catch (err) {
    storyContent.innerHTML = "<p class='text-red-500'>Unable to load story.</p>";
    console.error(err);
  }
}

loadStory();