import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VideoUpload = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    videoUrl: "",
    keywords: "",
    title: "",
    description: "",
    driveFileId: "",
    driveFileUrl: "",
    tags: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/videos",
        {
          driveFileUrl: formData.videoUrl,
          tags: formData.keywords.split(",").map((tag) => tag.trim()),
          title: formData.title,
          description: formData.description,
          driveFileId: formData.driveFileId || 1,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Error uploading video");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography
          component="h1"
          variant="h3"
          sx={{ mb: 1, color: "primary.main", fontWeight: "bold" }}
        >
          Now Repurpose long video, 10x faster.
        </Typography>

        <Typography variant="subtitle1" sx={{ mb: 6, color: "text.secondary" }}>
          Siera allows you to create new video content in just a few clicks,
          saving you time and effort.
        </Typography>

        <Paper
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "100%",
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 3,
            backgroundColor: "white",
            borderRadius: 2,
            color: "text.secondary" 
          }}
        >
          <TextField
            fullWidth
            label="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            variant="outlined"
            sx={{ mb: 3, backgroundColor: "#F7FAFC", color: "primary.main" }}
          />
          <TextField
            fullWidth
            label="Paste your video link ( Link, Youtube, Loom etc )"
            value={formData.videoUrl}
            onChange={(e) =>
              setFormData({ ...formData, videoUrl: e.target.value })
            }
            variant="outlined"
            sx={{ backgroundColor: "#F7FAFC", color: "black" }}
          />
          <TextField
            fullWidth
            label="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            variant="outlined"
            multiline
            rows={4}
            sx={{ mb: 3, color: "black" }}
          />

          <TextField
            fullWidth
            label="DriveFileId"
            value={formData.driveFileId}
            onChange={(e) =>
              setFormData({ ...formData, driveFileId: e.target.value })
            }
            variant="outlined"
            multiline
            sx={{ mb: 3, color: "black" }}
          />
          <TextField
            fullWidth
            label="Keywords to include relevant data"
            value={formData.keywords}
            onChange={(e) =>
              setFormData({ ...formData, keywords: e.target.value })
            }
            variant="outlined"
            multiline
            rows={4}
            sx={{
              backgroundColor: "gray",
              color: "black"
            }}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              py: 2,
              backgroundColor: "primary.main",
              color: "white",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            {loading ? "Processing..." : "Call to Action"}
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default VideoUpload;
