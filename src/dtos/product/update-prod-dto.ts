import { PartialType } from "@nestjs/mapped-types";
import { CreateProdDto } from "./create-prod-dto";

export class UpdateProdDto extends PartialType(CreateProdDto) {}