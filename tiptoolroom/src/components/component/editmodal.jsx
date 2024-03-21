import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function EditModal({ onEdit, initialInvoice }) {
    const [editableInvoice, setEditableInvoice] = useState(initialInvoice);

    const handleInputChange = (e, field) => {
        setEditableInvoice({
            ...editableInvoice,
            [field]: e.target.value,
        });
    };

    const handleSubmit = () => {
        // Define the request options
        const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editableInvoice)
        };

        // Make the PUT request
        fetch(`http://localhost:6969/items/${editableInvoice.i_id}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log('Item updated:', data);
                // Optionally, you can call the onEdit callback here if you need to update the parent component's state
                onEdit(editableInvoice);
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
                <Input
                 id="images"
                 value={editableInvoice.images}
                 onChange={(e) => handleInputChange(e, 'images')}
                 className="col-span-2 h-8"
                />
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
