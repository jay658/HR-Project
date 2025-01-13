import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid2,
  IconButton,
  Typography
} from '@mui/material';
import { DocumentPreview, DocumentStatus } from '../types/Document';

import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import DownloadIcon from '@mui/icons-material/Download';
import React from 'react';

interface DocumentsSectionProps {
  isEditing: boolean;
}

const getStatusColor = (status: DocumentStatus) => {
  switch (status) {
    case 'approved':
      return 'success';
    case 'rejected':
      return 'error';
    default:
      return 'warning';
  }
};

export const DocumentsSection: React.FC<DocumentsSectionProps> = ({
  isEditing
}) => {
  // test data until S3 is set up
  const dummyDocs: DocumentPreview[] = [
    {
      _id: '1',
      type: 'optReceipt',
      status: 'pending',
      fileName: 'opt-receipt.pdf'
    },
    {
      _id: '2',
      type: 'i983',
      status: 'approved',
      fileName: 'i983-form.pdf'
    }
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant='h6' sx={{ mb: 2 }}>
        Documents
      </Typography>

      <Grid2 container spacing={2}>
        {dummyDocs.map((doc) => (
          <Grid2 key={doc._id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card variant='outlined'>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <DescriptionIcon sx={{ mr: 1 }} />
                  <Typography variant='subtitle2' noWrap>
                    {doc.fileName}
                  </Typography>
                </Box>
                <Chip
                  label={doc.status}
                  size='small'
                  color={getStatusColor(doc.status)}
                  sx={{ mb: 1 }}
                />
                <Typography variant='body2' color='text.secondary'>
                  Type: {doc.type}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton size='small' title='Download'>
                  <DownloadIcon />
                </IconButton>
                {isEditing && (
                  <IconButton size='small' color='error' title='Delete'>
                    <DeleteIcon />
                  </IconButton>
                )}
              </CardActions>
            </Card>
          </Grid2>
        ))}

        {isEditing && (
          <Grid2 size={{ xs: 12 }}>
            <Button
              variant='contained'
              component='label'
              startIcon={<DescriptionIcon />}
            >
              Upload Document
              <input
                type='file'
                hidden
                accept='.pdf,.doc,.docx,.png,.jpg,.jpeg'
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    console.log('Upload document:', file);
                  }
                }}
              />
            </Button>
          </Grid2>
        )}
      </Grid2>
    </Box>
  );
};
