import React from 'react';
import { useLanguage } from '@/components/language-provider';
import { useTranslation } from '@/lib/i18n';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
  const { currentLanguage, setLanguage, isRTL } = useLanguage();
  const { t } = useTranslation();

  return (
    <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
      <Globe className="w-4 h-4 text-gray-600" />
      <Select value={currentLanguage} onValueChange={setLanguage}>
        <SelectTrigger className="w-32 h-8 text-xs">
          <SelectValue placeholder={t("selectLanguage")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en" className="text-xs">English</SelectItem>
          <SelectItem value="ar" className="text-xs">العربية</SelectItem>
          <SelectItem value="ur" className="text-xs">اردو</SelectItem>
          <SelectItem value="fa" className="text-xs">فارسی</SelectItem>
          <SelectItem value="gu" className="text-xs">ગુજરાતી</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}