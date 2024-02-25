import { Injectable } from "@nestjs/common";
import { I18nContext, I18nService } from "nestjs-i18n";

@Injectable()
export class CustomI18nService {
  constructor(private i18nService: I18nService) {}

  translate(key: string, opts?: any) {
    const currentLang = I18nContext.current().lang;
    return this.i18nService.t(key, { lang: currentLang, ...opts });
  }
}