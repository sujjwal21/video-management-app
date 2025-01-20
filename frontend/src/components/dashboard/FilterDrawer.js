import React from "react";
import {
  Drawer,
  Box,
  Typography,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

const FilterDrawer = ({ open, onClose, filters, onFilterChange }) => {
  const [newTag, setNewTag] = React.useState("");

  const handleAddTag = () => {
    if (newTag && !filters.tags.includes(newTag)) {
      onFilterChange({
        ...filters,
        tags: [...filters.tags, newTag],
      });
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    onFilterChange({
      ...filters,
      tags: filters.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleDateRangeChange = (event) => {
    onFilterChange({
      ...filters,
      dateRange: event.target.value,
    });
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: "100%", sm: 400 } },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h6">Filter Videos</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Tags Filter */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" gutterBottom>
            Tags
          </Typography>
          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            <TextField
              size="small"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add tag"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleAddTag();
                }
              }}
            />
            <IconButton onClick={handleAddTag} color="primary">
              <AddIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {filters.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onDelete={() => handleRemoveTag(tag)}
              />
            ))}
          </Box>
        </Box>

        {/* Date Range Filter */}
        <FormControl component="fieldset" sx={{ mb: 3 }}>
          <FormLabel component="legend">Date Range</FormLabel>
          <RadioGroup
            value={filters.dateRange}
            onChange={handleDateRangeChange}
          >
            <FormControlLabel
              value="all"
              control={<Radio />}
              label="All Time"
            />
            <FormControlLabel
              value="today"
              control={<Radio />}
              label="Last 24 Hours"
            />
            <FormControlLabel
              value="week"
              control={<Radio />}
              label="Last Week"
            />
            <FormControlLabel
              value="month"
              control={<Radio />}
              label="Last Month"
            />
          </RadioGroup>
        </FormControl>

        {/* Apply Button */}
        <Button variant="contained" fullWidth onClick={onClose} sx={{ mt: 2 }}>
          Apply Filters
        </Button>
      </Box>
    </Drawer>
  );
};

export default FilterDrawer;
