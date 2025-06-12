import { Controller, Control, FieldValues, Path } from "react-hook-form";

import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Generic FormFieldProps type, allows type-safe fields for any form shape
interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;                     // react-hook-form control object
  name: Path<T>;                           // The field name (typed for safety)
  label: string;                           // Label to display above the input
  placeholder?: string;                    // Optional placeholder text
  type?: "text" | "email" | "password";    // Input type (default: text)
}

// Generic form field component for use with react-hook-form and UI components
const FormField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
}: FormFieldProps<T>) => {
  return (
    // Controller connects the field to react-hook-form state/validation
    <Controller
      control={control}    // Pass down the control instance
      name={name}          // Name of the field to bind
      render={({ field }) => (
        // FormItem wraps all field components (label, input, error message)
        <FormItem>
          {/* Render the label */}
          <FormLabel className="label">{label}</FormLabel>
          {/* Input control */}
          <FormControl>
            <Input
              className="input"
              type={type}
              placeholder={placeholder}
              {...field}           // Binds input value, onChange, etc.
            />
          </FormControl>
          {/* Show validation errors (if any) */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormField;
