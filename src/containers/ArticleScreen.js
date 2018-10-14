import { connect } from 'react-redux';
import { compose, withState } from 'recompose';

import ArticleScreen from '../screens/ArticleScreen';

export default compose(
  connect(
    state => ({

    }),
  ),
  withState('isExtended', 'setIsExtended', false),
)(ArticleScreen);
