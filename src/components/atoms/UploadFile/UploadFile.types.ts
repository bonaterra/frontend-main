export interface UploadFileProps {
    onUpload: (file: File) => void;
    onClear: () => void;
    fileName: string | null;
}
