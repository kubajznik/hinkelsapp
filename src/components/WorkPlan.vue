<template>
  <div class="header">
    <font-awesome-icon icon="fa-solid fa-circle-chevron-left" @click="changeDate(-1)"/>
    <input type="date" id="date" v-model="date"/>
    <font-awesome-icon icon="fa-solid fa-circle-chevron-right" @click="changeDate(1)"/>
  </div>
  <div class="slot-wrapper">
    <div class="column" id="times">
      <div class="row time" v-for="i in 16" :key="i" :style="getStyleForTimeRow(i)"
           v-text="(i+7) < 10 ? ('0' + (i+7) + '.00') : ((i+7) + '.00')"></div>
    </div>
    <div class="column" id="names">
      <div class="row" v-for="i in 64" :key="i" :style="getStyleForRow(i)"></div>
      <DayPlan :date="date" :key="date"/>
    </div>
  </div>
</template>

<script>
import DayPlan from "@/components/DayPlan";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: "WorkPlan",
  components: {
    FontAwesomeIcon,
    DayPlan
  },
  data: function () {
    return {
      date: '0',
    }
  },
  mounted() {
    this.setDate();
  },
  methods: {
    getStyleForRow(i) {
      return 'grid-area: ' + i + ' / 1 / ' + (i + 1) + ' / 5;';
    },
    getStyleForTimeRow(i) {
      return 'grid-area: ' + i + ' / 1 / ' + (i + 1) + ' / 5;';
    },
    changeDate(days) {
      let date = new Date(this.date);
      date.setDate(date.getDate() + days);
      this.setDate(date);
    },
    setDate(date = null) {
      let now = new Date(date ? date : Date.now());
      this.date = now.getFullYear() + '-' + ((now.getMonth() + 1) < 10 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1)) + '-' + (now.getDate() < 10 ? '0' + now.getDate() : now.getDate());
    }
  }
}
</script>

<style>
.slot-wrapper {
  overflow-y: auto;
  display: grid;
  grid-template-columns: 4em auto;
  max-height: 80vh;
}

.column {
  display: grid;
  grid-template-rows: repeat(64, 1.5em);
}

#times {
  grid-template-rows: repeat(16, 6em);
}

.column#names {
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: .1em;
}

.header {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  min-height: 2em;
  margin-bottom: .5em;
}

.row {
  box-sizing: border-box;
  border-top: 1px dashed grey;
}

#names .row:nth-child(4n+1) {
  border-top: 1px solid black;
}

#names {
  border-bottom: 1px solid black;
  overflow-x: auto;
}

#names .row {
  grid-column: span 4;
}

#times {
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}

#times .row:first-child {
  border-top: none;
}

.time {
  border-right: 1px solid grey;
  text-align: center;
  grid-row: span 4;
  padding-right: .2em;
}
</style>