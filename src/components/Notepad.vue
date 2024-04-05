<template>
  <button
    @click="showAddNote = true"
    class="text-black w-64 bg-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
    type="button"
  >
    ADD DATA
  </button>
  <div class="container mx-auto p-4">
    <div
      v-if="showAddNote"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      @click.self="showAddNote = false"
    >
      <div
        class="bg-white rounded-md shadow-md"
        @click.stop
        style="max-width: 600px; width: 90%"
      >
        <div class="flex justify-between items-center p-4 border-b">
          <button
            class="text-gray-500 hover:text-gray-700 transition-colors"
            @click="showAddNote = false"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
          </button>

          <h3 class="text-xl font-semibold">Add Note</h3>
          <button
            class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
            @click="addNote"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </button>
        </div>
        <div class="p-4">
          <input
            v-model="newNoteTitle"
            class="w-full border-b border-gray-300 pb-1 placeholder-gray-400 focus:outline-none text-lg"
            placeholder="Title"
          />
        </div>
        <textarea
          v-model="newNoteContent"
          class="w-full border border-gray-300 rounded-md px-4 py-2 placeholder-gray-400 focus:outline-none text-base h-48"
          placeholder="Content"
        ></textarea>
      </div>
    </div>
    <ul class="mt-4">
      <li
        v-for="(note, index) in notes"
        :key="index"
        class="bg-white border border-gray-300 rounded-md p-4 mb-4 shadow-md relative"
      >
        <div class="flex justify-between items-center mb-2">
          <div class="text-lg font-semibold">
            {{ note.title }} ({{ formatDate(note.createdAt) }})
          </div>
          <div v-if="note.showContent" class="absolute top-2 right-2">
            <button
              class="bg-green-500 text-white px-2 py-1 rounded-md mr-2 hover:bg-green-600 transition-colors"
              @click="editNote(index)"
            >
              Edit
            </button>
            <button
              class="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors"
              @click="deleteNote(index)"
            >
              Delete
            </button>
          </div>
        </div>
        <div v-if="note.showContent" class="note-content">
          <p>{{ note.content }}</p>
        </div>
      </li>
    </ul>
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
          showContent: false,
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
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    },
  },
};
</script>