/**
 * Created by Administrator on 2018/5/22.
 */

class Component {
    constructor(props={}){
        this.state = {};
        this.props = props;
    }

    setState(stateChange){
        // 将修改合并到 state
        Object.assign(this.state,stateChange);
    }
}