import * as React from 'react';
import { MainView } from './MainView/MainView';
import { columns } from './MainView/constants';
import { map, identity } from 'lodash/fp';

import './App.css';

const usersData = {
  '0001': {firstName: 'comfort', lastName: 'account', age: 27, status: 'relationshipnail', visits: 59},
  '0002': {firstName: 'tin', lastName: 'throne', age: 20, status: 'relationship', visits: 53},
  '0003': {firstName: 'trains', lastName: 'highway', age: 29, status: 'hand', visits: 2},
  '0004': {firstName: 'difficulty', lastName: 'clock', age: 28, status: 'single', visits: 89},
  '0005': {firstName: 'window', lastName: 'honey', age: 29, status: 'complicated', visits: 7},
}

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      tags: []
    }
  }

  updateTags = (tags) => {
    this.setState({tags});
  }

  render() {
    const dataArr = map(identity, usersData);
    return (
      <div>
        <MainView
          color='#ff0000'
          columns={columns}
          data={dataArr}
          tags={this.state.tags}
          updateTags={this.updateTags}
        />
      </div>
    );
  }
}

export default App;
