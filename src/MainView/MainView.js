import * as React from 'react';
import ReactTable from 'react-table';
import TagsInput from 'react-tagsinput';

import 'react-table/react-table.css'
import 'react-tagsinput/react-tagsinput.css'
import './MainView.css';

// Dynamic composition: The composition is created when the render method is executed
// Total isolation between wrapping behavior and whats inside. No communication
class WithBorder2 extends React.Component {
  constructor(props) {
    super();
  
    this.state = {
      borderColor: props.color
    }
  }
  
  onMouseEnter = () => {
    this.setState({ borderColor: '#000' });
  }
  
  onMouseLeave = () => {
    this.setState({ borderColor: this.props.color });
  }
  
  render() {
    return (
      <div
        className='withBorder'
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        style={{ borderColor: this.state.borderColor }}
      >
        {this.props.children}
      </div>
    );
  }
}

const withState = (InnerComp) => class OuterComp extends React.Component {
  constructor(props) {
    super();

    this.state = {
      myState: props.initialStateValue
    };
  }

  updateState = (newValue) => this.setState({ myState: newValue });

  render() {
    console.log(this.state);
    const innerCompProps = {
      stateValue: this.state.myState,
      updateState: this.updateState
    }
    return (
      <InnerComp {...this.props} {...innerCompProps} />
    )
  }
}

const StatelessWithBorder = props => (
  <div
    className='withBorder'
    style={{ borderColor: props.stateValue }}
    onMouseEnter={() => props.updateState('#000')}
    onMouseLeave={() => props.updateState(props.color)}
  >
    {props.children}
  </div>
)

const WithBorder = withState(StatelessWithBorder);

// Static Composition: The composition is now created during class creation time and not the render time
// Repackage into a new Component
// const TableWithBorder = props => (
//   <WithBorder color={props.color}>
//     <ReactTable 
//       columns={props.columns}
//       data={props.data}
//       defaultPageSize={5}
//     />
//   </WithBorder>
// )

// const TagsWithBorder = props => (
//   <WithBorder color={props.color}>
//     <TagsInput value={props.value} onChange={props.onChange}/>
//   </WithBorder>
// )


// HOC
// Props collision is the problem. Change name to reduce collisions
const withBorderHOC = (InnerComp) => (props) => (
  <WithBorder color={props.color}>
    <InnerComp {...props} />
  </WithBorder>
)

const TableWithBorder = withBorderHOC(ReactTable);
const TagsWithBorder = withBorderHOC(TagsInput);


export class MainView extends React.Component {
  updateTags = newTags => {
    this.props.updateTags(newTags);
  }

  render() {
    return (
      <div className='mainContainer'>
        <div className='tableContainer'>
          <TableWithBorder
            color={this.props.color}
            columns={this.props.columns}
            data={this.props.data}
            defaultPageSize={5}
          />
        </div>
        <div className='tagsContainer'>
          <TagsWithBorder
            color={this.props.color}
            value={this.props.tags}
            onChange={this.updateTags}
          />
        </div>
      </div>
    );
  }
}
