// ===============================
// Global Variables
// ===============================

// Array of all story objects loaded from stories.json
let stories = [];

// List of tags currently selected by the user
let selectedTags = [];


// ===============================
// Load Stories from stories.json
// ===============================

async function loadStories() {
  try {
    const response = await fetch('stories.json');
    stories = await response.json();
    renderTagButtons();           // Generate tag filter buttons
    filterAndRenderStories();     // Initially show all stories
  } catch (error) {
    console.error("Failed to load stories:", error);
  }
}


// ===============================
// Render Tag Filter Buttons
// ===============================

function renderTagButtons() {
  const tagSet = new Set();

  // Collect all unique tags from all stories
  stories.forEach(story => {
    if (Array.isArray(story.tags)) {
      story.tags.forEach(tag => tagSet.add(tag));
    }
  });

  const tagFilterGroup = document.getElementById("tagFilterGroup");
  tagFilterGroup.innerHTML = "";

  // Create a button for each tag
  tagSet.forEach(tag => {
    const button = document.createElement("button");
    button.textContent = tag;
    button.className = "tag-btn bg-gray-300 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-[#f4d1a1] hover:text-[#4b2e2e]";
    button.dataset.tag = tag;

    // Toggle selection state on click
    button.addEventListener("click", () => {
      toggleTag(tag, button);
    });

    tagFilterGroup.appendChild(button);
  });
}


// ===============================
// Toggle Tag Selection and Filter
// ===============================

function toggleTag(tag, button) {
  const index = selectedTags.indexOf(tag);

  if (index > -1) {
    // Deselect the tag
    selectedTags.splice(index, 1);
    button.classList.remove("bg-[#f4d1a1]", "text-[#4b2e2e]");
    button.classList.add("bg-gray-300", "text-gray-700");
  } else {
    // Select the tag
    selectedTags.push(tag);
    button.classList.remove("bg-gray-300", "text-gray-700");
    button.classList.add("bg-[#f4d1a1]", "text-[#4b2e2e]");
  }

  filterAndRenderStories(); // Re-render based on new tag selection
}


// ===============================
// Filter Stories and Render Cards
// ===============================

function filterAndRenderStories() {
  const filtered = stories.filter(story => {
    if (selectedTags.length === 0) return true; // No filters = show all
    return selectedTags.every(tag => story.tags?.includes(tag));
  });

  renderStoryCards(filtered);
}


// ===============================
// Render Story Cards to the Page
// ===============================

function renderStoryCards(filteredStories) {
  const container = document.getElementById("cardsContainer");
  container.innerHTML = "";

  filteredStories.forEach(story => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-lg shadow-md p-4 flex flex-col cursor-pointer hover:shadow-lg transition";

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

    // Add everything to the card
    card.appendChild(title);
    card.appendChild(summary);
    card.appendChild(tagContainer);

    // On click, open the story viewer with iframe
    card.addEventListener("click", () => openStoryViewer(story.link));

    container.appendChild(card);
  });
}


// ===============================
// Open Story in Embedded Viewer (Fixed height iframe)
// ===============================

function openStoryViewer(link) {
  const iframe = document.getElementById("storyFrame");
  iframe.src = link;

  // Show the story viewer and hide main content
  document.getElementById("storyViewer").classList.remove("hidden");
  document.querySelector("main").classList.add("hidden");
}


// ===============================
// Close Story Viewer
// ===============================

document.getElementById("closeViewer").addEventListener("click", () => {
  document.getElementById("storyViewer").classList.add("hidden");
  document.querySelector("main").classList.remove("hidden");
  document.getElementById("storyFrame").src = ""; // Optional: unload story
});


// ===============================
// Clear All Selected Tags
// ===============================

document.getElementById("clearTags").addEventListener("click", () => {
  selectedTags = [];
  renderTagButtons();        // Reset button visuals
  filterAndRenderStories();  // Show all stories
});


// ===============================
// Initialize on Page Load
// ===============================

loadStories();