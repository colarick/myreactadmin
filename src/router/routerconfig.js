
import Loadable from "react-loadable";

// const Login = Loadable({
// 	loader: () =>
// 		import ("../view/Login/index.js"),
// 	loading: () => null
// });
const Redux= Loadable({
	loader: () =>
		import ("../view/Redux/index.js"),
	loading: () => null
})
const Layouts = Loadable({
	loader:()=> import ("../view/Layout/index.js"),
	loading:()=>null
})
const Form = Loadable({
	loader:()=>import("../view/Form/index.js"),
	loading:()=>null
})
export default {
	routes: [{
		path: '/redux',
		component:Redux
	},{
		path:"/layout",
		component:Layouts
	},{
		path:'/form',
		component:Form
		
	}]
}