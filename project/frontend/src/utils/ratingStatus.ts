import { PresetStatusColorType } from 'antd/lib/_util/colors';

enum Statuses {
    good = 'success',
    bad = 'error',
    ok = 'warning',
    normal = 'processing',
    default = 'default',
}

export const getRatingStatus = (rating: number): PresetStatusColorType => {
    if (rating > 80) return Statuses.good;
    if (rating > 60 && rating < 80) return Statuses.normal;
    if (rating > 40 && rating < 60) return Statuses.ok;
    if (rating < 40) return Statuses.bad;
    return Statuses.default;
};