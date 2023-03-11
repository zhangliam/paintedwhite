<template>
  <div class="mask">
    <div class="style-builder">
      <div class="style-navi">
        <div class="style-line">
          <div v-for="(item, index) in styleNavi" :key="index" @click="onSelectFirstNode(item)">{{item.name}}</div>
        </div>
        <div class="style-line line-middle" style="padding-left: 10px">
          <div v-for="(item, index) in secondLayers" :key="index" @click="onSelectProperty(item)">{{item.name}}</div>
        </div>
        <div style="width:40%; padding-left: 10px">
          <div v-for="(value, key) in thirdLayers" :key="key">{{key}}: {{value}}</div>
          <div>自定义样式</div>
          <textarea style="resize: none; border: 1px solid #8186D5; width: 100%; min-height: 80px" ref="customize" placeholder="top: 0px;"></textarea>
        </div>
      </div>
      <div class="style-bar">
        <div class="style-button">ok</div>
        <div class="style-button">cancel</div>
      </div>
    </div>
  </div>
</template>

<style>
.mask {
  position:absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.style-builder {
  min-width: 600px;
  min-height: 400px;
  background-color: #fff;
  /* display: flex; */
}

.style-navi {
  display: flex;
  height: 370px;
  padding: 10px;
}

.style-line {
  width: 30%;
}

.line-middle {
  border-left: 1px solid #8186D5;
  border-right: 1px solid #8186D5;
}

.style-bar {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 30px;
}
</style>