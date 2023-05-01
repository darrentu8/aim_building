// eslint-disable-next-line vue/valid-v-else
import Vue from "vue";
import Router from "vue-router";
const Index = () => import("../pages/index/Index");
const Vote = () => import("../pages/vote/Vote");
const Votes = () => import("../pages/votes/Votes");
const Finance = () => import("../pages/finance/Finance");
const House = () => import("../pages/house/House");
const Tables = () => import("../pages/tables/Tables");
const Photo = () => import("../pages/photo/Photo");
const ReportList = () => import("../pages/reportList/ReportList");
const Report = () => import("../pages/report/Report");
const ReportPage = () => import("../pages/reportPage/ReportPage");
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Index",
      component: Index
    },
    {
      path: "/vote",
      name: "Vote",
      component: Vote
    },
    {
      path: "/votes",
      name: "Votes",
      component: Votes
    },
    {
      path: "/finance",
      name: "Finance",
      component: Finance
    },
    {
      path: "/house",
      name: "House",
      component: House
    },
    {
      path: "/tables",
      name: "Tables",
      component: Tables
    },
    {
      path: "/photo",
      name: "Photo",
      component: Photo
    },
    {
      path: "/reportList",
      name: "ReportList",
      component: ReportList
    },
    {
      path: "/report",
      name: "Report",
      component: Report
    },
    {
      path: "/reportPage",
      name: "ReportPage",
      component: ReportPage
    }
  ]
});
