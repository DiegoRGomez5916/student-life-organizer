const addBtn = document.getElementById("addNoteBtn");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("site-search");
const deleteBtn = document.getElementById("deleteBtn");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
const notesGrid = document.getElementById("notesGrid");

const noteForm = document.getElementById("noteForm");
const noteNameInput = document.getElementById("noteNameInput");
const createNoteBtn = document.getElementById("createNoteBtn");
const cancelNoteBtn = document.getElementById("cancelNoteBtn");

const notes = JSON.parse(localStorage.getItem("notes")) || [];
let deleteMode = false;
let currentKeyword = "";

function renderNotes(list) {
  notesGrid.innerHTML = "";

  list.forEach((note) => {
    const item = document.createElement("div");
    item.className = "note-item";

    const card = document.createElement("div");
    card.className = "note-card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");

    const title = document.createElement("div");
    title.className = "note-title";
    title.textContent = note.name;

    card.appendChild(title);
    item.appendChild(card);

    card.classList.add("clickable");

    card.addEventListener("click", () => {
      if (deleteMode) {
        note.selected = !note.selected;
        updateView();
        return;
      }

      window.location.href = `./noteEditor.html?id=${encodeURIComponent(note.id)}`;
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        card.click();
      }
    });

    if (deleteMode) {
      const checkArea = document.createElement("div");
      checkArea.className = "check-area-outside";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = note.selected;

      checkbox.addEventListener("change", () => {
        note.selected = checkbox.checked;
      });

      checkArea.appendChild(checkbox);
      item.appendChild(checkArea);
    }

    notesGrid.appendChild(item);
  });
}

function getFilteredNotes() {
  if (currentKeyword === "") {
    return notes;
  }

  return notes.filter((note) =>
    note.name.toLowerCase().includes(currentKeyword)
  );
}

function updateView() {
  renderNotes(getFilteredNotes());
}

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function normalizeNotes() {
  let changed = false;

  notes.forEach((note, index) => {
    if (!note.id) {
      note.id = `${Date.now()}-${index}`;
      changed = true;
    }

    if (note.content === undefined) {
      note.content = "";
      changed = true;
    }

    if (note.selected === undefined) {
      note.selected = false;
      changed = true;
    }
  });

  if (changed) {
    saveNotes();
  }
}

function resetSelections() {
  notes.forEach((note) => {
    note.selected = false;
  });
}

function openNoteForm() {
  noteForm.classList.add("show");
  noteNameInput.value = "";
  noteNameInput.focus();
}

function closeNoteForm() {
  noteForm.classList.remove("show");
  noteNameInput.value = "";
}

addBtn.addEventListener("click", () => {
  deleteMode = false;
  confirmDeleteBtn.style.display = "none";
  resetSelections();
  updateView();
  openNoteForm();
});

createNoteBtn.addEventListener("click", () => {
  const trimmedName = noteNameInput.value.trim();

  if (trimmedName === "") {
    alert("Input title");
    return;
  }

  const newNote = {
    id: Date.now().toString(),
    name: trimmedName,
    content: "",
    selected: false
  };

  notes.push(newNote);

  saveNotes();
  window.location.href = `./noteEditor.html?id=${encodeURIComponent(newNote.id)}`;
});

cancelNoteBtn.addEventListener("click", () => {
  closeNoteForm();
});

noteNameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    createNoteBtn.click();
  }
});

function searchNotes() {
  currentKeyword = searchInput.value.trim().toLowerCase();
  updateView();
}

searchBtn.addEventListener("click", searchNotes);
searchInput.addEventListener("input", searchNotes);

deleteBtn.addEventListener("click", () => {
  deleteMode = true;
  confirmDeleteBtn.style.display = "inline-block";
  updateView();
});

confirmDeleteBtn.addEventListener("click", () => {
  for (let i = notes.length - 1; i >= 0; i--) {
    if (notes[i].selected) {
      notes.splice(i, 1);
    }
  }

  saveNotes();
  deleteMode = false;
  confirmDeleteBtn.style.display = "none";
  resetSelections();
  updateView();
});

normalizeNotes();
updateView();
