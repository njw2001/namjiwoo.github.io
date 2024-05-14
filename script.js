// DOM elements
const createNoteButton = document.getElementById("create-note");
const notesContainer = document.getElementById("notes");
const noteTemplate = document.getElementById("note-template");
const searchInput = document.getElementById("search-text");

// Event listeners
createNoteButton.addEventListener("click", createNote);
notesContainer.addEventListener("click", handleNoteActions);
searchInput.addEventListener("keyup", filterNotes);

// Function to create a new note
function createNote() {
    const noteElement = document.importNode(noteTemplate.content, true);
    const noteTitle = prompt("제목:");
    const noteBody = prompt("내용:");

    // Create note elements
    const titleElement = noteElement.querySelector(".note-title");
    const bodyElement = noteElement.querySelector(".note-body");
    const dateElement = noteElement.querySelector(".note-date");

    // Set note content
    titleElement.textContent = noteTitle;
    bodyElement.textContent = noteBody;
    dateElement.textContent = new Date().toLocaleString();

    // Append note to notes container
    notesContainer.appendChild(noteElement);
    
    // Save note to local storage
    saveNoteToLocalStorage(noteTitle, noteBody);
}

// Function to handle note actions (remove)
function handleNoteActions(event) {
    if (event.target.classList.contains("remove-note")) {
        const note = event.target.closest(".note");
        note.remove();

        // Remove note from local storage
        removeNoteFromLocalStorage(note.querySelector(".note-title").textContent);
    }
}

// Function to filter notes based on search input
function filterNotes() {
    const searchText = searchInput.value.toLowerCase();
    const notes = notesContainer.querySelectorAll(".note");

    notes.forEach(note => {
        const title = note.querySelector(".note-title").textContent.toLowerCase();
        const body = note.querySelector(".note-body").textContent.toLowerCase();

        if (title.includes(searchText) || body.includes(searchText)) {
            note.style.display = "block";
        } else {
            note.style.display = "none";
        }
    });
}

// Function to save note to local storage
function saveNoteToLocalStorage(title, body) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push({ title, body });
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Function to remove note from local storage
function removeNoteFromLocalStorage(title) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes = notes.filter(note => note.title !== title);
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Load notes from local storage on page load   
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.forEach(note => {
        const noteElement = document.importNode(noteTemplate.content, true);
        const titleElement = noteElement.querySelector(".note-title");
        const bodyElement = noteElement.querySelector(".note-body");
        const dateElement = noteElement.querySelector(".note-date");

        titleElement.textContent = note.title;
        bodyElement.textContent = note.body;
        dateElement.textContent = new Date().toLocaleString();

        notesContainer.appendChild(noteElement);
    });
}

// Call loadNotes function on page load
loadNotes();