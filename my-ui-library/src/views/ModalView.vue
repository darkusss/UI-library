<template>
  <div class="modal-window">
    <Modal>
      <template v-slot:trigger>
        <button>Open modal</button>
      </template>
    </Modal>
  </div>
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

<style lang="less">

</style>
