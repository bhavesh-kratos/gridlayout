import React, { Component } from 'react';
// import Grid from '../components/grids';
import RGL,{ Responsive, WidthProvider } from 'react-grid-layout';
import { addArrayToData, addItemOperation } from '../actions/routines';
import { connect } from 'react-redux';
import _ from 'lodash';
import OperationModal from "./op-modal";
import {getOperationsValue} from '../store/selectors/operationSelector';
const ResponsiveReactGridLayout = WidthProvider(Responsive);


// import Vega from 'vega';
// function which returns object of operations on main data
export function operations(data){
 let returnValue = (val) => data ? val.apply(null,data) : '';   //returns empty string if data is null or undefined;
 return {
     'max': returnValue(Math.max),
     'min': returnValue(Math.min),
 };   
}

let layout = [
    // { i: 'a', x: 0, y: 0, w: 1, h: 2 },
    // { i: 'b', x: 1, y: 0, w: 4, h: 2, minW: 2, maxW: 12 },
    // { i: 'c', x: 4, y: 0, w: 1, h: 2 },
    // { i: 'd', x: 4, y: 0, w: 1, h: 2 },
];
class Main extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            inputval: '', layout: layout, newCounter: 0, draggable: null, 
            // operationOnMainData: operations(this.props),  have to reinstantiate value on props change, if use this way
            value: Object.keys(operations())[0], // as of nor putting static value
            showModal: false
        };
        this.setInput = this.setInput.bind(this);
        this.addToMainData = this.addToMainData.bind(this);
        this.onRemoveItem = this.onRemoveItem.bind(this);
        this.onBreakpointChange = this.onBreakpointChange.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount(){
            this.createMultipleItem(100);
    }

    setInput(event) {
        this.setState({
            inputval: event.target.value
        });
    }

    // send saved array value in input box to reducer, you can perform checks at this level or action level
    addToMainData() {
        if (this.state.inputval !== null) {
            let data = this.state.inputval;
            data = data ? data.split(",").map(Number): data; //maps each value as number
            console.log(data);
            this.props.addArrayToData(data);
        }
    }

    // method for creating new item's layout
    onAddingItem(counter) {
        /*eslint no-console: 0*/
        console.log("adding", "n" + counter);
        this.setState(prevstate => {
            // Add a new item. It must have a unique key!
            return {layout: prevstate.layout.concat({
                i: "n" + counter,
                x: (this.state.layout.length * 2) % (this.state.cols || 12),
                y: Infinity, // puts it at the bottom
                w: 2,
                h: 2
            }),
            // Increment the counter to ensure key is always unique.
            newCounter: counter + 1
        }});
        console.log(this.state.layout)
    }

    handleOpenModal () {
        this.setState({ showModal: true });
    }
    
    handleCloseModal () {
        this.setState({ showModal: false });
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }

    //method for testing purpose only, creates multiple components used in componentdidmount 
    createMultipleItem(n){
        console.log('called createee')
        let {value} = this.state;
        for(let i=0;i<n;i++){
        if(value){
            let payload = {["n" + i]: value};   //key is the item-name(to be created) and value is operation name
            this.props.addItemOperation(payload);
            this.onAddingItem(i);
        }
    }
    }
    // saves operation for item to be created, dispatch action and creates item's layout
    handleSubmit(event){
        console.log('here');
        event.preventDefault();
        let {value} = this.state;
        if(value){
            let payload = {["n" + this.state.newCounter]: value};   //key is the item-name(to be created) and value is operation name
            this.props.addItemOperation(payload);
            this.onAddingItem(this.state.newCounter);
        }
        // alert('item ' + this.state.newCounter+ 'with operation' + value+ 'created');

        // not handling case for no value because we're setting a default select value
    }

    operationsSelector = () => {
        let operationTypes = Object.keys(operations(this.props.data));
        if(this.props){
        return(<form onSubmit={this.handleSubmit}>
        <label>
          Pick operation for item:
          <select value={this.state.value} onChange={this.handleChange}>
          {console.log('data', operations(this.props.data).keys)}
            {operationTypes.map(op => {
                return <option key={op} value={op}>{op.toUpperCase()}</option>
            })}
          </select>
        </label>
        <br/>
        <input type="submit" value="Create Item" />
        </form>);
        }
        return null;
    }

    // We're using the cols coming back from this to calculate where to add new items.
    onBreakpointChange(breakpoint, cols) {
        this.setState({
            breakpoint: breakpoint,
            cols: cols
        });
    }

    onLayoutChange = (layout)=> {
        this.setState({ layout: layout });
    }

    onRemoveItem(i) {
        console.log('hereeeee')
        console.log("removing", i);
        this.setState({ layout: _.reject(this.state.layout, { i: i }) });
    }

    createElement(el) {
        const removeStyle = {
            position: "absolute",
            right: "2px",
            top: 0,
            cursor: "pointer"
        };
        // console.log(this.state.operationOnMainData['max'])
        const i = el.i;
        let { data, operationData, operationValues} = this.props;
        let operationName = operationData[el.i];
        let operationValue = operationValues[operationName];
        let shownData = data ? `${data.join(',')} and ${operationName} operation's value: ${operationValue}` : `${operationName}`; //replace with item's operation array data coming through selector
        return (
            <div key={i} data-grid={el} style={{ background: 'orange' }} >
                {el.add ? (
                    <span
                        className="add text"
                        onClick={this.onAddItem}
                        title="You can add an item by clicking here, too."
                    >
                        Add +
              </span>
                ) : (
                        <span className="text">{i}<br />{shownData}</span>
                    )}
                <span
                    className="remove"
                    style={removeStyle}
                    onClick={()=>this.onRemoveItem(i)}
                >
                    x
            </span>
            </div>
        );
    }

    onResize() {
        this.setState({forceRenderAfterResize: Date.now()})
    }

    render() {
        let { inputval, showModal } = this.state;
        let { data } = this.props;
        let layouts = layout;
        let shownData = data ? `${data.join(',')} and length ${data.length}` : [];
        return (
            <React.Fragment>
                <div>
                <input value={inputval} onInput={this.setInput} />
                <button onClick={this.addToMainData}>Save Value</button>
                <br />
                <button onClick={this.handleOpenModal}>Add Item</button>
                <br />
                {/* <div>something</div> */}
                {/* <Layout onLayoutChange={this.onLayoutChange}></div> */}
                <div>
                </div>

                <ResponsiveReactGridLayout draggableHandle={this.state.draggable} className="layout"  isResizable={true} onLayoutChange={this.onLayoutChange}
                    breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }} 
                    style={{position: 'relative'}}
                    measureBeforeMount={false}
                    useCSSTransforms={true}
                    // rowHeight={70}
                    verticalCompact={true}
                    onResize={this.onResize.bind(this)}
                    // compactType={"horizontal"}
                    isResizable={true}
                    cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}>
                    {_.map(this.state.layout, el => this.createElement(el))}

                </ResponsiveReactGridLayout>
                <OperationModal showModal={showModal} handleOpenModal={this.handleOpenModal} handleCloseModal={this.handleCloseModal} operationsSelector={this.operationsSelector}/>
                </div>
            </React.Fragment>
        );
    }
}

Main.defaultProps ={data: []};
function mapStateToProps(state) {
    console.log('map state to props')
    return {
        data: state.chartData.data,
        operationData: state.items.operationData, //data showing operation for each item
        operationValues: getOperationsValue(state)
    };
}

export default connect(mapStateToProps, { addArrayToData, addItemOperation })(Main);


