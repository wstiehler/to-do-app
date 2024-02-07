import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'ToDoList',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    )
  },
];
