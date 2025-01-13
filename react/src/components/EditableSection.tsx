import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';

interface EditableSectionProps {
  title: string;
  children: React.ReactNode;
  onSave: () => void;
  onCancel: () => void;
}

interface EditableElementProps {
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  props?: Record<string, unknown>;
}

const EditableSection: React.FC<EditableSectionProps> = ({
  title,
  children,
  onSave,
  onCancel
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to discard all changes?')) {
      setIsEditing(false);
      onCancel();
    }
  };

  const handleSave = () => {
    onSave();
    setIsEditing(false);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant='h6' sx={{ mb: 2 }}>
        {title}
      </Typography>

      {React.Children.map(children, (child) => {
        if (React.isValidElement<EditableElementProps>(child)) {
          return React.cloneElement(child, {
            ...child.props,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              if (!isEditing) setIsEditing(true);
              if (child.props.onChange) {
                child.props.onChange(e);
              }
            }
          });
        }
        return child;
      })}

      {isEditing && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant='outlined' onClick={handleCancel} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button variant='contained' onClick={handleSave}>
            Save
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default EditableSection;
