import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

// Utility to retrieve the token from localStorage
const getAuthToken = () => localStorage.getItem("token");

// Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${getAuthToken()}`,
  },
});

// API calls
export const fetchIssuesForUser = async () => {
  const response = await axiosInstance.get(`/facility/user`);
  return response.data;
};

export const fetchIssueById = async (id: string) => {
  const response = await axiosInstance.get(`/facility/issue/${id}`);
  return response.data;
};

export const fetchIssuesForApartment = async (apartmentId: string) => {
  const response = await axiosInstance.get(
    `/facility/apartment/${apartmentId}`
  );
  return response.data;
};

export const createFacilityIssue = async (issueDetails: {
  title: string;
  description: string;
}) => {
  const response = await axiosInstance.post(`/facility/create`, issueDetails);
  return response.data;
};

export const addCommentToIssue = async (
  facilityIssueId: string,
  comment: string
) => {
  const response = await axiosInstance.put(
    `/facility/comment/${facilityIssueId}`,
    { comment }
  );
  return response.data;
};

export const closeIssue = async (facilityIssueId: string) => {
  const response = await axiosInstance.put(
    `/facility/close/${facilityIssueId}`
  );
  return response.data;
};

// Component
const FacilityIssuesPage = () => {
  const [issues, setIssues] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newIssue, setNewIssue] = useState({ title: "", description: "" });
  const [comment, setComment] = useState("");

  // Load issues for user on component mount
  useEffect(() => {
    const loadIssues = async () => {
      try {
        const data = await fetchIssuesForUser();
        setIssues(data);
      } catch (error) {
        console.error("Error fetching issues:", error);
      }
    };
    loadIssues();
  }, []);

  const handleCreateIssue = async () => {
    try {
      await createFacilityIssue(newIssue);
      setOpenDialog(false);
      setNewIssue({ title: "", description: "" });
      const data = await fetchIssuesForUser();
      setIssues(data);
    } catch (error) {
      console.error("Error creating issue:", error);
    }
  };

  const handleAddComment = async (facilityIssueId: string) => {
    try {
      await addCommentToIssue(facilityIssueId, comment);
      setComment("");
      const data = await fetchIssuesForUser();
      setIssues(data);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleCloseIssue = async (facilityIssueId: string) => {
    try {
      await closeIssue(facilityIssueId);
      const data = await fetchIssuesForUser();
      setIssues(data);
    } catch (error) {
      console.error("Error closing issue:", error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Facility Issues
      </Typography>
      <Button variant="contained" onClick={() => setOpenDialog(true)}>
        Create New Issue
      </Button>
      <List>
        {issues.map((issue: any) => (
          <ListItem key={issue._id}>
            <ListItemText
              primary={issue.title}
              secondary={`Status: ${issue.status} - ${issue.description}`}
            />
            <Button onClick={() => handleAddComment(issue._id)}>
              Add Comment
            </Button>
            <Button
              onClick={() => handleCloseIssue(issue._id)}
              disabled={issue.status === "closed"}
            >
              Close Issue
            </Button>
          </ListItem>
        ))}
      </List>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Create Facility Issue</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            margin="dense"
            value={newIssue.title}
            onChange={(e) =>
              setNewIssue({ ...newIssue, title: e.target.value })
            }
          />
          <TextField
            label="Description"
            fullWidth
            margin="dense"
            value={newIssue.description}
            onChange={(e) =>
              setNewIssue({ ...newIssue, description: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateIssue}>Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FacilityIssuesPage;
