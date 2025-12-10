import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  Button,
  Stack,
  Typography,
  TablePagination,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

export default function ProductTable() {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [brandFilter, setBrandFilter] = useState("");

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/scraped-products")
      .then((res) => {
        if (res.data.success) {
          const formatted = res.data.data.map((item, index) => ({
            id: index + 1,
            title: item.title,
            brand: item.brand,
            price: item.price !== undefined ? Number(item.price) : 0,
            rating: item.rating,
            image_url: item.image_url,
          }));
          setRows(formatted);
          setFilteredRows(formatted);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
    applyFilters(text, brandFilter);
    setPage(0); // Reset to first page after filter
  };

  const handleFilter = () => {
    applyFilters(searchText, brandFilter);
    setPage(0);
  };

  const handleReset = () => {
    setSearchText("");
    setBrandFilter("");
    setFilteredRows(rows);
    setPage(0);
  };

  const applyFilters = (search, brand) => {
    let temp = [...rows];
    if (search) {
      temp = temp.filter(
        (row) =>
          row.title.toLowerCase().includes(search.toLowerCase()) ||
          row.brand.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (brand) {
      temp = temp.filter((row) => row.brand === brand);
    }
    setFilteredRows(temp);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Get unique brands
  const brands = [...new Set(rows.map((r) => r.brand))];

  return (
    <Box sx={{ p: 2 }}>
      {/* Filters */}
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Stack direction="row" spacing={1}>
          <Select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            displayEmpty
            size="small"
          >
            <MenuItem value="">Brand</MenuItem>
            {brands.map((b) => (
              <MenuItem key={b} value={b}>
                {b}
              </MenuItem>
            ))}
          </Select>

          <Button variant="contained" onClick={handleFilter}>
            Filter
          </Button>
          <Button variant="outlined" onClick={handleReset}>
            Reset
          </Button>
        </Stack>

        <TextField
          size="small"
          placeholder="Search by Title or Brand"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </Stack>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <img
                      src={row.image_url}
                      alt="product"
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "contain",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{row.title}</Typography>
                  </TableCell>
                  <TableCell>{row.brand}</TableCell>
                  <TableCell>₹{row.price}</TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <StarIcon sx={{ fontSize: 16, color: "#FFD700" }} />
                      <Typography>{row.rating}</Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={filteredRows.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </TableContainer>
    </Box>
  );
}
