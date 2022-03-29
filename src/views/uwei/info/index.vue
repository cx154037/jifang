<template>
  <div class="c-item">
    <div class="c-item-top">
      <div>机柜1</div>
    </div>
    <div class="c-item-two">
      <div class="c-item-two-left">
        <div class="c-item-two-left-top">
          <div class="title">u位使用率</div>
          <div>
              12
          </div>
        </div>
        <div class="c-item-two-left-two">
          <div class="title">机柜实时温湿度</div>
          <div>
              45
          </div>
        </div>
      </div>
      <div>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.c-item {
  width: 100%;
  height: calc(100vh - 85px);
  background: #e7e7e7d4;
  padding: 10px;
  &-top {
    height: 10%;
  }
  &-two {
    height: 90%;
    display: flex;
    &-left {
      width: 30%;
      height: 100%;

      &-top {
        height: 50%;
        margin-bottom: 10px;
        background: white;
        .title {
          width: 100%;
          border: 1px solid #e4e4e4;
          height: 15%;
          display: flex;
          align-items: center;
           padding-left: 10px;
        }
      }
      &-two {
        height: 50%;
        background: white;
        .title {
          width: 100%;
          border: 1px solid #e4e4e4;
          height: 15%;
          display: flex;
          align-items: center;
          padding-left: 10px;
        }
      }
    }
  }
}
</style>