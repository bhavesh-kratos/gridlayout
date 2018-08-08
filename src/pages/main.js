import React, { Component } from 'react';
// import Grid from '../components/grids';
import RGL,{ Responsive, WidthProvider } from 'react-grid-layout';
import { addArrayToData } from '../actions/routines';
import { connect } from 'react-redux';
import _ from 'lodash';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

// import Vega from 'vega';

let layout = [
    { i: 'a', x: 0, y: 0, w: 1, h: 2 },
    { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: 'c', x: 4, y: 0, w: 1, h: 2 },
    { i: 'd', x: 4, y: 0, w: 1, h: 2 },
];
class Main extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            inputval: '', layout: layout, newCounter: 0, draggable: null
        };
        this.setInput = this.setInput.bind(this);
        this.addToMainData = this.addToMainData.bind(this);
        this.onAddItem = this.onAddItem.bind(this);
        this.onRemoveItem = this.onRemoveItem.bind(this);
        this.onBreakpointChange = this.onBreakpointChange.bind(this);
    }
    onLayoutChange = layout => {
        this.setState({ layout: layout });
    };

    setInput(event) {
        this.setState({
            inputval: event.target.value
        });
    }
    addToMainData() {
        if (this.state.inputval !== null) {
            let data = this.state.inputval;
            data = data.split(",").map(Number);
            console.log(data);
            this.props.addArrayToData(data);

        }
    }
   
    onAddItem() {
        /*eslint no-console: 0*/
        console.log("adding", "n" + this.state.newCounter);
        this.setState({
            // Add a new item. It must have a unique key!
            layout: this.state.layout.concat({
                i: "n" + this.state.newCounter,
                x: (this.state.layout.length * 2) % (this.state.cols || 12),
                y: Infinity, // puts it at the bottom
                w: 2,
                h: 2
            }),
            // Increment the counter to ensure key is always unique.
            newCounter: this.state.newCounter + 1
        });
        console.log(this.state.layout)
    }

    // We're using the cols coming back from this to calculate where to add new items.
    onBreakpointChange(breakpoint, cols) {
        this.setState({
            breakpoint: breakpoint,
            cols: cols
        });
    }

    onLayoutChange(layout) {
        this.props.onLayoutChange(layout);
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
        console.log('added item')

        const i = el.add ? "+" : el.i;
        let { data } = this.props;
        let shownData = data ? `${data.join(',')} and length ${data.length}` : [];
        return (
            <div key={i} data-grid={el} style={{ background: 'blue' }} >
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
                    onClickCapture={()=>this.onRemoveItem(i)}
                >
                    x
            </span>
            </div>
        );
    }

    render() {
        let { inputval } = this.state;
        let { data } = this.props;
        let layouts = layout;
        let shownData = data ? `${data.join(',')} and length ${data.length}` : [];
        return (
            <React.Fragment>
                <input value={inputval} onInput={this.setInput} />
                <button onClick={this.addToMainData}>Save Value</button>
                <br />
                <button onClick={this.onAddItem}>Add Item</button>
                <br />
                {/* <div>something</div> */}
                {/* <Layout onLayoutChange={this.onLayoutChange}></div> */}
                <ResponsiveReactGridLayout draggableHandle={this.state.draggable} className="layout" layout={layouts} isResizable={true} onLayoutChange={this.onLayoutChange}
                    breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }} isDraggable={false}
                    cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}>
                    {_.map(this.state.layout, el => this.createElement(el))}

                </ResponsiveReactGridLayout>

            </React.Fragment>
        );
    }
}
function mapStateToProps(state) {
    return {
        data: state.chartData.data,
    };
}

export default connect(mapStateToProps, { addArrayToData })(Main);


