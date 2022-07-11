import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

import axios from 'axios';
import WritePost from './WritePost';
import Post from './Post';

const columns = [
  { id: 'ID_NUM', label: 'No', minWidth: 30, align: 'center' },
  { id: 'TITLE', label: '제목', minWidth: 300, align: 'center'},
  { id: 'WRITER', label: '작성자', minWidth: 50, align: 'center' },
  { id: 'W_DATE', label: '작성일', minWidth: 80, align: 'center' },
];

export default function Board() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [rows, setRows] = React.useState([]);
  const [writingOpen, setWritingOpen] = React.useState(false)
  const [postOpen, setPostOpen] = React.useState(false);
  const [postOpenNum, setPostOpenNum] = React.useState();

  const [W_DATE, setW_DATE] = React.useState();

  const setDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    // const hour = today.getHours();
    // const minute = today.getMinutes();
    // const Second = today.getSeconds();
    // setW_DATE(year + '-' + month  + '-' + day);
    setW_DATE(''+today);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleWritingOpenOrClose = () => {
    setWritingOpen(writingOpen ? false : true);
  }

  const handlePostOpenOrClose = () => {
    setPostOpen(postOpen ? false : true);
  }

  const loadRows = async() => {
    await axios.get('selectAll').then(res => {
      setRows(res.data);
      
      console.log(res.data);
    }).catch(err => {
      console.log(err); 
    })
  }

  React.useEffect(() => {
    loadRows();
    setDate();
  }, []);

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from(rows)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.ID_NUM} onClick={()=>{setPostOpenNum(row.ID_NUM); handlePostOpenOrClose();}}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.id === 'TITLE' ? 'left' : column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <div style={{padding:'10px'}} />
      <nav style={{float: 'right'}}>
        <Button variant="outlined" onClick={handleWritingOpenOrClose}>
          글쓰기
        </Button>
      </nav>

      <Dialog
        open={writingOpen}
        onClose={handleWritingOpenOrClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <WritePost close={handleWritingOpenOrClose} loadRows={loadRows} date={W_DATE}/>
      </Dialog>

      <Dialog
        open={postOpen}
        onClose={handlePostOpenOrClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Post close={handlePostOpenOrClose} loadRows={loadRows} ID_NUM={postOpenNum} date={W_DATE} />
      </Dialog>
    </>
  );
}
