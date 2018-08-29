<template>
  <div type="x/template" id="modal-template" class="popup">
    <transition name="modal">
      <div class="modal-mask" :style="indexNum">
        <iframe style="position:absolute;width:100%;height: 100%" frameborder="0"></iframe>
        <div class="modal-wrapper">
          <div class="modal-container" :style="classStyle">
            <div class="modal-header">
              <button type="button" class="closeBtn icon iconfont icon-close1" id="no" @click="close"></button>
              <slot name="header"></slot>
            </div>
            <div class="modal-body">
              <slot name="body"></slot>
            </div>
            <div class="modal-footer">
              <slot name="footer">
                <div class="footer-sure" id="yes"  @click="close">Later
                </div>
                <div class="footer-delt" id="no" @click="close">OK
                </div>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    classStyle: '',
    indexNum: ''
  },
  methods: {
    close(e) {
      const id = e.target.id
      this.$emit('close', id)
    }
  }
}

</script>

<style scoped>
.popup .modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.popup .modal-mask .closeBtn {
  float: right;
  line-height: 40px;
  height: 40px;
  font-size: 10px;
  color: #a8a8a8 !important;
  outline: none;
  opacity: 1 !important;
  border: none;
  background: none;
  padding: 0;
}

.popup .modal-mask .modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.popup .modal-mask .modal-wrapper .modal-container {
  margin: 0px auto;
  border-radius: 25px;
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  position: relative;
  background: #f3f3f3;
  width: 400px;
}

.popup .modal-mask .modal-wrapper .modal-container .modal-container-list {
  background-color: #f3f3f3;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  position: absolute;
  left: 50%;
  top: 50%;
}

.popup .modal-mask .modal-wrapper .modal-container .modal-header {
  height: 40px;
  padding: 0 20px;
  line-height: 40px;
  font-size: 14px;
}

.popup .modal-mask .modal-wrapper .modal-container .modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.popup .modal-mask .modal-wrapper .modal-container .modal-body {
  margin: 0;
  padding: 20px;
}

.popup .modal-mask .modal-wrapper .modal-container .modal-footer {
  padding: 20px;
  padding-top: 0;
  text-align: right;
  border-top: 1px solid #afafaf;
  height: 38px;
}

.modal-default-button {
  float: right;
  height: 34px;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.modal-default-button {
  font-size: 16px;
  color: #464646;
  background-color: white;
  border-color: white;
}

.btn-primary {
  color: #464646;
  background-color: #428bca;
  border-color: #357ebd;
  border-radius: 2px;
}

.popup .modal-mask .modal-wrapper .modal-container .modal-footer .sure-btn {
  color: #464646;
  border: none;
  height: 28px;
  line-height: 28px;
  padding: 0 20px;
  font-size: 12px;
  text-align: center;
  margin-right: 20px;
  border-radius: 2px;
}

.popup
  .modal-mask
  .modal-wrapper
  .modal-container
  .modal-footer
  .sure-btn:hover {
}

.popup .modal-mask .modal-wrapper .modal-container .modal-footer .delt-btn {
  color: #414141;
  height: 28px;
  line-height: 28px;
  padding: 0 20px;
  font-size: 12px;
  text-align: center;
  margin-right: 20px;
}

.popup
  .modal-mask
  .modal-wrapper
  .modal-container
  .modal-footer
  .delt-btn:hover {
  color: #20a0ff;
  border: 1px solid #20a0ff;
}
.footer-sure {
  width: 175px;
  border-right: 1px solid #afafaf;
  float: left;
  height: 58px;
  text-align: center;
  color:#007aff;
  line-height: 55px;
  font-size: 22px;
}
.footer-delt {
  float: left;
  width: 170px;
  height: 58px;
  text-align: center;
  color:#007aff;
  line-height: 55px;
  font-size: 22px;
}
</style>
