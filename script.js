const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const clearAllBtn = document.querySelector("#clear-all");

const STORAGE_KEY = "quicknotes";

let notes = [];

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function loadNotes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    notes = saved ? JSON.parse(saved) : [];
  } catch (error) {
    notes = [];
  }
}

function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

function validate(text) {
  if (text === "") {
    return "Please type a note first.";
  }
  if (text.length > 200) {
    return "Notes must be 200 characters or fewer.";
  }
  return "";
}

function getVisibleNotes() {
  const term = searchInput.value.trim().toLowerCase();
  if (term === "") {
    return notes;
  }
  return notes.filter(function (note) {
    return note.text.toLowerCase().includes(term);
  });
}

function deleteNote(id) {
  notes = notes.filter(function (note) {
    return note.id !== id;
  });
  saveNotes();
  render();
  updateCount();
}

function render() {
  notesList.textContent = "";

  const visible = getVisibleNotes();

  if (visible.length === 0 && searchInput.value.trim() !== "") {
    const empty = document.createElement("li");
    empty.className = "empty-message";
    empty.textContent = "No notes match your search.";
    notesList.append(empty);
    return;
  }

  visible.forEach(function (note) {
    const item = document.createElement("li");
    item.className = `note category-${note.category}`;

    const text = document.createElement("p");
    text.className = "note-text";
    text.textContent = note.text;

    const meta = document.createElement("div");
    meta.className = "note-meta";

    const label = document.createElement("span");
    label.className = "category-label";
    label.textContent = note.category;

    const date = document.createElement("span");
    date.textContent = note.createdAt;

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "secondary delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      deleteNote(note.id);
    });

    meta.append(label, date, deleteBtn);
    item.append(text, meta);
    notesList.append(item);
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = noteInput.value.trim();
  const problem = validate(text);

  if (problem) {
    errorMessage.textContent = problem;
    return;
  }

  errorMessage.textContent = "";

  const note = {
    id: Date.now(),
    text: text,
    category: categorySelect.value,
    createdAt: new Date().toLocaleString(),
  };

  notes.unshift(note);
  noteInput.value = "";
  saveNotes();
  render();
  updateCount();
});

searchInput.addEventListener("input", render);

clearAllBtn.addEventListener("click", function () {
  if (notes.length === 0) {
    return;
  }
  if (confirm("Delete all notes?")) {
    notes = [];
    saveNotes();
    render();
    updateCount();
  }
});

loadNotes();
render();
updateCount();