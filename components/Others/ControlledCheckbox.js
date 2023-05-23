import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { useSelector, useDispatch } from 'react-redux';
import { filterPdts } from '@/store/filterSlice';

export default function ControlledCheckbox({name, label}) {
  const [checked, setChecked] = React.useState(false);
  const ctgName = name.toLowerCase()
  const dispatch = useDispatch()

  const handleChange = (event) => {
      setChecked(event.target.checked)

      const obj = {
        'type': (event.target.checked) ? `add_${ctgName}` : `remove_${ctgName}`,
        'label': label
      }
      dispatch(filterPdts(obj))
  }

  return (
    <Checkbox
      checked={checked}
      name={name}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
}