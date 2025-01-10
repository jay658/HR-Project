import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";

const HousingPage: React.FC = () => {
  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Housing Details
      </Typography>
      <Typography variant="body1" gutterBottom>
        View your assigned housing details below.
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary="Address"
            secondary="1234 Elm Street, Springfield, IL"
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Roommates"
            secondary="Jane Doe - 555-123-4567"
          />
        </ListItem>
      </List>
      <Typography variant="h5" sx={{ mt: 3 }}>
        Facility Issues
      </Typography>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Report an Issue
      </Button>
    </Box>
  );
};

export default HousingPage;
