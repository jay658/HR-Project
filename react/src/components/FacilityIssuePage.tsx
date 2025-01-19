import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AlertCircle, MessageSquare, Plus, X } from "lucide-react";
import { AppDispatch, RootState } from "../store/store";
import {
  FacilityIssue,
  addCommentToIssue,
  closeIssue,
  createFacilityIssue,
  fetchIssuesForUser,
} from "../store/facilityIssuesSlice/facilityIssuesSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const FacilityIssuesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { issues, status, error } = useSelector(
    (state: RootState) => state.facilityIssues
  );
  const { user } = useSelector((state: RootState) => state.auth)

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [selectedIssueId, setSelectedIssueId] = useState<string>("");
  const [newIssue, setNewIssue] = useState({ title: "", description: "" });
  const [newComment, setNewComment] = useState("");
  const [formErrors, setFormErrors] = useState({
    title: "",
    description: "",
    comment: "",
  });

  useEffect(() => {
    dispatch(fetchIssuesForUser());
  }, [dispatch]);

  const validateNewIssue = () => {
    const errors = {
      title: "",
      description: "",
    };
    if (!newIssue.title.trim()) {
      errors.title = "Title is required";
    }
    if (!newIssue.description.trim()) {
      errors.description = "Description is required";
    }
    setFormErrors((prev) => ({ ...prev, ...errors }));
    return !errors.title && !errors.description;
  };

  const handleCreateIssue = async () => {
    if (!validateNewIssue()) return;

    try {
      await dispatch(createFacilityIssue(newIssue)).unwrap();
      setCreateDialogOpen(false);
      setNewIssue({ title: "", description: "" });
    } catch (err) {
      console.error("Failed to create issue:", err);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      setFormErrors((prev) => ({ ...prev, comment: "Comment is required" }));
      return;
    }

    try {
      await dispatch(
        addCommentToIssue({
          facilityIssueId: selectedIssueId,
          comment: newComment,
        })
      ).unwrap();
      setCommentDialogOpen(false);
      setNewComment("");
      setSelectedIssueId("");
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };

  const handleCloseIssue = async (issueId: string) => {
    try {
      await dispatch(closeIssue(issueId)).unwrap();
    } catch (err) {
      console.error("Failed to close issue:", err);
    }
  };

  const openCommentDialog = (issueId: string) => {
    setSelectedIssueId(issueId);
    setCommentDialogOpen(true);
  };

  const renderIssueCard = (issue: FacilityIssue) => (
    <Card key={issue._id} sx={{ mb: 2 }}>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" gutterBottom>
            {issue.title}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              px: 1,
              py: 0.5,
              borderRadius: 1,
              bgcolor:
                issue.status === "closed" ? "error.main" : 
                  issue.status === 'open' ? "success.main": "warning.main",
              color: "white",
            }}
          >
            {issue.status === 'inProgress'? 'IN PROGRESS' : issue.status.toUpperCase()}
          </Typography>
        </Stack>

        <Typography color="text.secondary" sx={{ mb: 2 }}>
          {issue.description}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          Reported on: {new Date(issue.createdAt).toLocaleDateString('en-US')}
        </Typography>

        {issue.comments.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" gutterBottom>
              Comments ({issue.comments.length})
            </Typography>
            <Stack spacing={1}>
              {issue.comments.map((comment) => (
                <Box
                  key={comment._id}
                  sx={{
                    p: 1,
                    bgcolor: "grey.50",
                    borderRadius: 1,
                    border: "1px solid",
                    borderColor: "grey.200",
                  }}
                >
                  <Typography variant="body1">{user?.username}</Typography>
                  <Typography variant="body2">{comment.description}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Posted on {new Date(comment.timestamp).toLocaleDateString('en-US')}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </>
        )}
      </CardContent>

      {issue.status !== "closed" && (
        <CardActions>
          <Button
            startIcon={<MessageSquare size={16} />}
            onClick={() => openCommentDialog(issue._id)}
          >
            Add Comment
          </Button>
          <Button
            startIcon={<X size={16} />}
            color="error"
            onClick={() => handleCloseIssue(issue._id)}
          >
            Close Issue
          </Button>
        </CardActions>
      )}
    </Card>
  );

  if (status === "loading") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: "lg", mx: "auto", p: 3 }}>
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Typography variant="h4">Facility Issues</Typography>
        <Button
          variant="contained"
          startIcon={<Plus size={16} />}
          onClick={() => setCreateDialogOpen(true)}
        >
          Create New Issue
        </Button>
      </Stack>

      {/* Error Alert */}
      {error && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                // dispatch clearError here if needed
              }}
            >
              <X size={16} />
            </IconButton>
          }
        >
          {error}
        </Alert>
      )}

      {/* Issues List */}
      <Stack spacing={2}>
        {issues.length === 0 ? (
          <Box
            sx={{
              p: 3,
              textAlign: "center",
              bgcolor: "grey.50",
              borderRadius: 1,
            }}
          >
            <AlertCircle size={48} color="gray" />
            <Typography color="text.secondary" sx={{ mt: 2 }}>
              No facility issues found. Create one to get started.
            </Typography>
          </Box>
        ) : (
          issues.map(renderIssueCard)
        )}
      </Stack>

      {/* Create Issue Dialog */}
      <Dialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create New Facility Issue</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={newIssue.title}
            onChange={(e) => {
              setNewIssue((prev) => ({ ...prev, title: e.target.value }));
              setFormErrors((prev) => ({ ...prev, title: "" }));
            }}
            error={!!formErrors.title}
            helperText={formErrors.title}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={newIssue.description}
            onChange={(e) => {
              setNewIssue((prev) => ({ ...prev, description: e.target.value }));
              setFormErrors((prev) => ({ ...prev, description: "" }));
            }}
            error={!!formErrors.description}
            helperText={formErrors.description}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateIssue} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Comment Dialog */}
      <Dialog
        open={commentDialogOpen}
        onClose={() => setCommentDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Comment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Comment"
            fullWidth
            multiline
            rows={3}
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
              setFormErrors((prev) => ({ ...prev, comment: "" }));
            }}
            error={!!formErrors.comment}
            helperText={formErrors.comment}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCommentDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddComment} variant="contained">
            Add Comment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FacilityIssuesPage;
