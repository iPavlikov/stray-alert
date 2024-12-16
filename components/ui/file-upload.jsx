'use client';

import { cn } from '@/lib/utils';
import { Input } from './input';

export const FileUpload = ({
  className,
  onChange,
  onValueChange,
  ...props
}) => {
  const handleChange = (e) => {
    onChange?.(e);

    if (!onValueChange) return;

    const file = e.target.files[0];

    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      const dataUrl = fileReader.result;
      onValueChange(dataUrl);
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <Input
      className={cn('cursor-pointer', className)}
      {...props}
      onChange={handleChange}
      type="file"
    />
  );
};
