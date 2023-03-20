import {createApp} from 'vue'
import App from './App.vue'
import {createRouter, createWebHashHistory} from 'vue-router'
import mitt from 'mitt'



/* import the fontawesome core */
import {library} from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faTruckMoving,
    faNoteSticky,
    faCalendarDays,
    faCalendarWeek,
    faRightFromBracket,
    faPlus,
    faMinus,
    faCirclePlus,
    faCircleMinus,
    faScrewdriverWrench,
    faRightToBracket,
    faUser,
    faBoxesStacked,
    faBoxOpen,
    faCircleChevronRight,
    faCircleChevronLeft,
    faLeftLong,
    faUpRightFromSquare,
    faShuffle,
    faPen,
    faKey,
    faUmbrellaBeach
} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(
    faTruckMoving,
    faNoteSticky,
    faCalendarDays,
    faCalendarWeek,
    faRightFromBracket,
    faPlus,
    faMinus,
    faCirclePlus,
    faCircleMinus,
    faScrewdriverWrench,
    faRightToBracket,
    faUser,
    faBoxesStacked,
    faBoxOpen,
    faCircleChevronRight,
    faCircleChevronLeft,
    faLeftLong,
    faUpRightFromSquare,
    faShuffle,
    faPen,
    faKey,
    faUmbrellaBeach,
);

import WorkPlan from "@/components/WorkPlan";
import NotesPage from "@/components/NotesPage";
import InventoryPage from "@/components/InventoryPage";
import UserAdmin from "@/components/UserAdmin";
import ShiftAdmin from "@/components/ShiftAdmin";
import AddShift from "@/components/AddShift";
import AddUser from "@/components/AddUser";
import LoginPage from "@/components/LoginPage";
import AddProduct from "@/components/AddProduct";
import ProductAdmin from "@/components/ProductAdmin";
import AdminPage from "@/components/AdminPage";
import LogoutPage from "@/components/LogoutPage";
import UserView from "@/components/UserView";
import DeleteElement from "@/components/DeleteElement";
import UserHome from "@/components/UserHome";
import VacationOverview from "@/components/VacationOverview";
import AddVacation from "@/components/AddVacation";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: '/login', component: LoginPage},
        {path: '/login/:changepw', component: LoginPage, props: true},
        {path: '/login/:user/:pw', component: LoginPage, props: true},
        {path: '/logout', component: LogoutPage},
        {path: '/workplan', component: WorkPlan},
        {path: '/inventory', component: InventoryPage},
        {path: '/notes', component: NotesPage},
        {path: '/home', component: UserHome},
        {path: '/users', component: UserAdmin},
        {path: '/shifts', component: ShiftAdmin},
        {path: '/newshift', component: AddShift},
        {path: '/newshift/:userID', component: AddShift, props: true},
        {path: '/newuser', component: AddUser},
        {path: '/newproduct', component: AddProduct},
        {path: '/products', component: ProductAdmin},
        {path: '/admin', component: AdminPage},
        {path: '/userview/:userID', component: UserView, props: true},
        {path: '/delete/:element/:id', component: DeleteElement, props: true},
        {path: '/vacation', component: VacationOverview},
        {path: '/vacation/new', component: AddVacation},
    ],
})

const emitter = mitt();
const app = createApp(App);

app.config.globalProperties.emitter = emitter;
app.config.globalProperties.apibase = "https://hinkelsapp.jakub.st/api";
app.config.globalProperties.token = '';
app.config.globalProperties.role = '';
app
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app');