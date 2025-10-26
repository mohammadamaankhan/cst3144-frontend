<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-6">
    <h3 class="text-lg font-bold text-gray-800 mb-4">Sort by</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Sort Attribute Selection -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Attribute</label>
        <div class="space-y-2">
          <label class="flex items-center cursor-pointer">
            <input
              type="radio"
              value="subject"
              :checked="sortBy === 'subject'"
              @change="$emit('update:sortBy', 'subject')"
              class="mr-2"
            />
            <span class="text-gray-700">Subject</span>
          </label>
          <label class="flex items-center cursor-pointer">
            <input
              type="radio"
              value="location"
              :checked="sortBy === 'location'"
              @change="$emit('update:sortBy', 'location')"
              class="mr-2"
            />
            <span class="text-gray-700">Location</span>
          </label>
          <label class="flex items-center cursor-pointer">
            <input
              type="radio"
              value="price"
              :checked="sortBy === 'price'"
              @change="$emit('update:sortBy', 'price')"
              class="mr-2"
            />
            <span class="text-gray-700">Price</span>
          </label>
          <label class="flex items-center cursor-pointer">
            <input
              type="radio"
              value="spaces"
              :checked="sortBy === 'spaces'"
              @change="$emit('update:sortBy', 'spaces')"
              class="mr-2"
            />
            <span class="text-gray-700">Availability (Spaces)</span>
          </label>
        </div>
      </div>

      <!-- Sort Order Selection -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Order</label>
        <div class="space-y-2">
          <label class="flex items-center cursor-pointer">
            <input
              type="radio"
              value="asc"
              :checked="sortOrder === 'asc'"
              @change="$emit('update:sortOrder', 'asc')"
              class="mr-2"
            />
            <span class="text-gray-700">Ascending</span>
          </label>
          <label class="flex items-center cursor-pointer">
            <input
              type="radio"
              value="desc"
              :checked="sortOrder === 'desc'"
              @change="$emit('update:sortOrder', 'desc')"
              class="mr-2"
            />
            <span class="text-gray-700">Descending</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props for current sort state (10% marks requirement)
defineProps({
  sortBy: {
    type: String,
    required: true
  },
  sortOrder: {
    type: String,
    required: true
  }
});

// Emit events for sort changes
defineEmits(['update:sortBy', 'update:sortOrder']);
</script>

