import React, { useEffect, useState } from 'react';
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
} from '@mui/material';


import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; 

export const fetchIssuesForUser = async () => {
  const response = await axios.get(`${API_BASE_URL}/facility/issues/user`);
  return response.data;
};

export const fetchIssueById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/facility/issues/${id}`);
  return response.data;
};

export const createFacilityIssue = async (issueDetails: { title: string; description: string }) => {
  const response = await axios.post(`${API_BASE_URL}/facility/issues`, { issueDetails });
  return response.data;
};

export const addCommentToIssue = async (id: string, comment: string) => {
  const response = await axios.post(`${API_BASE_URL}/facility/issues/${id}/comment`, { comment });
  return response.data;
};

export const closeIssue = async (id: string) => {
  const response = await axios.post(`${API_BASE_URL}/facility/issues/${id}/close`);
  return response.data;
};



const FacilityIssuesPage = () => {
  const [issues, setIssues] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newIssue, setNewIssue] = useState({ title: '', description: '' });
  const [comment, setComment] = useState('');

  useEffect(() => {
    const loadIssues = async () => {
      const data = await fetchIssuesForUser();
      setIssues(data);
    };
    loadIssues();
  }, []);

  const handleCreateIssue = async () => {
    await createFacilityIssue(newIssue);
    setOpenDialog(false);
    setNewIssue({ title: '', description: '' });
    const data = await fetchIssuesForUser();
    setIssues(data);
  };

  const handleAddComment = async (id: string) => {
    await addCommentToIssue(id, comment);
    setComment('');
    const data = await fetchIssuesForUser();
    setIssues(data);
  };

  const handleCloseIssue = async (id: string) => {
    await closeIssue(id);
    const data = await fetchIssuesForUser();
    setIssues(data);
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
            <Button onClick={() => handleAddComment(issue._id)}>Add Comment</Button>
            <Button onClick={() => handleCloseIssue(issue._id)} disabled={issue.status === 'closed'}>
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
            onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })}
          />
          <TextField
            label="Description"
            fullWidth
            margin="dense"
            value={newIssue.description}
            onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })}
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
