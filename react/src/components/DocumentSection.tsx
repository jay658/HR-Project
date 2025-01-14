import {
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid2,
  IconButton,
  Modal,
  Paper,
  Typography
} from '@mui/material';
import { DocumentPreview, DocumentStatus } from '../types/Document';
import React, { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import DescriptionIcon from '@mui/icons-material/Description';
import DownloadIcon from '@mui/icons-material/Download';
import PreviewIcon from '@mui/icons-material/Preview';

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
  const [selectedDoc, setSelectedDoc] = useState<DocumentPreview | null>(null);
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
                <IconButton
                  size='small'
                  title='Preview'
                  onClick={() => setSelectedDoc(doc)}
                >
                  <PreviewIcon />
                </IconButton>
                <IconButton size='small' title='Download'>
                  <DownloadIcon />
                </IconButton>
                {/* NOTE: i dont think users should be able to delete 
                          documents here */}
                {/* {isEditing && (
                  <IconButton size='small' color='error' title='Delete'>
                    <DeleteIcon />
                  </IconButton>
                )} */}
              </CardActions>
            </Card>
          </Grid2>
        ))}

        {/* NOTE: i dont think users should be able to upload 
                  documents here */}
        {/* {isEditing && (
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
        )} */}
      </Grid2>

      <Modal
        open={selectedDoc !== null}
        onClose={() => setSelectedDoc(null)}
        aria-labelledby='document-preview-modal'
      >
        <Paper
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '80%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            overflow: 'auto'
          }}
        >
          <Box
            sx={{
              mb: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant='h6'>{selectedDoc?.fileName}</Typography>
            <IconButton onClick={() => setSelectedDoc(null)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* placeholder for document preview */}
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography color='text.secondary'>
              document preview will be available when connected to s3
            </Typography>
          </Box>
        </Paper>
      </Modal>
    </Box>
  );
};
