/* eslint-disable flowtype/require-valid-file-annotation */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {withStyles} from 'material-ui/styles';
import withRoot from '../components/withRoot';
import Paper from 'material-ui/Paper';

import TopNavigation from '../containers/TopNavigation';
import PasteBin from '../containers/Pastebin';
import ExpressionPopover from '../containers/ExpressionPopover';
// import BottomNavigation from '../containers/bottomNavigation'; <BottomNavigation/>

const styles = {
  root: {
    height: '99.9%'
  },
};

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {unsusbscribe: () => ({})};
  }

  render() {
    const {classes} = this.props;
    return (
      <Paper className={classes.root}>
        <TopNavigation/>
        <PasteBin/>
        <ExpressionPopover/>
      </Paper>
    );
  }

  componentDidMount() {
    this.setState({
      unsusbscribe:
        this.context.store.subscribe(() => {

        })
    });

  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

Index.contextTypes = {
  store: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(Index));
