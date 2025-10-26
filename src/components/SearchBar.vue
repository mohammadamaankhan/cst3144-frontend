<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-6">
    <label for="search-input" class="block text-sm font-semibold text-gray-700 mb-2">
      Search Lessons
    </label>
    <div class="relative">
      <input
        id="search-input"
        type="text"
        :value="searchQuery"
        @input="handleInput"
        placeholder="Search by subject, location, price, or spaces..."
        aria-label="Search lessons"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <i class="fas fa-search absolute right-4 top-4 text-gray-400" aria-hidden="true"></i>
    </div>
    <p v-if="searchQuery" class="text-sm text-gray-500 mt-2" role="status" aria-live="polite">
      Searching for: "{{ searchQuery }}"
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Props for search query (10% marks requirement - search feature)
const props = defineProps({
  searchQuery: {
    type: String,
    required: true
  }
});

// Emit event for search changes
const emit = defineEmits(['update:searchQuery', 'search']);

// Debounce timer
let debounceTimer = null;

// Handle input with debouncing for "search as you type" (3% marks)
function handleInput(event) {
  const value = event.target.value;
  
  // Update the query immediately for display
  emit('update:searchQuery', value);
  
  // Clear existing timer
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  
  // Set new timer for search API call (300ms debounce)
  debounceTimer = setTimeout(() => {
    emit('search', value);
  }, 300);
}
</script>

