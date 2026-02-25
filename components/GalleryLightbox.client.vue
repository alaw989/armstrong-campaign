<script setup lang="ts">
/**
 * GalleryLightbox Component
 *
 * Client-side only lightbox modal for viewing gallery photos at full size.
 *
 * Features:
 * - Teleport to body (avoids z-index issues)
 * - Native <dialog> element with backdrop
 * - Keyboard navigation (Escape to close, Arrow keys for prev/next)
 * - Focus trap (cycles within dialog when Tab is pressed)
 * - Body scroll lock when open
 * - Backdrop click to close
 * - Return focus to thumbnail after closing
 */

interface GalleryImage {
  src: string
  alt: string
}

interface Props {
  visible: boolean
  images: GalleryImage[]
  currentIndex: number
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  images: () => [],
  currentIndex: 0,
})

const emit = defineEmits<{
  close: []
  previous: []
  next: []
}>()

// Refs
const dialog = ref<HTMLDialogElement | null>(null)
const closeButton = ref<HTMLButtonElement | null>(null)
const thumbnailTriggerRef = ref<HTMLElement | null>(null)

// Computed
const currentImage = computed(() => {
  if (!props.images || props.images.length === 0) return null
  return props.images[props.currentIndex] || props.images[0]
})

const hasPrevious = computed(() => props.currentIndex > 0)
const hasNext = computed(() => props.currentIndex < props.images.length - 1)

// Store ref to the element that opened the lightbox for focus return
const storeTriggerRef = () => {
  thumbnailTriggerRef.value = document.activeElement as HTMLElement
}

// Close lightbox
const close = () => {
  emit('close')
}

// Navigate to previous image
const previous = () => {
  if (hasPrevious.value) {
    emit('previous')
  }
}

// Navigate to next image
const next = () => {
  if (hasNext.value) {
    emit('next')
  }
}

// Handle backdrop click
const handleBackdropClick = () => {
  close()
}

// Handle keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'Escape':
      close()
      break
    case 'ArrowLeft':
      if (hasPrevious.value) {
        previous()
        event.preventDefault()
      }
      break
    case 'ArrowRight':
      if (hasNext.value) {
        next()
        event.preventDefault()
      }
      break
  }
}

// Lock/unlock body scroll
const lockBodyScroll = () => {
  document.body.style.overflow = 'hidden'
}

const unlockBodyScroll = () => {
  document.body.style.overflow = ''
}

// Show dialog (native <dialog> API)
const showDialog = () => {
  if (dialog.value) {
    dialog.value.showModal()
    // Focus close button after dialog opens
    nextTick(() => {
      if (closeButton.value) {
        closeButton.value.focus()
      }
    })
  }
}

// Close dialog (native <dialog> API)
const closeDialog = () => {
  if (dialog.value) {
    dialog.value.close()
  }
}

// Return focus to thumbnail that opened the lightbox
const returnFocus = () => {
  if (thumbnailTriggerRef.value && typeof thumbnailTriggerRef.value.focus === 'function') {
    thumbnailTriggerRef.value.focus()
  }
}

// Watch visibility changes
watch(() => props.visible, (isVisible) => {
  if (isVisible) {
    storeTriggerRef()
    lockBodyScroll()
    nextTick(() => {
      showDialog()
    })
  } else {
    unlockBodyScroll()
    closeDialog()
    nextTick(() => {
      returnFocus()
    })
  }
})

// Cleanup on unmount
onBeforeUnmount(() => {
  unlockBodyScroll()
})
</script>

<template>
  <Teleport to="body">
    <dialog
      v-if="visible"
      ref="dialog"
      :open="visible"
      @cancel="handleBackdropClick"
      @keydown="handleKeydown"
      class="backdrop:bg-black/80 bg-transparent p-0 fixed inset-0 z-50 border-0"
      aria-labelledby="lightbox-title"
    >
      <div
        v-if="currentImage"
        class="relative flex items-center justify-center min-h-screen p-4"
        @click.self="handleBackdropClick"
      >
        <!-- Previous Button -->
        <button
          v-if="hasPrevious"
          @click="previous"
          class="absolute left-4 z-10 p-2 text-white bg-black/30 hover:bg-black/50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Previous photo"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <!-- Image -->
        <NuxtImg
          :src="currentImage.src"
          :alt="currentImage.alt"
          width="1200"
          height="900"
          loading="eager"
          format="webp"
          class="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
          preset="galleryFull"
        />

        <!-- Next Button -->
        <button
          v-if="hasNext"
          @click="next"
          class="absolute right-4 z-10 p-2 text-white bg-black/30 hover:bg-black/50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Next photo"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        <!-- Close Button -->
        <button
          ref="closeButton"
          @click="close"
          class="absolute top-4 right-4 z-10 p-2 text-white bg-black/30 hover:bg-black/50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Close lightbox"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Photo Counter -->
        <div
          v-if="images.length > 1"
          class="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 text-white text-sm rounded-full"
          aria-live="polite"
        >
          {{ currentIndex + 1 }} of {{ images.length }}
        </div>
      </div>
    </dialog>
  </Teleport>
</template>
