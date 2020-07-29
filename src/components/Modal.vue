  <template>
  <div>
    <div class="popup-trigger" @click="openPopup">
      <slot name="trigger">
        <MyButton>Trigger</MyButton>
      </slot>
    </div>
    <div class="popup" v-if="visible">
      <div class="popup-header">
        <slot name="header">
          This is a default header
        </slot>
      </div>
      <div class="popup-body">
        <slot name="body">
          This is a default text in the slot body
        </slot>
      </div>
      <div class="popup-footer close-button" @click="closePopup">
        <slot name="footer">
          <MyButton color="success">OK</MyButton>
        </slot>
      </div>
    </div>
    <div class="vue-overlay" v-if="visible" @click="closePopup"></div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import MyButton from '@/components/MyButton.vue';

  export default Vue.extend({
    name: 'Modal',
    components: {
      MyButton,
    },
    data() {
      return {
        visible: false,
      };
    },
    methods: {
      openPopup(): void {
        this.visible = true;
        this.$emit('open');
      },
      closePopup(): void {
        this.visible = false;
        this.$emit('close');
      },
    },
  });
</script>

<style scoped lang="less">

  .popup-trigger, popup-footer {
    display: inline-block;
  }


  .popup {
    position: fixed;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);

    box-shadow: 0 0 16px 5px rgba(0,0,0, .5);

    width: 500px;
    max-width: 40%;

    background-color: white;

    z-index: 10;

    .popup-header {
      text-align: start;
      border-bottom: 1px solid black;
      padding: 10px;
      font-size: 1.1em;
      font-weight: bold;
    }

    .popup-body {
      text-align: start;
      min-height: 200px;
      padding: 10px;
    }

    .popup-footer {
      padding: 10px;
      border-top: 1px solid black;
      display: flex;
      justify-content: flex-end;
    }
  }

  .vue-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .5);
  }
</style>
