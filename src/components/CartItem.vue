<template>
  <div class="bg-white rounded-lg shadow-md p-4 mb-3 flex justify-between items-center hover:shadow-lg transition-shadow">
    <div class="flex items-center gap-4">
      <!-- Icon -->
      <i :class="`fas ${item.icon} text-2xl text-blue-600`" :aria-label="item.subject"></i>
      
      <!-- Details -->
      <div>
        <h4 class="font-bold text-gray-800">{{ item.subject }}</h4>
        <p class="text-sm text-gray-600">
          <i class="fas fa-map-marker-alt mr-1" aria-hidden="true"></i>{{ item.location }}
        </p>
        <p class="text-sm text-gray-600">
          <i class="fas fa-pound-sign mr-1" aria-hidden="true"></i>{{ item.price }}
        </p>
      </div>
    </div>

    <!-- Remove Button -->
    <button
      @click="$emit('remove-from-cart', item)"
      :aria-label="`Remove ${item.subject} from cart`"
      class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 font-semibold"
    >
      <i class="fas fa-trash-alt mr-2"></i>Remove
    </button>
  </div>
</template>

<script>
// CartItem component for displaying items in shopping cart
export default {
  name: 'CartItem',
  // Props for cart item data (5% marks requirement)
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  // Emit event for remove from cart action
  emits: ['remove-from-cart'],
};
</script>

