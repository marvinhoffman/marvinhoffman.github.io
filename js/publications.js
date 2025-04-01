document.addEventListener("DOMContentLoaded", () => {
  // your fetch and render code here
  fetch("../../data/publications.json")
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("publications-list");
      data.forEach(pub => {
        const wrapper = document.createElement("div");
        wrapper.className = "w-full lg:w-[48%]";

        const card = document.createElement("div");
        card.className =
          "bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row justify-between gap-6 hover:shadow-lg transition-shadow duration-300";

        card.innerHTML = `
          <div class="flex-1">
            <h2 class="text-2xl font-semibold mb-2 text-center md:text-left">${pub.title}</h2>
            <p class="text-sm text-gray-500 mb-3 text-center md:text-left">${pub.type} &bull; ${new Date(pub.date).toLocaleDateString()}</p>
            <div class="bg-gray-50 p-4 rounded-lg mb-4">
              <p class="text-gray-700 text-left leading-relaxed">${pub.summary}</p>
            </div>
            <div class="mb-4 text-left">
              ${pub.tags.map(tag => `
                <span class="inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 mb-1 px-2.5 py-0.5 rounded-full">
                  ${tag}
                </span>`).join("")}
            </div>
          </div>
          <div class="md:flex-shrink-0 md:self-center">
            <a href="${pub.link}" target="_blank"
              class="inline-block text-white bg-[#4b2e2e] hover:bg-[#3e2626] text-sm font-medium px-5 py-2 rounded-md whitespace-nowrap">
              Read More | Purchase
            </a>
          </div>
        `;

        wrapper.appendChild(card);
        list.appendChild(wrapper);
      });
    })
    .catch(err => {
      document.getElementById("publications-list").innerHTML =
        "<p class='text-red-600'>Failed to load publications.</p>";
      console.error("Error loading publications.json:", err);
  });
});