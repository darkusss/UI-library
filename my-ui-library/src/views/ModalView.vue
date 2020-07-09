<template>
  <section class="section">
    <h2 class="section-brand">Modal</h2>
    <div class="section-inner">
      <Modal>
        <template v-slot:trigger>
          <button>Open modal</button>
        </template>
      </Modal>
    </div>
  </section>
</template>

<script lang="ts">
  import Modal from '@/components/Modal.vue';

  export default {
    name: 'ModalView',
    components: {
      Modal,
    },
  };
</script>
