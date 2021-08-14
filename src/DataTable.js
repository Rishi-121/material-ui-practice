import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
  TableFooter,
  TablePagination,
} from "@material-ui/core";
import { Navbar } from "./components";
import axios from "axios";
import parser from "html-react-parser";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "70vh",
  },
  table: {
    minWidth: 700,
  },
  badge: {
    margin: theme.spacing(0.5),
  },
}));

const DataTable = () => {
  const classes = useStyles();

  const [rowData, setRowData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  const rowsPerPage = 5;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rowData.length - page * rowsPerPage);

  const getRowData = async () => {
    try {
      setError(null);
      setLoading(true);

      const { data } = await axios.get(
        "https://my-json-server.typicode.com/dbevin/mock/cards"
      );

      setRowData(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  const toCamelCase = (str) => {
    str = str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (match, index) {
      return index === 0 ? match.toUpperCase() : match.toLowerCase();
    });

    return str;
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    getRowData();
  }, []);

  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container className={classes.container}>
        {error ? (
          ""
        ) : loading ? (
          <div className={classes.loader}>
            <CircularProgress />
          </div>
        ) : (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>S.No</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Type</StyledTableCell>
                  <StyledTableCell>Artist</StyledTableCell>
                  <StyledTableCell>Mechanics</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? rowData.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : rowData
                ).map(
                  (
                    { name, text, type, artist, mechanics, cardClass },
                    index
                  ) => (
                    <TableRow
                      style={{
                        backgroundColor:
                          cardClass === "NEUTRAL" ? "#FFF7CB" : "#CBFBFF",
                      }}
                      key={index}
                    >
                      <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                      <TableCell>
                        <b>{name}</b>
                        <br />
                        <br />
                        {parser(text)}
                      </TableCell>
                      <TableCell>{toCamelCase(type)}</TableCell>
                      <TableCell>{artist}</TableCell>
                      <TableCell>
                        {!mechanics
                          ? ""
                          : mechanics.map((m, index) => (
                              <Chip
                                label={toCamelCase(m)}
                                className={classes.badge}
                                key={index}
                              />
                            ))}
                      </TableCell>
                    </TableRow>
                  )
                )}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 93 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5]}
                    count={rowData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handlePageChange}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        )}
      </Container>
    </>
  );
};

export default DataTable;
