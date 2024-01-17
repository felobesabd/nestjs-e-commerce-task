import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class CategoryService {

  constructor(private configService: ConfigService) {
    console.log(configService.get('PORT', { infer: true }));
  }
  // getCategory() {
  //
  // }
}
