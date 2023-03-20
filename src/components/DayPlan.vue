<template>
  <div class="slot" v-for="shift of shifts" :key="shift.firstname" :style="getStyleForShift(shift)">
    <span class="name" v-text="shift.firstname"></span>
    <span class="position" v-text="shift.position"></span>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DayPlan",
  data: function () {
    return {
      shifts: [],
      colspan: 1,
    }
  },
  mounted() {
    this.getSlots();
  },
  updated() {
    document.querySelector('.slot').scrollIntoView(true);
  },
  props: {
    date: String
  },
  methods: {
    getSlots() {
        axios.get(this.apibase + '/shift/' + this.date, {
          headers: {
            'Token': localStorage.getItem('token'),
          }
        }).then(response => {
          if (response.status === 200) {
            for (let d of response.data) {
              this.shifts.push(d);
            }

            this.shifts.sort((a, b) => {
              if (a.start > b.start) return -1;
              return 1;
            });

            switch (this.shifts.length) {
              case 1:
                this.colspan = 4;
                break;
              case 2:
                this.colspan = 2;
                break;
              default:
                this.colspan = 1;
                break;
            }
          } else {
            console.log("Server returned " + response.status + " : " + response.statusText);
          }
        });
    },
    getStyleForShift(shift) {
      let from, to, hour, minute, index;
      index = this.shifts.indexOf(shift);
      from = shift.start.split(':');
      hour = Number(from[0]);
      minute = Number(from[1]);
      from = (hour * 4 + 1) + Math.round((minute / 15)) - 32;
      to = shift.end.split(':');
      hour = Number(to[0]);
      minute = Number(to[1]);
      to = (hour * 4 + 1) + Math.round((minute / 15)) - 32;
      let grid = 'grid-area: ' + from + '/' + (index * this.colspan + 1) + '/' + to + '/' + (index * this.colspan + this.colspan + 1) + ';';
      return grid + ' background-color: rgba(' + shift.color + ', .8);';
    }
  }
}
</script>

<style scoped>
.slot {
  background: rgba(255, 0, 0, .8);
  border-radius: 5px;
  padding: .5em;
  display: flex;
  flex-direction: column;
  align-items: start;
  z-index: 2000;
}

.slot .name {
  font-weight: bold;
}

.slot .position {
  font-style: italic;
  font-size: .9em;
}
</style>