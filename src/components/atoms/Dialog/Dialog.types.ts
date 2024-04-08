export interface DialogProps {
  title?: string;
  visible: boolean;
  footer?: React.ReactNode;
  children: React.ReactNode;
  onHide: () => void;
  className?: string;
}
