<template>


  <div v-if="showLoader" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-md p-6 flex items-center">
      <div class="mr-4">
        <svg class="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
          </path>
        </svg>
      </div>
      <p class="text-gray-700">Loading...</p>
    </div>
  </div>


  <button @click="showAddNote = true"
    class="text-black w-64 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
    type="button">
    ADD DATA
  </button>

  <div class="container mx-auto z-0 p-4">
    <ul class="mt-4">
      <li v-for="(note, index) in notes" :key="note.note_id"
        class="mb-6 text-black w-64 z-0 bg-white hover:bg-tertiary focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 items-center"
        @click="toggleNoteContent(index)">
        <div class="flex justify-between items-center mb-2">
          <div class="text-sm font-semibold truncate">{{ truncateTitle(note.title) }}</div>
          <div class="text-xs">{{ formatDate(note.created_at) }}</div>
        </div>
        <div v-if="note.showContent" class="note-content">
          <hr class="h-px my-1 bg-gray-500 w-48 border-0 dark:bg-gray-700">
          <div class="w-48 max-h-20 overflow-auto">
            <p>{{ note.content }}</p>
          </div>
          <div class="flex justify-between mt-2">
            <button class=" text-green-500 px-1 py-1 rounded-md mr-3 transition-colors"
              @click.stop="editNote(index)">Edit</button>
            <button class=" text-red-500 px-2 py-1 rounded-md transition-colors"
              @click.stop="deleteNote(index)">Delete</button>
          </div>
        </div>
      </li>
    </ul>
    <div v-if="showAddNote" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      @click.self="showAddNote = false">
      <div class="bg-white z-auto rounded-md shadow-md" @click.stop style="max-width: 600px; width: 90%">
        <div class="flex justify-between items-center pl-5 border-b">
          <button class="text-gray-500 hover:text-gray-700 transition-colors" @click="showAddNote = false">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18">
              </path>
            </svg>
          </button>

          <h3 class="text-xl font-semibold"></h3>
          <button class=" text-black pr-4 py-2 rounded-md text-opacity-60 transition-colors" @click="saveNote">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </button>
        </div>
        <div class="p-4">
          <input v-model="newNoteTitle"
            class="w-full bg-white border-gray-500 pb-1 rounded placeholder-gray-400 focus:outline-none text-lg"
            placeholder="Title" />
        </div>
        <hr class="h-px my-1 bg-gray-500 border-1 mx-7 dark:bg-gray-700">
        <textarea v-model="newNoteContent"
          class=" border-white w-full rounded-md px-4 py-2  placeholder-gray-400  text-base h-48"
          placeholder="Content"></textarea>
      </div>
    </div>
  </div>


</template>

<script>
import { Newnote, Getnote, deleteNote } from "@/api/index"

export default {
  data() {
    return {
      showAddNote: false,
      newNoteTitle: "",
      newNoteContent: "",
      notes: [],
      notess: [],
      loading: false,
      showLoader: false,
      noteToEdit: null
    };
  },
  async mounted() {
    try {
      const response = await Getnote();
      this.notess = response.data.Note;
      this.notes = response.data.Note.map(note => ({
        note_id: note.note_id,
        title: note.title,
        content: note.content,
        showContent: false,
        created_at: note.created_at
      }));
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async addNote() {
      this.showLoader = true;
      const newNote = {
        title: this.newNoteTitle,
        content: this.newNoteContent
      };

      try {

        const response = await Newnote(newNote);
        this.notess.push(response.data);
        this.notes.unshift({
          note_id: response.data.note_id,
          title: this.newNoteTitle,
          content: this.newNoteContent,
          showContent: true,
          created_at: new Date().toISOString()
        });
        this.newNoteTitle = "";
        this.newNoteContent = "";
        this.showAddNote = false;

        this.showLoader = false;
        this.saveNotes();
      } catch (error) {
        console.error(error);
      }
    },
    toggleNoteContent(index) {
      this.notes[index].showContent = !this.notes[index].showContent;
      this.saveNotes();
    },
    editNote(index) {
      this.showLoader = true;
      this.showAddNote = true;
      this.newNoteTitle = this.notes[index].title;
      this.newNoteContent = this.notes[index].content;
      this.noteToEdit = this.notes[index];
      this.showLoader = false;
    },
    async deleteNote(index) {
      try {
        this.showLoader = true;
        const noteId = this.notes[index].note_id;
        await deleteNote(noteId);
        this.notess = this.notess.filter(note => note.note_id !== noteId);
        this.notes.splice(index, 1);
        this.saveNotes();
        this.showLoader = false;
      } catch (error) {
        console.error(error);
        this.showLoader = false;
      }
    }, saveNote() {
      if (this.noteToEdit !== null) {
        const index = this.notes.findIndex(note => note.note_id === this.noteToEdit.note_id);
        if (index !== -1) {
          this.notes[index].title = this.newNoteTitle;
          this.notes[index].content = this.newNoteContent;
          this.saveNotes();
          this.showAddNote = false;
          this.newNoteTitle = "";
          this.newNoteContent = "";
          this.noteToEdit = null;
        }
      } else {
        this.addNote();
      }
    },
    // saveNotes() {
    //   localStorage.setItem("notes", JSON.stringify(this.notes));
    // },
    formatDate(dateString) {
      const date = new Date(dateString);
      return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    },
    truncateTitle(title) {
      const maxLength = 14;
      if (title.length > maxLength) {
        return `${title.slice(0, maxLength)}...`;
      }
      return title;
    },
  },
};
</script>

<style>
textarea {
  border: none;
  overflow: none;
  outline: none;

  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;

  resize: none;
}

textarea:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0);
}
</style>