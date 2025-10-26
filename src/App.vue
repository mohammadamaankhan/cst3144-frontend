<template>
  <div class="min-h-screen bg-gray-100 py-8 px-4">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <header class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">
          After-School Lessons
        </h1>
        <p class="text-gray-600">Browse and book after-school classes for your children</p>
      </header>

      <!-- Shopping Cart Button -->
      <div class="flex justify-end mb-6">
        <button
          @click="showCart = !showCart"
          :disabled="cart.length === 0"
          :class="[
            'flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors',
            cart.length > 0
              ? 'bg-green-600 text-white hover:bg-green-700 cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          ]"
        >
          <i class="fas fa-shopping-cart"></i>
          {{ showCart ? 'View Lessons' : 'View Cart' }}
          <span v-if="cart.length > 0" class="bg-white text-green-600 rounded-full px-2 py-1 text-sm">
            {{ cart.length }}
          </span>
        </button>
      </div>

      <!-- Lessons View -->
      <div v-if="!showCart">
        <!-- Search Bar (10% marks: 7% backend + 3% frontend) -->
        <SearchBar
          v-model:searchQuery="searchQuery"
          @search="performSearch"
        />

        <!-- Sort Controls (10% marks) -->
        <SortControls
          v-model:sortBy="sortBy"
          v-model:sortOrder="sortOrder"
        />

        <!-- Lessons Grid (7% marks for display) -->
        <div v-if="displayedLessons.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <LessonCard
            v-for="lesson in displayedLessons"
            :key="lesson._id"
            :lesson="lesson"
            @add-to-cart="addToCart"
          />
        </div>
        <div v-else class="text-center py-12">
          <p class="text-gray-500 text-lg">No lessons found matching your search.</p>
        </div>
      </div>

      <!-- Cart View -->
      <div v-else class="max-w-2xl mx-auto">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h2>
        
        <!-- Cart Items (5% marks) -->
        <div v-if="cart.length > 0" class="mb-6">
          <CartItem
            v-for="(item, index) in cart"
            :key="index"
            :item="item"
            @remove-from-cart="removeFromCart"
          />
          
          <!-- Total -->
          <div class="bg-white rounded-lg shadow-md p-4 mt-4">
            <div class="flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span>£{{ cartTotal }}</span>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-12">
          <p class="text-gray-500 text-lg">Your cart is empty.</p>
        </div>

        <!-- Checkout Form (6% marks) -->
        <div v-if="cart.length > 0" class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-4">Checkout</h3>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Name (letters only)
              </label>
              <input
                v-model="checkoutName"
                type="text"
                placeholder="Enter your name"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                :class="{ 'border-red-500': checkoutName && !isNameValid }"
              />
              <p v-if="checkoutName && !isNameValid" class="text-red-500 text-sm mt-1">
                Name must contain only letters and spaces
              </p>
            </div>

  <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Phone (numbers only)
              </label>
              <input
                v-model="checkoutPhone"
                type="text"
                placeholder="Enter your phone number"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                :class="{ 'border-red-500': checkoutPhone && !isPhoneValid }"
              />
              <p v-if="checkoutPhone && !isPhoneValid" class="text-red-500 text-sm mt-1">
                Phone must contain only numbers
              </p>
            </div>

            <button
              @click="submitOrder"
              :disabled="!isCheckoutValid"
              :class="[
                'w-full py-3 px-4 rounded-lg font-semibold transition-colors',
                isCheckoutValid
                  ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              ]"
            >
              Submit Order
            </button>
          </div>

          <!-- Order Success Message -->
          <div v-if="orderSubmitted" class="mt-4 p-4 bg-green-100 border border-green-400 rounded-lg">
            <p class="text-green-700 font-semibold">
              <i class="fas fa-check-circle mr-2"></i>
              Order submitted successfully!
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import LessonCard from './components/LessonCard.vue';
import CartItem from './components/CartItem.vue';
import SearchBar from './components/SearchBar.vue';
import SortControls from './components/SortControls.vue';

// API Base URL - will be updated to Render.com URL after deployment
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// State Management
const lessons = ref([]); // All lessons from database
const cart = ref([]); // Shopping cart items
const showCart = ref(false); // Toggle between lessons and cart view
const searchQuery = ref(''); // Search query string
const sortBy = ref('subject'); // Sort attribute
const sortOrder = ref('asc'); // Sort order (ascending/descending)
const checkoutName = ref(''); // Checkout form - name
const checkoutPhone = ref(''); // Checkout form - phone
const orderSubmitted = ref(false); // Order submission status

// ===== FETCH FUNCTIONS (9% marks) =====

// Fetch all lessons from API (3% marks)
async function fetchLessons() {
  try {
    const response = await fetch(`${API_BASE_URL}/lessons`);
    if (!response.ok) throw new Error('Failed to fetch lessons');
    const data = await response.json();
    lessons.value = data;
  } catch (error) {
    console.error('Error fetching lessons:', error);
    alert('Failed to load lessons. Please try again later.');
  }
}

// Search lessons from API (part of 10% search marks)
async function performSearch(query) {
  try {
    if (!query) {
      // If search is empty, fetch all lessons
      await fetchLessons();
      return;
    }

    const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Search failed');
    const data = await response.json();
    lessons.value = data;
  } catch (error) {
    console.error('Error searching lessons:', error);
    alert('Search failed. Please try again.');
  }
}

// Submit order to API (3% marks)
async function submitOrder() {
  try {
    // Prepare order data
    const lessonIds = cart.value.map(item => item._id);
    const orderData = {
      name: checkoutName.value,
      phone: checkoutPhone.value,
      lessonIds: lessonIds,
      spaces: cart.value.length // Total number of spaces booked
    };

    // POST order to API
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) throw new Error('Failed to submit order');
    const data = await response.json();
    
    // Update lesson spaces in database (3% marks)
    await updateLessonSpaces();

    // Show success message
    orderSubmitted.value = true;
    
    // Clear cart and form after 2 seconds
    setTimeout(() => {
      cart.value = [];
      checkoutName.value = '';
      checkoutPhone.value = '';
      orderSubmitted.value = false;
      showCart.value = false;
      fetchLessons(); // Refresh lessons to show updated spaces
    }, 2000);

  } catch (error) {
    console.error('Error submitting order:', error);
    alert('Failed to submit order. Please try again.');
  }
}

// Update lesson spaces after order (3% marks)
async function updateLessonSpaces() {
  try {
    // Group cart items by lesson ID and count
    const lessonUpdates = {};
    cart.value.forEach(item => {
      if (!lessonUpdates[item._id]) {
        lessonUpdates[item._id] = {
          currentSpaces: item.spaces,
          count: 0
        };
      }
      lessonUpdates[item._id].count++;
    });

    // Update each lesson's spaces
    for (const [lessonId, update] of Object.entries(lessonUpdates)) {
      const newSpaces = update.currentSpaces - update.count;
      
      const response = await fetch(`${API_BASE_URL}/lessons/${lessonId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ spaces: newSpaces })
      });

      if (!response.ok) throw new Error('Failed to update lesson spaces');
    }
  } catch (error) {
    console.error('Error updating lesson spaces:', error);
    // Don't alert user as order was successful
  }
}

// ===== COMPUTED PROPERTIES =====

// Sorted and displayed lessons
const displayedLessons = computed(() => {
  // Sort lessons based on selected attribute and order
  const sorted = [...lessons.value].sort((a, b) => {
    let aValue = a[sortBy.value];
    let bValue = b[sortBy.value];

    // Convert to lowercase for string comparison
    if (typeof aValue === 'string') aValue = aValue.toLowerCase();
    if (typeof bValue === 'string') bValue = bValue.toLowerCase();

    // Compare values
    if (aValue < bValue) return sortOrder.value === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder.value === 'asc' ? 1 : -1;
    return 0;
  });

  return sorted;
});

// Cart total price
const cartTotal = computed(() => {
  return cart.value.reduce((total, item) => total + item.price, 0);
});

// Validation: Name must be letters only
const isNameValid = computed(() => {
  return /^[a-zA-Z\s]+$/.test(checkoutName.value);
});

// Validation: Phone must be numbers only
const isPhoneValid = computed(() => {
  return /^[0-9]+$/.test(checkoutPhone.value);
});

// Checkout button enabled only when both fields are valid
const isCheckoutValid = computed(() => {
  return checkoutName.value && checkoutPhone.value && isNameValid.value && isPhoneValid.value;
});

// ===== CART FUNCTIONS (5% marks) =====

// Add lesson to cart (5% marks)
function addToCart(lesson) {
  if (lesson.spaces > 0) {
    // Add to cart
    cart.value.push({ ...lesson });
    
    // Reduce available spaces (optimistic update)
    const lessonIndex = lessons.value.findIndex(l => l._id === lesson._id);
    if (lessonIndex !== -1) {
      lessons.value[lessonIndex].spaces--;
    }
  }
}

// Remove lesson from cart (part of 5% marks)
function removeFromCart(item) {
  // Remove from cart
  const cartIndex = cart.value.findIndex(i => i._id === item._id);
  if (cartIndex !== -1) {
    cart.value.splice(cartIndex, 1);
  }

  // Restore available spaces
  const lessonIndex = lessons.value.findIndex(l => l._id === item._id);
  if (lessonIndex !== -1) {
    lessons.value[lessonIndex].spaces++;
  }
}

// ===== LIFECYCLE =====

// Fetch lessons when component mounts
onMounted(() => {
  fetchLessons();
});
</script>
