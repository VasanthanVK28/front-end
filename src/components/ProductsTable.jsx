import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Chip,
  TablePagination,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Button,
  TextField,
} from "@mui/material";

export default function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filter states
  const [categoryFilter, setCategoryFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://127.0.0.1:8000/api/admin/products", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      setProducts(res.data.data);
      setFilteredProducts(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter & search handler
  const handleFilter = () => {
    let filtered = products;

    if (categoryFilter) {
      filtered = filtered.filter(
        (item) =>
          item.tags?.[0]?.toLowerCase() === categoryFilter.toLowerCase()
      );
    }
    if (brandFilter) {
      filtered = filtered.filter(
        (item) =>
          item.brand?.toLowerCase() === brandFilter.toLowerCase()
      );
    }
    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
    setPage(0);
  };

  // Reset filters
  const handleReset = () => {
    setCategoryFilter("");
    setBrandFilter("");
    setSearchQuery("");
    setFilteredProducts(products);
    setPage(0);
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <CircularProgress />
      </div>
    );
  }

  // Get unique categories
  const categories = Array.from(
    new Set(products.map((p) => p.tags?.[0]).filter(Boolean))
  );

  // Get unique brands based on selected category
  const brands = Array.from(
    new Set(
      products
        .filter((p) =>
          categoryFilter ? p.tags?.[0]?.toLowerCase() === categoryFilter.toLowerCase() : true
        )
        .map((p) => p.brand)
        .filter(Boolean)
    )
  );

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", padding: 3, borderRadius: 3, boxShadow: 3 }}>
      {/* FILTER & SEARCH SECTION */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 2,
          marginBottom: 3,
        }}
      >
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={categoryFilter}
              label="Category"
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setBrandFilter(""); // reset brand when category changes
              }}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Brand</InputLabel>
            <Select
              value={brandFilter}
              label="Brand"
              onChange={(e) => setBrandFilter(e.target.value)}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {brands.map((b) => (
                <MenuItem key={b} value={b}>
                  {b}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="contained" onClick={handleFilter}>
            Filter
          </Button>
          <Button variant="outlined" onClick={handleReset}>
            Reset
          </Button>
        </Box>

        <TextField
          label="Search by Title"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyUp={handleFilter} // search updates as you type
        />
      </Box>

      {/* TABLE */}
      <TableContainer sx={{ borderRadius: 2 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: "#f3f3f3" }}>
            <TableRow>
              <TableCell><strong>Image</strong></TableCell>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Brand</strong></TableCell>
              <TableCell><strong>Price</strong></TableCell>
              <TableCell><strong>Rating</strong></TableCell>
              <TableCell><strong>Category</strong></TableCell>
              
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredProducts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow
                  key={item._id}
                  sx={{
                    "&:hover": { backgroundColor: "#f9f9f9", cursor: "pointer" },
                  }}
                >
                  <TableCell>
                    <img
                      src={item.image_url}
                      alt={item.title}
                      width="60"
                      style={{ borderRadius: 6 }}
                    />
                  </TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.brand || "N/A"}</TableCell>
                  <TableCell>₹{item.price}</TableCell>
                  <TableCell>⭐ {item.rating || 0}</TableCell>
                  <TableCell>
                    {item.tags?.length > 0 ? (
                      <Chip label={item.tags[0]} color="primary" size="small" />
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* PAGINATION */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 50]}
        component="div"
        count={filteredProducts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ mt: 2 }}
      />
    </Paper>
  );
}
