import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Board from '../post_board/Board';
import MainToDo from '../todo/MainToDo';
import Scroll from '../test/Scroll';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function MainTaps(props) {
  const [value, setValue] = React.useState(0);

  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Post Board" {...a11yProps(0)} />
          <Tab label="ToDo List" {...a11yProps(1)} />
          <Tab label="infinite scroll" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <h1 style={{'border-bottom':'solid 1px gray'}}>게시판</h1>
        <Board/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* <MainToDo /> */}
        ToDo List
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Scroll />
      </TabPanel>
    </Box>
  );
}
