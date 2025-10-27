<template>
  <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
    <!-- Lesson Icon -->
    <div class="flex justify-center mb-4">
      <i :class="`fas ${lesson.icon} text-4xl text-blue-600`" :aria-label="lesson.subject"></i>
    </div>

    <!-- Lesson Details -->
    <h3 class="text-xl font-bold text-gray-800 mb-2">{{ lesson.subject }}</h3>
    <p class="text-gray-600 mb-1">
      <i class="fas fa-map-marker-alt mr-2" aria-hidden="true"></i>{{ lesson.location }}
    </p>
    <p class="text-gray-600 mb-1">
      <i class="fas fa-pound-sign mr-2" aria-hidden="true"></i>{{ lesson.price }}
    </p>
    <p class="text-gray-600 mb-4" :class="{ 'text-red-600 font-semibold': lesson.spaces === 0 }">
      <i class="fas fa-users mr-2" aria-hidden="true"></i>{{ lesson.spaces }} spaces available
    </p>

    <!-- Add to Cart Button -->
    <button
      @click="$emit('add-to-cart', lesson)"
      :disabled="lesson.spaces === 0"
      :aria-label="`Add ${lesson.subject} to cart`"
      :class="[
        'w-full py-2 px-4 rounded-lg font-semibold transition-colors duration-200',
        lesson.spaces > 0
          ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
      ]"
    >
      {{ lesson.spaces > 0 ? 'Add to Cart' : 'Out of Stock' }}
    </button>
  </div>
</template>

<script>
// LessonCard component for displaying individual lessons
export default {
  name: 'LessonCard',
  // Props for lesson data (7% marks requirement)
  props: {
    lesson: {
      type: Object,
      required: true
    }
  },
  // Emit event for add to cart action
  emits: ['add-to-cart'],
};
</script>

