import React, {
	Component
} from "react";
import {
	connect
} from "react-redux";
import {
bindActionCreators		
} from "redux";
import * as TodoActionCreators from "../../store/action/test.js"
//import {add} from "@/store/action/test.js" //@别名

class Main extends Component {
	constructor(props){
		super(props)
		this.testadd=this.testadd.bind(this);
	}
	render() {
		
		return <div>主页
			{/* {console.log(this.props.add())} 调用action*/}
			<p>{this.props.addnum}</p>
			<p onClick={this.testadd}>点击</p>
		</div>
	}
	testadd(){
		
		this.props.add();
	}
}


const mapStateToProps = (state, ownProps) => ( {

	addnum: state.reducer1.addnum
})

const mapDispatchToProps = (dispatch, ownProps) => {
	return  bindActionCreators(TodoActionCreators, dispatch)
	

}
export default connect(mapStateToProps, mapDispatchToProps)(Main);