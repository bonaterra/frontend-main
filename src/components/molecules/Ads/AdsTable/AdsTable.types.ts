import { IAds } from "../../../../models/IAds";

export interface AdsTableProps {
    ads: IAds[];
    loading: boolean;
    onDelete: (id: number) => void;
    onEdit: (ad: IAds) => void;
}
