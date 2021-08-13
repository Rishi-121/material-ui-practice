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
} from "@material-ui/core";
import { Navbar } from "./components";
import axios from "axios";
import parser from "html-react-parser";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
  },
  loader: {
      
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
          <CircularProgress />
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
                {rowData.map(
                  (
                    { name, text, type, artist, mechanics, cardClass },
                    index
                  ) => (
                    <StyledTableRow
                      style={{
                        backgroundColor:
                          cardClass === "NEUTRAL" ? "#FFF7CB" : "#CBFBFF",
                      }}
                    >
                      <StyledTableCell>{index + 1}</StyledTableCell>
                      <StyledTableCell>
                        <b>{name}</b>
                        <br />
                        <br />
                        {parser(text)}
                      </StyledTableCell>
                      <StyledTableCell>{toCamelCase(type)}</StyledTableCell>
                      <StyledTableCell>{artist}</StyledTableCell>
                      <StyledTableCell>
                        {mechanics === undefined
                          ? ""
                          : mechanics.map((m) => (
                              <Chip
                                label={toCamelCase(m)}
                                className={classes.badge}
                              />
                            ))}
                      </StyledTableCell>
                    </StyledTableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </>
  );
};

export default DataTable;
