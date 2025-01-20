import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  CircularProgress,
  Pagination,
  Card,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import axios from "axios";
import VideoCard from "../video/VideoCard";
import FilterDrawer from "./FilterDrawer";

const Dashboard = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    tags: [],
    dateRange: "all",
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/videos?page=${page}&search=${search}&tags=${filters.tags.join(
          ","
        )}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setVideos(response.data.videos);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError("Failed to fetch videos");
      console.error("Error fetching videos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [page, search, filters]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom marginTop="65px">
          My Videos
        </Typography>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search videos..."
            value={search}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ bgcolor: "background.paper" }}
          >
            <FilterListIcon />
          </IconButton>
        </Box>
        {filters.tags.length > 0 && (
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {filters.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onDelete={() =>
                  handleFilterChange({
                    ...filters,
                    tags: filters.tags.filter((t) => t !== tag),
                  })
                }
              />
            ))}
          </Box>
        )}
      </Box>

      {/* Videos Grid */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : videos.length === 0 ? (
        <Card
          sx={{
            p: 4,
            textAlign: "center",
            bgcolor: "background.paper",
          }}
        >
          <Typography variant="h6" gutterBottom>
            No videos found
          </Typography>
          <Typography color="text.secondary">
            Try adjusting your search or filters, or upload a new video
          </Typography>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {videos.map((video) => (
            <Grid item xs={12} sm={6} md={4} key={video._id}>
              <VideoCard video={video} onDelete={fetchVideos} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}

      {/* Filter Drawer */}
      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
    </Box>
  );
};

export default Dashboard;
