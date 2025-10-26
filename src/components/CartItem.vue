<template>
  <div class="bg-white rounded-lg shadow-md p-4 mb-3 flex justify-between items-center">
    <div class="flex items-center gap-4">
      <!-- Icon -->
      <i :class="`fas ${item.icon} text-2xl text-blue-600`"></i>
      
      <!-- Details -->
      <div>
        <h4 class="font-bold text-gray-800">{{ item.subject }}</h4>
        <p class="text-sm text-gray-600">{{ item.location }}</p>
        <p class="text-sm text-gray-600">£{{ item.price }}</p>
      </div>
    </div>

    <!-- Remove Button -->
    <button
      @click="$emit('remove-from-cart', item)"
      class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-semibold"
    >
      Remove
    </button>
  </div>
</template>

<script setup>
// Props for cart item data (5% marks requirement)
defineProps({
  item: {
    type: Object,
    required: true
  }
});

// Emit event for remove from cart action
defineEmits(['remove-from-cart']);
</script>

