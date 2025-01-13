import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';

interface EditableSectionProps {
  title: string;
  children: React.ReactNode;
  onSave: () => void;
  onCancel: () => void;
}

// interface EditableElementProps {
//   disabled?: boolean;
//   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   props?: Record<string, unknown>;
// }

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

  const recursiveCloneChildren = (
    children: React.ReactNode
  ): React.ReactNode => {
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) {
        return child;
      }

      const childProps = {
        disabled: !isEditing,
        children: child.props.children
      };

      if (child.props.children) {
        childProps.children = recursiveCloneChildren(child.props.children);
      }

      return React.cloneElement(child, childProps);
    });
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}
      >
        <Typography variant='h6' sx={{ mb: 2 }}>
          {title}
        </Typography>
        {!isEditing && (
          <Button variant='contained' onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        )}
      </Box>

      {recursiveCloneChildren(children)}

      {/* {React.Children.map(children, (child) => {
        // if (React.isValidElement<EditableElementProps>(child)) {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...child.props,
            disabled: !isEditing
          });
        }
        return child;
      })} */}

      {/* save & cancel btns */}
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
