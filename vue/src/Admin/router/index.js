import vue from "vue";
import vueRouter from "vue-router";
vue.use(vueRouter);

import Layout from "../layout/index.vue";

export const routes = [
	{
		path: "/admin",
		component: Layout,
		redirect: "/admin/dashboard",
		children: [
			{
				name: "Dashboard",
				path: "dashboard",
				component: () => import("../views/dashboard/index.vue"),
				meta: { title: "Dashboard", icon: "dashboard", affix: true }
			}
		]
	},
	{
		name: "Products",
		path: "/admin/products",
		redirect: "/admin/products/all-products",
		component: Layout,
		meta: {
			title: "Products",
			icon: "el-icon-s-shop"
		},
		children: [
			{
				path: "all-products" /* for not having children path */,
				component: () => import("../views/products/index.vue"),
				name: "AllProducts",
				meta: { title: "All Products", icon: "el-icon-box", affix: true }
			},
			{
				path: "create-product" /* for not having children path */,
				component: () => import("../views/create-product/index.vue"),
				name: "CreateProducts",
				meta: { title: "Create Product", icon: "edit", affix: true }
			}
		]
	}
];

export const router = new vueRouter({
	mode: "history",
	routes
});
