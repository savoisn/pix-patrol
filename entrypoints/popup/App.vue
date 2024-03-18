<script lang="ts" setup>

    import { ref, reactive, watch, onMounted } from 'vue'

    import { storage } from 'wxt/storage';
    
    import Pix from '@/components/Pix.vue';

    import { urls } from '../models/blacklist'

    const checked = ref(false)
    const state = reactive({
      checked
    });

    onMounted(async () => {
      const filtering = await storage.getItem<boolean>('local:fitering');
      state.checked = filtering;
    });
    
    watch(checked, async (newVal, oldVal) => {
        await storage.setItem('local:fitering', newVal);
    })


</script>

<template>
  <Pix/>
  <div class="hints">URL Filtering to avoid cheating:</div>
  <div class="toggle-fitlering"> 
    <label class="switch">
      <input v-model="checked" type="checkbox" id="filtering"/>
      <span class="slider round"></span>
    </label>
    <label class="switch-label" for="filtering">Filtering {{checked?"Active":"Inactive"}}</label>
    


  <div>
      
  <div class="hints">Little links to help testing:</div>
    <a href="https://genial.ly/" target="_blank">
      <img src="@/assets/genially.png" class="logo" alt="genial ly" />
    </a>
    <a href="https://nosdevoirs.fr" target="_blank">
      <img src="@/assets/nosdevoirs.svg" class="logo" alt="Nos Devoirs logo" />
    </a>
    <a href="https://pix.fr/" target="_blank">
      <img src="@/assets/pix-logo.svg" class="logo vue" alt="Pix logo" />
    </a>
  </div>

  <div class="hints left">filtered urls:</div>
      <div class="urllist">
        <ul class="urls">
          <li v-for="url in urls">
            {{ url }}
          </li>
        </ul>
      </div>
  </div>
</template>

<style scoped>
    .logo {
      height: 2em;
      padding: 1.5em;
      will-change: filter;
      transition: filter 300ms;
    }
    .logo:hover {
      filter: drop-shadow(0 0 0.5em #54bc4ae0);
    }
    .logo.vue:hover {
      filter: drop-shadow(0 0 0.5em #42b883aa);
    }

.toggle-fitlering {
    padding-top: 1em;
    text-align:center;
}
.urllist{
    overflow: auto;
    height: 16em;
}
.switch-label {
    padding-left: 1em;
    vertical-align: baseline;
}
.hints {
    padding-top: 1em;
}
.hints.left {
    padding-top: 1em;
    padding-bottom: 0em;
    text-align:left;
}

.switch {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 17px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 13px;
  width: 13px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(13px);
  -ms-transform: translateX(13px);
  transform: translateX(13px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 17px;
}

.slider.round:before {
  border-radius: 50%;
}


.urls {
  font-size: small;
  padding-left:1em;
  padding-top: 0em;
  margin: 0em;
  li {
    text-align: left;
  }
}
</style>
