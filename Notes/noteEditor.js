
const editorTitleInput = document.getElementById("editorTitleInput");
const editorPages = document.getElementById("editorPages");
const addPageBtn = document.getElementById("addPageBtn");
const deletePageBtn = document.getElementById("deletePageBtn");
const saveNoteBtn = document.getElementById("saveNoteBtn");

const params = new URLSearchParams(window.location.search);
const noteId = params.get("id");

let notes = JSON.parse(localStorage.getItem("notes")) || [];
let currentNote = notes.find((note) => note.id === noteId);
let currentPageIndex = 0;

if (!currentNote) {
  alert("Note not found");
  window.location.href = "./viewNotes.html";
} else {
  if (!Array.isArray(currentNote.pages) || currentNote.pages.length === 0) {
    currentNote.pages = [currentNote.content || ""];
  }

  editorTitleInput.value = currentNote.name || "";
  renderPages();
}

function renderPages() {
  editorPages.innerHTML = "";

  currentNote.pages.forEach((pageContent, index) => {
    const pageWrapper = document.createElement("div");
    pageWrapper.className = "note-page";
    pageWrapper.dataset.pageIndex = index;

    const pageLabel = document.createElement("div");
    pageLabel.className = "note-page-label";
    pageLabel.textContent = `${index + 1}/${currentNote.pages.length}`;

    const textarea = document.createElement("textarea");
    textarea.className = "editor-textarea";
    textarea.placeholder = "Write your note here";
    textarea.value = pageContent;

    textarea.addEventListener("focus", () => {
      currentPageIndex = index;
      updateCurrentPageFromViewport();
    });

    textarea.addEventListener("input", () => {
      currentNote.pages[index] = textarea.value;
    });

    pageWrapper.appendChild(pageLabel);
    pageWrapper.appendChild(textarea);
    editorPages.appendChild(pageWrapper);
  });

  requestAnimationFrame(updateCurrentPageFromViewport);
}

function updateCurrentPageFromViewport() {
  let mostVisibleIndex = currentPageIndex;
  let largestVisibleArea = 0;

  document.querySelectorAll(".note-page").forEach((page) => {
    const rect = page.getBoundingClientRect();
    const visibleTop = Math.max(rect.top, 0);
    const visibleBottom = Math.min(rect.bottom, window.innerHeight);
    const visibleArea = Math.max(0, visibleBottom - visibleTop);
    const pageIndex = Number(page.dataset.pageIndex);

    if (visibleArea > largestVisibleArea) {
      largestVisibleArea = visibleArea;
      mostVisibleIndex = pageIndex;
    }
  });

  currentPageIndex = mostVisibleIndex;

  document.querySelectorAll(".note-page-label").forEach((label, index) => {
    label.classList.toggle("active", index === currentPageIndex);
  });
}

function saveCurrentNote() {
  const noteIndex = notes.findIndex((note) => note.id === noteId);

  if (noteIndex === -1) {
    return;
  }

  currentNote.name = editorTitleInput.value.trim() || "Untitled";
  notes[noteIndex].name = currentNote.name;
  notes[noteIndex].pages = currentNote.pages;
  notes[noteIndex].content = currentNote.pages.join("\n\n");

  localStorage.setItem("notes", JSON.stringify(notes));
}

addPageBtn.addEventListener("click", () => {
  currentNote.pages.push("");
  currentPageIndex = currentNote.pages.length - 1;
  renderPages();

  const newPage = editorPages.children[currentPageIndex];
  newPage.scrollIntoView({ behavior: "smooth", block: "start" });
  newPage.querySelector("textarea").focus();
});

deletePageBtn.addEventListener("click", () => {
  if (currentNote.pages.length === 1) {
    currentNote.pages[0] = "";
    renderPages();
    editorPages.querySelector("textarea").focus();
    return;
  }

  currentNote.pages.splice(currentPageIndex, 1);
  currentPageIndex = Math.min(currentPageIndex, currentNote.pages.length - 1);
  renderPages();
  editorPages.children[currentPageIndex].querySelector("textarea").focus();
});

window.addEventListener("scroll", updateCurrentPageFromViewport);
window.addEventListener("resize", updateCurrentPageFromViewport);

editorTitleInput.addEventListener("input", () => {
  currentNote.name = editorTitleInput.value;
});

saveNoteBtn.addEventListener("click", () => {
  saveCurrentNote();
  alert("Saved");
});
