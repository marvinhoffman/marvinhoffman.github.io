const cardsContainer = document.getElementById("cardsContainer");
const genreFilter = document.getElementById("genreFilter");
const prevPage = document.getElementById("prevPage");
const nextPage = document.getElementById("nextPage");
const pageIndicator = document.getElementById("pageIndicator");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");

let stories = [];
let filteredStories = [];
let currentPage = 1;
const itemsPerPage = 6;

async function loadStories() {
  try {
    const res = await fetch("stories.json");
    stories = await res.json();
    filteredStories = [...stories];
    render();
  } catch (err) {
    console.error("Failed to load stories:", err);
  }
}

function render() {
  cardsContainer.innerHTML = "";

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedStories = filteredStories.slice(start, end);

  paginatedStories.forEach((story) => {
    const card = document.createElement("div");
    card.className = "card bg-white shadow-md rounded-lg p-6 cursor-pointer hover:bg-gray-50";
    card.innerHTML = `
      <h2 class="text-2xl font-bold mb-2">${story.title}</h2>
      <p class="text-gray-600 mb-4">${story.summary}</p>
      <span class="text-[#9c3b1b] font-semibold hover:underline">Read Story →</span>
    `;
    card.addEventListener("click", () => {
        window.location.href = `reader.html?story=${story.link}`;
      });
    cardsContainer.appendChild(card);
  });

  const totalPages = Math.ceil(filteredStories.length / itemsPerPage);
  pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
  prevPage.disabled = currentPage === 1;
  nextPage.disabled = currentPage === totalPages;
}

function filterByGenre(genre) {
  currentPage = 1;
  filteredStories = genre === "all" ? [...stories] : stories.filter(s => s.genre === genre);
  render();
}

genreFilter.addEventListener("change", (e) => filterByGenre(e.target.value));
prevPage.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    render();
  }
});
nextPage.addEventListener("click", () => {
  const totalPages = Math.ceil(filteredStories.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    render();
  }
});

function openModal(storyPath) {
  fetch(storyPath)
    .then(res => res.text())
    .then(html => {
      modalContent.innerHTML = html;
      modal.classList.remove("hidden");
    })
    .catch(err => {
      modalContent.innerHTML = `<p class='text-red-500'>Failed to load story.</p>`;
      modal.classList.remove("hidden");
      console.error("Error loading story:", err);
    });
}

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
  modalContent.innerHTML = "";
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.classList.add("hidden");
    modalContent.innerHTML = "";
  }
});

loadStories();
