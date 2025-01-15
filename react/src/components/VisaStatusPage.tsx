import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";

const VisaStatusPage: React.FC = () => {
  const [visaType, setVisaType] = useState("")

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Visa Status Management
      </Typography>
      <Typography variant="body1" gutterBottom>
        Manage your work authorization documents here.
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="OPT Receipt" secondary="Status: Approved" />
        </ListItem>
        <ListItem>
          <ListItemText primary="OPT EAD" secondary="Status: Pending" />
          <Button variant="contained" size="small" color="primary">
            Upload
          </Button>
        </ListItem>
        <ListItem>
          <ListItemText primary="I-983 Form" secondary="Status: Rejected" />
          <Button variant="contained" size="small" color="secondary">
            Resubmit
          </Button>
        </ListItem>
      </List>
    </Box>
  );
};

export default VisaStatusPage;
