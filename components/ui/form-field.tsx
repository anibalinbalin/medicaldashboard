"use client";

import * as React from "react";
import { Input } from "./input";
import { cn } from "@/lib/utils";

type BaseFormFieldProps = {
  label: string;
  error?: string;
  className?: string;
  id?: string;
  required?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  disabled?: boolean;
};

type TextInputProps = BaseFormFieldProps & {
  type: "text" | "email" | "date" | "number";
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type TextAreaProps = BaseFormFieldProps & {
  type: "textarea";
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

type CheckboxProps = BaseFormFieldProps & {
  type: "checkbox";
  value?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type FormFieldProps = TextInputProps | TextAreaProps | CheckboxProps;

export function FormField(props: FormFieldProps) {
  const {
    label,
    className,
    id,
    error,
    required,
    readOnly,
    placeholder,
    disabled,
  } = props;

  if (props.type === "textarea") {
    return (
      <div className="space-y-2">
        <label
          htmlFor={id}
          className="block text-sm font-medium text-muted-foreground"
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
        <textarea
          id={id}
          className={cn(
            "min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-destructive",
            className
          )}
          value={props.value}
          onChange={props.onChange}
          required={required}
          readOnly={readOnly}
          placeholder={placeholder}
          disabled={disabled}
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  }

  if (props.type === "checkbox") {
    return (
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id={id}
          className={cn(
            "h-4 w-4 rounded border-input bg-background text-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            error && "border-destructive",
            className
          )}
          checked={props.value}
          onChange={props.onChange}
          required={required}
          readOnly={readOnly}
          disabled={disabled}
        />
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-muted-foreground"
      >
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      <Input
        id={id}
        type={props.type}
        className={cn(
          "bg-background text-foreground",
          error && "border-destructive",
          className
        )}
        value={props.value}
        onChange={props.onChange}
        required={required}
        readOnly={readOnly}
        placeholder={placeholder}
        disabled={disabled}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
