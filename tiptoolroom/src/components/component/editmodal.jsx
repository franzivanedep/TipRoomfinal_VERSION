import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function EditModal({ onEdit, initialInvoice }) {
    const [editableInvoice, setEditableInvoice] = useState(initialInvoice);
    const [selectedFile, setSelectedFile] = useState(null); // New state for the selected file

    const handleInputChange = (e, field) => {
        setEditableInvoice({
            ...editableInvoice,
            [field]: e.target.value,
        });
    };


    const handleSubmit = () => {
      const formData = new FormData();
     
      // Conditionally append fields to formData
      if (selectedFile) {
         formData.append('images', selectedFile);
      }
      if (editableInvoice.name !== initialInvoice.name) {
         formData.append('name', editableInvoice.name);
      }
      if (editableInvoice.quantity !== initialInvoice.quantity) {
         formData.append('quantity', editableInvoice.quantity);
      }
      if (editableInvoice.ct_id !== initialInvoice.ct_id) {
         formData.append('ct_id', editableInvoice.ct_id);
      }
     
      const requestOptions = {
         method: "PUT",
         body: formData
      };
     
      // Make the PUT request
      fetch(`http://localhost:6969/up/items/${editableInvoice.i_id}`, requestOptions)
         .then(response => {
           // Check if the response is JSON
           const contentType = response.headers.get("content-type");
           if (contentType && contentType.indexOf("application/json") !== -1) {
             return response.json();
           } else {
             // Handle non-JSON response (e.g., plain text)
             return response.text().then(text => ({ message: text }));
           }
         })
         .then(data => {
           alert('Item updated:', data);
           onEdit(editableInvoice); // Assuming this updates the parent component's state
           window.location.reload(); // Refresh the page
         })
         .catch(error => console.error('Error updating item:', error));
     };
     
     
  

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Edit</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Edit Item</h4>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="name">Name</Label>
                <Input
                 id="name"
                 value={editableInvoice.name}
                 onChange={(e) => handleInputChange(e, 'name')}
                 className="col-span-2 h-8"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                 id="quantity"
                 value={editableInvoice.quantity}
                 onChange={(e) => handleInputChange(e, 'quantity')}
                 className="col-span-2 h-8"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="ct_id">Category ID</Label>
                <Input
                 id="ct_id"
                 value={editableInvoice.ct_id}
                 onChange={(e) => handleInputChange(e, 'ct_id')}
                 className="col-span-2 h-8"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="images">Image URL</Label>
                <Input id="image" type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />

              </div>
            </div>
            <div className="text-right">
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
}
