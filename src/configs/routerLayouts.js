import CartView from './../views/CartView.vue';
import CategoryView from './../views/CategoryView.vue';
import CheckoutView from './../views/CheckoutView.vue';
import DetailView from './../views/DetailView.vue';
import HomeView from './../views/HomeView.vue';
import LoginView from './../views/LoginView.vue';
import RegisterView from './../views/RegisterView.vue';
import SearchView from './../views/SearchView.vue';

export const routes = [
  { path: '/', name: 'home', component: HomeView },
  {
    path: '/search',
    name: 'search',
    component: SearchView,
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView,
  },
  {
    path: '/category/:categoryName',
    name: 'category',
    component: CategoryView,
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckoutView,
  },
  {
    path: '/detail/:productId',
    name: 'detail',
    component: DetailView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
];
