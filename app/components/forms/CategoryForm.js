"use client";

import React from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CategoryForm({ onSubmit }) {  // Expect onSubmit prop
  const { register, handleSubmit } = useForm();  // Use react-hook-form for form handling

  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Add Category
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)}>  {/* Wrap onSubmit with handleSubmit */}
          <div className="grid grid-cols-2 gap-4 w-fit m-4">
            <div>Category:</div>
            <div>
              <input
                name="name"
                type="text"
                {...register("name", { required: true })}  // Use register from react-hook-form
                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div className="col-span-2">
              <input
                type="submit"
                value="Add"
                className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              />
            </div>
          </div>
        </form>
      </Typography>
    </Box>
  );
}
