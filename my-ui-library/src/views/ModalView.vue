<template>
  <section class="section">
    <h2 class="section-brand">Modal</h2>
    <div class="section-inner">
      <Modal>
        <template v-slot:trigger>
          <MyButton>Open modal</MyButton>
        </template>
      </Modal>
    </div>
  </section>
</template>

<script lang="ts">
  import Modal from '@/components/Modal.vue';
  import MyButton from "@/components/MyButton.vue";

  export default {
    name: 'ModalView',
    components: {
      Modal,
      MyButton
    },
  };
</script>
