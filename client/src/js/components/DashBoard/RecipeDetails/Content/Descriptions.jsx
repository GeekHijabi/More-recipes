import React from 'react';
import PropTypes from 'prop-types';

const Description = props => (
  <div
    className={props.activeTab.name === 'Descriptions' ?
    'steps tab-pane fade show active' :
    'steps tab-pane fade'}
    id="directions"
    role="tabpanel"
    aria-labelledby="directions-tab"
  >
    <div className="step">
      <h5>Steps</h5>
      <p className="step_details">
        {props.description}
      </p>
    </div>
  </div>
);
Description.defaultProps = {
  description: '',
};

Description.propTypes = {
  description: PropTypes.string,
  activeTab: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default Description;
