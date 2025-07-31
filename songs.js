const songs = [
  { title: "Chitty Chitty Bang Bang", artist: "Lee Hyori", tags: ["Kpop", "Energetic", "Female Vocal"] },
  { title: "數到十", artist: "苦苦", tags: ["Mandopop", "Emotional", "Ballad"] },
  { title: "小幸運", artist: "田馥甄", tags: ["Mandopop", "Female Vocal", "Romantic"] }
];

const searchBar = document.getElementById('searchBar');
const tagsContainer = document.getElementById('tags');
const songsContainer = document.getElementById('songs');

let activeTags = new Set();

function renderTags() {
  const allTags = [...new Set(songs.flatMap(song => song.tags))];
  tagsContainer.innerHTML = "";
  allTags.forEach(tag => {
    const tagEl = document.createElement('span');
    tagEl.className = 'tag';
    tagEl.textContent = tag;
    tagEl.onclick = () => {
      if (activeTags.has(tag)) activeTags.delete(tag);
      else activeTags.add(tag);
      renderTags();
      renderSongs();
    };
    if (activeTags.has(tag)) tagEl.classList.add('active');
    tagsContainer.appendChild(tagEl);
  });
}

function renderSongs() {
  const query = searchBar.value.toLowerCase();
  songsContainer.innerHTML = "";
  songs
    .filter(song =>
      (song.title.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query)) &&
      (activeTags.size === 0 || song.tags.some(tag => activeTags.has(tag)))
    )
    .forEach(song => {
      const div = document.createElement('div');
      div.className = 'song';
      div.innerHTML = `<strong>${song.title}</strong> - ${song.artist} <br><small>${song.tags.join(", ")}</small>`;
      songsContainer.appendChild(div);
    });
}

searchBar.addEventListener('input', renderSongs);

renderTags();
renderSongs();
