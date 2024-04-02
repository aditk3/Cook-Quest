import React from 'react';
import PropTypes from 'prop-types';

export default function IndeterminateCheckbox({ indeterminate, className = "", ...rest }) {
  const ref = React.useRef(null)

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate])

  return (
    <div className={className}>
    <input 
    className={className + "-input"+ " cursor-pointer"}
    type="checkbox" 
    ref={ref}
    value="" 
    id="flexCheckIndeterminate" 
    {...rest}
    />
  </div>
  )
}

IndeterminateCheckbox.propTypes = {
  indeterminate: PropTypes.bool,
  className: PropTypes.string
}