'use client';

import Image from 'next/image';

import {
  AlertCircleIcon,
  FileText,
  ImageIcon,
  UploadIcon,
  XIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

import { formatBytes } from '@/utils/formats';

import {
  FileMetadata,
  FileWithPreview,
  useFileUpload,
} from '@/hooks/common/use-file-upload';
import { TFieldValues } from '@/types/global';

const makeAcceptString = (accept: string) => {
  const types = accept.split(',');
  return types.map((type) => type.split('/')[1]).join(', ');
};

interface UploaderProps {
  value?: TFieldValues;
  maxFiles?: number;
  maxSizeMB?: number;
  onChange?: (files: FileWithPreview[]) => void;
  accept?: string;
  multiple?: boolean;
}

function Uploader({
  value,
  maxSizeMB = 2,
  maxFiles = 6,
  onChange,
  accept = 'image/svg+xml,image/png,image/jpeg,image/jpg,image/gif,application/pdf',
  multiple = true,
}: UploaderProps) {
  const t = useTranslations();
  const maxSize = maxSizeMB * 1024 * 1024; // Convert MB to bytes

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      clearFiles,
      getInputProps,
    },
  ] = useFileUpload({
    accept,
    maxSize,
    multiple,
    maxFiles,
    initialFiles: value as FileMetadata[],
    onFilesChange: onChange,
  });

  return (
    <div className="flex flex-col gap-2">
      {/* Drop area */}
      {!files.length ? (
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          data-files={files.length > 0 || undefined}
          className="relative flex min-h-52 flex-col items-center overflow-hidden rounded-lg border border-dashed border-input p-4 transition-colors not-data-files:justify-center has-[input:focus]:border-ring has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[dragging=true]:bg-accent/50 dark:aria-invalid:ring-destructive/40"
        >
          <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
            <div
              className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background"
              aria-hidden="true"
            >
              <ImageIcon className="size-4 opacity-60" />
            </div>
            <p className="typo-body-1 mb-1.5">
              {t('Common.messages.dropYourFilesHere')}
            </p>
            <p className="typo-caption-1 text-muted-foreground uppercase">
              {makeAcceptString(accept)} (max. {maxSizeMB}MB)
            </p>
            <Button
              variant="outline"
              className="mt-4"
              type="button"
              onClick={openFileDialog}
            >
              <UploadIcon className="-ms-1 opacity-60" aria-hidden="true" />
              {t('Common.selectFiles')}
            </Button>
          </div>
        </div>
      ) : maxFiles > files.length ? (
        <Button
          variant="outline"
          className="ml-auto w-fit"
          type="button"
          onClick={openFileDialog}
        >
          <UploadIcon className="-ms-1 opacity-60" aria-hidden="true" />
          {t('Common.uploadMore')}
        </Button>
      ) : null}

      <input
        {...getInputProps()}
        className="sr-only"
        aria-label="Upload image file"
      />

      {errors.length > 0 && (
        <div
          className="typo-caption-1 flex items-center gap-1 text-destructive"
          role="alert"
        >
          <AlertCircleIcon className="size-4 shrink-0" />
          <div className="flex flex-col">
            {errors.map((error, index) => (
              <span key={index}>{error}</span>
            ))}
          </div>
        </div>
      )}

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex shrink items-center justify-between gap-2 rounded-lg border bg-background p-2 pe-3"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                {file.file.type.includes('image') ? (
                  <div className="aspect-square shrink-0 rounded bg-accent">
                    <Image
                      src={file.preview || ''}
                      alt={file.file.name}
                      className="size-10 rounded-[inherit] object-cover"
                      placeholder="blur"
                      blurDataURL={file.preview || ''}
                      width={100}
                      height={100}
                    />
                  </div>
                ) : (
                  <FileText className="size-6 rounded-[inherit] object-cover text-accent-foreground" />
                )}
                <div className="flex min-w-0 flex-col gap-0.5">
                  <p className="typo-caption-1 truncate text-[13px]">
                    {file.file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatBytes(file.file.size)}
                  </p>
                </div>
              </div>

              <Button
                size="icon"
                variant="ghost"
                className="-me-2 size-8 text-muted-foreground/80 hover:bg-transparent hover:text-foreground"
                onClick={() => removeFile(file.id)}
                aria-label="Remove file"
              >
                <XIcon aria-hidden="true" />
              </Button>
            </div>
          ))}

          {/* Remove all files button */}
          {files.length > 1 && (
            <div>
              <Button size="sm" variant="outline" onClick={clearFiles}>
                {t('Common.removeAllFiles')}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export { Uploader };
