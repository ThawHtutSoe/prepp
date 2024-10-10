"use client";
import { useState, useEffect } from "react";
import CategoryForm from "@/app/components/forms/CategoryForm";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";

export default function Home() {
  const [category, setCategory] = useState([]);
  const [editMode, setEditMode] = useState(false);  // Manage edit mode
  const [currentCategory, setCurrentCategory] = useState(null);  // Hold the category being edited
  const [open, setOpen] = useState(false);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  const columns = [
    { field: "name", headerName: "Category Name", width: 150 },
  ];

  useEffect(() => {
    fetchCategory();
  }, []);

  async function fetchCategory() {
    const data = await fetch(`${API_BASE}/category`);
    const categories = await data.json();
    const formattedCategories = categories.map((category) => ({
      ...category,
      id: category._id,
    }));
    setCategory(formattedCategories);
  }

  const handleOpen = () => {
    setEditMode(false);  // When adding a new category, set edit mode to false
    setCurrentCategory(null);  // Reset current category
    setOpen(true);
  };

  const handleEditCategory = (category) => {
    setEditMode(true);  // Enable edit mode when editing an existing category
    setCurrentCategory(category);  // Set the category being edited
    setOpen(true);  // Open the modal for editing
  };

  function handleCategoryFormSubmit(data) {
    const method = editMode ? "PUT" : "POST";  // Use PUT for editing, POST for creating
    const url = editMode
      ? `${API_BASE}/category/${currentCategory._id}`  // Add category ID for editing
      : `${API_BASE}/category`;  // For creating a new category

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      fetchCategory();  // Refresh categories after submission
      setOpen(false);  // Close modal after submit
    });
  }

  return (
    <main>
      <div className="mx-4">
        <span>Category ({category.length})</span>
        <IconButton aria-label="new-category" color="secondary" onClick={handleOpen}>
          <AddBoxIcon />
        </IconButton>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <CategoryForm onSubmit={handleCategoryFormSubmit} />
        </Modal>
        <DataGrid
          slots={{
            toolbar: GridToolbar,
          }}
          rows={category}
          columns={columns}
          onRowClick={(params) => handleEditCategory(params.row)}  // Trigger edit on row click
        />
      </div>
    </main>
  );
}
