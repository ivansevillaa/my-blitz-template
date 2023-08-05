import { ErrorMessage } from "@hookform/error-message";
import { TextInput } from "@mantine/core";
import { ComponentPropsWithoutRef, forwardRef, PropsWithoutRef } from "react";
import { useFormContext } from "react-hook-form";

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string;
  /** Field label. */
  label: string;
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number";
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>;
  labelProps?: ComponentPropsWithoutRef<"label">;
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ label, outerProps, labelProps, name, ...props }, ref) => {
    const {
      register,
      formState: { isSubmitting, errors },
    } = useFormContext();

    return (
      <div {...outerProps}>
        <TextInput
          label={label}
          labelProps={labelProps}
          disabled={isSubmitting}
          {...register(name)}
        />

        <ErrorMessage
          render={({ message }) => (
            <div role="alert" style={{ color: "red" }}>
              {message}
            </div>
          )}
          errors={errors}
          name={name}
        />
      </div>
    );
  }
);

export default LabeledTextField;
