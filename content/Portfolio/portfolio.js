let stories = [];
let selectedTags = [];

async function loadStories() {
  try {
    const response = await fetch('stories.json');
    stories = await response.json();
    renderTagButtons();
    filterAndRenderStories();
  } catch (error) {
    console.error("Failed to load stories:", error);
  }
}

function renderTagButtons() {
  const tagSet = new Set();
  stories.forEach(story => {
    if (Array.isArray(story.tags)) {
      story.tags.forEach(tag => tagSet.add(tag));
    }
  });

  const tagFilterGroup = document.getElementById("tagFilterGroup");
  tagFilterGroup.innerHTML = "";

  tagSet.forEach(tag => {
    const button = document.createElement("button");
    button.textContent = tag;
    button.className = "tag-btn bg-gray-300 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-[#f4d1a1] hover:text-[#4b2e2e]";
    button.dataset.tag = tag;

    button.addEventListener("click", () => {
      toggleTag(tag, button);
    });

    tagFilterGroup.appendChild(button);
  });
}

function toggleTag(tag, button) {
  const index = selectedTags.indexOf(tag);
  if (index > -1) {
    selectedTags.splice(index, 1);
    button.classList.remove("bg-[#f4d1a1]", "text-[#4b2e2e]");
    button.classList.add("bg-gray-300", "text-gray-700");
  } else {
    selectedTags.push(tag);
    button.classList.remove("bg-gray-300", "text-gray-700");
    button.classList.add("bg-[#f4d1a1]", "text-[#4b2e2e]");
  }

  filterAndRenderStories();
}

function filterAndRenderStories() {
  const filtered = stories.filter(story => {
    if (selectedTags.length === 0) return true;
    return selectedTags.every(tag => story.tags?.includes(tag));
  });

  renderStoryCards(filtered);
}

function renderStoryCards(filteredStories) {
  const container = document.getElementById("cardsContainer");
  container.innerHTML = "";

  filteredStories.forEach(story => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-lg shadow-md p-4 flex flex-col";

    const title = document.createElement("h3");
    title.className = "text-xl font-bold mb-2";
    title.textContent = story.title;

    const summary = document.createElement("p");
    summary.className = "text-gray-700 mb-2";
    summary.textContent = story.summary;

    const tagContainer = document.createElement("div");
    tagContainer.className = "flex flex-wrap gap-1 mb-2";
    (story.tags || []).forEach(tag => {
      const tagEl = document.createElement("span");
      tagEl.className = "inline-block bg-[#f4d1a1] text-[#4b2e2e] text-xs font-semibold px-2 py-1 rounded-full";
      tagEl.textContent = tag;
      tagContainer.appendChild(tagEl);
    });

    const link = document.createElement("a");
    link.href = story.link;
    link.className = "mt-auto text-[#9c3b1b] font-semibold hover:underline";
    link.textContent = "Read more →";

    card.appendChild(title);
    card.appendChild(summary);
    card.appendChild(tagContainer);
    card.appendChild(link);
    container.appendChild(card);
  });
}

document.getElementById("clearTags").addEventListener("click", () => {
  selectedTags = [];
  renderTagButtons();
  filterAndRenderStories();
});

loadStories();
