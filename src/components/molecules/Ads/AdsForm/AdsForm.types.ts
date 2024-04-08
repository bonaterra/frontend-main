import { IAds } from "../../../../models/IAds";

export interface AdsFormProps {
  ad: IAds;
  onSubmit: (ad: IAds) => void;
  onCancel: () => void;
}
