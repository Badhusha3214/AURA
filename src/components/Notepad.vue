<template>
  <button @click="showAddNote = true"
    class="text-black w-64 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
    type="button">
    ADD DATA
  </button>
  <div class="container mx-auto z-10 p-4">
    <ul class="mt-4">
      <li v-for="(note, index) in notes" :key="index"
        class="mb-6 text-black w-64 z-0 bg-white hover:bg-tertiary focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5  items-center"
        @click="toggleNoteContent(index)">
        <div class="flex justify-between items-center mb-2 ">
          <div class="text-sm font-semibold truncate">{{ truncateTitle(note.title) }}</div>
          <div class="text-xs">{{ formatDate(note.createdAt) }}</div>
        </div>
        <div v-if="note.showContent" class="note-content">
          <hr class="h-px my-1 bg-gray-500 border-0 dark:bg-gray-700">
          <p>{{ note.content }}</p>
          <div class="flex justify-between  mt-2">
            <button class=" text-green-500 px-1 py-1 rounded-md mr-3 hover:bg-green-600 transition-colors"
              @click.stop="editNote(index)">
              Edit
            </button>
            <button class=" text-red-500 px-2 py-1 rounded-md hover:bg-red-600 transition-colors"
              @click.stop="deleteNote(index)">
              Delete
            </button>
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
          <button class=" text-black pr-4 py-2 rounded-md text-opacity-60 transition-colors" @click="addNote">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </button>
        </div>
        <div class="p-4">
          <input v-model="newNoteTitle"
            class="w-full bg-white border-gray-500 pb-1 rounded placeholder-gray-400 focus:outline-none text-lg"
            placeholder="  Title" />
        </div>
        <hr class="h-px my-1 bg-gray-500 border-1 mx-7 dark:bg-gray-700">
        <textarea v-model="newNoteContent" row="10" cols="38"
          class=" border-white rounded-md px-4 py-2 mb-2 mx-4 placeholder-gray-400 focus:outline-white  text-base h-48"
          placeholder="Content"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showAddNote: false,
        newNoteTitle: "",
        newNoteContent: "",
        notes: [],
      };
    },
    created() {
      const savedNotes = localStorage.getItem("notes");
      if (savedNotes) {
        this.notes = JSON.parse(savedNotes);
      }
    },
    methods: {
      addNote() {
        if (this.newNoteTitle.trim() !== "" && this.newNoteContent.trim() !== "") {
          this.notes.unshift({
            title: this.newNoteTitle,
            content: this.newNoteContent,
            showContent: true,
            createdAt: new Date().toISOString(),
          });
          this.newNoteTitle = "";
          this.newNoteContent = "";
          this.showAddNote = false;
          this.saveNotes();
        }
      },
      toggleNoteContent(index) {
        this.notes[index].showContent = !this.notes[index].showContent;
        this.saveNotes();
      },
      editNote(index) {
        this.showAddNote = true;
        this.newNoteTitle = this.notes[index].title;
        this.newNoteContent = this.notes[index].content;
        this.notes.splice(index, 1);
        this.saveNotes();
      },
      deleteNote(index) {
        this.notes.splice(index, 1);
        this.saveNotes();
      },
      saveNotes() {
        localStorage.setItem("notes", JSON.stringify(this.notes));
      },
      formatDate(dateString) {
        const date = new Date(dateString);
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
      },
      truncateTitle(title) {
        const maxLength = 14; // Set the desired maximum length for the title
        if (title.length > maxLength) {
          return `${title.slice(0, maxLength)}...`;
        }
        return title;
      },
    },
  };
</script>